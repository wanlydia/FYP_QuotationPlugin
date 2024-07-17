jQuery(document).ready(function($) {
    var selectedValueSet1 = null;
    var selectedValueSet2 = null;

    // Text for each button
    var buttonText = {
        'set1-1': 'You clicked Button 1 from Set 1',
        'set1-2': 'You clicked Button 2 from Set 1',
        'set1-3': 'You clicked Button 3 from Set 1',
        'set2-1': 'You clicked Button A from Set 2',
        'set2-2': 'You clicked Button B from Set 2',
        'set2-3': 'You clicked Button C from Set 2'
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
