// Here goes your custom javascript
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
        delay = 3000; // zmizí po 3 sekundách
    } else {
        return; // Neznámý status
    }

    // Získání elementu a nastavení třídy a obsahu
    var element = document.getElementById(elementId);
    if (element) {
        element.className += ' ' + alertClass;
        var alertContent = '<div class="alert-content">' +
                            '<span class="alert-title">' + alertTitle + '</span>' +
                            '<span class="alert-text">' + decodeURIComponent(message) + '</span>' +
                            '</div>';
        element.innerHTML = alertContent + element.innerHTML;

        // Odstranění třídy a obsahu po určitém čase
        setTimeout(function() {
            element.className = element.className.replace(alertClass, '');
            element.innerHTML = element.innerHTML.replace(alertContent, '');
        }, delay);
    }
}