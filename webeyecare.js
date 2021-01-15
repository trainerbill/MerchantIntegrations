payment-section

// https://pitstopusa.com/cart.html
(function () {

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Hide tab.  Instead of hiding the tab you should make it so that when you click the tab credit card is hidden and paypal shows.
    $('li[data-payment-type="Paypal"]').hide();

    var oldButton = jQuery('#wsm_cart_form input[src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/buy-logo-small.png"]')
    var form = jQuery('#wsm_cart_form');

    // Add new containers to DOM
    oldButton.parent().after(buttonContainer);
    oldButton.parent().after(errorContainer);
    oldButton.parent().hide();

    loadPayPalCheckout(function () {
        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'horizontal',
                size: 'medium',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            funding: {
                allowed: [paypal.FUNDING.CREDIT]
            },

            payment: function (data, actions) {

                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', 'https://www.webeyecare.com/net/PayPalRestCreatePaymentHandler.ashx');
                    req1.onload = function () {
                        resolve(req1.responseText.match(/(EC-\w+)/i)[0]);
                    };
                    
                    
                    req1.setRequestHeader("Content-Type", "application/json");
                    req1.send({
                        // THIS OBJECT NEEDS TO BE THE SAME AS THE SCREENSHOT IN EMAIL
                    });

                });
            },
            onAuthorize: function (data, actions) {
                // Volusion May do something here instead of redirecting.  Cannot find it in the source code.
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                // HANDE ERROR
                
            },
        }, '#paypal-button-container');
    });

})();


