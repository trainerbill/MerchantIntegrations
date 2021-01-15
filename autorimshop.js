// https://www.autorimshop.com/checkout/cart/
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
    var oldButtons = jQuery("img[src='https://smhttp-ssl-48880-live.nexcesscdn.net/skin/frontend/base/default/images/paypal-cart.jpg");
    var oldButtonTop = jQuery(oldButtons[0]).parent();
    var oldButtonBottom = jQuery(oldButtons[1]).parent();

    // Create PayPal button container
    var buttonContainerTop = document.createElement('div');
    buttonContainerTop.id = 'paypal-button-top';
    buttonContainerTop.style['min-width'] = "228px";
    
    // Create PayPal error container
    var errorContainerTop = document.createElement('div');
    errorContainerTop.id = 'paypal-error-top';
    errorContainerTop.style.color = 'red';
    
    // Create PayPal button container
    var buttonContainerBottom = document.createElement('div');
    buttonContainerBottom.id = 'paypal-button-bottom';
    
    // Create PayPal error container
    var errorContainerBottom = document.createElement('div');
    errorContainerBottom.id = 'paypal-error-bottom';
    errorContainerBottom.style.color = 'red';


    // Add new containers to DOM
    oldButtonBottom.after(buttonContainerBottom);
    oldButtonBottom.after(errorContainerBottom);
    oldButtonTop.after(buttonContainerTop);
    oldButtonTop.after(errorContainerTop);
    
    // Remove old button
    oldButtonBottom.hide();
    oldButtonTop.hide();
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {

        paypal.Button.render({
            commit: true,
            env: 'production',
            style: {
                shape: 'rect',
                layout: 'horizontal',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            funding: {
                allowed: [ paypal.FUNDING.CREDIT ],
                disallowed: [ paypal.FUNDING.CARD ]
            },
            payment: function (data, actions) {
                console.log(oldButtonBottom)
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', oldButtonTop.attr('href'));
                    req1.onload = function () {
                        resolve(req1.responseText.match(/(EC-\w+)/i)[0]);
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
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-top');
        
        paypal.Button.render({
            commit: true,
            env: 'production',
            style: {
                shape: 'rect',
                layout: 'vertical',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            funding: {
                allowed: [ paypal.FUNDING.CREDIT ],
                disallowed: [ paypal.FUNDING.CARD ]
            },
            payment: function (data, actions) {
                console.log(oldButtonBottom)
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', oldButtonBottom.attr('href'));
                    req1.onload = function () {
                        resolve(req1.responseText.match(/(EC-\w+)/i)[0]);
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
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-bottom');
    });
})();


// Product Page
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
    var oldButton = jQuery("img[src='https://smhttp-ssl-48880-live.nexcesscdn.net/skin/frontend/base/default/images/paypal-cart.jpg").parent();
    jQuery('.paypal-or').hide();
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';
    buttonContainer.style['min-width'] = "228px";

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
                shape: 'rect',
                layout: 'horizontal',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            funding: {
                allowed: [ paypal.FUNDING.CREDIT ]
            },
            payment: function (data, actions) {
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', oldButton.attr('href'));
                    req1.onload = function () {
                        resolve(req1.responseText.match(/(EC-\w+)/i)[0]);
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
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
            onClick: function () {
                // Do form validation
            },
            validate: function (actions) {
                // Do form validation
            }
        }, '#paypal-button');
    });
})();

// Payment Page
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

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';
    buttonContainer.style.display = 'none';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    jQuery('#payment_form_paypal_express > li').text('Click the PayPal Button');
    var oldButton = jQuery('#onestepcheckout-place-order');

    jQuery("input[name='payment[method]']").change(function (event) {
        console.log(event.target.value)
        if (event.target.value === 'paypal_express') {
            oldButton.hide();
            buttonContainer.style.display = 'initial';
        } else {
            oldButton.show();
            buttonContainer.style.display = 'none';
        }
    }); 

    


    // Add new containers to DOM
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        
        paypal.Button.render({
            commit: true,
            env: 'production',
            style: {
                shape: 'rect',
                layout: 'vertical',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            funding: {
                allowed: [ paypal.FUNDING.CREDIT ]
            },
            payment: function (data, actions) {
                var form = jQuery('#onestepcheckout-form');
                console.log(form);
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', form.attr('action'));
                    req1.onload = function () {
                        resolve(req1.responseText.match(/(EC-\w+)/i)[0]);
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
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
            onClick: function () {
                // Do form validation
            },
            validate: function (actions) {
                // Do form validation
            }
        }, '#paypal-button');
    });
})();
