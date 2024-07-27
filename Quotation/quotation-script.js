jQuery(document).ready(function($) {
    // Variables to store the selected values from each set of buttons
    var selectedValues = {};

    // Object to store text descriptions for each button
    var buttonText = {
        'hacking-light': 'Minor modifications to walls or partitions, often for convenience, without major structural changes',
        'hacking-moderate': 'Removing or altering structural components like beams, requiring careful planning to maintain stability',
        'hacking-extensive': 'Major structural alterations, including removing load-bearing walls and extensive rewiring, impacting building integrity',
        'masonry-light': 'Post-hacking touch-up with minimal to no tiling',
        'masonry-moderate': 'Construction of appliance, with post-hacking touch-up and tiling',
        'masonry-extensive': 'Complete construction of appliance and/or cabinets, with post-hacking touch-up and tiling',
        'carpentry-light': 'Simple renovation of furniture or structure',
        'carpentry-moderate': 'Renovation of 2-3 furniture or structures',
        'carpentry-extensive': 'Complex renovation of a variety of furniture or structures',
        'ceiling-partition-light': 'Simple renovation of ceilings, walls',
        'ceiling-partition-moderate': 'Renovation of partition beams, walls and ceiling',
        'ceiling-partition-extensive': 'Extensive renovation of partition beams, walls and ceiling',
        'plumbing-light': 'Renovating one water fixture (pipes, taps, etc.)',
        'plumbing-moderate': 'Renovating two-three water fixture (pipes, taps, etc.)',
        'plumbing-extensive': 'Renovating various water fixture (pipes, taps, etc.), with pipe extension and concealment',
        'electrical-light': 'Install power outlets and plug points for one area',
        'electrical-moderate': 'Install power outlets and plug points for various area',
        'electrical-extensive': 'Install power outlets and plug points for the entire house',
        'painting-light': 'Paint job for one room',
        'painting-moderate': 'Paint job for two rooms',
        'painting-extensive': 'Paint job for three or more rooms',
        'cleaning-polishing-light': 'Standard post-renovation clean-up',
        'cleaning-polishing-moderate': 'Additional post-renovation clean-up',
        'cleaning-polishing-extensive': 'Comprehensive post-renovation clean-up'
    };

    // Function to handle button click events
    function handleButtonClick($this, setClass) {
        if ($this.hasClass('selected')) {
            // If the button is already selected, deselect it and clear the text
            $this.removeClass('selected');
            $('#' + setClass + '-text').text(''); // Clear the text
            delete selectedValues[setClass];
        } else {
            // Deselect any other selected button in the same set
            $('.rq-button.' + setClass).removeClass('selected');
            // Select the clicked button and display the corresponding text
            $this.addClass('selected');
            const value = $this.data('value');
            const minValue = parseFloat($this.data('min'));
            const maxValue = parseFloat($this.data('max'));
            selectedValues[setClass] = { value: value, min: minValue, max: maxValue };
            $('#' + setClass + '-text').text(buttonText[setClass + '-' + value] || ''); // Display the text
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

        return { totalMin, totalMax };
    }

    // Function to toggle the visibility of containers
    function toggleContainer(containerId, button) {
        const $container = $('#' + containerId);
        const isDisplayed = $container.is(':visible');
        $container.toggle(!isDisplayed);
        $(button).toggleClass('active', !isDisplayed);
    }

    // Function to handle button clicks and manage button states
    function handleButtonSelection() {
        const $this = $(this);
        const setClass = $this.attr('class').split(' ')[1];
        handleButtonClick($this, setClass);
    }

    // Attach click event handlers
    $('.rq-button, .common-btn').click(handleButtonSelection);

    $('#living-btn, #kitchen-btn').click(function() {
        $(this).toggleClass('active').siblings().removeClass('active');
    });

    $('#living-btn').click(function() {
        $(this).toggleClass('active').siblings().removeClass('active');
        // Do not deselect others in this case
    });

    $('#bathroom-btn, #bedroom-btn').click(function() {
        const containerId = $(this).attr('id').replace('-btn', 's-container');
        toggleContainer(containerId, this);
    });

    $('#rq-submit').click(function() {
        const totals = calculateTotals();
        const { totalMin, totalMax } = totals;
        const url = `https://renoku2.azharapp.com/1677-2/?min=${totalMin}&max=${totalMax}`;
        window.location.href = url;
    });

    // Ensure only one button in each set (property status and property type) is selected
    $('.button-propertyStatus button').click(function() {
        $(this).toggleClass('selected');
        $(this).siblings().removeClass('selected');
        calculateTotals(); // Recalculate totals if needed
    });

    $('.button-propertyType button').click(function() {
        $(this).toggleClass('selected');
        $(this).siblings().removeClass('selected');
        calculateTotals(); // Recalculate totals if needed
    });

    // Ensure only one button in each set (area unit) is selected
    $('#metreSquared-btn').click(function() {
        $(this).addClass('selected');
        $('#squareFoot-btn').removeClass('selected');
    });

    $('#squareFoot-btn').click(function() {
        $(this).addClass('selected');
        $('#metreSquared-btn').removeClass('selected');
    });
});
