(function () {

    // THIS IS MY CLIENT ID!  You will need to go to developer.paypal.com and generate your own before going live.
    var clientId = 'AVeVRe54eHMWBZmFvgvSw65ss4XK5fPTR7pwy3xndadp4w11MYnw5YuDwxmo4dxgDFnTDP03FXwDFfzj';

    // Globals
    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=USD&intent=authorize&commit=false&vault=false&disable-funding=card&components=buttons,messages';
    var PROMISE = 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js';
    var FETCH = 'https://cdnjs.cloudflare.com/ajax/libs/fetch/3.0.0/fetch.min.js';
    var container = document.body || document.head;

    function loadScripts(callback) {

        if (window.paypal) {
            delete window.paypal;
        }

        var jsloader = document.createElement('script');
        jsloader.setAttribute('src', LOADER_JS);
        container.appendChild(jsloader);
        jsloader.onload = function () {
            loadjs([PAYPAL_SCRIPT, PROMISE, FETCH], 'paypal');
            loadjs.ready('paypal', function () {
                callback();
            });
        };
    }

    // Create PayPal Credit Messaging Container
    var messagingContainer = document.createElement('div');
    messagingContainer.setAttribute('data-pp-message', '');
    messagingContainer.setAttribute('data-pp-placement', 'cart');
    messagingContainer.setAttribute('data-pp-amount', document.querySelectorAll('.cart-totals__info-text--price')[5].textContent.substring(1));
    messagingContainer.setAttribute('data-pp-style-layout', 'text');
    // messagingContainer.setAttribute('data-pp-style-ratio', '8x1');
    // messagingContainer.setAttribute('data-pp-style-color', 'white-no-border');
    messagingContainer.setAttribute('data-pp-style-logo-type', 'alternative');
    // messagingContainer.setAttribute('data-pp-style-logo-position', 'left');
    // creditContainer.setAttribute('data-pp-style-ratio', '8x1')

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Hide Old button
    var oldButton = document.querySelector('img[title*="Checkout with PayPal"]');
    oldButton.style.display = 'none';

    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);
    oldButton.after(messagingContainer);

    // Remove parent styling so buttons fill container
    oldButton.parentNode.className = '';

    loadScripts(function () {

        paypal.Buttons({
            style: {
                shape: 'rect'
            },
            createOrder: function (data, actions) {

                return fetch('https://www.grandappliance.com/paypal/express/start/button/1/', { method: 'GET', headers: { 'Accept': 'application/paypal-json-token' } })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (!data.token) {
                            throw new Error('Error fetching PayPal Token')
                        }
                        return data.token
                    });
            },
            onApprove: function (data, actions) {

                // BUILD YOUR URL.  Can use information from data object
                var url = 'https://www.grandappliance.com/paypal/express/return/?token=' + data.orderID + '&PayerID=' + data.payerID;
                console.log(url);
                actions.redirect(url);
                // This should keep the overlay open but its not working.  Looking into it
                return new Promise(function (resolve, reject) { });
            },
            onCancel: function (data, actions) {
                // Do nothing
            },
            onError: function (err) {
                console.log(err);
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }).render('#paypal-button-container');
    });
})();