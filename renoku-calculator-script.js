jQuery(document).ready(function($) {
    var selectedValueSet1 = null;
    var selectedValueSet2 = null;

    // Text for each button
    var buttonText = {
        'set1-10': 'Minor modifications to walls or partitions, often for convenience, without major structural changes',
        'set1-20': 'Removing or altering structural components like beams, requiring careful planning to maintain stability',
        'set1-30': 'Major structural alterations, including removing load-bearing walls and extensive rewiring, impacting building integrity',
        'set2-10': 'Dry-stacked stone wall supports, adding charm with minimal structural load and effortless maintenance',
        'set2-20': 'Brick walls with mortar joints, offering durability and moderate insulation for residential buildings',
        'set2-30': 'High-rise buildings with reinforced concrete and elaborate stone facades, ensuring strength and grandeur'
    };

    $('.bvd-button.set1').click(function() {
        var $this = $(this);
        if ($this.hasClass('selected')) {
            $this.removeClass('selected');
            selectedValueSet1 = null;
            $('#set1-text').text('');
        } else {
            $('.bvd-button.set1').removeClass('selected');
            $this.addClass('selected');
            selectedValueSet1 = $this.data('value');
            $('#set1-text').text(buttonText['set1-' + selectedValueSet1]);
        }
    });

    $('.bvd-button.set2').click(function() {
        var $this = $(this);
        if ($this.hasClass('selected')) {
            $this.removeClass('selected');
            selectedValueSet2 = null;
            $('#set2-text').text('');
        } else {
            $('.bvd-button.set2').removeClass('selected');
            $this.addClass('selected');
            selectedValueSet2 = $this.data('value');
            $('#set2-text').text(buttonText['set2-' + selectedValueSet2]);
        }
    });

    $('#bvd-submit').click(function() {
        var inputValue = parseFloat($('#bvd-input').val());
        if (isNaN(inputValue)) {
            $('#bvd-result').text('Please enter a valid number');
            return;
        }

        if (selectedValueSet1 !== null || selectedValueSet2 !== null) {
            var sum = (selectedValueSet1 || 0) + (selectedValueSet2 || 0);
            var result = sum * inputValue;
            $('#bvd-result').text('Result: ' + result);
        } else {
            $('#bvd-result').text('Please select at least one button');
        }
    });
});