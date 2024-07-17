<?php
/*
Plugin Name: Calculator Home Plugin (RP)
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
    wp_enqueue_style('rp-styles', plugins_url('styles.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'rp_enqueue_styles');
add_action('admin_enqueue_scripts', 'rp_enqueue_styles');

// Enqueue scripts
function rp_enqueue_scripts() {
    wp_enqueue_script('rp-scripts', plugins_url('script.js', __FILE__), array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'rp_enqueue_scripts');
add_action('admin_enqueue_scripts', 'rp_enqueue_scripts');


// Hook into admin menu
add_action('admin_menu', 'rp_admin_menu');

// Admin menu setup (Chloe & Lydia)
function rp_admin_menu() {
    add_menu_page( 
        //We don't touch this, so I feel less confusing as it would be starting from 0, 1, 2
        'RP Calculator',               // Page title
        'RP Calculator',               // Menu title
        'manage_options',              // Capability
        'rp-calculator',               // Menu slug
        'Renoku_Calculator_Base'        // Function to display the page content
    );

    add_submenu_page(
        //The "javascript"/functions of page 1
        'rp-calculator',               // Parent slug --> linked to Menu Plug, which is like sub folders in 1 big folder
        'RP Calculator Sub Page 1',    // Page title
        'Sub Page 1',                  // Menu title
        'manage_options',              // Capability
        'rp-calculator-subpage1',      // Menu slug
        'Renoku_Calculator_Pg1'        // Function to display the page content
    );

    add_submenu_page(
        'rp-calculator',               // Parent slug
        'RP Calculator Sub Page 2',    // Page title
        'Sub Page 2',                  // Menu title
        'manage_options',              // Capability
        'rp-calculator-subpage2',      // Menu slug
        'Renoku_Calculator_Pg2'        // Function to display the page content
    );

    add_submenu_page(
        'rp-calculator',               // Parent slug
        'RP Calculator Sub Page 3',    // Page title
        'Sub Page 3',                  // Menu title
        'manage_options',              // Capability
        'rp-calculator-subpage3',      // Menu slug
        'Renoku_Calculator_Pg3'        // Function to display the page content
    );
}

// Admin page content
function Renoku_Calculator_Pg1() {
    echo '<h1>RP Calculator Main Settings</h1>';
    echo '<p>Main settings page content goes here.</p>';
    //The echo is because is still in php file
    //Observed from Shernice and Jannah, they put code about making the data table functions are here.
    //Like how there was an accompanying php file for the data table functions, seperate from the display page.
    //I guess is like the javascript for the display page.
    //Since we have 3 different pages to do I think have 3 different submenus for respective pages can work maybe?
}

function Renoku_Calculator_Pg2() {
    echo '<h1>RP Calculator Sub Page 1</h1>';
    echo '<p>Sub page 1 content goes here.</p>';
}

function Renoku_Calculator_Pg3() {
    echo '<h1>RP Calculator Sub Page 2</h1>';
    echo '<p>Sub page 2 content goes here.</p>';
}

// Shortcode to display the calculator in the website itself
function rp_calc_pg1_shortcode() {
    ob_start();
    ?>
    <div id="rp-calculator-pg1">
        <!-- Yellow colour: #F7C454 -->
        <h3>FIND THE PRICE OF SERVICE AT THE PRICE OF NONE</h3> <!-- Glacial Indifference, colour is ##F7F7F5 -->
        <div class="Group-1">
            <div class="property-status-grp">
                <p>Property Status</p>
                <div class="button-container1">
                    <button id="btn-1q" class="common-btn" type="button">New</button>
                    <button id="btn-2q" class="common-btn" type="button">Resale</button>
                </div>
            </div>
            <div class="property-type-grp">
                <p>Property Type</p>
                <div class="button-container2">
                    <button id="btn-3q" class="common-btn" type="button">HDB</button>
                    <button id="btn-4q" class="common-btn" type="button">Condo</button>
                    <button id="btn-5q" class="common-btn" type="button">Landed</button>
                </div>
            </div>
        </div>
        <div class="Group-2">
            <div class="renovate-grp">
                <p>What To Renovate?</p>
                <div class="button-container3">
                    <button id="btn-6q" class="common-btn" type="button">Living</button>
                    <button id="btn-7q" class="common-btn" type="button">Bedroom</button><br>
                    <button id="btn-8q" class="common-btn" type="button">Kitchen</button>
                    <button id="btn-9q" class="common-btn" type="button">Bathroom</button>
                </div>
            </div>
            <div class="budget-group">
                <div class="bedrooms-container">
                    <label for="input-box" id="bedrooms-txt">No. of Bedrooms</label> 
                    <input type="number" id="bedrooms-box" name="budget" placeholder="Enter..."> 
                </div>
                <div class="bathrooms-container">
                    <label for="input-box" id="bathrooms-txt">No. of Bathrooms</label> 
                    <input type="number" id="bathrooms-box" name="budget" placeholder="Enter...">
                </div>
            </div>
        </div>        
        <button id="btn-10q" class="common-btn" type="button">Next</button>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var Btns = [
                document.getElementById('btn-1q'),
                document.getElementById('btn-2q'),
                document.getElementById('btn-3q'),
                document.getElementById('btn-4q'),
                document.getElementById('btn-5q'),
                document.getElementById('btn-6q'),
                document.getElementById('btn-7q'),
                document.getElementById('btn-8q'),
                document.getElementById('btn-9q'),
                document.getElementById('btn-10q')
            ];

            Btns.forEach(function(btn, index) {
                btn.addEventListener('click', function() {
                    if (index === 0) {
                        Btns[1].classList.remove('toggled');
                    } else if (index === 1) {
                        Btns[0].classList.remove('toggled');
                    } else if (index >= 2 && index <= 4) {
                        [2, 3, 4].forEach(function(i) {
                            if (i !== index) Btns[i].classList.remove('toggled');
                        });
                    }
                    btn.classList.toggle('toggled');
                });
            });

            var bedroomsBox = document.getElementById('bedrooms-box');
            var bathroomsBox = document.getElementById('bathrooms-box');

            bedroomsBox.addEventListener('input', function() {
                if (bedroomsBox.value < 0) {
                    bedroomsBox.value = 0;
                }
            });

            bathroomsBox.addEventListener('input', function() {
                if (bathroomsBox.value < 0) {
                    bathroomsBox.value = 0;
                }
            });
        });

    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('rp_calc_pg1', 'rp_calc_pg1_shortcode');
//To put shortcode in Wordpress, find the shortcode then type: [rp_calc_pg1]

function bvd_display_buttons() {
    ?>
    <div id="bvd-container">
        <div class="button-set">
            <p>HACKING</p>
            <button class="bvd-button set1" data-value="10">Light</button>
            <button class="bvd-button set1" data-value="20">Moderate</button>
            <button class="bvd-button set1" data-value="30">Extensive</button>
            <div id="set1-text" class="button-text"></div>
        </div>
        <div class="button-set">
            <p>MASONRY</p>
            <button class="bvd-button set2" data-value="10">Light</button>
            <button class="bvd-button set2" data-value="20">Moderate</button>
            <button class="bvd-button set2" data-value="30">Extensive</button>
            <div id="set2-text" class="button-text"></div>
        </div>
        <p>Total Size of Renovated Area</p> 
        <input type="number" id="bvd-input" placeholder="Enter...">
        <button id="bvd-submit">Submit</button>
        <div id="bvd-result"></div>
    </div>
    <?php
}
add_shortcode('bvd_buttons', 'bvd_display_buttons');
//To put shortcode in Wordpress, find the shortcode then type: [rp_calc_pg2]

function rp_calc_pg3_shortcode() {
    ob_start();
    ?>
    <div id="rp-calculator-pg3">
        <!-- Calculator form content goes here -->
        <h2>Calculator Form</h2>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('rp_calc_pg3', 'rp_calc_pg3_shortcode');
//To put shortcode in Wordpress, find the shortcode then type: [rp_calc_pg3]
?>
