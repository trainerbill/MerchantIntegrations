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

    jQuery('#payment-method-selector-paypal').empty();
    jQuery('#payment-method-selector-paypal').append(buttonContainer);
    jQuery('#payment-method-selector-paypal').append(errorContainer);

    // Tab Switching
    jQuery('a[data-target="#payment-method-selector-paypal"]').click(function () {
        jQuery('button[data-action="submit-step"]').hide();
    });

    jQuery('a[data-target="#payment-method-selector-creditcard"]').click(function () {
        jQuery('button[data-action="submit-step"]').show();
    });
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        //var paypalForm = document.getElementById('paypalForm');
            paypal.Button.render({
                commit: false,
                env: 'production',
                style: {
                    layout: 'vertical',  // horizontal | vertical
                    size:   'large',    // medium | large | responsive
                    color:  'gold'       // gold | blue | silver | black
                },
                funding: {
                    allowed: [ paypal.FUNDING.CREDIT, paypal.FUNDING.CARD ],
                    disallowed: []
                },
                payment: function (data, actions) {
                    return new paypal.Promise(function (resolve, reject) {
						var req = new XMLHttpRequest();
                        req.open('get', 'https://checkout.uscargocontrol.com/checkout-2-05-0/index.ssp?is=checkout&sc=18&paypal=T&next_step=opc');
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
                        req.send();
                    });
                },
                onAuthorize: function (data, actions) {
                    return window.location.href = "https://checkout.uscargocontrol.com/checkout-2-05-0/index.ssp?is=checkout&sc=18&paypal=DONE&fragment=opc&whence=#review"
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