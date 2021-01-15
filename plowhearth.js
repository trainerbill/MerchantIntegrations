// Instructions
// Add the script tag to your header for all pages:  <script type="text/javascript" src="https://www.paypalobjects.com/api/checkout.js"></script>
// Add minicart.js to a script tag in your minicart HTML.  Needs to be there because the HTML is only loaded once you hover over it not when the page loads
// Add cart.js to your cart page in a script tag.
// Add payment.j to your payment page in a script tag.


// MiniCart
(function () {
    var oldButton = jQuery('.area-btn-cart-hover');

    // Minicart Container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container-minicart';
    buttonContainer.style['margin-top'] = '5px';
    buttonContainer.style['width'] = '150px';
    oldButton.after(buttonContainer);

    // Error Container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-button-container-minicart-error';
    errorContainer.style.display = 'none';
    oldButton.after(errorContainer);

    // Render Buttons
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
            disallowed: [paypal.FUNDING.CARD],
        },
        payment: function (data, actions) {
            return new paypal.Promise(function (resolve, reject) {
                var req1 = new XMLHttpRequest();
                req1.open('get', 'https://www.plowhearth.com/en/paypal/checkout/hop/expressCheckoutShortcut');
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
            console.log(err);
            document.getElementById('paypal-button-container-minicart-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
        },
    }, '#paypal-button-container-minicart');

})();

// https://www.plowhearth.com/en/cart
(function () {
    var oldButtons = jQuery('a[href*="/en/paypal/checkout/hop/expressCheckoutShortcut"]');

    oldButtons.each(function (index, value) {
        jQuery(value).hide();
        var buttonContainer = document.createElement('div');
        buttonContainer.id = 'paypal-button-container' + index;
        value.after(buttonContainer);

        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'vertical',
                size: 'medium',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            commit: false,
            funding: {
                allowed: [],
                disallowed: [paypal.FUNDING.CARD]
            },

            payment: function (data, actions) {
                
            
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', jQuery(value).attr('href'));
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
                        }å
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
                console.log(err);
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container' + index);
    });

})();

// https://www.plowhearth.com/en/checkout/multi/payment-method/add
(function () {

    var oldButton = jQuery('#silentOrderSubmitButton');

    var buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'none';
    buttonContainer.id = 'paypal-button-container';
    oldButton.after(buttonContainer);

    // Default selection to nothing
    jQuery('input[name="paymentMethodSelection"]').each(function(i, v) { jQuery(v).attr('checked', false)});
    jQuery('.payWithCardSection').hide();

    jQuery('input[name="paymentMethodSelection"]').change(function (event) {
        if (event.target.value === 'paypal') {
            // Show PayPal
            oldButton.hide();
            buttonContainer.style.display = 'initial';
        } else {
            // Hide PayPal
            oldButton.show();
            buttonContainer.style.display = 'none';
        }
    });
    
    paypal.Button.render({
        env: 'production',
        style: {
            layout: 'vertical',
            size: 'medium',    // medium | large | responsive
            color: 'gold',       // gold | blue | silver | black
            shape: 'rect',
        },
        commit: false,
        funding: {
            allowed: [],
            disallowed: [paypal.FUNDING.CARD]
        },

        payment: function (data, actions) {
            return new paypal.Promise(function (resolve, reject) {
                var req1 = new XMLHttpRequest();
                req1.open('get', 'https://www.plowhearth.com/en/checkout/multi/payment-method/expressCheckoutMark?subscribe=true');
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
            console.log(err);
            document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
        },
    }, '#paypal-button-container');
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