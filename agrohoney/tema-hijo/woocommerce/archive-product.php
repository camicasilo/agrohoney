<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked woocommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */
do_action( 'woocommerce_before_main_content' );

?>
<header class="woocommerce-products-header">
	<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>
		<h1 class="woocommerce-products-header__title page-title"><?php woocommerce_page_title(); ?></h1>
	<?php endif; ?>

	<?php
	/**
	 * Hook: woocommerce_archive_description.
	 *
	 * @hooked woocommerce_taxonomy_archive_description - 10
	 * @hooked woocommerce_product_archive_description - 10
	 */
	do_action( 'woocommerce_archive_description' );
	?>

    <!-- Custom UMF Filter (Category Equivalent) -->
    <div class="custom-umf-filters" style="margin-bottom: 2em;">
        <h3>Filtrar por Colección:</h3>
        <a href="?filtro_umf=todas" class="button">Todas</a>
        <a href="?filtro_umf=esencial" class="button">Esencial (10+)</a>
        <a href="?filtro_umf=premium" class="button">Premium (15+)</a>
        <a href="?filtro_umf=lujo" class="button">Lujo (20+)</a>
    </div>
</header>
<?php

if ( woocommerce_product_loop() ) {

	/**
	 * Hook: woocommerce_before_shop_loop.
	 *
	 * @hooked woocommerce_output_all_notices - 10
	 * @hooked woocommerce_result_count - 20
	 * @hooked woocommerce_catalog_ordering - 30
	 */
	do_action( 'woocommerce_before_shop_loop' );

	woocommerce_product_loop_start();

	if ( wc_get_loop_prop( 'total' ) ) {
		while ( have_posts() ) {
			the_post();

			/**
			 * Hook: woocommerce_shop_loop.
			 */
			do_action( 'woocommerce_shop_loop' );

			// Override standard template part with custom layout
			?>
            <li <?php wc_product_class( '', $product ); ?>>
                <?php
                global $product;
                $link = apply_filters( 'woocommerce_loop_product_link', get_the_permalink(), $product );
                ?>
                <a href="<?php echo esc_url( $link ); ?>" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">
                    <!-- Placeholder Image for Furniture (dynamic fallback if empty) -->
                    <?php if ( has_post_thumbnail() ) : ?>
                        <?php the_post_thumbnail( 'woocommerce_thumbnail', array( 'style' => 'max-width: 100%; height: auto; aspect-ratio: 1/1; object-fit: cover; margin-bottom: 1em;' ) ); ?>
                    <?php else : ?>
                        <img src="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Mueble de madera" style="max-width: 100%; height: auto; aspect-ratio: 1/1; object-fit: cover; margin-bottom: 1em;" />
                    <?php endif; ?>

                    <h2 class="woocommerce-loop-product__title"><?php echo esc_html( get_the_title() ); ?></h2>

                    <div class="product-category" style="color: #666; font-size: 0.9em; margin-bottom: 0.5em;">
                        <?php echo wc_get_product_category_list( $product->get_id(), ', ' ); ?>
                    </div>

                    <span class="price"><?php echo $product->get_price_html(); ?></span>

                    <div class="product-rating" style="margin-top: 0.5em;">
                         <?php echo wc_get_rating_html( $product->get_average_rating() ); ?>
                    </div>
                </a>
                <?php
                /**
                 * Hook: woocommerce_after_shop_loop_item.
                 *
                 * @hooked woocommerce_template_loop_product_link_close - 5
                 * @hooked woocommerce_template_loop_add_to_cart - 10
                 */
                do_action( 'woocommerce_after_shop_loop_item' );
                ?>
            </li>
            <?php
		}
	}

	woocommerce_product_loop_end();

	/**
	 * Hook: woocommerce_after_shop_loop.
	 *
	 * @hooked woocommerce_pagination - 10
	 */
	do_action( 'woocommerce_after_shop_loop' );
} else {
	/**
	 * Hook: woocommerce_no_products_found.
	 *
	 * @hooked wc_no_products_found - 10
	 */
	do_action( 'woocommerce_no_products_found' );
}

/**
 * Hook: woocommerce_after_main_content.
 *
 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
 */
do_action( 'woocommerce_after_main_content' );

/**
 * Hook: woocommerce_sidebar.
 *
 * @hooked woocommerce_get_sidebar - 10
 */
do_action( 'woocommerce_sidebar' );

get_footer( 'shop' );
