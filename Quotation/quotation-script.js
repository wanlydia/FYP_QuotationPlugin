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
        // Clear previous error messages and scroll positions
        $('html, body').stop(true, true);

        // Validate that all required selections and inputs are present
        const propertyStatusSelected = $('.button-propertyStatus .selected').length > 0;
        const propertyTypeSelected = $('.button-propertyType .selected').length > 0;
        const areaSelected = $('#living-btn.active, #kitchen-btn.active, #bathroom-btn.active, #bedroom-btn.active').length > 0;
        const inputSize = parseFloat($('#rq-inputSize').val());
        const areaUnitSelected = $('#metreSquared-btn').hasClass('selected') || $('#squareFoot-btn').hasClass('selected');

        if (!propertyStatusSelected) {
            $('html, body').animate({ scrollTop: $('.rq-propertyStatus').offset().top }, 1000);
            return;
        }

        if (!propertyTypeSelected) {
            $('html, body').animate({ scrollTop: $('.rq-propertyType').offset().top }, 1000);
            return;
        }

        if (!areaSelected) {
            $('html, body').animate({ scrollTop: $('.rq-rooms').offset().top }, 1000);
            return;
        }

        if (!areaUnitSelected) {
            $('html, body').animate({ scrollTop: $('#rq-size').offset().top }, 1000);
            return;
        }

        if (isNaN(inputSize) || inputSize <= 0) {
            $('html, body').animate({ scrollTop: $('#rq-size').offset().top }, 1000);
            return;
        }

        let totalMin = 0;
        let totalMax = 0;
        for (let key in selectedValues) {
            totalMin += selectedValues[key].min;
            totalMax += selectedValues[key].max;
        }

        // Check the selected area unit and adjust totals accordingly
        if ($('#squareFoot-btn').hasClass('selected')) {
            totalMin *= 10.7;
            totalMax *= 10.7;
        }

        // Multiply totals by the input size
        totalMin *= inputSize;
        totalMax *= inputSize;

        $('#rq-minResults').text(totalMin.toFixed(2));
        $('#rq-maxResults').text(totalMax.toFixed(2));
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
    $('.rq-button').click(handleButtonSelection);

    $('#living-btn, #kitchen-btn').click(function() {
        $(this).toggleClass('active').siblings().removeClass('active');
        // Ensure only one button in this set can be active
    });

    $('#bathroom-btn, #bedroom-btn').click(function() {
        const containerId = $(this).attr('id').replace('-btn', 's-container');
        toggleContainer(containerId, this);
    });

    $('#rq-submit').click(function() {
        const totals = calculateTotals();
        if (!totals) return; // Prevent submission if validation fails
        const { totalMin, totalMax } = totals;
        const url = `https://renoku2.azharapp.com/1677-2/?min=${totalMin}&max=${totalMax}`;
        window.location.href = url;
    });

    // Ensure only one button in each set (property status and property type) is selected
    $('.button-propertyStatus button, .button-propertyType button').click(function() {
        $(this).addClass('selected').siblings().removeClass('selected');
        calculateTotals(); // Recalculate totals if needed
    });

    // Ensure only one button in each set (area unit) is selected
    $('#metreSquared-btn').click(function() {
        $(this).addClass('selected');
        $('#squareFoot-btn').removeClass('selected');
        calculateTotals(); // Recalculate totals based on the new unit
    });

    $('#squareFoot-btn').click(function() {
        $(this).addClass('selected');
        $('#metreSquared-btn').removeClass('selected');
        calculateTotals(); // Recalculate totals based on the new unit
    });

    // Ensure that buttons in button-container can also be selected/deselected
    $('.button-container button').click(function() {
        const $this = $(this);
        if ($this.hasClass('selected')) {
            $this.removeClass('selected');
            delete selectedValues[$this.data('type')];
        } else {
            $this.addClass('selected');
            selectedValues[$this.data('type')] = {
                min: parseFloat($this.data('min')),
                max: parseFloat($this.data('max'))
            };
        }
        calculateTotals(); // Recalculate totals based on the selected buttons
    });
});