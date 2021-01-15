// https://www.greatbigcanvas.com/cart/
(function () {

    // THIS IS MY CLIENT ID!  You will need to go to developer.paypal.com and generate your own before going live.
    var clientId = 'AVeVRe54eHMWBZmFvgvSw65ss4XK5fPTR7pwy3xndadp4w11MYnw5YuDwxmo4dxgDFnTDP03FXwDFfzj';

    // Globals
    var JQUERY_JS = 'https://code.jquery.com/jquery-3.4.1.min.js';
    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=USD&intent=order&commit=false&vault=false&disable-funding=card&components=buttons,messages';
    var PROMISE = 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js';
    var container = document.body || document.head;

    function loadScripts(callback) {
        var jsloader = document.createElement('script');
        jsloader.setAttribute('src', LOADER_JS);
        container.appendChild(jsloader);
        jsloader.onload = function () {
            loadjs([PAYPAL_SCRIPT, PROMISE, JQUERY_JS], 'paypal');
            loadjs.ready('paypal', function () {
                callback();
            });
        };
    }

    // Create PayPal Credit Messaging Container
    var creditContainer = document.createElement('div');
    creditContainer.setAttribute('data-pp-message', '');
    // creditContainer.setAttribute('data-pp-amount', total);
    creditContainer.setAttribute('data-pp-style-layout', 'flex');
    creditContainer.setAttribute('data-pp-style-ratio', '8x1')
    document.querySelector('.shopping-bag_left-column').append(creditContainer);

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    document.querySelector('#paypal_express').after(buttonContainer);

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';
    document.querySelector('#paypal_express').after(errorContainer);

    // Hid Old button
    var oldButton = document.getElementById('paypal_express');
    oldButton.style.display = 'none';
    document.querySelector('.paypal-button').style.display = 'none';

    loadScripts(function () {

        paypal.Buttons({
            createOrder: function (data, actions) {
                var data = $('#punchout_11374159').serialize();
                console.log(data);
                return new Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    // This URL currently builds some HTML that uses JS to get the redirect url then uses JS to redirect.
                    // Because of this we cannot get the token which we need to resolve.
                    // You need to change this to a webservice that responds with the token OR a 302 redirect that will land on paypal.com/chekcoutnow with the token
                    req1.open('post', 'PunchoutPaymentRedirectView');
                    req1.onloadend = function () {
                        // THis only works in IE 10+
                        if (req1.responseURL && req1.responseURL.match('paypal.com') === null) {
                            return window.location.href = req1.responseURL;
                        }
                        try {
                            if (req1.responseText) {
                                resolve(JSON.parse(req1.responseText).token);
                            }
                        } catch (err) {
                            throw err;
                        }
                    };
                    req1.setRequestHeader('Accept', 'application/paypal-json-token');
                    req1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    req1.send(data);
                });
            },
            onApprove: function (data, actions) {
                // BUILD YOUR URL.  Can use information from data object
                actions.redirect('https://www.menswearhouse.com/OrderShippingBillingView??token=' + data.orderID + '&PayerID=' + data.payerID);
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