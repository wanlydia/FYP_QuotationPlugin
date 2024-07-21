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
        'living-set2-30': 'Advanced flooring, including custom tile work and inlays',

        'bedroom-set1-10': 'Basic painting, with a single coat of paint applied to the walls',
        'bedroom-set1-20': 'Intermediate painting, including primer and two coats of paint',
        'bedroom-set1-30': 'Advanced painting, including multiple coats, detailed work, and trim',
        'bedroom-set2-10': 'Basic flooring installation, such as laminate or vinyl flooring',
        'bedroom-set2-20': 'Intermediate flooring, including hardwood or engineered wood',
        'bedroom-set2-30': 'Advanced flooring, including custom tile work and inlays'
    };

    // Display the livingResult immediately when the document is ready
    var kitchenResult = parseFloat(localStorage.getItem('kitchenResult')) || 0; // Retrieve the stored livingResult from localStorage
    $('#rq-result-living').text('Living Result: $' + kitchenResult); // Display the livingResult

    // Display the livingResult immediately when the document is ready
    var livingResult = parseFloat(localStorage.getItem('livingResult')) || 0; // Retrieve the stored livingResult from localStorage
    $('#rq-result-bedroom').text('Living Result: $' + livingResult); // Display the livingResult

    // Event handler for clicking buttons in the first set (kitchen, living, bedroom)
    $('.rq-button.kitchen-set1, .rq-button.living-set1, .rq-button.bedroom-set1').click(function() {
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

    // Event handler for clicking buttons in the second set (kitchen, living, bedroom)
    $('.rq-button.kitchen-set2, .rq-button.living-set2, .rq-button.bedroom-set2').click(function() {
        var $this = $(this); // Store the clicked button element
        var setClass = $(this).attr('class').split(' ')[1]; // Get the class of the clicked button set (kitchen-set2, living-set2, bedroom-set2)
        if ($this.hasClass('selected')) { // If the button is already selected
            $this.removeClass('selected'); // Remove the 'selected' class
            selectedValueSet2 = null; // Reset the selected value
            $('#' + setClass + '-text').text(''); // Clear the text description
        } else { // If the button is not selected
            $('.rq-button.' + setClass).removeClass('selected'); // Deselect all other buttons in the set
            $this.addClass('selected'); // Add 'selected' class to the clicked button
            selectedValueSet2 = $this.data('value'); // Store the selected value
            $('#' + setClass + '-text').text(buttonText[setClass + '-' + selectedValueSet2]); // Display the corresponding text description
        }
    });

    // Event handler for clicking the KITCHEN submit button
    $('#rq-kitchen-submit').click(function() {
        var inputValue = parseFloat($('#rq-input').val()); // Get the input value and convert it to a float
        if (isNaN(inputValue)) { // Check if the input is a valid number
            $('#rq-result').text('Please enter a valid number'); // Display an error message if not
            return; // Exit the function
        }

        if (selectedValueSet1 !== null || selectedValueSet2 !== null) { // Check if at least one button is selected
            var sum = (selectedValueSet1 || 0) + (selectedValueSet2 || 0); // Calculate the sum of the selected values
            var kitchenResult = sum * inputValue; // Calculate the result
            localStorage.setItem('kitchenResult', kitchenResult); // Store kitchenResult in localStorage
            window.location.href = 'https://localhost/wp_fyptest/index.php/living-2/'; // Redirect to the calc-living page (replace with actual URL)
        } else {
            $('#rq-result').text('Please select at least one button'); // Display an error message if no button is selected
        }
    });

    // Event handler for clicking the LIVING submit button
    $('#rq-living-submit').click(function() {
        var inputValue = parseFloat($('#rq-input').val()); // Get the input value and convert it to a float
        if (isNaN(inputValue)) { // Check if the input is a valid number
            $('#rq-result').text('Please enter a valid number'); // Display an error message if not
            return; // Exit the function
        }

        var kitchenResult = parseFloat(localStorage.getItem('kitchenResult')) || 0; // Retrieve the stored kitchenResult from localStorage

        if (selectedValueSet1 !== null || selectedValueSet2 !== null) { // Check if at least one button is selected
            var sum = (selectedValueSet1 || 0) + (selectedValueSet2 || 0); // Calculate the sum of the selected values
            var livingResult = sum * inputValue + kitchenResult; // Calculate the result by adding kitchenResult
            localStorage.setItem('livingResult', livingResult); // Store livingResult in localStorage
            window.location.href = 'http://localhost/wp_fyptest/index.php/bedroom/'; // Redirect to the calc-bedroom page (replace with actual URL)
        } else {
            $('#rq-result').text('Please select at least one button'); // Display an error message if no button is selected
        }
    });

    // Event handler for clicking the BEDROOM submit button
    $('#rq-bedroom-submit').click(function() {
        var inputValue = parseFloat($('#rq-input').val()); // Get the input value and convert it to a float
        if (isNaN(inputValue)) { // Check if the input is a valid number
            $('#rq-result').text('Please enter a valid number'); // Display an error message if not
            return; // Exit the function
        }

        var livingResult = parseFloat(localStorage.getItem('livingResult')) || 0; // Retrieve the stored livingResult from localStorage

        if (selectedValueSet1 !== null || selectedValueSet2 !== null) { // Check if at least one button is selected
            var sum = (selectedValueSet1 || 0) + (selectedValueSet2 || 0); // Calculate the sum of the selected values
            var bedroomResult = sum * inputValue + livingResult; // Calculate the result by adding livingResult
            localStorage.setItem('bedroomResult', bedroomResult);
            $('#rq-result').text('Result: $' + bedroomResult); // Display the result
        } else {
            $('#rq-result').text('Please select at least one button'); // Display an error message if no button is selected
        }
    });
});
