jQuery(document).ready(function($) {
    // Variables to store the selected values from each set of buttons
    var selectedValues = {};
    var unitMultiplier = 1; // Default multiplier for "m²"
    var inputSize = 1; // Default size multiplier
    var quarterMultiplier = 1; // Default multiplier for quarter buttons
    var noOfRooms = 0; // New variable to count the number of selected rooms


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
            $('#' + setClass + '-text').text('');
            delete selectedValues[setClass];
        } else {
            // Deselect any other selected button in the same set
            $('.rq-button.' + setClass).removeClass('selected');
            // Select the clicked button and display the corresponding text
            $this.addClass('selected');
            const selectedValue = $this.text().toLowerCase(); // Use the button text to match the buttonText keys
            const minValue = parseFloat($this.data('min'));
            const maxValue = parseFloat($this.data('max'));
            selectedValues[setClass] = { min: minValue, max: maxValue };
            $('#' + setClass + '-text').text(buttonText[setClass + '-' + selectedValue]);
        }
        // Calculate the total min and max values
        calculateTotals();
    }

    // Function to calculate totals and update the results
    function calculateTotals() {
        let totalMin = 0;
        let totalMax = 0;
        for (let key in selectedValues) {
            totalMin += selectedValues[key].min;
            totalMax += selectedValues[key].max;
        }
        totalMin *= unitMultiplier * inputSize * quarterMultiplier * (noOfRooms - 1);
        totalMax *= unitMultiplier * inputSize * quarterMultiplier * (noOfRooms - 1)
        $('#rq-maxResults').text(totalMax);
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

        // Update noOfRooms based on button selection
        if ($this.hasClass('selected')) {
            noOfRooms++;
        } else {
            noOfRooms--;
        }

        calculateTotals(); // Recalculate totals based on the updated noOfRooms
    }

    // Attach click event handlers
    $('.rq-button').click(handleButtonSelection);

    $('#bathroom-btn, #bedroom-btn').click(function() {
        const containerId = $(this).attr('id').replace('-btn', 's-container');
        toggleContainer(containerId, this);
    });

    $('#rq-submit').click(function() {
        const totals = calculateTotals();
        const { totalMin, totalMax } = totals;
        const url = `http://localhost/wp_fyptest/index.php/results/?min=${totalMin}&max=${totalMax}`;
        window.location.href = url;
    });

    // Ensure only one button in each set (property status and property type) is selected
    $('.button-propertyStatus button, .button-propertyType button').click(function() {
        $(this).addClass('selected').siblings().removeClass('selected');
        calculateTotals(); // Recalculate totals if needed
    });

    // Ensure only one button in each set (area unit) is selected and set multiplier
    $('#metreSquared-btn').click(function() {
        $(this).addClass('selected');
        $('#squareFoot-btn').removeClass('selected');
        unitMultiplier = 1; // No change needed for m²
        calculateTotals(); // Recalculate totals with the new multiplier
    });

    $('#squareFoot-btn').click(function() {
        $(this).addClass('selected');
        $('#metreSquared-btn').removeClass('selected');
        unitMultiplier = 1.0764; // Conversion factor from m² to sq ft
        calculateTotals(); // Recalculate totals with the new multiplier
    });

    // Ensure that buttons in button-container can also be selected/deselected
    $('.button-container button').click(function() {
        const $this = $(this);
        if ($this.hasClass('selected')) {
            $this.removeClass('selected');
            noOfRooms--;
        } else {
            $this.addClass('selected');
            noOfRooms++;
        }
        calculateTotals(); // Recalculate totals based on the selected buttons
    });

    // Update inputSize and recalculate totals when input size changes
    $('#rq-inputSize').on('input', function() {
        inputSize = parseFloat($(this).val()) || 1; // Default to 1 if input is invalid
        calculateTotals(); // Recalculate totals based on the new input size
    });

    // Update quarterMultiplier and recalculate totals when quarter buttons are clicked
    $('#btn-1q').click(function() {
        $(this).addClass('selected');
        $('#btn-2q').removeClass('selected');
        quarterMultiplier = 1; // Multiplier for 1q
        calculateTotals(); // Recalculate totals with the new quarter multiplier
    });

    $('#btn-2q').click(function() {
        $(this).addClass('selected');
        $('#btn-1q').removeClass('selected');
        quarterMultiplier = 2; // Multiplier for 2q
        calculateTotals(); // Recalculate totals with the new quarter multiplier
    });

    // Handle input changes in bathrooms-box and bedrooms-box
    $('#bathrooms-box, #bedrooms-box').on('input', function() {
        const value = parseInt($(this).val()) || 0;
        noOfRooms += (value - 1); // Add the value minus 1 to noOfRooms
        calculateTotals(); // Recalculate totals based on the updated noOfRooms
    });
});