// https://www.vineyardvines.com/cart
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
    var oldButton = jQuery("img[src='https://www.paypalobjects.com/webstatic/en_US/i/btn/png/blue-rect-paypalcheckout-60px.png']").parent().parent();
    
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';
    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';
    // Create PayPal validation container
    var validationContainer = document.createElement('div');
    validationContainer.id = 'paypal-validation';
    validationContainer.style.color = 'red';
    validationContainer.style.display = 'none';
    // Add new containers to DOM under the comment
    oldButton.parent().append(buttonContainer);
    oldButton.parent().append(validationContainer);
    oldButton.parent().append(errorContainer);
    
    // Remove old button
    oldButton.hide();
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'horizontal',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'blue',       // gold | blue | silver | black
                shape:  'rect'
            },
            funding: {
                allowed: [paypal.FUNDING.CREDIT], 
                disallowed:  [paypal.FUNDING.CARD]
            },
            payment: function (data, actions) {
                return new paypal.Promise(function (resolve, reject) {
                    // This will not work in IE less than Edge due to the responseURL
                    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL
                    // It is needed due to redirect if a token and payerid exists in server session.  see comment below.
                    var req = new XMLHttpRequest();
                    console.log(oldButton)
                    req.open('get', oldButton.attr('href'));
                    req.setRequestHeader('Accept', 'application/paypal-json-token');
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
                    req.send();
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
            
        }, '#paypal-button')
    });
    
})();

// https://www.vineyardvines.com/billinginfo
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
    var oldButton = jQuery("button[name='dwfrm_billing_save']");
    
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';
    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';
    // Create PayPal validation container
    var validationContainer = document.createElement('div');
    validationContainer.id = 'paypal-validation';
    validationContainer.style.color = 'red';
    validationContainer.style.display = 'none';
    // Add new containers to DOM under the comment
    oldButton.parent().append(buttonContainer);
    oldButton.parent().append(validationContainer);
    oldButton.parent().append(errorContainer);
    
    // Remove old button
    oldButton.hide();

    //old button form
    var oldForm = jQuery('#billingForm');
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'horizontal',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'blue',       // gold | blue | silver | black
                shape:  'rect'
            },
            funding: {
                allowed: [paypal.FUNDING.CREDIT], 
                disallowed:  [paypal.FUNDING.CARD]
            },
            payment: function (data, actions) {
                return new paypal.Promise(function (resolve, reject) {
                    
                    var req = new XMLHttpRequest();
                    // TODO:  I can't figure out what the route is for the payment page they need to change this.
                    req.open('get', '/on/demandware.store/sites-vineyard-vines-site/default/cosummary-start');
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
                    // req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    req.send(oldForm.serialize());
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
            
        }, '#paypal-button')
    });
    
})();