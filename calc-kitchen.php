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

function bvd_enqueue_scripts() {
    wp_enqueue_script('bvd-script', plugins_url('/renoku-calculator-script.js', __FILE__), array('jquery'), null, true);
    wp_enqueue_style('styles.css', plugins_url('/styles.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'bvd_enqueue_scripts');

function bvd_display_buttons() {
    ?>
    <div id="bvd-container">
        <h2>KITCHEN</h2>
        <div class="button-set">
            <p>HACKING</p>
            <button class="bvd-button set1" data-value="10">Light</button>
            <button class="bvd-button set1" data-value="20">Moderate</button>
            <button class="bvd-button set1" data-value="30">Extensive</button>
        </div>
        <div id="set1-text" class="button-text"></div>
        <div class="button-set">
            <p>MASONRY</p>
            <button class="bvd-button set2" data-value="10">Light</button>
            <button class="bvd-button set2" data-value="20">Moderate</button>
            <button class="bvd-button set2" data-value="30">Extensive</button>
        </div>
        <div id="set2-text" class="button-text"></div>
        <p>Total Size of Renovated Area</p> 
        <input type="number" id="bvd-input" placeholder="Enter...">
        <button id="bvd-submit">Submit</button>
        <div id="bvd-result"></div>
    </div>
    <?php
}
add_shortcode('bvd_buttons', 'bvd_display_buttons');
?>