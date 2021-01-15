(function() {
    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }

    // OldButtons
    var oldEcButton = jQuery('.paypal-button__link').last();
    oldEcButton.hide();
	
	// New Form
    var oldButtonData = $('#CmsMainForm').serialize();
    console.log(oldButtonData);
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';

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
                        req.open('post', 'https://www.burlington.com/ShoppingCart.aspx');
                        req.onload = function () {
                            req2 = new XMLHttpRequest();
                            req2.open('get', 'https://www.burlington.com/PayPalCheckout.aspx');
                            req2.onload = function () {
                                var form = $($.parseHTML(req2.responseText)).filter('#frmLaunch');
                                var req3 = new XMLHttpRequest()
                                req3.open(form.attr('method'), form.attr('action'))
                                req3.onload = function () {
                                    if (req3.responseURL && req3.responseURL.match('paypal.com') === null) {
                                        return window.location.href = req3.responseURL;
                                    }
                                    try {
                                        if (req3.responseText) {
                                            resolve(JSON.parse(req3.responseText).token);
                                        }
                                    } catch (err) {
                                        throw err;
                                    }
                                };
                                req3.setRequestHeader('Accept', 'application/paypal-json-token');
                                req3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                req3.send(form.serialize())
                            }
                            req2.send();
                        };
                        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        req.send(oldButtonData);
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
            }, '#paypal-button-container');
        });
})();

