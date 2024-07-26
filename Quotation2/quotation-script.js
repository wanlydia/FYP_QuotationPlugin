jQuery(document).ready(function($) {
    // Function to toggle the visibility of containers
    function toggleContainer(containerId, button) {
        const $container = $('#' + containerId);
        const isDisplayed = $container.is(':visible');
        $container.toggle(!isDisplayed);
        $(button).toggleClass('active', !isDisplayed);
    }

    // Attach click event handlers specifically for bathroom and bedroom buttons
    $('#bathroom-btn').click(function() {
        toggleContainer('bathrooms-container', this);
    });

    $('#bedroom-btn').click(function() {
        toggleContainer('bedrooms-container', this);
    });

    // Function to handle button clicks and manage button states
    function handleButtonSelection() {
        const $this = $(this);
        const setClass = $this.attr('class').split(' ')[1];
        handleButtonClick($this, setClass);
    }

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
            $('.common-btn.' + setClass).removeClass('selected');
            // Select the clicked button and display the corresponding text
            $this.addClass('selected');
            const selectedValue = $this.text().toLowerCase(); // Use the button text to match the buttonText keys
            const minValue = parseFloat($this.data('min'));
            const maxValue = parseFloat($this.data('max'));
            selectedValues[setClass] = { min: minValue, max: maxValue };
            $('#' + setClass + '-text').text(buttonText[setClass + '-' + minValue]);
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

    // Attach click event handlers
    $('.rq-button, .common-btn').click(handleButtonSelection);

    $('#living-btn, #kitchen-btn').click(function() {
        $(this).toggleClass('active').siblings().removeClass('active');
    });

    $('#living-btn').click(function() {
        $(this).toggleClass('active').siblings().removeClass('active');
        // Do not deselect others in this case
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
});
