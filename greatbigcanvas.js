// https://www.greatbigcanvas.com/cart/
(function () {

    // THIS IS MY CLIENT ID!  You will need to go to developer.paypal.com and generate your own before going live.
    var clientId = 'AVeVRe54eHMWBZmFvgvSw65ss4XK5fPTR7pwy3xndadp4w11MYnw5YuDwxmo4dxgDFnTDP03FXwDFfzj';

    // Globals
    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=USD&intent=order&commit=false&vault=false&disable-funding=card&components=buttons,messages';
    var PROMISE = 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js';
    var container = document.body || document.head;

    function loadScripts(callback) {
        var jsloader = document.createElement('script');
        jsloader.setAttribute('src', LOADER_JS);
        container.appendChild(jsloader);
        jsloader.onload = function () {
            loadjs([PAYPAL_SCRIPT, PROMISE], 'paypal');
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
    document.querySelector('#ctl00_ctl00_ctl00_cphPage_cphPage_cphPage_shoppingCart_pnlPayPal').after(creditContainer);

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    document.getElementById('cartSummaryPrimary').appendChild(buttonContainer);

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';
    document.getElementById('cartSummaryPrimary').appendChild(errorContainer);

    // Hid Old button
    var oldButton = document.getElementById('ctl00_ctl00_ctl00_cphPage_cphPage_cphPage_shoppingCart_pnlPayPal');
    oldButton.style.display = 'none';

    loadScripts(function () {



        paypal.Buttons({
            createOrder: function (data, actions) {
                return new Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', 'https://www.greatbigcanvas.com/cart/paypal/expresscheckout.aspx');
                    req1.onload = function () {
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
                    req1.send();
                });
            },
            onApprove: function (data, actions) {
                actions.redirect('https://www.greatbigcanvas.com/cart/paypal/confirm-order.aspx?token=' + data.orderID + '&PayerID=' + data.payerID);
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

// https://www.greatbigcanvas.com/cart/checkout.aspx
(function () {

    // THIS IS MY CLIENT ID!  You will need to go to developer.paypal.com and generate your own before going live.
    var clientId = 'AVeVRe54eHMWBZmFvgvSw65ss4XK5fPTR7pwy3xndadp4w11MYnw5YuDwxmo4dxgDFnTDP03FXwDFfzj';

    // Globals
    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=USD&intent=order&commit=false&vault=false&disable-funding=card&components=buttons,messages';
    var PROMISE = 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js';
    var container = document.body || document.head;

    function loadScripts(callback) {
        var jsloader = document.createElement('script');
        jsloader.setAttribute('src', LOADER_JS);
        container.appendChild(jsloader);
        jsloader.onload = function () {
            loadjs([PAYPAL_SCRIPT, PROMISE], 'paypal');
            loadjs.ready('paypal', function () {
                callback();
            });
        };
    }

    // Create PayPal Credit Messaging Container
    var creditContainer = document.createElement('div');
    creditContainer.style['margin-top'] = '10px';
    creditContainer.setAttribute('data-pp-message', '');
    // creditContainer.setAttribute('data-pp-amount', total);
    creditContainer.setAttribute('data-pp-style-layout', 'flex');
    creditContainer.setAttribute('data-pp-style-ratio', '8x1')
    document.querySelector('#ctl00_ctl00_ctl00_cphPage_cphPage_cphPage_checkoutControl_up_payment').after(creditContainer);

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    document.getElementById('ctl00_ctl00_ctl00_cphPage_cphPage_cphPage_checkoutControl_up_payment').appendChild(buttonContainer);

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';
    document.getElementById('ctl00_ctl00_ctl00_cphPage_cphPage_cphPage_checkoutControl_up_payment').appendChild(errorContainer);

    loadScripts(function () {

        paypal.Buttons({
            createOrder: function (data, actions) {
                return new Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', 'https://www.greatbigcanvas.com/cart/paypal/expresscheckout.aspx');
                    req1.onload = function () {
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
                    req1.send();
                });
            },
            onApprove: function (data, actions) {
                actions.redirect('https://www.greatbigcanvas.com/cart/paypal/confirm-order.aspx?token=' + data.orderID + '&PayerID=' + data.payerID);
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
