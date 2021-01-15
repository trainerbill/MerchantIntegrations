// https://www.extremecustoms.com/cart.php
(function() {
    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }

    // Targets
    var oldButton = jQuery("input[src='images/btn-checkout-paypal.png").parent();
    
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
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        
            paypal.Button.render({
                commit: true,
                env: 'production',
                style: {
                    layout: 'vertical',  // horizontal | vertical
                    size:   'medium',    // medium | large | responsive
                    color:  'blue'       // gold | blue | silver | black
                },
                funding: {
                    allowed: [ paypal.FUNDING.CREDIT ]
                },
                payment: function (data, actions) {
                    return new paypal.Promise(function (resolve, reject) {
                        jQuery.ajax({
                            url: oldButton.attr('action'),
                            method: 'POST',
                            data: oldButton.serialize(),
                            headers: {
                                'Accept': 'application/paypal-json-token'
                            },
                            success: function (res, status, jqXHR) {
                                var tokens = res.match(/(EC-\w+)/i);
                                tokens.length < 1 ? reject('No token resolved'): resolve(tokens[0]);
                            },
                            error: function (err) {
                                reject(err);
                            }
                        });
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

// https://www.extremecustoms.com/checkout.php
(function() {
    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }

    // Targets
    var oldButton = jQuery("#paypal-btn-form");
    
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';
    buttonContainer.style['margin-left'] = "20%";

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';
    errorContainer.style['margin-left'] = "20%";

    // Add new containers to DOM
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);
    
    // Remove old button
    oldButton.hide();
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        
            paypal.Button.render({
                commit: true,
                env: 'production',
                style: {
                    layout: 'vertical',  // horizontal | vertical
                    size:   'medium',    // medium | large | responsive
                    color:  'blue'       // gold | blue | silver | black
                },
                funding: {
                    allowed: [ paypal.FUNDING.CREDIT ]
                },
                payment: function (data, actions) {
                    return new paypal.Promise(function (resolve, reject) {
                        jQuery.ajax({
                            url: oldButton.attr('action'),
                            method: 'POST',
                            data: oldButton.serialize(),
                            headers: {
                                'Accept': 'application/paypal-json-token'
                            },
                            success: function (res, status, jqXHR) {
                                var tokens = res.match(/(EC-\w+)/i);
                                tokens.length < 1 ? reject('No token resolved'): resolve(tokens[0]);
                            },
                            error: function (err) {
                                reject(err);
                            }
                        });
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