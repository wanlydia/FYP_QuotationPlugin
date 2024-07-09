<?php
/*
Plugin Name: Calculator Plugin (RP)
Plugin URI: https://renoku2.azharapp.com/reviews/
Description: Calculator for Renoku's Website 
Version: 1.0
Author: Lydia, Chloe
Author URI: https://github.com/wanlydia, https://github.com/CrossoverRed 
License: GPL2
*/

// Plugin activation hook (Chloe & Lydia)
// Function to run when the plugin is activated
function rp_calculator_activate() {
    // Activation tasks, e.g., setting default options
    if (!get_option('rp_calculator_options')) {
        $default_options = array('option1' => 'value1', 'option2' => 'value2');
        add_option('rp_calculator_options', $default_options);
    }
}
register_activation_hook(__FILE__, 'rp_calculator_activate');

// Enqueue styles
function rp_enqueue_styles() {
    wp_enqueue_style('rp-styles', plugins_url('style.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'rp_enqueue_styles');
add_action('admin_enqueue_scripts', 'rp_enqueue_styles');

// Hook into admin menu
add_action('admin_menu', 'rp_admin_menu');

// Admin menu setup (Chloe & Lydia)
function rp_admin_menu() {
    add_menu_page(
        'RP Calculator Main Settings', // Page title
        'RP Calculator',               // Menu title
        'manage_options',              // Capability
        'rp-calculator',               // Menu slug
        'Renoku_Calculator_Pg1'        // Function to display the page content
    );

    add_submenu_page(
        'rp-calculator',               // Parent slug
        'RP Calculator Sub Page 1',    // Page title
        'Sub Page 1',                  // Menu title
        'manage_options',              // Capability
        'rp-calculator-subpage1',      // Menu slug
        'Renoku_Calculator_Pg2'        // Function to display the page content
    );

    add_submenu_page(
        'rp-calculator',               // Parent slug
        'RP Calculator Sub Page 2',    // Page title
        'Sub Page 2',                  // Menu title
        'manage_options',              // Capability
        'rp-calculator-subpage2',      // Menu slug
        'Renoku_Calculator_Pg3'        // Function to display the page content
    );
}

// Admin page content
function Renoku_Calculator_Pg1() {
    echo '<h1>RP Calculator Main Settings</h1>';
    echo '<p>Main settings page content goes here.</p>';
}

function Renoku_Calculator_Pg2() {
    echo '<h1>RP Calculator Sub Page 1</h1>';
    echo '<p>Sub page 1 content goes here.</p>';
}

function Renoku_Calculator_Pg3() {
    echo '<h1>RP Calculator Sub Page 2</h1>';
    echo '<p>Sub page 2 content goes here.</p>';
}

// Shortcode to display the calculator
function rp_calc_form_shortcode() {
    ob_start();
    ?>
    <div id="rp-calculator">
        <!-- Calculator form content goes here -->
        <h2>Calculator Form</h2>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('rp_calc_form', 'rp_calc_form_shortcode');
?>
