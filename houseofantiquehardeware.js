// https://www.houseofantiquehardware.com/checkout-2-05-0/cart-sb.ssp
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

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    var oldButton = jQuery('.btn-paypal-express > a');
    oldButton.hide();
    oldButton.parent().append(buttonContainer);
    oldButton.parent().append(errorContainer);
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        //var paypalForm = document.getElementById('paypalForm');
            paypal.Button.render({
                commit: false,
                env: 'production',
                style: {
                    layout: 'horizontal',  // horizontal | vertical
                    size:   'medium',    // medium | large | responsive
                    color:  'gold'       // gold | blue | silver | black
                },
                payment: function (data, actions) {
                    return new paypal.Promise(function (resolve, reject) {
						var req = new XMLHttpRequest();
                        req.open('get', oldButton.attr('href'));
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
                    document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
                },
            }, '#paypal-button');
        });
})();