<?php
/*
Plugin Name: Calculator Kitchen Plugin (RP)
Plugin URI: https://renoku2.azharapp.com/reviews/
Description: Calculator for Renoku's Website 
Version: 1.0
Author: Lydia, Chloe
Author URI: https://github.com/wanlydia, https://github.com/CrossoverRed 
License: GPL2
*/

function bvd_enqueue_scripts() {
    wp_enqueue_script('bvd-script', plugins_url('renoku-calculator-script.js', __FILE__), array('jquery'), null, true);
    wp_enqueue_style('bvd-styles', plugins_url('styles.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'bvd_enqueue_scripts');

function bvd_display_buttons() {
    ?>
    <div id="bvd-container">
        <h2>KITCHEN</h2>
        <div class="button-set">
            <p>HACKING</p>
            <button class="bvd-button kitchen-set1" data-value="10">Light</button>
            <button class="bvd-button kitchen-set1" data-value="20">Moderate</button>
            <button class="bvd-button kitchen-set1" data-value="30">Extensive</button>
        </div>
        <div id="kitchen-set1-text" class="button-text"></div>
        <div class="button-set">
            <p>MASONRY</p>
            <button class="bvd-button kitchen-set2" data-value="10">Light</button>
            <button class="bvd-button kitchen-set2" data-value="20">Moderate</button>
            <button class="bvd-button kitchen-set2" data-value="30">Extensive</button>
        </div>
        <div id="kitchen-set2-text" class="button-text"></div>
        <p>Total Size of Renovated Area</p> 
        <input type="number" id="bvd-input" placeholder="Enter...">
        <button id="bvd-submit">Submit</button>
        <div id="bvd-result"></div>
    </div>
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            $('#bvd-submit').click(function() {
                var inputValue = parseFloat($('#bvd-input').val());
                if (isNaN(inputValue)) {
                    $('#bvd-result').text('Please enter a valid number');
                    return;
                }

                if (selectedValueSet1 !== null || selectedValueSet2 !== null) {
                    var sum = (selectedValueSet1 || 0) + (selectedValueSet2 || 0);
                    var result = sum * inputValue;
                    $('#bvd-result').text('Result: $' + result);
                    window.location.href = 'URL_TO_CALC_LIVING_PAGE'; // Replace with actual URL
                } else {
                    $('#bvd-result').text('Please select at least one button');
                }
            });
        });
    </script>
    <?php
}
add_shortcode('bvd_buttons', 'bvd_display_buttons');
