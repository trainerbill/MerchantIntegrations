// Minicart
(function () {
    
    function loadPayPalCheckout(callback) {
        if (window.paypal) {
            return callback();
        }
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }
    
    // PayPal Container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container-mini';
    buttonContainer.style['min-width'] = '250px';

    // Error Container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-button-container-error-mini';
    
    // Hide Old Button
    var oldButton = document.querySelectorAll('.mini-cart-inner-container .other-methods-buttons .payment-separator')[1];
    // oldButton.style.display = 'none';

    // Insert Containers
    
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);

    loadPayPalCheckout(function () {

        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'horizontal',
                size: 'responsive',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            commit: false,
            funding: {
                allowed: [
                    paypal.FUNDING.CREDIT,
                ],
                disallowed: [
                    paypal.FUNDING.CARD,
                ]
            },

            payment: function (data, actions) {
                
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', 'https://www.yeti.com/on/demandware.store/Sites-Yeti_US-Site/en_US/Paypal-IncontextCheckout?checkoutFromtCart=true');
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
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                document.getElementById('paypal-button-container-error-mini').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container-mini');
    });

})();

// https://www.yeti.com/en_US/cart
(function () {
    
    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }
    
    // PayPal Container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';

    // Error Container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-button-container-error';
    
    // Hide Old Button
    var oldButton = document.querySelector('.other-methods-buttons');
    // oldButton.style.display = 'none';

    // OR Text
    var orText = document.querySelector('.checkout-separator');

    // Insert Containers
    
    oldButton.prepend(buttonContainer);
    oldButton.prepend(errorContainer);
    oldButton.prepend(orText.cloneNode(true));

    loadPayPalCheckout(function () {

        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'vertical',
                size: 'responsive',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            commit: false,
            funding: {
                disallowed: [
                    paypal.FUNDING.CARD,
                ]
            },

            payment: function (data, actions) {
                
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', 'https://www.yeti.com/on/demandware.store/Sites-Yeti_US-Site/en_US/Paypal-IncontextCheckout?checkoutFromtCart=true');
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
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                document.getElementById('paypal-button-container-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container');
    });

})();

// https://www.yeti.com/en_US/customer-information
(function () {
    
    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }
    
    // PayPal Container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';

    // Error Container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-button-container-error';
    
    // Hide Old Button
    var oldButton = document.querySelector('a[name="dwfrm_login_unregistered"]');
    // oldButton.style.display = 'none';

    // OR Text
    var divider = document.querySelector('.divider');

    // Insert Containers
    
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);
    oldButton.after(divider.cloneNode(true));

    loadPayPalCheckout(function () {

        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'vertical',
                size: 'responsive',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            commit: false,
            funding: {
                disallowed: [
                    paypal.FUNDING.CARD,
                ]
            },

            payment: function (data, actions) {
                
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', 'https://www.yeti.com/on/demandware.store/Sites-Yeti_US-Site/en_US/Paypal-IncontextCheckout?checkoutFromtCart=true');
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
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                document.getElementById('paypal-button-container-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container');
    });

})();

(function () {
    // Not needed since they already have checkout.js added
    /*
    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }
    */
    
    // PayPal Container
    var buttonContainer = document.createElement('span');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style.width = '100%';

    // Error Container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-button-container-error';
    
    // Hide Old Button
    var oldButton = document.querySelector('.paypal-express-checkout');
    oldButton.style.display = 'none';

    // Insert Containers
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);

    // loadPayPalCheckout(function () {

        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'vertical',
                size: 'responsive',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            commit: false,
            funding: {
                disallowed: [
                    paypal.FUNDING.CARD,
                ]
            },

            payment: function (data, actions) {
                
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', oldButton.href);
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
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                document.getElementById('paypal-button-container-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container');
    // });

})();