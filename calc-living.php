<?php
/*
Plugin Name: Calculator Living Plugin (RP)
Plugin URI: https://renoku2.azharapp.com/reviews/
Description: Calculator for Renoku's Website (Living Area)
Version: 1.0
Author: Lydia, Chloe
Author URI: https://github.com/wanlydia, https://github.com/CrossoverRed
License: GPL2
*/

function bvd_living_enqueue_scripts() {
    wp_enqueue_script('bvd-script', plugins_url('renoku-calculator-script.js', __FILE__), array('jquery'), null, true);
    wp_enqueue_style('bvd-styles', plugins_url('styles.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'bvd_living_enqueue_scripts');

function bvd_living_display_buttons() {
    ?>
    <div id="bvd-living-container">
        <h2>LIVING AREA</h2>
        <div class="button-set">
            <p>PAINTING</p>
            <button class="bvd-button living-set1" data-value="10">Light</button>
            <button class="bvd-button living-set1" data-value="20">Moderate</button>
            <button class="bvd-button living-set1" data-value="30">Extensive</button>
        </div>
        <div id="living-set1-text" class="button-text"></div>
        <div class="button-set">
            <p>FLOORING</p>
            <button class="bvd-button living-set2" data-value="10">Light</button>
            <button class="bvd-button living-set2" data-value="20">Moderate</button>
            <button class="bvd-button living-set2" data-value="30">Extensive</button>
        </div>
        <div id="living-set2-text" class="button-text"></div>
        <p>Total Size of Renovated Area</p>
        <input type="number" id="bvd-input" placeholder="Enter...">
        <button id="bvd-submit">Submit</button>
        <div id="bvd-result"></div>
    </div>
    <?php
}
add_shortcode('bvd_living_buttons', 'bvd_living_display_buttons');
?>
