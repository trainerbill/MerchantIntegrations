// https://www.shop.com/nbts/ccn_cart.xhtml
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
    jQuery('.paypal-co-container').hide();
    jQuery('#PayPal-EasyPayment').hide();
    jQuery('img[src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/ppcredit_MD_BNPOT_1x.png"]').hide();
    var targetButtons = jQuery('img[src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/ppcredit_MD_BNPOT_1x.png"]');
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style['min-width'] = '250px';
    
    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    targetButtons[0].parentNode.parentNode.appendChild(buttonContainer);
    targetButtons[0].parentNode.parentNode.appendChild(errorContainer);


    // Create PayPal button container
    var buttonContainer2 = document.createElement('div');
    buttonContainer2.id = 'paypal-button-container2';
    buttonContainer2.style['min-width'] = '250px';
    
    // Create PayPal error container
    var errorContainer2 = document.createElement('div');
    errorContainer2.id = 'paypal-error2';
    errorContainer2.style.color = 'red';

    targetButtons[1].parentNode.parentNode.appendChild(buttonContainer2);
    targetButtons[1].parentNode.parentNode.appendChild(errorContainer2);

    loadPayPalCheckout(function () {
        paypal.Button.render({
            commit: false,
            env: 'production',
            style: {
                shape: 'rect',
                layout: 'horizontal',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            funding: {
                allowed: [ paypal.FUNDING.CREDIT ],
            },
            payment: function (data, actions) {
                return new paypal.Promise(function (resolve, reject) {
                    var req = new XMLHttpRequest();
                    req.open('get', 'https://www.shop.com/ShoppingCart/Checkout/Paypal/YIzUjjwWVkzmWjmzhUpwzZWkZzzwZhwwpjWkpezwmx/Token/soa?returnURL=https://www.shop.com/nbts/checkout/special?checkouttype=PayPal&cancelURL=https://www.shop.com/nbts/ccn_cart.xhtml&creditFlow=true&markFlow=false&_=1559931888974');
                    req.onload = function () {
                        try {
                            if (req.responseText) {
                                resolve(JSON.parse(req.responseText).tokenId);
                            }
                        } catch (err) {
                            throw err;
                        }
                    };
                    req.send();
                });
            },
            onAuthorize: function (data, actions) {
                return actions.redirect()
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container');

        paypal.Button.render({
            commit: false,
            env: 'production',
            style: {
                shape: 'rect',
                layout: 'horizontal',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            funding: {
                allowed: [ paypal.FUNDING.CREDIT ],
            },
            payment: function (data, actions) {
                return new paypal.Promise(function (resolve, reject) {
                    var req = new XMLHttpRequest();
                    req.open('get', 'https://www.shop.com/ShoppingCart/Checkout/Paypal/YIzUjjwWVkzmWjmzhUpwzZWkZzzwZhwwpjWkpezwmx/Token/soa?returnURL=https://www.shop.com/nbts/checkout/special?checkouttype=PayPal&cancelURL=https://www.shop.com/nbts/ccn_cart.xhtml&creditFlow=true&markFlow=false&_=1559931888974');
                    req.onload = function () {
                        try {
                            if (req.responseText) {
                                resolve(JSON.parse(req.responseText).tokenId);
                            }
                        } catch (err) {
                            throw err;
                        }
                    };
                    req.send();
                });
            },
            onAuthorize: function (data, actions) {
                return actions.redirect()
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                document.getElementById('paypal-error2').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container2');
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

