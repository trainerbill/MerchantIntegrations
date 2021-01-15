// https://www.splendid.com/checkout/cart/
(function() {

    // Globals
    var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
    var BT_CLIENT_SCRIPT = 'https://js.braintreegateway.com/web/3.39.0/js/client.min.js';
    var BT_PP_SCRIPT = 'https://js.braintreegateway.com/web/3.39.0/js/paypal-checkout.min.js';
    var container = document.body || document.head;

    function loadScripts(callback) {
        var btClient = document.createElement('script');
        btClient.setAttribute('src', BT_CLIENT_SCRIPT);
        container.appendChild(btClient);

        var btClient = document.createElement('script');
        btClient.setAttribute('src', BT_PP_SCRIPT);
        container.appendChild(btClient);

        var ppscript = document.createElement('script');
        ppscript.setAttribute('src', PAYPAL_SCRIPT);
        ppscript.onerror = function(err) { callback(err) };
        ppscript.onload = function() { callback() };
        container.appendChild(ppscript);
    }

    // Load PayPal script and render button.
    loadScripts(function () {
        window.paypal.Button.render({
            braintree: braintree,
            client: {
                sandbox: window.checkoutConfig.payment.braintree.clientToken,
                production: window.checkoutConfig.payment.braintree.clientToken
            },
            env: 'production',
            
        }, '#paypal-button');
    });
})();