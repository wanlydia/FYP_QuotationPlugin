jQuery(document).ready(function($) {
    var selectedValues = {};
    var unitMultiplier = 1; // Default multiplier for "m²"
    var inputSize = 1; // Default size multiplier
    var quarterMultiplier = 1; // Default multiplier for quarter buttons
    var noOfRooms = 0; // New variable to count the number of selected rooms

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

    function handleButtonClick($this, setClass) {
        if ($this.hasClass('selected')) {
            $this.removeClass('selected');
            $('#' + setClass + '-text').text('');
            delete selectedValues[setClass];
        } else {
            $('.rq-button.' + setClass).removeClass('selected');
            $this.addClass('selected');
            const selectedValue = $this.text().toLowerCase(); // Use the button text to match the buttonText keys
            const minValue = parseFloat($this.data('min'));
            const maxValue = parseFloat($this.data('max'));
            selectedValues[setClass] = { min: minValue, max: maxValue };
            $('#' + setClass + '-text').text(buttonText[setClass + '-' + selectedValue]);
        }
        calculateTotals();
    }

    function calculateTotals() {
        let propertyStatusSelected = $('.button-propertyStatus .selected').length > 0;
        let propertyTypeSelected = $('.button-propertyType .selected').length > 0;
        let areaSelected = $('#living-btn.selected, #kitchen-btn.selected, #bathroom-btn.selected, #bedroom-btn.selected').length > 0;
        let areaUnitSelected = $('#metreSquared-btn').hasClass('selected') || $('#squareFoot-btn').hasClass('selected');
        let inputSizeValue = parseFloat($('#rq-inputSize').val());

        let bathroomInputRequired = $('#bathroom-btn').hasClass('selected') && !$('#bathrooms-box').val();
        let bedroomInputRequired = $('#bedroom-btn').hasClass('selected') && !$('#bedrooms-box').val();

        if (!propertyStatusSelected || !propertyTypeSelected || !areaSelected || !areaUnitSelected || isNaN(inputSizeValue) || bathroomInputRequired || bedroomInputRequired) {
            return false; // Validation failed
        } else {
            let totalMin = 0;
            let totalMax = 0;
            for (let key in selectedValues) {
                totalMin += selectedValues[key].min;
                totalMax += selectedValues[key].max;
            }
            totalMin *= unitMultiplier * inputSizeValue * quarterMultiplier * (noOfRooms - 1);
            totalMax *= unitMultiplier * inputSizeValue * quarterMultiplier * (noOfRooms - 1);
            $('#rq-minResults').text(totalMin.toFixed(2));
            $('#rq-maxResults').text(totalMax.toFixed(2));
            return { totalMin, totalMax }; // Return the totals
        }
    }

    function toggleContainer(containerId, button) {
        const $container = $('#' + containerId);
        const isDisplayed = $container.is(':visible');
        $container.toggle(!isDisplayed);
        $(button).toggleClass('active', !isDisplayed);
    }

    function handleButtonSelection() {
        const $this = $(this);
        const setClass = $this.attr('class').split(' ')[1];
        handleButtonClick($this, setClass);

        if ($this.hasClass('selected')) {
            noOfRooms++;
        } else {
            noOfRooms--;
        }

        calculateTotals();
    }

    $('.rq-button').click(handleButtonSelection);

    $('#bathroom-btn, #bedroom-btn').click(function() {
        const containerId = $(this).attr('id').replace('-btn', 's-container');
        toggleContainer(containerId, this);
    });

    $('#rq-submit').click(function() {
        const totals = calculateTotals();
        if (!totals) {
            alert('Please select all required options and fill out all necessary fields.');
            if ($('#bathroom-btn').hasClass('selected') && !$('#bathrooms-box').val()) {
                $('#bathrooms-box').addClass('required');
            } else {
                $('#bathrooms-box').removeClass('required');
            }
            if ($('#bedroom-btn').hasClass('selected') && !$('#bedrooms-box').val()) {
                $('#bedrooms-box').addClass('required');
            } else {
                $('#bedrooms-box').removeClass('required');
            }
            return;
        }
        const { totalMin, totalMax } = totals;
        const url = `http://localhost/wp_fyptest/index.php/results/?min=${totalMin}&max=${totalMax}`;
        window.location.href = url;
    });

    $('.button-propertyStatus button, .button-propertyType button').click(function() {
        $(this).addClass('selected').siblings().removeClass('selected');
        calculateTotals();
    });

    $('#metreSquared-btn').click(function() {
        $(this).addClass('selected');
        $('#squareFoot-btn').removeClass('selected');
        unitMultiplier = 1; // No change needed for m²
        calculateTotals();
    });

    $('#squareFoot-btn').click(function() {
        $(this).addClass('selected');
        $('#metreSquared-btn').removeClass('selected');
        unitMultiplier = 1.0764; // Conversion factor from m² to sq ft
        calculateTotals();
    });

    $('.button-container button').click(function() {
        const $this = $(this);
        if ($this.hasClass('selected')) {
            $this.removeClass('selected');
            noOfRooms--;
        } else {
            $this.addClass('selected');
            noOfRooms++;
        }
        calculateTotals();
    });

    $('#rq-inputSize').on('input', function() {
        inputSize = parseFloat($(this).val()) || 1; // Default to 1 if input is invalid
        calculateTotals();
    });

    $('#btn-1q').click(function() {
        $(this).addClass('selected');
        $('#btn-2q').removeClass('selected');
        quarterMultiplier = 1; // Multiplier for 1q
        calculateTotals();
    });

    $('#btn-2q').click(function() {
        $(this).addClass('selected');
        $('#btn-1q').removeClass('selected');
        quarterMultiplier = 2; // Multiplier for 2q
        calculateTotals();
    });

    $('#bathrooms-box, #bedrooms-box').on('input', function() {
        const id = $(this).attr('id');
        const value = parseInt($(this).val()) || 0; // Default to 0 if input is invalid
        if (id === 'bathrooms-box') {
            noOfRooms += (value - 1);
        } else if (id === 'bedrooms-box') {
            noOfRooms += (value - 1);
        }
        calculateTotals();
    });
});