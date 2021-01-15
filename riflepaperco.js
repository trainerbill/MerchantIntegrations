// https://riflepaperco.com/checkout/cart/
// https://riflepaperco.com/checkout/onepage/
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

    loadPayPalCheckout(function () {

        
        var oldButtons = document.querySelectorAll('a[href="https://riflepaperco.com/paypal/express/start/button/1/"]');
        var count = 1;
        oldButtons.forEach(function (button) {
            // Hide Old Button
            button.parentNode.style.display = 'none';

            // PayPal Container
            var buttonContainer = document.createElement('div');
            buttonContainer.id = 'paypal-button-container-'+count;

            // Error Container
            var errorContainer = document.createElement('div');
            errorContainer.id = 'paypal-button-container-error-'+count;

            // Insert Containers
            button.parentNode.after(buttonContainer);
            button.parentNode.after(errorContainer);

            paypal.Button.render({
                env: 'production',
                style: {
                    layout: 'vertical',
                    size: 'responsive',    // medium | large | responsive
                    color: 'black',       // gold | blue | silver | black
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
                        req1.open('get', button.href);
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
                    document.getElementById('paypal-button-container-error-'+count).innerHTML = 'An error occured. ' + JSON.stringify(err);
                },
            }, '#paypal-button-container-'+count);
            count++;
        });
    });
})();

// https://riflepaperco.com/checkout/onepage/
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
    buttonContainer.style.display = 'none';

    // Error Container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-button-container-error';
    
    // Hide Old Button
    var oldButton = document.querySelector('#payment-buttons-container > button');
    

    // Add event listeners
    var radios = document.querySelectorAll('input[name="payment\[method\]"]');
    radios.forEach(function (radio) {
        radio.addEventListener('change', function (event) {
            if (event.target.value === 'paypal_express') {
                oldButton.style.display = 'none';
                buttonContainer.style.display = 'initial';
            } else {
                oldButton.style.display = 'initial';
                buttonContainer.style.display = 'none';
            }
        });
    });

    // Insert Containers
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);

    loadPayPalCheckout(function () {

        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'vertical',
                size: 'responsive',    // medium | large | responsive
                color: 'black',       // gold | blue | silver | black
                shape: 'rect',
            },
            commit: false,

            payment: function (data, actions) {
                // This is currently in their onclick...
                // payment.save();
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', 'https://riflepaperco.com/paypal/express/start');
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