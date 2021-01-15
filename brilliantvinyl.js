// https://www.brilliantvinyl.com/get_block.php?block=minicart&language=en
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

    var oldButton = jQuery('input[src*="skin/reboot/images/express-checkout-hero.png"]');
    oldButton.hide();
    
    // Create Button Container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style['max-width'] = '400px';
    buttonContainer.style.margin = 'auto';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    oldButton.after(errorContainer);
    oldButton.after(buttonContainer);

    loadPayPalCheckout(function () {

        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'horizontal',
                size: 'responsive',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            commit: false,
            funding: {
                allowed: [paypal.FUNDING.CREDIT],
            },

            payment: function (data, actions) {
               
                var form = jQuery('#paypalexpressbuttonform');
            
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', form.attr('action') + '?' + form.serialize());
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

// https://www.brilliantvinyl.com/cart.php?mode=checkout
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
    var oldButton = jQuery('button[title="Submit Order"]');

    // Create Button Container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style['min-width'] = '400px';
    buttonContainer.style.margin = 'auto';
    buttonContainer.style.display = 'none';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    oldButton.parent().after(errorContainer);
    oldButton.parent().after(buttonContainer);

    jQuery('input[name="paymentid"]').change(function (event) {
        if (event.target.value === '18') {
            oldButton.hide();
            buttonContainer.style.display = 'initial';
        } else {
            oldButton.show();
            buttonContainer.style.display = 'none';
        }
    });
    

    loadPayPalCheckout(function () {

        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'horizontal',
                size: 'responsive',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            commit: true,
            funding: {
                allowed: [paypal.FUNDING.CREDIT],
            },

            payment: function (data, actions) {
               
                var form = jQuery('#checkout_form');
            
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open(form.attr('method'), form.attr('action') + '?' + form.serialize());
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
