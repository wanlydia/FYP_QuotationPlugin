<?php
/*
Plugin Name: Quotation Results
Plugin URI: https://renoku2.azharapp.com/quotation/
Description: A plugin that displays an estimated renovation cost.
Version: 1.0
Author: Lydia, Chloe
Author URI: https://github.com/wanlydia, https://github.com/CrossoverRed 
License: GPL2
*/

function rq_results_enqueue_scripts() {
    wp_enqueue_script('rq-script', plugins_url('quotation-script.js', __FILE__), array('jquery'), null, true);
    wp_enqueue_style('rq-styles', plugins_url('styles.css', __FILE__), array(), '1.0.1'); // Updated version
}

add_action('wp_enqueue_scripts', 'rq_results_enqueue_scripts');

function rq_results_shortcode() {
    // Get the min and max values from the URL parameters
    $totalMin = isset($_GET['min']) ? floatval($_GET['min']) : 0;
    $totalMax = isset($_GET['max']) ? floatval($_GET['max']) : 0;

    ob_start(); ?>
    <div id="rq-resultsContainer">
        <p id="est-reno-txt">Your estimated renovation cost is</p>
        <div id="rq-results">
            $<div id="rq-minResults"><?php echo number_format($totalMin, 1); ?></div> - $<div id="rq-maxResults"><?php echo number_format($totalMax, 1); ?></div>
        </div>
        
        <div id="rq-links">
            <p id="text">Ready to start your project? <a href="https://renoku2.azharapp.com/contact-us/" class="highlight">BOOK YOUR APPOINTMENT NOW</a></p>
            <p id="text">Want to know what we can do? <a href="https://renoku2.azharapp.com/gallery/" class="highlight">CHECK OUR GALLERY OF WORKS</a></p>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('rq_results', 'rq_results_shortcode');
?>
