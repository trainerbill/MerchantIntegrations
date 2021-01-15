// https://www.otterbox.com/en-us/cart
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

    var forms = jQuery('form[name="dwfrm_cart"]');

    loadPayPalCheckout(function () {

        forms.each(function (form) {
            var newForm = jQuery(forms[form]);
            newForm.hide();
            var buttonContainer = document.createElement('div');
            buttonContainer.id = 'paypal-button-container' + form;
            newForm.parent().append(buttonContainer);

            paypal.Button.render({
                env: 'production',
                style: {
                    layout: 'vertical',
                    size: 'responsive',    // medium | large | responsive
                    color: 'gold',       // gold | blue | silver | black
                    shape: 'rect',
                },
                funding: {
                    allowed: [paypal.FUNDING.CREDIT],
                    disallowed: [paypal.FUNDING.CARD]
                },

                payment: function (data, actions) {
                    // Form 
                    var formData = newForm.serialize();
                    console.log(newForm.attr('action'));
                    return new paypal.Promise(function (resolve, reject) {
                        var req1 = new XMLHttpRequest();
                        req1.open('post', newForm.attr('action'));
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
                        req1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        req1.send(formData);

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
            }, '#paypal-button-container' + form);
        });
        
    });

})();

// https://www.otterbox.com/on/demandware.store/Sites-otterbox_us_v2-Site/default/BasicBilling-Start
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

    var forms = jQuery('form[name="dwfrm_cart"]');

    loadPayPalCheckout(function () {

        var newForm = jQuery('#PaymentMethod_CREDIT_CARD');
        var buttonContainer = document.createElement('div');
        buttonContainer.id = 'paypal-button-container';
        newForm.append(buttonContainer);

        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'vertical',
                size: 'responsive',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            funding: {
                allowed: [paypal.FUNDING.CREDIT],
                disallowed: [paypal.FUNDING.CARD]
            },

            payment: function (data, actions) {
               
            
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', 'https://www.otterbox.com/on/demandware.store/Sites-otterbox_us_v2-Site/default/CybersourcePaypal-ExpressFromCart');
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
                    req1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    req1.send("");

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

