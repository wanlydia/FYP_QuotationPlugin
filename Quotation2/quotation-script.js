jQuery(document).ready(function($) {
    // Variables to store the selected values from each set of buttons
    var selectedValues = {};


    // Object to store text descriptions for each button
    // var buttonText = {
    //     'hacking-1.0': 'Minor modifications to walls or partitions, often for convenience, without major structural changes',
    //     'hacking-2.0': 'Removing or altering structural components like beams, requiring careful planning to maintain stability',
    //     'hacking-3.0': 'Major structural alterations, including removing load-bearing walls and extensive rewiring, impacting building integrity',
    //     'masonry-1.0': 'Post-hacking touch-up with minimal to no tiling',
    //     'masonry-2.0': 'Construction of appliance, with post-hacking touch-up and tiling',
    //     'masonry-3.0': 'Complete construction of appliance and/or cabinets, with post-hacking touch-up and tiling',
    //     'carpentry-1.0': 'Simple renovation of furniture or structure',
    //     'carpentry-2.0': 'Renovation of 2-3 furniture or structures',
    //     'carpentry-3.0': 'Complex renovation of a variety of furniture or structures',
    //     'ceiling-partition-1.0': 'Simple renovation of ceilings, walls',
    //     'ceiling-partition-2.0': 'Renovation of partition beams, walls and ceiling',
    //     'ceiling-partition-3.0': 'Extensive renovation of partition beams, walls and ceiling',
    //     'plumbing-1.0': 'Renovating one water fixture (pipes, taps, etc.)',
    //     'plumbing-2.0': 'Renovating two-three water fixture (pipes, taps, etc.)',
    //     'plumbing-3.0': 'Renovating various water fixture (pipes, taps, etc.), with pipe extension and concealment',
    //     'electrical-1.0': 'Install power outlets and plug points for one area',
    //     'electrical-2.0': 'Install power outlets and plug points for various area',
    //     'electrical-3.0': 'Install power outlets and plug points for the entire house',
    //     'painting-1.0': 'Paint job for one room',
    //     'painting-2.0': 'Paint job for two rooms',
    //     'painting-3.0': 'Paint job for three or more rooms',
    //     'cleaning-polishing-1.0': 'Standard post-renovation clean-up',
    //     'cleaning-polishing-2.0': 'Additional post-renovation clean-up',
    //     'cleaning-polishing-3.0': 'Comprehensive post-renovation clean-up'
    // };

    //Start-New
    function toggleSingleButton(button, ...otherIds) {
        button.classList.toggle('active');
        otherIds.forEach(id => {
            const otherButton = document.getElementById(id);
            if (otherButton && otherButton !== button) {
                otherButton.classList.remove('active');
            }
        });
    }
    //End-New

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


    // Function to toggle the visibility of containers
    function toggleContainer(containerId, button) {
        const $container = $('#' + containerId);
        const isDisplayed = $container.is(':visible');
        $container.toggle(!isDisplayed);
        $(button).toggleClass('active', !isDisplayed);
    }

//New
    // Function to toggle the visibility of containers
function toggleContainer(containerId, button) {
    const $container = $('#' + containerId);
    const isDisplayed = $container.is(':visible');
    $container.toggle(!isDisplayed);
    $(button).toggleClass('active', !isDisplayed);
}

// Attach click event handlers for bathroom-btn and bedroom-btn
$('#bathroom-btn').click(function() {
    $('#bathrooms-container').toggle();
    $(this).toggleClass('active');
});

$('#bedroom-btn').click(function() {
    $('#bedrooms-container').toggle();
    $(this).toggleClass('active');
});
//New
   
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

