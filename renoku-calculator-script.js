jQuery(document).ready(function($) {
    // Variable to store the selected value from the each set of buttons
    var selectedValueSet1 = null; 
    var selectedValueSet2 = null;

    var buttonText = {
        'kitchen-set1-10': 'Minor modifications to walls or partitions, often for convenience, without major structural changes',
        'kitchen-set1-20': 'Removing or altering structural components like beams, requiring careful planning to maintain stability',
        'kitchen-set1-30': 'Major structural alterations, including removing load-bearing walls and extensive rewiring, impacting building integrity',
        'kitchen-set2-10': 'Dry-stacked stone wall supports, adding charm with minimal structural load and effortless maintenance',
        'kitchen-set2-20': 'Brick walls with mortar joints, offering durability and moderate insulation for residential buildings',
        'kitchen-set2-30': 'High-rise buildings with reinforced concrete and elaborate stone facades, ensuring strength and grandeur',

        'living-set1-10': 'Basic painting, with a single coat of paint applied to the walls',
        'living-set1-20': 'Intermediate painting, including primer and two coats of paint',
        'living-set1-30': 'Advanced painting, including multiple coats, detailed work, and trim',
        'living-set2-10': 'Basic flooring installation, such as laminate or vinyl flooring',
        'living-set2-20': 'Intermediate flooring, including hardwood or engineered wood',
        'living-set2-30': 'Advanced flooring, including custom tile work and inlays'
    };

    // Event handler for clicking buttons in the first set (kitchen)
    $('.rq-button.kitchen-set1').click(function() {
        var $this = $(this); // Store the clicked button element
        if ($this.hasClass('selected')) { // If the button is already selected
            $this.removeClass('selected'); // Remove the previously 'selected' class
            selectedValueSet1 = null; // Reset the selected value
            $('#kitchen-set1-text').text(''); // Clear the text description
        } else { // If the button is not selected
            $('.rq-button.kitchen-set1').removeClass('selected'); // Deselect all other buttons in the set
            $this.addClass('selected'); // Add 'selected' class to the clicked button
            selectedValueSet1 = $this.data('value'); // Store the selected value
            $('#kitchen-set1-text').text(buttonText['kitchen-set1-' + selectedValueSet1]); // Display the corresponding text description
        }
    });

    $('.rq-button.kitchen-set2').click(function() {
        var $this = $(this); 
        if ($this.hasClass('selected')) {
            $this.removeClass('selected'); 
            selectedValueSet2 = null; 
            $('#kitchen-set2-text').text(''); 
        } else { 
            $('.rq-button.kitchen-set2').removeClass('selected'); 
            $this.addClass('selected'); 
            selectedValueSet2 = $this.data('value'); 
            $('#kitchen-set2-text').text(buttonText['kitchen-set2-' + selectedValueSet2]);
        }
    });

    $('.rq-button.living-set1').click(function() {
        var $this = $(this); 
        if ($this.hasClass('selected')) { 
            $this.removeClass('selected');
            selectedValueSet1 = null;
            $('#living-set1-text').text(''); 
        } else {
            $('.rq-button.living-set1').removeClass('selected'); 
            $this.addClass('selected');
            selectedValueSet1 = $this.data('value'); 
            $('#living-set1-text').text(buttonText['living-set1-' + selectedValueSet1]);
        }
    });

    $('.rq-button.living-set2').click(function() {
        var $this = $(this);
        if ($this.hasClass('selected')) {
            $this.removeClass('selected');
            selectedValueSet2 = null;
            $('#living-set2-text').text('');
        } else {
            $('.rq-button.living-set2').removeClass('selected');
            $this.addClass('selected');
            selectedValueSet2 = $this.data('value');
            $('#living-set2-text').text(buttonText['living-set2-' + selectedValueSet2]);
        }
    });

    // Event handler for clicking the submit button
    $('#rq-submit').click(function() {
        var inputValue = parseFloat($('#rq-input').val()); // Get the input value and convert it to a float
        if (isNaN(inputValue)) { // Check if the input is a valid number
            $('#rq-result').text('Please enter a valid number'); // Display an error message if not
            return; // Exit the function
        }

        if (selectedValueSet1 !== null || selectedValueSet2 !== null) { // Check if at least one button is selected
            var sum = (selectedValueSet1 || 0) + (selectedValueSet2 || 0); // Calculate the sum of the selected values
            var result = sum * inputValue; // Calculate the result
            $('#rq-result').text('Result: $' + result); // Display the result
            window.location.href = 'URL_TO_CALC_LIVING_PAGE'; // Redirect to the calc-living page (replace with actual URL)
        } else {
            $('#rq-result').text('Please select at least one button'); // Display an error message if no button is selected
        }
    });
});
