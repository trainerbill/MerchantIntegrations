// https://www.marinedepot.com/Cart
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
    var oldButton = jQuery("img[src='//www.f3images.com/IMD/md_images/checkout-logo-medium.png").parent();
    
    // Create PayPal button bottom container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-bottom';

    // Create PayPal button top container
    var buttonContainer1 = document.createElement('span');
    buttonContainer1.id = 'paypal-button-top';
    buttonContainer1.className = 'pull-left';
    buttonContainer1.style['margin-top'] = '10px';

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
    jQuery('form[action="/Checkout"]').prepend(buttonContainer1);
    oldButton.parent().append(validationContainer);
    oldButton.parent().append(errorContainer);
    
    // Remove old button
    oldButton.hide();
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        [{
            id: 'paypal-button-bottom',
            style: {
                layout: 'vertical',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            funding: {
                allowed: [ paypal.FUNDING.CREDIT ]
            },
        },
        {
            id: 'paypal-button-top',
            style: {
                layout: 'horizontal',  // horizontal | vertical
                size:   'medium',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            funding: {
                allowed: [ paypal.FUNDING.CREDIT ]
            },
        }].forEach(function (button) {
            paypal.Button.render({
                env: 'production',
                style: button.style,
                funding: button.funding,
                payment: function (data, actions) {
                    return new paypal.Promise(function (resolve, reject) {
                        // This will not work in IE less than Edge due to the responseURL
                        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL
                        // It is needed due to redirect if a token and payerid exists in server session.  see comment below.
                        var req = new XMLHttpRequest();
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
            }, '#' + button.id);
        });
        
    });
})();

// https://www.marinedepot.com/Checkout
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
    var oldButton = jQuery("#optionPayPal");
    
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';
    buttonContainer.style.display = 'none';

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
    oldButton.parent().parent().append(buttonContainer);
    oldButton.parent().parent().append(validationContainer);
    oldButton.parent().parent().append(errorContainer);

    $('input[type=radio][name=PaymentType]').change(function() {
        if (this.value === 'paypal') {
            buttonContainer.style.display = 'block';
            jQuery('#complete-order').attr('disabled', 'disabled');
        } else {
            jQuery('#complete-order').attr('disabled', null);
            buttonContainer.style.display = 'none';
        }
    });

    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'vertical',  // horizontal | vertical
                size:   'medium',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            funding: {
                allowed: [ paypal.FUNDING.CREDIT ]
            },
            commit: true,
            payment: function (data, actions) {
                return new paypal.Promise(function (resolve, reject) {
                    
                    var req = new XMLHttpRequest();
                    req.open('post', '/Checkout/MainFormSubmit');
                    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                    req.onload = function () {
                        var req2 = new XMLHttpRequest();
                        req2.open('get', '/Checkout/Receipt');
                        req2.setRequestHeader('Accept', 'application/paypal-json-token');
                        req2.onload = function () {
                            if (req2.responseURL && req2.responseURL.match('paypal.com') === null) {
                                return window.location.href = req2.responseURL;
                            }
                            
                            try {
                                if (req2.responseText) {
                                    resolve(JSON.parse(req2.responseText).token);
                                }
                            } catch (err) {
                                throw err;
                            }
                            
                        }
                        req2.send();
                    };
                    req.send(jQuery('form[action="/Checkout/MainFormSubmit"]').serialize());
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

