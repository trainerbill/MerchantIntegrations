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
    buttonContainer.style['margin-top'] = '5px';
    buttonContainer.style['margin-right'] = '15px';
    buttonContainer.style['margin-left'] = '15px';

    // Error Container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-button-container-error-mini';
    
    // Hide Old Button
    var oldButton = document.querySelector('.mini-cart-link-checkout');

    // Insert Containers
    
    oldButton.parentNode.after(buttonContainer);
    oldButton.parentNode.after(errorContainer);

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
                allowed: [ paypal.FUNDING.CREDIT],
                disallowed: [
                    paypal.FUNDING.CARD,
                ]
            },

            payment: function (data, actions) {
                
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', 'https://www.blackdiamondequipment.com/on/demandware.store/Sites-BlackDiamond-Site/en_US/Cart-Show/C1325478368');
                    req1.onload = function () {
                        try {
                            if (req1.responseText) {
                                var tokens = req1.responseText.match(/(EC-\w+)/i);
                                resolve(tokens[0]);
                            }
                        } catch (err) {
                            throw err;
                        }
                    };
                    req1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    req1.send('dwfrm_cart_expressCheckout');
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

// https://www.blackdiamondequipment.com/on/demandware.store/Sites-BlackDiamond-Site/en_US/Cart-Show/C1321680811
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
    
    
    
    // Old Buttons
    var oldButtons = document.querySelectorAll('button[name="dwfrm_cart_expressCheckout"]');

    loadPayPalCheckout(function () {
        var count = 1;

        oldButtons.forEach(function (button) {
            button.style.display = 'none';

            // Makee Containers
            // PayPal Container
            var buttonContainer = document.createElement('span');
            buttonContainer.id = 'paypal-button-container-' + count;
            buttonContainer.className = 'paypal-checkout-btn';
            buttonContainer.style['min-width'] = '250px';
            buttonContainer.style['display'] = 'inline-block';
            buttonContainer.style['position'] = 'relative';
            buttonContainer.style['top'] = '15px';

            // Error Container
            var errorContainer = document.createElement('span');
            errorContainer.id = 'paypal-button-container-error-' + count;

            // Insert Containers
            button.parentNode.after(buttonContainer);
            button.parentNode.after(errorContainer);

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
                    allowed: [ paypal.FUNDING.CREDIT],
                    disallowed: [
                        paypal.FUNDING.CARD,
                    ]
                },
    
                payment: function (data, actions) {
                    
                    return new paypal.Promise(function (resolve, reject) {
                        var req1 = new XMLHttpRequest();
                        req1.open('post', button.parentNode.action);
                        req1.onload = function () {
                            
                            try {
                                console.log(req1.responseText);
                                if (req1.responseText) {
                                    var tokens = req1.responseText.match(/(EC-\w+)/i);
                                    console.log(tokens);
                                    resolve(tokens[0]);
                                    
                                }
                            } catch (err) {
                                throw err;
                            }
                        };
                        req1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        // req1.setRequestHeader('Accept', 'application/paypal-json-token');
                        req1.send('dwfrm_cart_expressCheckout');
                    });
                },
                onAuthorize: function (data, actions) {
                    return actions.redirect();
                },
                onCancel: function (data, actions) {
                    return actions.redirect();
                },
                onError: function (err) {
                    document.getElementById('paypal-button-container-error-' + count).innerHTML = 'An error occured. ' + JSON.stringify(err);
                },
            }, '#paypal-button-container-' + count);

            count++;
        });
    });
})();

// https://www.blackdiamondequipment.com/en/checkout-start?dwcont=C1326153291
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
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style.display = 'none';

    // Error Container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-button-container-error';
    
    // Hide Old Button
    var oldButton = document.querySelector('button[name="dwfrm_billing_save"]')

    // Insert Containers
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);

    // Hide credit cards on load
    document.getElementById('PaymentMethod_CREDIT_CARD').style.display = 'none';

    var radios = document.querySelectorAll('input[name="dwfrm_billing_paymentMethods_selectedPaymentMethodID"]');
    radios.forEach(function (radio) {
        radio.checked = false;
        radio.addEventListener('change', function (event) {
            if (event.target.value === 'PayPal') {
                // Hide CC and Submit
                document.getElementById('PaymentMethod_CREDIT_CARD').style.display = 'none';
                oldButton.style.display = 'none';
                buttonContainer.style.display = 'initial';
            } else {
                // Hide PP and show CC/Submit
                document.getElementById('PaymentMethod_CREDIT_CARD').style.display = 'initial';
                oldButton.style.display = 'initial';
                buttonContainer.style.display = 'none';
            }
        });
    });

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
                allowed: [ paypal.FUNDING.CREDIT],
            },

            payment: function (data, actions) {
                
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', document.getElementById('dwfrm_billing').action);
                    req1.onload = function () {
                        
                        try {
                            console.log(req1.responseText);
                            if (req1.responseText) {
                                var tokens = req1.responseText.match(/(EC-\w+)/i);
                                console.log(tokens);
                                resolve(tokens[0]);
                                
                            }
                        } catch (err) {
                            throw err;
                        }
                    };
                    req1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    // req1.setRequestHeader('Accept', 'application/paypal-json-token');
                    req1.send(jQuery('#dwfrm_billing').serialize());
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