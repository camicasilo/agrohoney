<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
    <div class="site-branding">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">AgroHoney</a>
    </div>

    <!-- Mini Cart Integration -->
    <div class="site-header-cart">
        <a class="cart-customlocation" href="<?php echo esc_url( wc_get_cart_url() ); ?>" title="<?php esc_attr_e( 'View your shopping cart', 'agrohoney-child' ); ?>">
            <span class="cart-icon">🛒</span> Cart
            <span class="cart-contents"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
        </a>
        <div class="widget_shopping_cart_content">
            <?php
                // Display the WooCommerce mini cart widget content
                woocommerce_mini_cart();
            ?>
        </div>
    </div>
</header>

<nav class="site-navigation" style="margin-bottom: 20px;">
    <ul style="display: flex; gap: 15px; list-style: none; padding: 0;">
        <li><a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>">Mi Cuenta</a></li>
        <li><a href="<?php echo esc_url( wc_get_page_permalink( 'cart' ) ); ?>">Carrito</a></li>
        <li><a href="<?php echo esc_url( wc_get_page_permalink( 'checkout' ) ); ?>">Finalizar Compra</a></li>
    </ul>
</nav>
