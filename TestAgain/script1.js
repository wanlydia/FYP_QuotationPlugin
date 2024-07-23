jQuery(document).ready(function($) {
    // Variables to store the selected values from each set of buttons
    var selectedValueSet1 = null;

    // Object to store text descriptions for each button
    var buttonText = {
        'hacking-1.0': 'Minor modifications to walls or partitions, often for convenience, without major structural changes',
        'hacking-2.0': 'Removing or altering structural components like beams, requiring careful planning to maintain stability',
        'hacking-3.0': 'Major structural alterations, including removing load-bearing walls and extensive rewiring, impacting building integrity'
    };

    $('.rq-button.hacking').click(function() {
        var $this = $(this); // Store the clicked button element
        var setClass = $(this).attr('class').split(' ')[1]; // Get the class of the clicked button set (kitchen-set1, living-set1, bedroom-set1)
        if ($this.hasClass('selected')) { // If the button is already selected
            $this.removeClass('selected'); // Remove the 'selected' class
            selectedValueSet1 = null; // Reset the selected value
            $('#' + setClass + '-text').text(''); // Clear the text description
        } else { // If the button is not selected
            $('.rq-button.' + setClass).removeClass('selected'); // Deselect all other buttons in the set
            $this.addClass('selected'); // Add 'selected' class to the clicked button
            selectedValueSet1 = $this.data('value'); // Store the selected value
            $('#' + setClass + '-text').text(buttonText[setClass + '-' + selectedValueSet1]); // Display the corresponding text description
        }
    });

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
            page.style.display = 'none';
        });
        const nextPage = document.getElementById(pageId);
        if (nextPage) {
            nextPage.style.display = 'block';
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const livingBtn = document.getElementById('living-btn');
        const kitchenBtn = document.getElementById('kitchen-btn');

        livingBtn.addEventListener('click', () => {
            livingBtn.classList.toggle('active');
            if (kitchenBtn.classList.contains('active')) {
                kitchenBtn.classList.remove('active');
            }
        });

        kitchenBtn.addEventListener('click', () => {
            kitchenBtn.classList.toggle('active');
            if (livingBtn.classList.contains('active')) {
                livingBtn.classList.remove('active');
            }
        });
    });
});