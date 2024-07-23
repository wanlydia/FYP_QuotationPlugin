jQuery(document).ready(function($) {
    // Variables to store the selected values from each set of buttons
    var selectedValueSet1 = null;

    // Object to store text descriptions for each button
    var buttonText = {
        'hacking-1.0': 'Minor modifications to walls or partitions, often for convenience, without major structural changes',
        'hacking-2.0': 'Removing or altering structural components like beams, requiring careful planning to maintain stability',
        'hacking-3.0': 'Major structural alterations, including removing load-bearing walls and extensive rewiring, impacting building integrity',
        'masonry-1.0': 'Post-hacking touch-up with minimal to no tiling',
        'masonry-2.0': 'Construction of appliance, with post-hacking touch-up and tiling',
        'masonry-3.0': 'Complete construction of appliance and/or cabinets, with post-hacking touch-up and tiling',
        'carpentry-1.0': 'Simple renovation of furniture or structure',
        'carpentry-2.0': 'Renovation of 2-3 furniture or structures',
        'carpentry-3.0': 'Complex renovation of a variety of furniture or structures',
        'ceiling-partition-1.0': 'Simple renovation of ceilings, walls',
        'ceiling-partition-2.0': 'Renovation of partition beams, walls and ceiling',
        'ceiling-partition-3.0': 'Extensive renovation of partition beams, walls and ceiling',
        'plumbing-1.0': 'Renovating one water fixture (pipes, taps, etc.)',
        'plumbing-2.0': 'Renovating two-three water fixture (pipes, taps, etc.)',
        'plumbing-3.0': 'Renovating various water fixture (pipes, taps, etc.), with pipe extension and concealment',
        'electrical-1.0': 'Install power outlets and plug points for one area',
        'electrical-2.0': 'Install power outlets and plug points for various area',
        'electrical-3.0': 'Install power outlets and plug points for the entire house',
        'painting-1.0': 'Paint job for one room',
        'painting-2.0': 'Paint job for two rooms',
        'painting-3.0': 'Paint job for three or more rooms',
        'cleaning-polishing-1.0': 'Standard post-renovation clean-up',
        'cleaning-polishing-2.0': 'Additional post-renovation clean-up',
        'cleaning-polishing-3.0': 'Comprehensive post-renovation clean-up'
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

    $('.rq-button.masonry').click(function() {
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

    $('.rq-button.carpentry').click(function() {
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

    $('.rq-button.ceiling-partition').click(function() {
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

    $('.rq-button.plumbing').click(function() {
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

    $('.rq-button.electrical').click(function() {
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

    $('.rq-button.painting').click(function() {
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

    $('.rq-button.cleaning-polishing').click(function() {
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