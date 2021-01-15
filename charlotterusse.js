// https://www.charlotterusse.com/cart
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

    jQuery('.paypal-btn').each(function (index, ele) {
        var id = 'paypal-button-' + index;
        var eid = 'paypal-error-' + index;
        // Create PayPal button container
        var buttonContainer = document.createElement('div');
        buttonContainer.id = id;

        // Create PayPal error container
        var errorContainer = document.createElement('div');
        errorContainer.id = eid;
        errorContainer.style.color = 'red';

        // Add new containers to DOM
        ele.after(buttonContainer);
        ele.after(errorContainer);
        
        // Remove old button
        ele.style.display = 'none';

        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'horizontal',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'black',       // gold | blue | silver | black
                shape: 'rect'
            },
            funding: {
                allowed: [ paypal.FUNDING.CREDIT ],
                disallowed: [ paypal.FUNDING.CARD ]
            },
            payment: function (data, actions) {
                return new paypal.Promise(function (resolve, reject) {
                    var req = new XMLHttpRequest();
                    req.open('get', ele.href);
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
                document.getElementById(eid).innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, id);
    });
})();


// https://www.charlotterusse.com/billing
(function() {
    // Hide order review button if paypal is selected on landing
    if(jQuery('input[type=radio][name=dwfrm_billing_paymentMethods_selectedPaymentMethodID]:checked').val() === 'PayPal') {
        jQuery('#billingSubmitButton').hide();
    }
    // Hide order review button if radio is changed to PayPal
    jQuery('input[type=radio][name=dwfrm_billing_paymentMethods_selectedPaymentMethodID]').change(function() {
        if (this.value === 'PayPal') {
            jQuery('#billingSubmitButton').hide();
        } else {
            jQuery('#billingSubmitButton').show();
        }
    });

    // Change message to click the paypal button
    jQuery('div[data-method="Custom"]')
        .html('Click on the paypal button below to log into your PayPal account and continue with your transaction.<br/><br/><div id="paypal-button"></div><div id="paypal-error"></div>');

    // Render PayPal Buttons
    paypal.Button.render({
        env: 'production',
        style: {
            layout: 'vertical',  // horizontal | vertical
            size:   'large',    // medium | large | responsive
            color:  'black',       // gold | blue | silver | black
            shape: 'rect'
        },
        funding: {
            allowed: [ paypal.FUNDING.CREDIT ],
            disallowed: [ paypal.FUNDING.CARD ]
        },
        payment: function (data, actions) {
            var form = jQuery('#dwfrm_billing');
            

            return new paypal.Promise(function (resolve, reject) {
                var req = new XMLHttpRequest();
                req.open('post', form.attr('action'));
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
                req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                req.setRequestHeader('Accept', 'application/paypal-json-token');
                req.send(form.serialize());
            });
        },
        onAuthorize: function (data, actions) {
            return actions.redirect();
        },
        onCancel: function (data, actions) {
            return actions.redirect();
        },
        onError: function (err) {
            document.getElementById('paypal').innerHTML = 'An error occured. ' + JSON.stringify(err);
        },
    }, 'paypal-button');
})();