// https://www.hvacquick.com/viewbasket.php
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
    $('.paypal-xpress-img').parent().hide();
    
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Append containers
    $('.paypal-xpress-img').parent().after(errorContainer);
    $('.paypal-xpress-img').parent().after(buttonContainer);

    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        paypal.Button.render({
            env: 'production',
            style: {
                size:   'small',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            payment: function () {
                return paypal.request.get('/ppcheckout.php', {
                    headers: {
                        'Accept': 'application/paypal-json-token'
                    }
                })
                .then(function (res) {
                    return res.token;
                }).catch(function (err) {
                    throw err;
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

// https://www.hvacquick.com/products.php
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

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Append containers
    $('.add-basket').after(errorContainer);
    $('.add-basket').after(buttonContainer);

    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        paypal.Button.render({
            env: 'production',
            style: {
                size:   'small',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            payment: function () {
                return new paypal.Promise(function (resolve, reject) {
                    $.ajax("", {
                        data: $("form[name='mainform']").serialize(),
                        method: 'POST',
                        success: function (response) {
                            return paypal.request.get('/ppcheckout.php', {
                                headers: {
                                    'Accept': 'application/paypal-json-token'
                                }
                            })
                            .then(function (res) {
                                resolve(res.token);
                            }).catch(function (err) {
                                reject(err);
                            });
                        },
                        error: function (error) {
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
        }, '#paypal-button')
    });
})();

