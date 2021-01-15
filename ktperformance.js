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

    // Create PayPal button container
    var buttonContainer = document.createElement('p');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style.width = '200px';
    buttonContainer.style.display = 'block';
    buttonContainer.style.float = 'right';
    buttonContainer.style.clear = 'both';
    buttonContainer.style['margin-bottom'] = '10px';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    var oldButton = jQuery('#wsm_cart_form input[src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/buy-logo-small.png"]')
    var form = jQuery('#wsm_cart_form');

    // Add new containers to DOM
    oldButton.parent().parent().after(buttonContainer);
    oldButton.parent().parent().after(errorContainer);
    oldButton.parent().hide();

    loadPayPalCheckout(function () {
        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'horizontal',
                size: 'responsive',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            funding: {
                allowed: [paypal.FUNDING.CREDIT]
            },

            payment: function (data, actions) {

                document.getElementById('wsm_cart_action').value = 'checkout.paypalexpresscheckout';

                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', form.attr('action'));
                    req1.onload = function () {
                        resolve(req1.responseText.match(/(EC-\w+)/i)[0]);
                    };
                    
                    // req1.setRequestHeader('Accept', 'application/paypal-json-token');
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
