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

    // OldButtons
    var oldEcButton = jQuery('.PPexpress');
    var oldCreditButton = jQuery('.PPcredit');

    oldEcButton.hide();
    oldCreditButton.hide();
	
	// New Form
    var oldButtonData = $('#beginCheckoutFormPPExpress').serialize();

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Add new containers to DOM
     oldEcButton.after(buttonContainer);
     oldEcButton.after(errorContainer);
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        //var paypalForm = document.getElementById('paypalForm');
            paypal.Button.render({
                commit: true,
                env: 'production',
                style: {
                    layout: 'horizontal',  // horizontal | vertical
                    size:   'small',    // medium | large | responsive
                    color:  'gold'       // gold | blue | silver | black
                },
                funding: {
                    allowed: [ paypal.FUNDING.CREDIT ]
                },
                payment: function (data, actions) {
                    return new paypal.Promise(function (resolve, reject) {
						var req = new XMLHttpRequest();
                        req.open('post', 'https://www.surlatable.com/cart/checkoutLoginPPExpress.jsp');
                        req.onload = function () {
                            var req2 = new XMLHttpRequest();
                            req.open('post', 'https://www.surlatable.com/checkout/opc/paypalExpress.jsp?checkOut=0&easyPay=false&_DARGS=/cart/include/beginCheckoutFormPPExpress.jsp');
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
                            req.send(oldButtonData);
                        };
                        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        req.send('setVar=yes&noSteps=false');
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

