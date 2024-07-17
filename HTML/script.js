document.addEventListener('DOMContentLoaded', function() {
    var Btns = [
        document.getElementById('btn-1q'),
        document.getElementById('btn-2q'),
        document.getElementById('btn-3q'),
        document.getElementById('btn-4q'),
        document.getElementById('btn-5q'),
        document.getElementById('btn-6q'),
        document.getElementById('btn-7q'),
        document.getElementById('btn-8q'),
        document.getElementById('btn-9q'),
        document.getElementById('btn-10q')
    ];

    Btns.forEach(function(btn, index) {
        btn.addEventListener('click', function() {
            if (index === 0) {
                Btns[1].classList.remove('toggled');
            } else if (index === 1) {
                Btns[0].classList.remove('toggled');
            } else if (index >= 2 && index <= 4) {
                [2, 3, 4].forEach(function(i) {
                    if (i !== index) Btns[i].classList.remove('toggled');
                });
            }
            btn.classList.toggle('toggled');
        });
    });

    var bedroomsBox = document.getElementById('bedrooms-box');
    var bathroomsBox = document.getElementById('bathrooms-box');

    bedroomsBox.addEventListener('input', function() {
        if (bedroomsBox.value < 0) {
            bedroomsBox.value = 0;
        }
    });

    bathroomsBox.addEventListener('input', function() {
        if (bathroomsBox.value < 0) {
            bathroomsBox.value = 0;
        }
    });
});