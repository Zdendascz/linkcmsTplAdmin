function updateUrlParamsAndShowAlert(elementId) {
    var currentUrl = new URL(window.location.href);
    var status = currentUrl.searchParams.get('status');
    var message = currentUrl.searchParams.get('message');

    // Odstranění parametrů 'status' a 'message' z URL
    currentUrl.searchParams.delete('status');
    currentUrl.searchParams.delete('message');
    window.history.pushState({}, '', currentUrl.href);

    // Pokud status nebo message neexistují, neuděláme nic
    if (!status || !message) return;

    // Příprava obsahu a tříd podle status
    var alertClass, alertTitle, delay;
    if (status === 'success' || status === 'true') {
        alertClass = 'alert alert-custom alert-indicator-top indicator-success';
        alertTitle = 'Povedlo se!';
        delay = 2000; // zmizí po 2 sekundách
    } else if (status === 'error' || status === 'false') {
        alertClass = 'alert alert-custom alert-indicator-left indicator-danger';
        alertTitle = 'Chybička se vloudila!';
        delay = 4000; // zmizí po 3 sekundách
    } else {
        return; // Neznámý status
    }

    // Získání elementu
    var element = document.getElementById(elementId);
    if (element) {
        var alertContent = '<div class="' + alertClass + '">' +
                            '<div class="alert-content">' +
                            '<span class="alert-title">' + alertTitle + '</span>' +
                            '<span class="alert-text">' + decodeURIComponent(message) + '</span>' +
                            '</div></div>';

        // Vložení alertu jako prvního potomka elementu
        element.insertAdjacentHTML('afterbegin', alertContent);

        // Odstranění alertu po určitém čase
        setTimeout(function() {
            var alertElement = element.querySelector('.' + alertClass.replace(/ /g, '.'));
            if (alertElement) {
                alertElement.remove();
            }
        }, delay);
    }
}

/**** funkce označí formulářové prvky */
function validateFormFields(form) {
    Array.from(form.elements).forEach(function(element) {
        if (element.hasAttribute('required')) {
            const label = form.querySelector(`label[for="${element.id}"]`);
            if (label) {
                label.classList.add('required-label');
            }

            if (element.value.trim() !== '') {
                element.classList.remove('invalid-field');
                element.classList.add('valid-field');
            } else {
                element.classList.remove('valid-field');
                element.classList.add('invalid-field');
            }
        }
    });
}