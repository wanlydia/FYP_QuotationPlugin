<?php
/*
Plugin Name: Calculator Results
Description: A plugin that displays an estimated renovation cost.
Version: 1.0
Author: Lydia, Chloe
Author URI: https://github.com/wanlydia, https://github.com/CrossoverRed 
License: GPL2
*/

// Enqueue styles
function calculator_plugin_enqueue_styles() {
    wp_enqueue_style('calculator-plugin-font', 'https://fonts.googleapis.com/css2?family=Glacial+Indifference&display=swap');
    wp_enqueue_style('styles.css', plugin_dir_url(__FILE__) . 'styles.css');
}
add_action('wp_enqueue_scripts', 'calculator_plugin_enqueue_styles');

// Shortcode function
function calculator_plugin_shortcode() {
    ob_start(); ?>
    <div id="rp-calculator-pg3">
        <!-- Yellow colour: #F7C454; Glacial Indifference, colour is ##F7F7F5 -->
        <p id="est-reno-txt">Your estimated renovation cost is</p>
        <p id="cost-txt">$15.8K - $25.5K</p>
        <div id="text2">
            <p id="txtr-1">Ready to start your project? <span class="highlight">BOOK YOUR APPOINTMENT NOW</span></p>
            <p id="txtr-2">Want to know what we can do? <span class="highlight">CHECK OUR PORTFOLIO</span></p>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('calculator_plugin', 'calculator_plugin_shortcode');
