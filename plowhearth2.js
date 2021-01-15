// minicart
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

    function createContainer(id, display = true) {
        var container = document.createElement('div');
        container.id = id;
        if (!display) {
            container.style.display = 'none';
        }
        return container;
    }

    loadPayPalCheckout(function () {

        // Minicart Button
        var miniCartButtons = jQuery('.area-btn-cart-hover > div');
        if (miniCartButtons.length > 0) {
            var miniCartContainer = createContainer('paypal-button-container-minicart');
            miniCartContainer.className = 'column';
            var errorContainer = createContainer('paypal-button-container-minicart-error');
            miniCartButtons[0].after(miniCartContainer);
            miniCartButtons[0].after(errorContainer);

            paypal.Button.render({
                env: 'production',
                style: {
                    layout: 'horizontal',
                    size: 'responsive',    // medium | large | responsive
                    color: 'gold',       // gold | blue | silver | black
                    shape: 'rect',
                },
                commit: false,
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
                    document.getElementById('paypal-button-container-minicart-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
                },
            }, '#paypal-button-container-minicart');

        }


        var cartButtons = jQuery('a[href*="/en/paypal/checkout/hop/expressCheckoutShortcut"]');
        if (cartButtons.length > 0) {
            oldButtons.each(function (index, value) {
                jQuery(value).hide();
                var cartContainer = createContainer('paypal-button-container-cart' + index);
                var errorContainer = createContainer('paypal-button-container-cart' + index);
                value.after(cartContainer);
    
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
                        document.getElementById('paypal-button-container-cart-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
                    },
                }, '#paypal-button-container-cart' + index);
            });
        }

        var paymentButtons = jQuery('input[name="paymentMethodSelection"]');
        if (paymentButtons.length > 0) {
            paymentButtons.each(function(i, v) { jQuery(v).attr('checked', false)});
            jQuery('.payWithCardSection').hide();
            var paymentButton = jQuery('#silentOrderSubmitButton');
            var paymentContainer = createContainer('paypal-button-container-payment', false);
            var errorContainer = createContainer('paypal-button-container-payment-error');
            paymentButton.after(paymentContainer);
            paymentButton.after(errorContainer);

            paymentButtons.change(function (event) {
                if (event.target.value === 'paypal') {
                    // Show PayPal
                    paymentButton.hide();
                    paymentContainer.style.display = 'initial';
                } else {
                    // Hide PayPal
                    paymentButton.show();
                    paymentContainer.style.display = 'none';
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
                    document.getElementById('paypal-button-container-payment-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
                },
            }, '#paypal-button-container-payment');
        }



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