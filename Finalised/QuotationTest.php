<?php
/*
Plugin Name: Quotation Plugin
Plugin URI: https://renoku2.azharapp.com/quotation/
Description: Calculator for Renoku's Website
Version: 1.0
Author: Lydia, Chloe
Author URI: https://github.com/wanlydia, https://github.com/CrossoverRed
License: GPL2
*/

function rq_quotation_enqueue_scripts() {
    wp_enqueue_style('rq-styles', plugins_url('styles.css',__FILE__), array(), '1.0.1');
}

add_action('wp_enqueue_scripts', 'rq_quotation_enqueue_scripts');

function rq_quotation_shortcode() {
    ob_start(); ?>
        <div id="pg1" class="page active">
        <h3>FIND THE PRICE OF SERVICE AT THE PRICE OF NONE</h3>
        <div class="Group-1">
            <div class="property-status-grp">
                <p>Property Status</p>
                <div class="button-container1"> 
                    <button id="btn-1q" class="rq-button" type="button" onclick="toggleSingleButton(this, 'btn-1q', 'btn-2q')">New</button>
                    <button id="btn-2q" class="rq-button" type="button" onclick="toggleSingleButton(this, 'btn-2q', 'btn-1q')">Resale</button>
                </div>
            </div>
            <div class="property-type-grp"> <!--This id affects css-->
                <p>Property Type</p>
                <div class="button-container2"> <!--This id affects css-->
                    <button id="btn-3q" class="rq-button" type="button" onclick="toggleSingleButton(this, 'btn-3q', 'btn-4q', 'btn-5q')">HDB</button>
                    <button id="btn-4q" class="rq-button" type="button" onclick="toggleSingleButton(this, 'btn-4q', 'btn-3q', 'btn-5q')">Condo</button>
                    <button id="btn-5q" class="rq-button" type="button" onclick="toggleSingleButton(this, 'btn-5q', 'btn-3q', 'btn-4q')">Landed</button>
                </div>
            </div>
        </div>
        <div class="Group-2">
            <div class="renovate-grp"> <!--This id can be changed, but is in css that affects the width between the 2 columns and paragrpah margin-bottom-->
                <p>What To Renovate?</p>
                <div class="button-container">
                    <button id="living-btn" class="rq-button">Living</button>
                    <button id="kitchen-btn" class="rq-button">Kitchen</button>
                    <button id="bathroom-btn" class="rq-button" onclick="toggleContainer('bathrooms-container', this)">Bathroom</button>
                    <button id="bedroom-btn" class="rq-button" onclick="toggleContainer('bedrooms-container', this)">Bedroom</button>
                </div>
            </div>
        
            <div class="bath-bed-group"> 
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
        <br>
        <h2>TYPES OF WORKS</h2>
        <p id="types-text">Select the services that you require based on its intensity. If you do not require the service, leave it blank.</p>
        <br>
        <div id="rq-buttonset">
    <div class="button-set">
        <p>HACKING</p>
        <button id="hack-light-btn" class="rq-button" data-button-set="hack" type="button" onclick="toggleSingleButton(this, 'hack-light-btn', 'hack-moderate-btn', 'hack-extensive-btn')" data-min="1" data-max="3.0">Light</button>
        <button id="hack-moderate-btn" class="rq-button" data-button-set="hack" type="button" onclick="toggleSingleButton(this, 'hack-light-btn', 'hack-moderate-btn', 'hack-extensive-btn')" data-min="2" data-max="6.0">Moderate</button>
        <button id="hack-extensive-btn" class="rq-button" data-button-set="hack" type="button" onclick="toggleSingleButton(this, 'hack-light-btn', 'hack-moderate-btn', 'hack-extensive-btn')" data-min="3" data-max="9.0">Extensive</button>
    </div>
    <div id="hack-text" class="button-text"></div><!--The hack-text is in lined with the 'hack':{ 'hack- javascript'}-->

    <div class="button-set">
        <p>MASONRY</p>
        <button id="masonry-light-btn" class="rq-button" data-button-set="masonry" type="button" onclick="toggleSingleButton(this, 'masonry-light-btn', 'masonry-moderate-btn', 'masonry-extensive-btn')" data-min="1" data-max="3.0">Light</button>
        <button id="masonry-moderate-btn" class="rq-button" data-button-set="masonry" type="button" onclick="toggleSingleButton(this, 'masonry-light-btn', 'masonry-moderate-btn', 'masonry-extensive-btn')" data-min="2" data-max="6.0">Moderate</button>
        <button id="masonry-extensive-btn" class="rq-button" data-button-set="masonry" type="button" onclick="toggleSingleButton(this, 'masonry-light-btn', 'masonry-moderate-btn', 'masonry-extensive-btn')" data-min="3" data-max="9.0">Extensive</button>
    </div>
    <div id="masonry-text" class="button-text"></div>

    <div class="button-set">
        <p>PAINTING</p>
        <button id="painting-light-btn" class="rq-button" data-button-set="painting" type="button" onclick="toggleSingleButton(this, 'painting-light-btn', 'painting-moderate-btn', 'painting-extensive-btn')" data-min="1" data-max="3.0">Light</button>
        <button id="painting-moderate-btn" class="rq-button" type="button" data-button-set="painting" onclick="toggleSingleButton(this, 'painting-light-btn', 'painting-moderate-btn', 'painting-extensive-btn')" data-min="2" data-max="6.0">Moderate</button>
        <button id="painting-extensive-btn" class="rq-button" type="button" data-button-set="painting" onclick="toggleSingleButton(this, 'painting-light-btn', 'painting-moderate-btn', 'painting-extensive-btn')" data-min="3" data-max="9.0">Extensive</button>
    </div>
    <div id="painting-text" class="button-text"></div>

    <div class="button-set">
        <p>FLOORING</p>
        <button id="flooring-light-btn" class="rq-button" data-button-set="flooring" type="button" onclick="toggleSingleButton(this, 'flooring-light-btn', 'flooring-moderate-btn', 'flooring-extensive-btn')" data-min="1" data-max="3.0">Light</button>
        <button id="flooring-moderate-btn" class="rq-button" data-button-set="painting" type="button" onclick="toggleSingleButton(this, 'flooring-light-btn', 'flooring-moderate-btn', 'flooring-extensive-btn')" data-min="2" data-max="6.0">Moderate</button>
        <button id="flooring-extensive-btn" class="rq-button" data-button-set="painting" type="button" onclick="toggleSingleButton(this, 'flooring-light-btn', 'flooring-moderate-btn', 'flooring-extensive-btn')" data-min="3" data-max="9.0">Extensive</button>
    </div>
    <div id="flooring-text" class="button-text"></div>

    <div class="button-set">
        <p>CARPENTRY</p>
        <button id="carpentry-light-btn" class="rq-button" data-button-set="carpentry" type="button" onclick="toggleSingleButton(this, 'carpentry-light-btn', 'carpentry-moderate-btn', 'carpentry-extensive-btn')" data-min="1" data-max="3.0">Light</button>
        <button id="carpentry-moderate-btn" class="rq-button" data-button-set="carpentry" type="button" onclick="toggleSingleButton(this, 'carpentry-light-btn', 'carpentry-moderate-btn', 'carpentry-extensive-btn')" data-min="2" data-max="6.0">Moderate</button>
        <button id="carpentry-extensive-btn" class="rq-button" data-button-set="carpentry" type="button" onclick="toggleSingleButton(this, 'carpentry-light-btn', 'carpentry-moderate-btn', 'carpentry-extensive-btn')" data-min="3" data-max="9.0">Extensive</button>
    </div>
    <div id="carpentry-text" class="button-text"></div>

    <div class="button-set">
        <p>CEILING & PARTITION</p>
        <button id="ceiling-light-btn" class="rq-button" data-button-set="ceiling" type="button" onclick="toggleSingleButton(this, 'ceiling-light-btn', 'ceiling-moderate-btn', 'ceiling-extensive-btn')" data-min="1" data-max="3.0">Light</button>
        <button id="ceiling-moderate-btn" class="rq-button" data-button-set="ceiling" type="button" onclick="toggleSingleButton(this, 'ceiling-light-btn', 'ceiling-moderate-btn', 'ceiling-extensive-btn')" data-min="2" data-max="6.0">Moderate</button>
        <button id="ceiling-extensive-btn" class="rq-button" data-button-set="ceiling" type="button" onclick="toggleSingleButton(this, 'ceiling-light-btn', 'ceiling-moderate-btn', 'ceiling-extensive-btn')" data-min="3" data-max="9.0">Extensive</button>
    </div>
    <div id="ceiling-text" class="button-text"></div>

    <div class="button-set">
        <p>WALL & FLOOR TILING</p>
        <button id="tiling-light-btn" class="rq-button" data-button-set="floor" type="button" onclick="toggleSingleButton(this, 'tiling-light-btn', 'tiling-moderate-btn', 'tiling-extensive-btn')" data-min="1" data-max="3.0">Light</button>
        <button id="tiling-moderate-btn" class="rq-button" data-button-set="floor" type="button" onclick="toggleSingleButton(this, 'tiling-light-btn', 'tiling-moderate-btn', 'tiling-extensive-btn')" data-min="2" data-max="6.0">Moderate</button>
        <button id="tiling-extensive-btn" class="rq-button" data-button-set="floor" type="button" onclick="toggleSingleButton(this, 'tiling-light-btn', 'tiling-moderate-btn', 'tiling-extensive-btn')" data-min="3" data-max="9.0">Extensive</button>
    </div>
    <div id="tiling-text" class="button-text"></div>

    <div class="button-set">
        <p>PLUMBING</p>
        <button id="plumbing-light-btn" class="rq-button" data-button-set="plumbing" type="button" onclick="toggleSingleButton(this, 'plumbing-light-btn', 'plumbing-moderate-btn', 'plumbing-extensive-btn')" data-min="1" data-max="3.0">Light</button>
        <button id="plumbing-moderate-btn" class="rq-button" data-button-set="plumbing" type="button" onclick="toggleSingleButton(this,'plumbing-light-btn', 'plumbing-moderate-btn', 'plumbing-extensive-btn')" data-min="2" data-max="6.0">Moderate</button>
        <button id="plumbing-extensive-btn" class="rq-button" data-button-set="plumbing" type="button" onclick="toggleSingleButton(this,'plumbing-light-btn', 'plumbing-moderate-btn', 'plumbing-extensive-btn')" data-min="3" data-max="9.0">Extensive</button>
    </div>
    <div id="plumbing-text" class="button-text"></div>

    <div class="button-set">
        <p>ELECTRICAL</p>
        <button id="electrical-light-btn" class="rq-button" data-button-set="electrical" type="button" onclick="toggleSingleButton(this, 'electrical-light-btn', 'electrical-moderate-btn', 'electrical-extensive-btn')" data-min="1" data-max="3.0">Light</button>
        <button id="electrical-moderate-btn" class="rq-button" data-button-set="electrical" type="button" onclick="toggleSingleButton(this, 'electrical-light-btn', 'electrical-moderate-btn', 'electrical-extensive-btn')" data-min="2" data-max="6.0">Moderate</button>
        <button id="electrical-extensive-btn" class="rq-button" data-button-set="electrical" type="button" onclick="toggleSingleButton(this, 'electrical-light-btn', 'electrical-moderate-btn', 'electrical-extensive-btn')" data-min="3" data-max="9.0">Extensive</button>
    </div>
    <div id="electrical-text" class="button-text"></div>

    <div class="button-set">
        <p>CLEANING & POLISHING</p>
        <button id="cleaning-light-btn" class="rq-button" data-button-set="cleaning" type="button" onclick="toggleSingleButton(this, 'cleaning-light-btn', 'cleaning-moderate-btn', 'cleaning-extensive-btn')" data-min="1" data-max="3.0">Light</button>
        <button id="cleaning-moderate-btn" class="rq-button" data-button-set="cleaning" type="button" onclick="toggleSingleButton(this, 'cleaning-light-btn', 'cleaning-moderate-btn', 'cleaning-extensive-btn')" data-min="2" data-max="6.0"">Moderate</button>
        <button id="cleaning-extensive-btn" class="rq-button" data-button-set="cleaning" type="button" onclick="toggleSingleButton(this, 'cleaning-light-btn', 'cleaning-moderate-btn', 'cleaning-extensive-btn')" data-min="3" data-max="9.0">Extensive</button>
    </div>
    <div id="cleaning-text" class="button-text"></div>
    </div>
        <!--This code here only works in the same html/php page where goes to the Reviews Result page.-->
        <button id="btn-10q" class="rq-button" type="button" onclick="nextPage('pg6')">Next</button>
    </div>
    
    <div id="pg6" class="page">
        <div id="review-results-pg">
            <h2 id="review-header">Reviews Results</h2>
            <p id="est-reno-txt">Your estimated renovation cost is</p>
            <div id="rq-results">
                $<div id="rq-minResults">0.00</div>-<div id="rq-maxResults">0.00</div>
            </div>
            <div id="rq-links">
                <p id="text">Ready to start your project? <a href="https://renoku2.azharapp.com/contact-us/" class="highlight">BOOK YOUR APPOINTMENT NOW</a></p>
                <p id="text">Want to know what we can do? <a href="https://renoku2.azharapp.com/gallery/" class="highlight">CHECK OUR GALLERY OF WORKS</a></p>
            </div>
        </div>
        <!--This code here only works in the same html/php page where goes to the choosing page.-->
        <button class="rq-button" onclick="nextPage('pg1')">Next</button>
    </div>
    
    <script>
    function toggleSingleButton(button, ...otherButtons) {
    button.classList.toggle('active');
    otherButtons.forEach(btn => {
        const otherButton = document.getElementById(btn);
        if (otherButton !== button) {
            otherButton.classList.remove('active');
        }
    });
}

function toggleContainer(containerId, button) {
    const container = document.getElementById(containerId);
    const isDisplayed = container.style.display === 'block';
    container.style.display = isDisplayed ? 'none' : 'block';
    button.classList.toggle('active', !isDisplayed);
}
function nextPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

        document.getElementById('living-btn').addEventListener('click', function() {
            this.classList.toggle('active');
        });

        document.getElementById('kitchen-btn').addEventListener('click', function() {
            this.classList.toggle('active');
        });

        function toggleSingleButton(button, ...otherButtons) {
    // Toggle the active class on the clicked button
    button.classList.toggle('active');
    
    // Ensure only one button is active
    otherButtons.forEach(btn => {
        const otherButton = document.getElementById(btn);
        if (otherButton !== button) {
            otherButton.classList.remove('active');
        }
    });

    // Update the text display
    updateButtonText(button);
}

function updateButtonText(button) {
    const buttonId = button.id;
    const sectionId = buttonId.split('-')[0]; // Get the section prefix (e.g., 'hack', 'masonry')

    // Get the corresponding text element
    const textElement = document.getElementById(sectionId + '-text');
    
    // Define the button text descriptions
    const buttonText = {
        'hack': {
            'hack-light-btn': 'Minor modifications to walls or partitions, often for convenience, without major structural changes',
            'hack-moderate-btn': 'Removing or altering structural components like beams, requiring careful planning to maintain stability',
            'hack-extensive-btn': 'Major structural alterations, including removing load-bearing walls and extensive rewiring, impacting building integrity'
        },
        'masonry': {
            'masonry-light-btn': 'Post-hacking touch-up with minimal to no tiling',
            'masonry-moderate-btn': 'Construction of appliance, with post-hacking touch-up and tiling',
            'masonry-extensive-btn': 'Complete construction of appliance and/or cabinets, with post-hacking touch-up and tiling'
        },
        'carpentry': {
            'carpentry-light-btn': 'Simple renovation of furniture or structure',
            'carpentry-moderate-btn': 'Renovation of 2-3 furniture or structures',
            'carpentry-extensive-btn': 'Complex renovation of a variety of furniture or structures'
        },
        'ceiling': {
            'ceiling-light-btn': 'Simple renovation of ceilings, walls',
            'ceiling-moderate-btn': 'Renovation of partition beams, walls and ceiling',
            'ceiling-extensive-btn': 'Extensive renovation of partition beams, walls and ceiling'
        },
        'plumbing': {
            'plumbing-light-btn': 'Renovating one water fixture (pipes, taps, etc.)',
            'plumbing-moderate-btn': 'Renovating two-three water fixture (pipes, taps, etc.)',
            'plumbing-extensive-btn': 'Renovating various water fixture (pipes, taps, etc.), with pipe extension and concealment'
        },
        'electrical': {
            'electrical-light-btn': 'Install power outlets and plug points for one area',
            'electrical-moderate-btn': 'Install power outlets and plug points for various area',
            'electrical-extensive-btn': 'Install power outlets and plug points for the entire house'
        },
        'painting': {
            'painting-light-btn': 'Paint job for one room',
            'painting-moderate-btn': 'Paint job for two rooms',
            'painting-extensive-btn': 'Paint job for three or more rooms'
        },
        'cleaning': {
            'cleaning-light-btn': 'Standard post-renovation clean-up',
            'cleaning-moderate-btn': 'Additional post-renovation clean-up',
            'cleaning-extensive-btn': 'Comprehensive post-renovation clean-up'
        },
        'flooring': {
            'flooring-light-btn': 'Simple flooring installation',
            'flooring-moderate-btn': 'Installation of 2-3 types of flooring',
            'flooring-extensive-btn': 'Installation of various types of flooring'
        },
        'tiling': {
            'tiling-light-btn': 'Simple tiling job for one area',
            'tiling-moderate-btn': 'Tiling job for two areas',
            'tiling-extensive-btn': 'Tiling job for three or more areas'
        }
    };

    // Update the text content based on the button clicked
    if (textElement) {
        textElement.textContent = buttonText[sectionId][button.id] || '';
    }
}

jQuery(document).ready(function($) {
    // Attach click event handler to buttons with class 'rq-button'
    $('.rq-button').click(function() {
        const $this = $(this);
        toggleSingleButton(this, ...$this.siblings('button').map(function() { return this.id; }).get());
    });
});

//Start of counting code
function toggleSingleButton(button, ...otherButtonIds) {
    // Deselect other buttons
    otherButtonIds.forEach(id => {
        const otherButton = document.getElementById(id);
        if (otherButton.classList.contains('active')) {
            otherButton.classList.remove('active');
            otherButton.innerText = otherButton.getAttribute('data-button-set').charAt(0).toUpperCase() + otherButton.getAttribute('data-button-set').slice(1); // Reset text
        }
    });

    // Toggle the selected button
    if (button.classList.contains('active')) {
        button.classList.remove('active');
        button.innerText = button.getAttribute('data-button-set').charAt(0).toUpperCase() + button.getAttribute('data-button-set').slice(1); // Reset text
    } else {
        button.classList.add('active');
    }

    // Calculate and update results
    updateResults();
}

function updateResults() {
    let minSum = 0;
    let maxSum = 0;

    // Get all button sets
    const buttonSets = document.querySelectorAll('.button-set');

    buttonSets.forEach(set => {
        // Get active button in this set
        const activeButton = set.querySelector('.rq-button.active');
        if (activeButton) {
            minSum += parseFloat(activeButton.getAttribute('data-min'));
            maxSum += parseFloat(activeButton.getAttribute('data-max'));
        }
    });

    // Update result divs
    document.getElementById('rq-minResults').innerText = minSum.toFixed(2);
    document.getElementById('rq-maxResults').innerText = maxSum.toFixed(2);
}

// Initialize button text
document.querySelectorAll('.rq-button').forEach(button => {
    button.innerText = button.getAttribute('data-button-set').charAt(0).toUpperCase() + button.getAttribute('data-button-set').slice(1); // Set initial button text
});


//End of counting code

    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('rq_quotation', 'rq_quotation_shortcode');
?>