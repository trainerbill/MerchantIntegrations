// https://www.bhphotovideo.com/bnh/controller/home

(function () {

    // THIS IS MY CLIENT ID!  You will need to go to developer.paypal.com and generate your own before going live.
    var clientId = 'AVeVRe54eHMWBZmFvgvSw65ss4XK5fPTR7pwy3xndadp4w11MYnw5YuDwxmo4dxgDFnTDP03FXwDFfzj';

    // Globals
    var JQUERY_JS = 'https://code.jquery.com/jquery-3.4.1.min.js';
    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=USD&intent=capture&commit=false&vault=false&disable-funding=card&components=buttons,messages';
    var PROMISE = 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js';
    var FETCH = 'https://cdnjs.cloudflare.com/ajax/libs/fetch/3.0.0/fetch.min.js';
    var container = document.body || document.head;

    function loadScripts(callback) {
        var jsloader = document.createElement('script');
        jsloader.setAttribute('src', LOADER_JS);
        container.appendChild(jsloader);
        jsloader.onload = function () {
            loadjs([PAYPAL_SCRIPT, PROMISE, JQUERY_JS, FETCH], 'paypal');
            loadjs.ready('paypal', function () {
                callback();
            });
        };
    }

    // Create PayPal Credit Messaging Container
    var creditContainer = document.createElement('div');
    creditContainer.setAttribute('data-pp-message', '');
    // creditContainer.setAttribute('data-pp-amount', total);
    creditContainer.setAttribute('data-pp-style-layout', 'text');
    creditContainer.setAttribute('data-pp-style-logo-type', 'alternative');
    creditContainer.setAttribute('data-pp-style-logo-position', 'left');

    // creditContainer.setAttribute('data-pp-style-ratio', '8x1')

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Hide Old button
    var oldButton = document.querySelector('a.paypalButton');
    oldButton.style.display = 'none';


    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);
    oldButton.after(creditContainer);


    loadScripts(function () {

        paypal.Buttons({
            style: {
                shape: 'rect'
            },
            createOrder: function (data, actions) {

                return fetch('https://www.bhphotovideo.com/bnh/controller/home?O=orderForm&A=expressCheckout&Q=paypal', { headers: { Accept: 'application/paypal-json-token' } })
                    .then(res => res.json())
                    .then(data => data.token);
            },
            onApprove: function (data, actions) {
                // BUILD YOUR URL.  Can use information from data object
                var url = 'https://www.bhphotovideo.com/bnh/controller/home?O=pp&A=return&Q=paypal&token=' + data.orderID + '&PayerID=' + data.payerID + '#/review'
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

(function () {

    delete window.paypal;

    // THIS IS MY CLIENT ID!  You will need to go to developer.paypal.com and generate your own before going live.
    var clientId = 'AVeVRe54eHMWBZmFvgvSw65ss4XK5fPTR7pwy3xndadp4w11MYnw5YuDwxmo4dxgDFnTDP03FXwDFfzj';

    // Globals
    var JQUERY_JS = 'https://code.jquery.com/jquery-3.4.1.min.js';
    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=USD&intent=capture&commit=false&vault=false&disable-funding=card&components=buttons,messages';
    var PROMISE = 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js';
    var FETCH = 'https://cdnjs.cloudflare.com/ajax/libs/fetch/3.0.0/fetch.min.js';
    var container = document.body || document.head;

    function loadScripts(callback) {
        var jsloader = document.createElement('script');
        jsloader.setAttribute('src', LOADER_JS);
        container.appendChild(jsloader);
        jsloader.onload = function () {
            loadjs([PAYPAL_SCRIPT, PROMISE, JQUERY_JS, FETCH], 'paypal');
            loadjs.ready('paypal', function () {
                callback();
            });
        };
    }

    // Create PayPal Credit Messaging Container
    var creditContainer = document.createElement('div');
    creditContainer.setAttribute('data-pp-message', '');
    // creditContainer.setAttribute('data-pp-amount', total);
    creditContainer.setAttribute('data-pp-style-layout', 'text');
    creditContainer.setAttribute('data-pp-style-logo-type', 'alternative');
    creditContainer.setAttribute('data-pp-style-logo-position', 'left');

    // creditContainer.setAttribute('data-pp-style-ratio', '8x1')

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Hide Old button
    var oldButton = document.querySelector('a.next-btn');
    oldButton.style.display = 'none';


    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);
    oldButton.after(creditContainer);


    loadScripts(function () {

        paypal.Buttons({
            style: {
                shape: 'rect'
            },
            createOrder: function (data, actions) {

                return fetch('https://www.bhphotovideo.com/bnh/controller/home?O=orderForm&A=expressCheckout&Q=paypal&checkoutApp=Y', { headers: { Accept: 'application/paypal-json-token' } })
                    .then(res => res.json())
                    .then(data => data.token);
            },
            onApprove: function (data, actions) {
                // BUILD YOUR URL.  Can use information from data object
                var url = 'https://www.bhphotovideo.com/bnh/controller/home?O=pp&A=return&Q=paypal&token=' + data.orderID + '&PayerID=' + data.payerID + '#/review'
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