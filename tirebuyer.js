// https://www.tirebuyer.com/tirebuyer/checkout

(function () {

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    var oldButton = $('#PayPalExpressCheckoutButton1');

    // Add new containers to DOM
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);

    oldButton.hide();


    paypal.Button.render({
        env: 'production',
        style: {
            size: 'medium',    // medium | large | responsive
            color: 'gold'       // gold | blue | silver x| black
        },
        funding: {
            allowed: [paypal.FUNDING.CREDIT]
        },

        payment: function (data, actions) {
            // Form 
            var form = oldButton.parent();

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

})();