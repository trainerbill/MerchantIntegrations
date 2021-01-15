// https://www.onlinecarstereo.com/caraudio/shoppingcart.aspx
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
    var buttonContainer = document.createElement('li');
    buttonContainer.id = 'paypal-button';
    
    // Create PayPal error container
    var errorContainer = document.createElement('li');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    var oldButton = jQuery('img[title="Checkout with PayPal"]').parent();
    oldButton.hide();
    oldButton.parent().after(buttonContainer);
    oldButton.parent().after(errorContainer);

    loadPayPalCheckout(function () {
        paypal.Button.render({
            commit: false,
            env: 'production',
            style: {
                shape: 'rect',
                layout: 'vertical',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            funding: {
                allowed: [ paypal.FUNDING.CREDIT ],
                disallowed: [ paypal.FUNDING.CARD]
            },
            payment: function (data, actions) {
                return new paypal.Promise(function (resolve, reject) {
                    var req = new XMLHttpRequest();
                    req.open('get', oldButton.attr('href'));
                    req.setRequestHeader('Accept', 'application/paypal-json-token');
                    req.onload = function () {
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
                return actions.redirect()
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

