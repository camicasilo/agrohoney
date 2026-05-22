<?php
/**
 * The Template for displaying all single products
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product.php.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header( 'shop' ); ?>

	<?php
		/**
		 * woocommerce_before_main_content hook.
		 *
		 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
		 * @hooked woocommerce_breadcrumb - 20
		 */
		do_action( 'woocommerce_before_main_content' );
	?>

		<?php while ( have_posts() ) : the_post(); ?>

            <div class="product-traceability-notice" style="background-color: #f9f9f9; padding: 15px; margin-bottom: 20px; border-left: 4px solid #77a464;">
                <?php
                global $product;
                $codigo_lote = get_post_meta( $product->get_id(), '_codigo_lote', true );
                if ( ! empty( $codigo_lote ) ) {
                    echo '<strong>Trazabilidad:</strong> El código de lote de este mueble es: <span>' . esc_html( $codigo_lote ) . '</span>';
                } else {
                    echo '<strong>Trazabilidad:</strong> Verifique el empaque del mueble para conocer su código de lote único.';
                }
                ?>
            </div>

			<?php wc_get_template_part( 'content', 'single-product' ); ?>

		<?php endwhile; // end of the loop. ?>

	<?php
		/**
		 * woocommerce_after_main_content hook.
		 *
		 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
		 */
		do_action( 'woocommerce_after_main_content' );
	?>

	<?php
		/**
		 * woocommerce_sidebar hook.
		 *
		 * @hooked woocommerce_get_sidebar - 10
		 */
		do_action( 'woocommerce_sidebar' );
	?>

<?php
get_footer( 'shop' );

/* Omit closing PHP tag at the end of PHP files to avoid "headers already sent" issues. */
