// https://www.tirebuyer.com/tirebuyer/checkout

(function () {

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    var oldButton = document.getElementById('paypalButton');

    // Add new containers to DOM
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);

    oldButton.style.display = 'none';


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
            return new paypal.Promise(function (resolve, reject) {
                var req1 = new XMLHttpRequest();
                req1.open('get', 'https://www.youngliving.com/api/shopping/paypal/express-checkout-token?cancelUrl=https:%2F%2Fwww.youngliving.com%2Fvo%2F%23%2Fguest-checkout&returnUrl=https:%2F%2Fwww.youngliving.com%2Fvo%2F%23%2Fguest-checkout');
                req1.onload = function () {

                    try {
                        if (req1.responseText) {
                            resolve(JSON.parse(req1.responseText).token);
                        }
                    } catch (err) {
                        throw err;
                    }
                };
                req1.setRequestHeader("authtoken", window.btoa(localStorage.getItem('authToken')));
                req1.send();
            });
        },
        onAuthorize: function (data, actions) {

            var payload = { token: data.paymentToken };
            console.log(data);

            return new paypal.Promise(function (resolve, reject) {
                var req1 = new XMLHttpRequest();
                req1.open('post', 'https://www.youngliving.com/api/shopping/paypal/add-payment');
                req1.onload = function () {

                    try {
                        if (req1.responseText) {
                            resolve(JSON.parse(req1.responseText).token);
                        }
                    } catch (err) {
                        throw err;
                    }
                };
                req1.setRequestHeader("authtoken", window.btoa(localStorage.getItem('authToken')));
                req1.setRequestHeader("Content-Type", 'application/json');
                req1.send(JSON.stringify(payload));
            });

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

// https://www.tirebuyer.com/tirebuyer/checkout

(function () {

    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function () { callback() };
        script.onerror = function (err) { callback(err) };
        container.appendChild(script);
    }

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    var oldButton = document.getElementsByClassName('member-benefits-banner-wrapper')[0];

    // Add new containers to DOM
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);

    loadPayPalCheckout(function () {

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
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', 'https://www.youngliving.com/api/shopping/paypal/express-checkout-token?cancelUrl=https:%2F%2Fwww.youngliving.com%2Fvo%2F%23%2Fguest-checkout&returnUrl=https:%2F%2Fwww.youngliving.com%2Fvo%2F%23%2Fguest-checkout');
                    req1.onload = function () {

                        try {
                            if (req1.responseText) {
                                resolve(JSON.parse(req1.responseText).token);
                            }
                        } catch (err) {
                            throw err;
                        }
                    };
                    req1.setRequestHeader("authtoken", window.btoa(localStorage.getItem('authToken')));
                    req1.send();
                });
            },
            onAuthorize: function (data, actions) {

                var payload = { token: data.paymentToken };

                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', 'https://www.youngliving.com/api/shopping/paypal/add-payment');
                    req1.onload = function () {

                        try {
                            if (req1.responseText) {
                                resolve(JSON.parse(req1.responseText).token);
                            }
                        } catch (err) {
                            throw err;
                        }
                    };
                    req1.setRequestHeader("authtoken", window.btoa(localStorage.getItem('authToken')));
                    req1.setRequestHeader("Content-Type", 'application/json');
                    req1.send(JSON.stringify(payload));
                });

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