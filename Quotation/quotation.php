<?php
/*
Plugin Name: Quotation Plugin
Plugin URI: https://renoku2.azharapp.com/quotation/
Description: Calculator for Renoku's Website and displays an estimated renovation cost.
Version: 1.0
Author: Lydia, Chloe
Author URI: https://github.com/wanlydia, https://github.com/CrossoverRed
License: GPL2
*/

function rq_enqueue_scripts() {
    wp_enqueue_script('rq-script', plugins_url('quotation-script.js', __FILE__), array('jquery'), null, true);
    wp_enqueue_style('rq-styles', plugins_url('styles.css', __FILE__), array(), '1.0.1');
}

add_action('wp_enqueue_scripts', 'rq_enqueue_scripts');

function rq_quotation_shortcode() {
    ob_start(); ?>
    <div id="rq-formContainer" class="page active">
        <h3>FIND THE PRICE OF SERVICE AT THE PRICE OF NONE</h3>

        <div class="Group-1">
            <div class="rq-propertyStatus">
                <p>Property Status</p>
                <div class="button-propertyStatus">
                    <button id="btn-1q" class="common-btn" type="button" onclick="toggleSingleButton(this, 'btn-1q', 'btn-2q')">New</button>
                    <button id="btn-2q" class="common-btn" type="button" onclick="toggleSingleButton(this, 'btn-2q', 'btn-1q')">Resale</button>
                </div>
            </div>

            <div class="rq-propertyType">
                <p>Property Type</p>
                <div class="button-propertyType">
                    <button id="btn-3q" class="common-btn" type="button" onclick="toggleSingleButton(this, 'btn-3q', 'btn-4q', 'btn-5q')">HDB</button>
                    <button id="btn-4q" class="common-btn" type="button" onclick="toggleSingleButton(this, 'btn-4q', 'btn-3q', 'btn-5q')">Condo</button>
                    <button id="btn-5q" class="common-btn" type="button" onclick="toggleSingleButton(this, 'btn-5q', 'btn-3q', 'btn-4q')">Landed</button>
                </div>
            </div>
        </div>
        <div class="Group-2">
            <div class="rq-rooms">
                <p>What To Renovate?</p>
                <div class="button-container">
                    <button id="living-btn" class="common-btn">Living</button>
                    <button id="kitchen-btn" class="common-btn">Kitchen</button>
                    <button id="bathroom-btn" class="common-btn" onclick="toggleContainer('bathrooms-container', this)">Bathroom</button>
                    <button id="bedroom-btn" class="common-btn" onclick="toggleContainer('bedrooms-container', this)">Bedroom</button>
                </div>
            </div>
        
            <div class="input-bath-bed"> 
                <div id="bathrooms-container" style="display: none;">
                    <label for="bathrooms-box" id="bathrooms-txt">No. of Bathrooms</label> 
                    <input type="number" id="bathrooms-box" name="bathrooms" placeholder="No." min="1" max="5">
                </div>
                <br>
                <div id="bedrooms-container" style="display: none;">
                    <label for="bedrooms-box" id="bedrooms-txt">No. of Bedrooms</label> 
                    <input type="number" id="bedrooms-box" name="bedrooms" placeholder="No." min="1" max="5">
                </div>
            </div>
        </div>
        <div class="rq-size">
            <p>Total Size of Renovated Area</p>
            <input type="number" id="rq-inputSize" placeholder="Enter..." min="1">
            <button id="metreSquared-btn" class="common-btn">m²</button>
            <button id="squareFoot-btn" class="common-btn">sq ft</button>
        </div>
        <br><br><br>

        <h2>TYPES OF WORKS</h2>
        <p id="types-text">Select the services that you require based on its intensity. If you do not require the service, leave it blank</p>
        <div id="rq-buttonSet">
            <div class="button-set">
                <p>HACKING</p>
                <button class="rq-button hacking" data-value="light" data-min="100" data-max="200">Light</button>
                <button class="rq-button hacking" data-value="moderate" data-min="200" data-max="300">Moderate</button>
                <button class="rq-button hacking" data-value="extensive" data-min="300" data-max="5500">Extensive</button>
            </div>
            <div id="hacking-text" class="button-text"></div>

            <div class="button-set">
                <p>MASONRY</p>
                <button class="rq-button masonry" data-value="light" data-min="100" data-max="200">Light</button>
                <button class="rq-button masonry" data-value="moderate" data-min="200" data-max="2400">Moderate</button>
                <button class="rq-button masonry" data-value="extensive" data-min="2400" data-max="20500">Extensive</button>
            </div>
            <div id="masonry-text" class="button-text"></div>

            <div class="button-set">
                <p>CARPENTRY</p>
                <button class="rq-button carpentry" data-value="light" data-min="100" data-max="2200">Light</button>
                <button class="rq-button carpentry" data-value="moderate" data-min="2200" data-max="2400">Moderate</button>
                <button class="rq-button carpentry" data-value="extensive" data-min="2400" data-max="20500">Extensive</button>
            </div>
            <div id="carpentry-text" class="button-text"></div>

            <div class="button-set">
                <p>CEILING & PARTITION</p>
                <button class="rq-button ceiling-partition" data-value="light" data-min="100" data-max="200">Light</button>
                <button class="rq-button ceiling-partition" data-value="moderate" data-min="200" data-max="300">Moderate</button>
                <button class="rq-button ceiling-partition" data-value="extensive" data-min="300" data-max="7500">Extensive</button>
            </div>
            <div id="ceiling-partition-text" class="button-text"></div>

            <div class="button-set">
                <p>PLUMBING</p>
                <button class="rq-button plumbing" data-value="light" data-min="100" data-max="200">Light</button>
                <button class="rq-button plumbing" data-value="moderate" data-min="200" data-max="300">Moderate</button>
                <button class="rq-button plumbing" data-value="extensive" data-min="300" data-max="2300">Extensive</button>
            </div>
            <div id="plumbing-text" class="button-text"></div>

            <div class="button-set">
                <p>ELECTRICAL</p>
                <button class="rq-button electrical" data-value="light" data-min="100" data-max="200">Light</button>
                <button class="rq-button electrical" data-value="moderate" data-min="200" data-max="1700">Moderate</button>
                <button class="rq-button electrical" data-value="extensive" data-min="1700" data-max="16000">Extensive</button>
            </div>
            <div id="electrical-text" class="button-text"></div>

            <div class="button-set">
                <p>PAINTING</p>
                <button class="rq-button painting" data-value="light" data-min="100" data-max="200">Light</button>
                <button class="rq-button painting" data-value="moderate" data-min="200" data-max="700">Moderate</button>
                <button class="rq-button painting" data-value="extensive" data-min="700" data-max="7800">Extensive</button>
            </div>
            <div id="painting-text" class="button-text"></div>

            <div class="button-set">
                <p>CLEANING & POLISHING</p>
                <button class="rq-button cleaning-polishing" data-value="light" data-min="100" data-max="200">Light</button>
                <button class="rq-button cleaning-polishing" data-value="moderate" data-min="200" data-max="300">Moderate</button>
                <button class="rq-button cleaning-polishing" data-value="extensive" data-min="300" data-max="12400">Extensive</button>
            </div>
            <div id="cleaning-polishing-text" class="button-text"></div>
        
        </div>

        <button class="common-btn" id="rq-submit">Submit</button>
    </div>
   
    <?php
    return ob_get_clean();
}
add_shortcode('rq_quotation', 'rq_quotation_shortcode');

function rq_results_shortcode() {

    $totalMin = isset($_GET['min']) ? floatval($_GET['min']) : 0;
    $totalMax = isset($_GET['max']) ? floatval($_GET['max']) : 0;

    ob_start(); ?>
    <div id="rq-resultsContainer">
        <p id="est-reno-txt">Your estimated renovation cost is</p>
        <div id="rq-results">
            $<div id="rq-minResults"><?php echo number_format($totalMin); ?></div> - $<div id="rq-maxResults"><?php echo number_format($totalMax); ?></div>
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