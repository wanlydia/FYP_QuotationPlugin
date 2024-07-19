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

function rq_living_enqueue_scripts() {
    wp_enqueue_script('rq-script', plugins_url('renoku-calculator-script.js', __FILE__), array('jquery'), null, true);
    wp_enqueue_style('rq-styles', plugins_url('styles.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'rq_living_enqueue_scripts');

function rq_living_display_buttons() {
    ?>
    <div id="rq-living-container">
        <h2>LIVING AREA</h2>
        <div class="button-set">
            <p>PAINTING</p>
            <button class="rq-button living-set1" data-value="10">Light</button>
            <button class="rq-button living-set1" data-value="20">Moderate</button>
            <button class="rq-button living-set1" data-value="30">Extensive</button>
        </div>
        <div id="living-set1-text" class="button-text"></div>
        <div class="button-set">
            <p>FLOORING</p>
            <button class="rq-button living-set2" data-value="10">Light</button>
            <button class="rq-button living-set2" data-value="20">Moderate</button>
            <button class="rq-button living-set2" data-value="30">Extensive</button>
        </div>
        <div id="living-set2-text" class="button-text"></div>
        <p>Total Size of Renovated Area</p>
        <input type="number" id="rq-input" placeholder="Enter...">
        <button id="rq-living-submit">Submit</button>
        <div id="rq-result"></div>
    </div>
    <?php
}
add_shortcode('rq_living_buttons', 'rq_living_display_buttons');
?>
