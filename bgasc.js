// https://www.bgasc.com/viewcart
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

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    var oldButton = jQuery('input[src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-medium.png"]');

    // Add new containers to DOM
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);

    oldButton.hide();

    loadPayPalCheckout(function () {
        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'vertical',
                size: 'responsive',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            funding: {
                allowed: [paypal.FUNDING.CREDIT]
            },

            payment: function (data, actions) {
                // Form 
                var form = oldButton.parent();

                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', form.attr('action'));
                    req1.onload = function () {
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
                    req1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    req1.send(form.serialize());

                });
            },
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                console.log(err);
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container');
    });

})();

// https://www.bgasc.com/checkout_shipping
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

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style['margin-top'] = "10px";
    buttonContainer.style.width = "75%";
    buttonContainer.style.margin = "auto";

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    var oldButton = jQuery('#cc_panel');

    // Add new containers to DOM
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);

    loadPayPalCheckout(function () {
        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'vertical',
                size: 'responsive',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            funding: {
                allowed: [paypal.FUNDING.CREDIT]
            },

            payment: function (data, actions) {
                // Form 
                var form = oldButton.parent();

                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', 'https://www.bgasc.com/index.php');
                    req1.onload = function () {
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
                    req1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    req1.send('action=PayPalExpressCheckout');

                });
            },
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                console.log(err);
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container');
    });

})();