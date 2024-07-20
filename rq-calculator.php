<?php
/*
Plugin Name: Renovation Calculator Plugin (RP)
Plugin URI: https://renoku2.azharapp.com/reviews/
Description: Calculator for Renoku's Website
Version: 1.0
Author: Lydia, Chloe
Author URI: https://github.com/wanlydia, https://github.com/CrossoverRed
License: GPL2
*/

// Enqueue scripts and styles
function rq_enqueue_scripts() {
    wp_enqueue_script('rq-script', plugins_url('rq-calculator.js', __FILE__), array('jquery'), null, true);
    wp_enqueue_style('rq-styles', plugins_url('styles.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'rq_enqueue_scripts');

// Display buttons for Kitchen
function rq_display_kitchen_buttons() {
    ?>
    <div id="rq-container">
        <h2>KITCHEN</h2>
        <div class="button-set">
            <p>HACKING</p>
            <button class="rq-button kitchen-set1" data-value="10">Light</button>
            <button class="rq-button kitchen-set1" data-value="20">Moderate</button>
            <button class="rq-button kitchen-set1" data-value="30">Extensive</button>
        </div>
        <div id="kitchen-set1-text" class="button-text"></div>
        <div class="button-set">
            <p>MASONRY</p>
            <button class="rq-button kitchen-set2" data-value="10">Light</button>
            <button class="rq-button kitchen-set2" data-value="20">Moderate</button>
            <button class="rq-button kitchen-set2" data-value="30">Extensive</button>
        </div>
        <div id="kitchen-set2-text" class="button-text"></div>
        <p>Total Size of Renovated Area</p>
        <input type="number" id="rq-input" placeholder="Enter...">
        <button id="rq-kitchen-submit">Submit</button>
        <div id="rq-result"></div>
    </div>
    <?php
}
add_shortcode('rq_kitchen_buttons', 'rq_display_kitchen_buttons');

// Display buttons for Living Area
function rq_display_living_buttons() {
    ?>
    <div id="rq-container">
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
add_shortcode('rq_living_buttons', 'rq_display_living_buttons');

// Display buttons for Bedroom
function rq_display_bedroom_buttons() {
    ?>
    <div id="rq-container">
        <h2>BEDROOM</h2>
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
        <div id="bedroom-set2-text" class="button-text"></div>
        <p>Total Size of Renovated Area</p>
        <input type="number" id="rq-input" placeholder="Enter...">
        <button id="rq-bedroom-submit">Submit</button>
        <div id="rq-result"></div>
    </div>
    <?php
}
add_shortcode('rq_bedroom_buttons', 'rq_display_bedroom_buttons');
?>
