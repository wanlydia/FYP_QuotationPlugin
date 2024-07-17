jQuery(document).ready(function($) {
    var selectedValueSet1 = null;
    var selectedValueSet2 = null;

    // Text for each button
    var buttonText = {
        // Kitchen texts
        'kitchen-set1-10': 'Minor modifications to walls or partitions, often for convenience, without major structural changes',
        'kitchen-set1-20': 'Removing or altering structural components like beams, requiring careful planning to maintain stability',
        'kitchen-set1-30': 'Major structural alterations, including removing load-bearing walls and extensive rewiring, impacting building integrity',
        'kitchen-set2-10': 'Dry-stacked stone wall supports, adding charm with minimal structural load and effortless maintenance',
        'kitchen-set2-20': 'Brick walls with mortar joints, offering durability and moderate insulation for residential buildings',
        'kitchen-set2-30': 'High-rise buildings with reinforced concrete and elaborate stone facades, ensuring strength and grandeur',
        // Living texts
        'living-set1-10': 'Basic painting, with a single coat of paint applied to the walls',
        'living-set1-20': 'Intermediate painting, including primer and two coats of paint',
        'living-set1-30': 'Advanced painting, including multiple coats, detailed work, and trim',
        'living-set2-10': 'Basic flooring installation, such as laminate or vinyl flooring',
        'living-set2-20': 'Intermediate flooring, including hardwood or engineered wood',
        'living-set2-30': 'Advanced flooring, including custom tile work and inlays'
    };

    // Kitchen button clicks
    $('.bvd-button.kitchen-set1').click(function() {
        var $this = $(this);
        if ($this.hasClass('selected')) {
            $this.removeClass('selected');
            selectedValueSet1 = null;
            $('#kitchen-set1-text').text('');
        } else {
            $('.bvd-button.kitchen-set1').removeClass('selected');
            $this.addClass('selected');
            selectedValueSet1 = $this.data('value');
            $('#kitchen-set1-text').text(buttonText['kitchen-set1-' + selectedValueSet1]);
        }
    });

    $('.bvd-button.kitchen-set2').click(function() {
        var $this = $(this);
        if ($this.hasClass('selected')) {
            $this.removeClass('selected');
            selectedValueSet2 = null;
            $('#kitchen-set2-text').text('');
        } else {
            $('.bvd-button.kitchen-set2').removeClass('selected');
            $this.addClass('selected');
            selectedValueSet2 = $this.data('value');
            $('#kitchen-set2-text').text(buttonText['kitchen-set2-' + selectedValueSet2]);
        }
    });

    // Living button clicks
    $('.bvd-button.living-set1').click(function() {
        var $this = $(this);
        if ($this.hasClass('selected')) {
            $this.removeClass('selected');
            selectedValueSet1 = null;
            $('#living-set1-text').text('');
        } else {
            $('.bvd-button.living-set1').removeClass('selected');
            $this.addClass('selected');
            selectedValueSet1 = $this.data('value');
            $('#living-set1-text').text(buttonText['living-set1-' + selectedValueSet1]);
        }
    });

    $('.bvd-button.living-set2').click(function() {
        var $this = $(this);
        if ($this.hasClass('selected')) {
            $this.removeClass('selected');
            selectedValueSet2 = null;
            $('#living-set2-text').text('');
        } else {
            $('.bvd-button.living-set2').removeClass('selected');
            $this.addClass('selected');
            selectedValueSet2 = $this.data('value');
            $('#living-set2-text').text(buttonText['living-set2-' + selectedValueSet2]);
        }
    });

    // Submit button click
    $('#bvd-submit').click(function() {
        var inputValue = parseFloat($('#bvd-input').val());
        if (isNaN(inputValue)) {
            $('#bvd-result').text('Please enter a valid number');
            return;
        }

        if (selectedValueSet1 !== null || selectedValueSet2 !== null) {
            var sum = (selectedValueSet1 || 0) + (selectedValueSet2 || 0);
            var result = sum * inputValue;
            $('#bvd-result').text('Result: $' + result);
            window.location.href = 'http://localhost/wp_fyptest/index.php/living-2/'; // Replace with actual URL
        } else {
            $('#bvd-result').text('Please select at least one button');
        }
    });
});
