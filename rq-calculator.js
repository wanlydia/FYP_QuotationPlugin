jQuery(document).ready(function($) {
    // Variables to store the selected values from each set of buttons
    var selectedValueSet1 = null;
    var selectedValueSet2 = null;

    // Object to store text descriptions for each button
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

    // Function to handle button click events
    function handleButtonClick($button, setClass, textClass) {
        if ($button.hasClass('selected')) { // If the button is already selected
            $button.removeClass('selected'); // Remove the 'selected' class
            if (setClass === 'kitchen-set1' || setClass === 'living-set1') {
                selectedValueSet1 = null; // Reset the selected value for set1
            } else {
                selectedValueSet2 = null; // Reset the selected value for set2
            }
            $('#' + textClass).text(''); // Clear the text description
        } else { // If the button is not selected
            $('.rq-button.' + setClass).removeClass('selected'); // Deselect all other buttons in the set
            $button.addClass('selected'); // Add 'selected' class to the clicked button
            var selectedValue = $button.data('value'); // Get the data-value attribute
            if (setClass === 'kitchen-set1' || setClass === 'living-set1') {
                selectedValueSet1 = selectedValue; // Store the selected value for set1
            } else {
                selectedValueSet2 = selectedValue; // Store the selected value for set2
            }
            $('#' + textClass).text(buttonText[setClass + '-' + selectedValue]); // Display the corresponding text description
        }
    }

    // Event handler for clicking buttons in the first set (kitchen or living)
    $('.rq-button.kitchen-set1, .rq-button.living-set1').click(function() {
        handleButtonClick($(this), $(this).attr('class').split(' ')[1], $(this).closest('.button-set').next('.button-text').attr('id'));
    });

    // Event handler for clicking buttons in the second set (kitchen or living)
    $('.rq-button.kitchen-set2, .rq-button.living-set2').click(function() {
        handleButtonClick($(this), $(this).attr('class').split(' ')[1], $(this).closest('.button-set').next('.button-text').attr('id'));
    });

    // Function to handle the submit button click event
    function handleSubmit(buttonID, nextURL) {
        $(buttonID).click(function() {
            var inputValue = parseFloat($('#rq-input').val()); // Get the input value and convert it to a float
            if (isNaN(inputValue)) { // Check if the input is a valid number
                $('#rq-result').text('Please enter a valid number'); // Display an error message if not
                return; // Exit the function
            }

            var previousResult = parseFloat(localStorage.getItem(buttonID.split('-')[1] + 'Result')) || 0; // Get the previous result from localStorage

            if (selectedValueSet1 !== null || selectedValueSet2 !== null) { // Check if at least one button is selected
                var sum = (selectedValueSet1 || 0) + (selectedValueSet2 || 0); // Calculate the sum of the selected values
                var result = sum * inputValue + previousResult; // Calculate the new result
                localStorage.setItem(buttonID.split('-')[1] + 'Result', result); // Store the new result in localStorage
                if (nextURL) {
                    window.location.href = nextURL; // Redirect to the next URL if provided
                } else {
                    $('#rq-result').text('Result: $' + result); // Display the result if no URL is provided
                }
            } else {
                $('#rq-result').text('Please select at least one button'); // Display an error message if no button is selected
            }
        });
    }

    // Attach the submit handlers to the respective buttons
    handleSubmit('#rq-kitchen-submit', 'https://localhost/wp_fyptest/index.php/living-2/');
    handleSubmit('#rq-living-submit', 'http://localhost/wp_fyptest/index.php/bedroom/');
    handleSubmit('#rq-bedroom-submit', null);
});
