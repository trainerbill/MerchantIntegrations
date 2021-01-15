// https://www.wireandcableyourway.com/cart.php?m=view
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
    var oldEcButton = jQuery('img[src="https://www.paypal-marketing.com/paypal/html/partner/na/portal-v2/img/logos/checkout_logo_medium_170x32.png"]').parent();
    oldEcButton.hide();
	
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
            paypal.Button.render({
                env: 'production',
                style: {
                    layout: 'horizontal',  // horizontal | vertical
                    size:   'medium',    // medium | large | responsive
                    color:  'gold'       // gold | blue | silver | black
                },
                funding: {
                    allowed: [ paypal.FUNDING.CREDIT ]
                },
                payment: function (data, actions) {
                    return new paypal.Promise(function (resolve, reject) {
                        var req = new XMLHttpRequest();
                        req.open('get', oldEcButton.attr('href'));
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
                    console.log(err);
                    document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
                },
            }, '#paypal-button-container');
        });
})();


// https://www.wireandcableyourway.com/cart.php?m=product_detail&p=1150&quantity=1&riID=
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
    buttonContainer.id = 'paypal-button-container';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Add new containers to DOM
     $('input[alt="Add to Cart"]').after(buttonContainer);
     $('input[alt="Add to Cart"]').after(errorContainer);
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
            paypal.Button.render({
                env: 'production',
                style: {
                    layout: 'horizontal',  // horizontal | vertical
                    size:   'small',    // medium | large | responsive
                    color:  'gold'       // gold | blue | silver | black
                },
                funding: {
                    allowed: [ paypal.FUNDING.CREDIT ]
                },
                validate: function (actions) {
                    checkRequiredFields() ? actions.enable() : actions.disable();
                },
                payment: function (data, actions) {
                    // Form Data
                    var formData = $('form[name="productForm"]').serialize();
                    console.log(formData);
                    return new paypal.Promise(function (resolve, reject) {
                        // Add product to cart
                        var req = new XMLHttpRequest();
                        req.open('post', $('form[name="productForm"]').attr('action'));
                        req.onload = function () {
                            var req1 = new XMLHttpRequest();
                            req1.open('get', 'https://www.wireandcableyourway.com/cart.php?m=payPalCheckout');
                            req1.onload = function () {
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
                        }
                        req.send(formData);
                    });
                },
                onAuthorize: function (data, actions) {
                    return actions.redirect();
                },
                onCancel: function (data, actions) {
                    return actions.redirect();
                },
                onError: function (err) {
                    console.log(err);
                    document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
                },
            }, '#paypal-button-container');
        });
})();


// https://www.wireandcableyourway.com/checkout.php?m=fastcheckout
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
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style.display = 'none';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';
    
    var oldButton = $('#submitButtonImg');

    // Add new containers to DOM
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);

    $('input[name="paymentType"]').click(function (event) {
        if (event.currentTarget.value === 'PayPalExpress') {
            $('#paypal-button-container').show();
            oldButton.hide();
        } else {
            $('#paypal-button-container').hide();
            oldButton.show();
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
            
            payment: function (data, actions) {
                // Form 
                var form = $('form[name="address"]');
                
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', form.attr('action'));
                    req1.onload = function () {
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
                    req1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    req1.send(form.serialize());
                    
                });
            },
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                console.log(err);
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container');
    });
})();




/*
    DO NOT USE THIS CODE.  It is for video demo only
    1. Go here:  https://www.paypal.com/tagmanager/settings?entry=website
    2. Click add new website
    3. Select continue
    4. Select other at the bottom
    5. Copy and paste the javascript onto your site.
*/

(function () {
    var script = document.createElement('script');
    script.innerHTML =  ";(function(a,t,o,m,s){a[m]=a[m]||[];a[m].push({t:new Date().getTime(),event:'snippetRun'});var f=t.getElementsByTagName(o)[0],e=t.createElement(o),d=m!=='paypalDDL'?'&m='+m:'';e.async=!0;e.src='https://www.paypal.com/tagmanager/pptm.js?id='+s+d;f.parentNode.insertBefore(e,f);})(window,document,'script','paypalDDL','72c78d11-9fef-11e7-8e06-e965c75268e8');";
    document.head.appendChild(script);

})();