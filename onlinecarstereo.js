// https://www.onlinecarstereo.com/caraudio/shoppingcart.aspx
(function() {
    
    // DOM Changes
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    var oldButton = jQuery('#paypalExpressContainer button');
    oldButton.hide();
    oldButton.parent().append(buttonContainer);
    oldButton.parent().append(errorContainer);

    paypal.Button.render({
        commit: false,
        env: 'production',
        style: {
            layout: 'vertical',  // horizontal | vertical
            size:   'responsive',    // medium | large | responsive
            color:  'gold'       // gold | blue | silver | black
        },
        funding: {
            allowed: [ paypal.FUNDING.CREDIT ],
            disallowed: [ paypal.FUNDING.CARD]
        },
        payment: function (data, actions) {
            return new paypal.Promise(function (resolve, reject) {
                var req = new XMLHttpRequest();
                req.open('get', 'https://www.onlinecarstereo.com/secure/express/paypal/SetExpressCheckout.aspx?&ajax=1&onlytoken=1');
                req.onload = function () {
                    try {
                        
                        if (req.responseText) {
                            //console.log(JSON.parse(req.responseText));
                            //console.log(JSON.parse(req.responseText).url.match(/(EC-\w+)/i));
                            resolve(JSON.parse(req.responseText).url.match(/(EC-\w+)/i)[0]);
                        }
                    } catch (err) {
                        throw err;
                    }
                };
                req.send();
            });
        },
        onAuthorize: function (data, actions) {
            return actions.redirect()
        },
        onCancel: function (data, actions) {
            return actions.redirect();
        },
        onError: function (err) {
            document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
        },
    }, '#paypal-button');
        
})();

// https://www.onlinecarstereo.com/Secure/express/braintree/braintree-payment.aspx
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
    // DOM Changes
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';
    buttonContainer.style['margin-top'] = "10px";

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    var oldButton = jQuery('#btnSubmit');
    oldButton.parent().append(buttonContainer);
    oldButton.parent().append(errorContainer);
    loadPayPalCheckout(function () {
        paypal.Button.render({
            commit: false,
            env: 'production',
            style: {
                layout: 'vertical',  // horizontal | vertical
                size:   'medium',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            funding: {
                allowed: [ paypal.FUNDING.CREDIT ],
                disallowed: []
            },
            payment: function (data, actions) {
                return new paypal.Promise(function (resolve, reject) {
                    var req = new XMLHttpRequest();
                    req.open('get', 'https://www.onlinecarstereo.com/secure/express/paypal/SetExpressCheckout.aspx?&ajax=1&onlytoken=1');
                    req.onload = function () {
                        try {
                            
                            if (req.responseText) {
                                //console.log(JSON.parse(req.responseText));
                                //console.log(JSON.parse(req.responseText).url.match(/(EC-\w+)/i));
                                resolve(JSON.parse(req.responseText).url.match(/(EC-\w+)/i)[0]);
                            }
                        } catch (err) {
                            throw err;
                        }
                    };
                    req.send();
                });
            },
            onAuthorize: function (data, actions) {
                return actions.redirect()
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