// https://www.puritan.com/shoppingcart
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
    var oldButton = document.querySelector('a[name="paypal"]');
    oldButton.style.display = 'none';

    oldButton.after(creditContainer);
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);


    loadScripts(function () {

        paypal.Buttons({
            style: {
                shape: 'pill'
            },
            createOrder: function (data, actions) {
                return new Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    // This URL currently builds some HTML that uses JS to get the redirect url then uses JS to redirect.
                    // Because of this we cannot get the token which we need to resolve.
                    // You need to change this to a webservice that responds with the token OR a 302 redirect that will land on paypal.com/chekcoutnow with the token
                    req1.open('get', oldButton.href);
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
                    req1.send(data);
                });
            },
            onApprove: function (data, actions) {
                // BUILD YOUR URL.  Can use information from data object
                var url = 'https://www.puritan.com/paypal/cartprocessdetails?token=' + data.orderID + '&PayerID=' + data.payerID;
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

// https://www.puritan.com/checkout

(function () {

    function prepopulateForm(data) {
        // You will need to translate the country.  we return code your options are the full names
        // document.getElementById('ShipTo_Country').value = data.address.country_code;
        document.getElementById('ShipTo_FirstName').value = data.name.given_name;
        document.getElementById('ShipTo_LastName').value = data.name.surname;
        document.getElementById('ShipTo_Address1').value = data.address.address_line_1;
        document.getElementById('ShipTo_Address2').value = data.address.address_line_2;
        document.getElementById('ShipTo_ZipCode1').value = data.address.postal_code;
        document.getElementById('ShipTo_City').value = data.address.admin_area_2;
        document.getElementById('ShipTo_State').value = data.address.admin_area_1;
        document.getElementById('ShipTo_PhoneNumber').value = data.phone.phone_number.national_number;
        document.getElementById('ShipTo_Email').value = data.email_address;
    }

    function createInputs(token, payerId) {

        var tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.id = 'paypalToken';
        tokenInput.name = 'paypalToken';
        tokenInput.value = token;

        var payerInput = document.createElement('input');
        payerInput.type = 'hidden';
        payerInput.id = 'paypalPayerId';
        payerInput.name = 'paypalPayerId';
        payerInput.value = payerId;

        document.getElementById('checkoutForm').appendChild(payerInput);
        document.getElementById('checkoutForm').appendChild(tokenInput);
    }

    // THIS IS MY CLIENT ID!  You will need to go to developer.paypal.com and generate your own before going live.
    var clientId = 'AVeVRe54eHMWBZmFvgvSw65ss4XK5fPTR7pwy3xndadp4w11MYnw5YuDwxmo4dxgDFnTDP03FXwDFfzj';

    // Globals
    var JQUERY_JS = 'https://code.jquery.com/jquery-3.4.1.min.js';
    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=USD&intent=capture&commit=false&vault=false&disable-funding=card&components=buttons,messages';
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
    creditContainer.setAttribute('data-pp-style-layout', 'text');
    creditContainer.setAttribute('data-pp-style-logo-type', 'alternative');
    creditContainer.setAttribute('data-pp-style-logo-position', 'left');
    creditContainer.setAttribute('data-pp-style-ratio', '8x1');
    creditContainer.style.margin = 'auto';
    creditContainer.style['max-width'] = '600px';

    // creditContainer.setAttribute('data-pp-style-ratio', '8x1')

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style.width = '300px';
    // buttonContainer.style.height = '25px';
    buttonContainer.style.margin = 'auto';
    buttonContainer.style['margin-bottom'] = '10px';


    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';
    errorContainer.style.margin = 'auto';

    // Hide Old button
    var oldButton = document.querySelector('#divCheckoutDetails');
    document.getElementById('PaypalCheckout').parentNode.parentNode.style.display = 'none';

    oldButton.before(creditContainer);
    oldButton.before(buttonContainer);
    oldButton.before(errorContainer);


    loadScripts(function () {

        paypal.Buttons({
            style: {
                shape: 'pill',
                layout: 'horizontal',
                tagline: false,
                height: 35,
            },
            createOrder: function (data, actions) {
                return new Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    // This URL currently builds some HTML that uses JS to get the redirect url then uses JS to redirect.
                    // Because of this we cannot get the token which we need to resolve.
                    // You need to change this to a webservice that responds with the token OR a 302 redirect that will land on paypal.com/chekcoutnow with the token
                    req1.open('get', 'https://www.puritan.com/paypal/cart?isMobliGuestCheckOut=true');
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
                    req1.send(data);
                });
            },
            onApprove: function (data, actions) {
                console.log(data);
                return actions.order.get().then(function (payment) {
                    // Add elements to form
                    createInputs(data.orderID, data.payerID);
                    // Prepopulate your form. You need to validate this
                    prepopulateForm(payment.payer);
                    // Hide the Billing Address/Payment selection
                    document.getElementById('step3_header').parentNode.style.display = 'none';
                    buttonContainer.style.display = 'none';
                })
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