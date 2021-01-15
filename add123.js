// https://titlecheck.us/record_search.html#m=purchaseReport&vin=JH4KA7660RC001542
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
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style.display = 'none';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    var oldButton = jQuery(jQuery('button[type="submit"]')[0]);

    // Add new containers to DOM
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);

    jQuery('input[name="payOption"]').change(function (event) {
        if (event.target.value === 'paypal') {
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
                size: 'medium',    // medium | large | responsive
                color: 'gold'       // gold | blue | silver x| black
            },
            commit: true,
            payment: function (data, actions) {
                // Form 
                var form = oldButton.parent();
    
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', 'https://titlecheck.us/api/order/place');
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
                    req1.setRequestHeader("Content-Type", "application/json");
                    const data = {
                        clientVersion: "TEST",
                        email: $('input[name="email"]').val(),
                        languageCode: $('input[name="languageCode"]').val(),
                        name: $('input[name="name"]').val(),
                        payPalCancelUrl: "https://titlecheck.us/record_search.html#m=cancel&orderUuid={orderUuid}&",
                        payPalReturnUrl: "https://titlecheck.us/record_search.html#m=payPalReturn&orderUuid={orderUuid}&",
                        phone: $('input[name="phone"]').val(),
                        runLevel: "PRODUCTION",
                        transactionType: "PAYPAL",
                    };
                    req1.send(JSON.stringify(data));
    
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