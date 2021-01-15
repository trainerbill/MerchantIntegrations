// https://www.spa-daddy.com/cart.php
(function() {
    function loadPayPalCheckout(callback) {

        // Load jQuery first.  needed for form serialize.
        var JQUERY_SCRIPT = 'https://code.jquery.com/jquery-3.3.1.slim.min.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', JQUERY_SCRIPT);
        script.onerror = function(err) { callback(err) };  
        script.onload = function() { 
            // Load PayPal
            var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
            var ppscript = document.createElement('script');
            ppscript.setAttribute('src', PAYPAL_SCRIPT);
            ppscript.onerror = function(err) { callback(err) };
            ppscript.onload = function() { callback() };
            container.appendChild(ppscript);
        };
        container.appendChild(script);
    }

    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        // Targets
        var oldButton = jQuery('input[src="https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif"]');
        oldButton.hide();
        
        // New Form
        var oldButtonData = oldButton.parent().serialize();
        // Create PayPal button container
        var buttonContainer = document.createElement('div');
        buttonContainer.id = 'paypal-button';

        // Create PayPal error container
        var errorContainer = document.createElement('div');
        errorContainer.id = 'paypal-error';
        errorContainer.style.color = 'red';

        // Add new containers to DOM
        oldButton.after(buttonContainer);
        oldButton.after(errorContainer);
        
        // Remove old button
        oldButton.hide();
        //var paypalForm = document.getElementById('paypalForm');
            paypal.Button.render({
                env: 'production',
                style: {
                    layout: 'horizontal',  // horizontal | vertical
                    size:   'medium',    // medium | large | responsive
                    color:  'gold'       // gold | blue | silver | black
                },
                funding: {
                    allowed: [ paypal.FUNDING.CREDIT ]
                },
                payment: function (data, actions) {
                    return new paypal.Promise(function (resolve, reject) {
						var req = new XMLHttpRequest();
                        req.open('post', oldButton.parent().attr('action'));
                        req.onload = function () {
                            if (req.responseURL && req.responseURL.match('paypal.com') === null) {
                                return window.location.href = req.responseURL;
                            }
                            try {
                                if (req.responseText) {
                                    resolve(JSON.parse(req.responseText).token);
                                }
                            } catch (err) {
                                throw err;
                            }
                        };
                        req.setRequestHeader('Accept', 'application/paypal-json-token');
                        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        req.send(oldButtonData);
                    });
                },
                onAuthorize: function (data, actions) {
                    return actions.redirect();
                },
                onCancel: function (data, actions) {
                    return actions.redirect();
                },
                onError: function (err) {
                    document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
                },
            }, '#paypal-button');
        });
})();

// https://www.spa-daddy.com/1checkout-3.php
(function() {
    function loadPayPalCheckout(callback) {
        // Load jQuery first.  needed for form serialize.
        var JQUERY_SCRIPT = 'https://code.jquery.com/jquery-3.3.1.slim.min.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', JQUERY_SCRIPT);
        script.onload = function() { 
            var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
            var ppscript = document.createElement('script');
            ppscript.setAttribute('src', PAYPAL_SCRIPT);
            ppscript.onload = function() { callback() };
            ppscript.onerror = function(err) { callback(err) };     
            container.appendChild(ppscript);
        };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }

    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        if (jQuery('input[name="Card_Type"]').val() === 'paypal') {
            // Targets
            var oldButton = jQuery('input[src="/images/continuecheckout1.gif"]');
            oldButton.hide();
            
            // New Form
            var oldButtonData = jQuery('input[name="Card_Type"]').parent().serialize();
            console.log(oldButtonData);
            // Create PayPal button container
            var buttonContainer = document.createElement('div');
            buttonContainer.id = 'paypal-button';

            // Create PayPal error container
            var errorContainer = document.createElement('div');
            errorContainer.id = 'paypal-error';
            errorContainer.style.color = 'red';

            // Add new containers to DOM
            oldButton.after(buttonContainer);
            oldButton.after(errorContainer);
            
            // Remove old button
            oldButton.hide();
            
            paypal.Button.render({
                commit: true,
                env: 'production',
                style: {
                    layout: 'horizontal',  // horizontal | vertical
                    size:   'medium',    // medium | large | responsive
                    color:  'gold'       // gold | blue | silver | black
                },
                payment: function (data, actions) {
                    return new paypal.Promise(function (resolve, reject) {
                        var req = new XMLHttpRequest();
                        req.open('post', jQuery('input[name="Card_Type"]').parent().attr('action'));
                        req.onload = function () {
                            if (req.responseURL && req.responseURL.match('paypal.com') === null) {
                                return window.location.href = req.responseURL;
                            }
                            try {
                                if (req.responseText) {
                                    resolve(JSON.parse(req.responseText).token);
                                }
                            } catch (err) {
                                throw err;
                            }
                        };
                        req.setRequestHeader('Accept', 'application/paypal-json-token');
                        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        req.send(oldButtonData);
                    });
                },
                onAuthorize: function (data, actions) {
                    return actions.redirect();
                },
                onCancel: function (data, actions) {
                    return actions.redirect();
                },
                onError: function (err) {
                    document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
                },
            }, '#paypal-button');
        }
    });
})();