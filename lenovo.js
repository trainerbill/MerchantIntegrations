// https://www.lenovo.com/us/en/checkout/multi/add-delivery-address

// POST  | CSRFToken: 48ce3ff9-d7a7-4cff-8799-f849fd764e84
// POST https://centinel.cardinalcommerce.com/maps/payment_pp_redirect.asp?payload=208%7CLenovo%7CzgoPBOD2JJ49ejol7zE0%7CPP | PaReq: 208%7CLenovo%7CzgoPBOD2JJ49ejol7zE0%7CPP TermUrl: https%3A%2F%2Fwww.lenovo.com%3A443%2Fus%2Fen%2Fpaypal%2Fsc%2Fsummary

/*
<html>
<body onload="document.frmLaunch.submit();">
<form name="frmLaunch" method="POST" action="https://centinel.cardinalcommerce.com/maps/payment_pp_redirect.asp?payload=208%7CLenovo%7CSq1N4GwTiLMB6an2KCK0%7CPP">
<input type=hidden name="PaReq" value="208|Lenovo|Sq1N4GwTiLMB6an2KCK0|PP">
<input type=hidden name="TermUrl" value="https://www.lenovo.com:443/us/en/paypal/sc/summary">
<input type=hidden name="MD" value="">
</form>
</body>
</html>
*/

(function () {

    // THIS IS MY CLIENT ID!  You will need to go to developer.paypal.com and generate your own before going live.
    var clientId = 'AbIItCVNhzInKjb2UCXb1CnUoGFkcT5mhUIFlR6Sijgr0G--C2QdlRmzXNWlfgtTk9MM6igbDNQbjQ3o';

    // Globals
    var JQUERY_JS = 'https://code.jquery.com/jquery-3.4.1.min.js';
    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=USD&commit=false&vault=false&disable-funding=card&components=buttons,messages';
    var PROMISE = 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js';
    var container = document.body || document.head;

    function loadScripts(callback) {
        var jsloader = document.createElement('script');
        jsloader.setAttribute('src', LOADER_JS);
        container.appendChild(jsloader);
        jsloader.onload = function () {
            loadjs([PAYPAL_SCRIPT, PROMISE, JQUERY_JS], 'paypal');
            loadjs.ready('paypal', function () {
                callback();
            });
        };
    }

    function enablePayPal() {
        document.getElementById('klarna-banner-checkout').style.display = 'none';
        document.getElementById('zibby-banner-checkout').style.display = 'none';
        document.getElementById('paypal-button-container').style.display = 'initial';
        document.querySelector('.billing_section_continue_button').style.display = 'none';
    }

    function disablePayPal() {
        document.getElementById('klarna-banner-checkout').style.display = 'intial';
        document.getElementById('zibby-banner-checkout').style.display = 'initial';
        document.getElementById('paypal-button-container').style.display = 'none';
        document.querySelector('.billing_section_continue_button').style.display = 'initial';
    }
    // Create PayPal Credit Messaging Container
    var creditContainer = document.createElement('div');
    creditContainer.setAttribute('data-pp-message', '');
    // creditContainer.setAttribute('data-pp-amount', total);
    creditContainer.setAttribute('data-pp-style-layout', 'text');
    creditContainer.setAttribute('data-pp-style-ratio', '8x1');
    creditContainer.style.cssText = "display: inline-flex;border:1px solid #dddddd;border-radius:5px;width: 45%;padding: 5px;min-width: 280px;";
    document.querySelector('#klarna-banner-checkout').after(creditContainer);

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style.display = 'none';
    document.querySelector('.payment_method_content').after(buttonContainer);

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';
    document.querySelector('.payment_method_content').after(errorContainer);

    document.querySelectorAll('input[name="PAYMENT_TYPE"]').forEach(function (input) {
        input.addEventListener('click', function (event) {
            console.log(event.target.value);
            if (event.target.value === 'PAYPAL') {
                enablePayPal();
            } else {
                disablePayPal();
            }
        });
    })


    loadScripts(function () {

        paypal.Buttons({
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: '0.01'
                        }
                    }]
                });
                return 'EC-TOKEN';
            },
            onApprove: function (data, actions) {

                // This should keep the overlay open but its not working.  Looking into it
                return new Promise(function (resolve, reject) { });
            },
            onCancel: function (data, actions) {
                // Do nothing
            },
            onError: function (err) {
                console.log(err);
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }).render('#paypal-button-container');
    });
})();


