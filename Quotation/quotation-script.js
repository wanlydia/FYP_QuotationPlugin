jQuery(document).ready(function($) {
    // Variables to store the selected values from each set of buttons
    var selectedValues = {};

    // Object to store text descriptions for each button
    var buttonText = {
        'hacking-1': 'Minor modifications to walls or partitions, often for convenience, without major structural changes',
        'hacking-2': 'Removing or altering structural components like beams, requiring careful planning to maintain stability',
        'hacking-3': 'Major structural alterations, including removing load-bearing walls and extensive rewiring, impacting building integrity',
        'masonry-1': 'Post-hacking touch-up with minimal to no tiling',
        'masonry-2': 'Construction of appliance, with post-hacking touch-up and tiling',
        'masonry-3': 'Complete construction of appliance and/or cabinets, with post-hacking touch-up and tiling',
        'carpentry-1': 'Simple renovation of furniture or structure',
        'carpentry-2': 'Renovation of 2-3 furniture or structures',
        'carpentry-3': 'Complex renovation of a variety of furniture or structures',
        'ceiling-partition-1': 'Simple renovation of ceilings, walls',
        'ceiling-partition-2': 'Renovation of partition beams, walls and ceiling',
        'ceiling-partition-3': 'Extensive renovation of partition beams, walls and ceiling',
        'plumbing-1': 'Renovating one water fixture (pipes, taps, etc.)',
        'plumbing-2': 'Renovating two-three water fixture (pipes, taps, etc.)',
        'plumbing-3': 'Renovating various water fixture (pipes, taps, etc.), with pipe extension and concealment',
        'electrical-1': 'Install power outlets and plug points for one area',
        'electrical-2': 'Install power outlets and plug points for various area',
        'electrical-3': 'Install power outlets and plug points for the entire house',
        'painting-1': 'Paint job for one room',
        'painting-2': 'Paint job for two rooms',
        'painting-3': 'Paint job for three or more rooms',
        'cleaning-polishing-1': 'Standard post-renovation clean-up',
        'cleaning-polishing-2': 'Additional post-renovation clean-up',
        'cleaning-polishing-3': 'Comprehensive post-renovation clean-up'
    };

    // Function to handle button click events
    function handleButtonClick($this, setClass) {
        if ($this.hasClass('selected')) {
            // If the button is already selected, deselect it and clear the text
            $this.removeClass('selected');
            $('#' + setClass + '-text').text('');
            delete selectedValues[setClass];
        } else {
            // Deselect any other selected button in the same set
            $('.rq-button.' + setClass).removeClass('selected');
            // Select the clicked button and display the corresponding text
            $this.addClass('selected');
            const selectedValue = $this.data('value');
            const minValue = parseFloat($this.data('min'));
            const maxValue = parseFloat($this.data('max'));
            selectedValues[setClass] = { min: minValue, max: maxValue };
            $('#' + setClass + '-text').text(buttonText[setClass + '-' + selectedValue]);
        }

        // Calculate the total min and max values
        calculateTotals();
    }

    // Function to calculate the total min and max values
    function calculateTotals() {
        let totalMin = 0;
        let totalMax = 0;

        for (const key in selectedValues) {
            totalMin += selectedValues[key].min;
            totalMax += selectedValues[key].max;
        }

        $('#rq-minResults').text(totalMin.toFixed(1));
        $('#rq-maxResults').text(totalMax.toFixed(1));
    }

    // Attach click event handler to buttons with class 'rq-button'
    $('.rq-button').click(function() {
        const $this = $(this);
        const setClass = $this.attr('class').split(' ')[1];
        handleButtonClick($this, setClass);
    });

    // Function to toggle the active state of a single button and deactivate others
    window.toggleSingleButton = function(button, ...otherButtons) {
        $(button).toggleClass('active');
        otherButtons.forEach(btn => $('#' + btn).removeClass('active'));
    }

    // Function to toggle visibility of containers (bathroom, bedroom) and button state
    window.toggleContainer = function(containerId, button) {
        const $container = $('#' + containerId);
        const isDisplayed = $container.is(':visible');
        $container.toggle(!isDisplayed);
        $(button).toggleClass('active', !isDisplayed);
    }

    // Function to navigate to the next page
    window.nextPage = function(pageId) {
        $('.page').hide();
        $('#' + pageId).show();
    }

    // Attach click event handlers to living and kitchen buttons
    $('#living-btn, #kitchen-btn').click(function() {
        $(this).toggleClass('active').siblings().removeClass('active');
    });
});