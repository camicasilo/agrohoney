<?php
// Enqueue parent theme styles
add_action( 'wp_enqueue_scripts', 'agrohoney_child_enqueue_styles' );
function agrohoney_child_enqueue_styles() {
    $parent_style = 'agrohoney-style'; // This is 'twentyfifteen-style' for the Twenty Fifteen theme.
    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'agrohoney-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );
}

// Implementar el filtro dinámico por categoría/atributo desde $_GET['filtro_umf']
add_action( 'woocommerce_product_query', 'agrohoney_child_umf_filter' );
function agrohoney_child_umf_filter( $q ) {
    if ( ! is_admin() && isset( $_GET['filtro_umf'] ) && $_GET['filtro_umf'] !== 'todas' ) {
        $filtro = sanitize_text_field( $_GET['filtro_umf'] );

        $tax_query = (array) $q->get( 'tax_query' );
        $tax_query[] = array(
            'taxonomy' => 'product_cat',
            'field'    => 'slug',
            'terms'    => array( $filtro ),
            'operator' => 'IN',
        );
        $q->set( 'tax_query', $tax_query );
    }
}

// 1. Mostrar el campo en la pestaña general de producto en admin
add_action( 'woocommerce_product_options_general_product_data', 'agrohoney_add_codigo_lote_field' );
function agrohoney_add_codigo_lote_field() {
    echo '<div class="options_group">';
    woocommerce_wp_text_input( array(
        'id'          => '_codigo_lote',
        'label'       => __( 'Código de Lote', 'agrohoney-child' ),
        'desc_tip'    => 'true',
        'description' => __( 'Ingrese el código de lote para la trazabilidad (Hive to Home equivalente).', 'agrohoney-child' )
    ) );
    echo '</div>';
}

// 2. Guardar el campo
add_action( 'woocommerce_process_product_meta', 'agrohoney_save_codigo_lote_field' );
function agrohoney_save_codigo_lote_field( $post_id ) {
    $codigo_lote = isset( $_POST['_codigo_lote'] ) ? sanitize_text_field( $_POST['_codigo_lote'] ) : '';
    update_post_meta( $post_id, '_codigo_lote', $codigo_lote );
}


// Ensure WooCommerce support is declared
add_action( 'after_setup_theme', 'agrohoney_child_setup' );
function agrohoney_child_setup() {
    add_theme_support( 'woocommerce' );
}

// Ensure the cart fragment updates dynamically
add_filter( 'woocommerce_add_to_cart_fragments', 'agrohoney_child_cart_count_fragments', 10, 1 );
function agrohoney_child_cart_count_fragments( $fragments ) {
    ob_start();
    ?>
    <span class="cart-contents"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
    <?php
    $fragments['span.cart-contents'] = ob_get_clean();
    return $fragments;
}

// 1. Add file input to review form
add_action( 'comment_form_logged_in_after', 'agrohoney_add_image_upload_to_review' );
add_action( 'comment_form_after_fields', 'agrohoney_add_image_upload_to_review' );
function agrohoney_add_image_upload_to_review() {
    if ( is_product() ) {
        echo '<p class="comment-form-image"><label for="review_image">' . __( 'Sube una foto (Opcional)', 'agrohoney-child' ) . '</label> <input type="file" name="review_image" id="review_image" accept="image/*" /></p>';
    }
}

// 2. Add enctype to the form to handle file uploads
add_action( 'comment_form_top', 'agrohoney_add_enctype_to_comment_form' );
function agrohoney_add_enctype_to_comment_form() {
    echo '<script>document.getElementById("commentform").setAttribute("enctype", "multipart/form-data");</script>';
}

// 3. Handle the image upload upon comment submission
add_action( 'comment_post', 'agrohoney_save_review_image', 10, 3 );
function agrohoney_save_review_image( $comment_id, $comment_approved, $commentdata ) {
    // Check if user is logged in (to prevent unauthenticated uploads)
    if ( ! is_user_logged_in() ) {
        return;
    }

    // Process the upload only if there is an image
    if ( isset( $_FILES['review_image'] ) && $_FILES['review_image']['size'] > 0 ) {

        // Basic file type validation before processing
        $uploaded_type = wp_check_filetype( basename( $_FILES['review_image']['name'] ) );
        if ( ! in_array( $uploaded_type['type'], array( 'image/jpeg', 'image/png', 'image/gif', 'image/webp' ) ) ) {
            return; // Not a valid image type
        }

        require_once( ABSPATH . 'wp-admin/includes/file.php' );
        require_once( ABSPATH . 'wp-admin/includes/image.php' );
        require_once( ABSPATH . 'wp-admin/includes/media.php' );

        $attachment_id = media_handle_upload( 'review_image', 0 );
        if ( ! is_wp_error( $attachment_id ) ) {
            $image_url = wp_get_attachment_url( $attachment_id );
            update_comment_meta( $comment_id, 'review_image', esc_url( $image_url ) );
        }
    }
}

// 4. Display the image in the review
add_action( 'woocommerce_review_after_comment_text', 'agrohoney_display_review_image' );
function agrohoney_display_review_image( $comment ) {
    $image_url = get_comment_meta( $comment->comment_ID, 'review_image', true );
    if ( $image_url ) {
        echo '<div class="review-uploaded-image" style="margin-top: 10px;">';
        echo '<img src="' . esc_url( $image_url ) . '" alt="Customer review photo" style="max-width: 150px; height: auto; border-radius: 4px;" />';
        echo '</div>';
    }
}
