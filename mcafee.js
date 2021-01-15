(function () {

    // Remove old SDK
    delete window.paypal;

    // THIS IS MY CLIENT ID!  You will need to go to developer.paypal.com and generate your own before going live.
    var clientId = 'AVeVRe54eHMWBZmFvgvSw65ss4XK5fPTR7pwy3xndadp4w11MYnw5YuDwxmo4dxgDFnTDP03FXwDFfzj';

    // Globals
    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=USD&intent=order&commit=false&vault=false&disable-funding=card&components=buttons,messages';
    var PROMISE = 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js';
    var MATERIALIZE_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css';
    var MATERIALIZE_JS = 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js'
    var container = document.body || document.head;

    function loadScripts(callback) {
        var jsloader = document.createElement('script');
        jsloader.setAttribute('src', LOADER_JS);
        container.appendChild(jsloader);
        jsloader.onload = function () {
            loadjs([PAYPAL_SCRIPT, PROMISE, MATERIALIZE_CSS, MATERIALIZE_JS], 'paypal');
            loadjs.ready('paypal', function () {
                callback();
            });
        };
    }

    function createModalDOM() {
        var MODAL_HTML = `
        <!-- Modal Structure -->
        <div id="emailModal" class="modal">
            <div class="modal-content">
                <p>What email do you want to use?</p>
                <input type="text" id="paypalEmail" />

            </div>
            <div class="modal-footer">
                <a class="modal-close waves-effect waves-green btn-flat">Submit</a>
            </div>
        </div>
        `;
        var div = document.createElement('div');
        div.innerHTML = MODAL_HTML;
        document.body.appendChild(div);
    }

    // Clear PayPal Container
    var paypalContainer = document.querySelector('.paypalBillingFields').parentNode;
    paypalContainer.innerHTML = '';

    // Create PayPal Credit Messaging Container
    var creditContainer = document.createElement('div');
    creditContainer.style['margin-bottom'] = '10px';
    creditContainer.setAttribute('data-pp-message', '');
    // creditContainer.setAttribute('data-pp-amount', total);
    creditContainer.setAttribute('data-pp-style-layout', 'flex');
    creditContainer.setAttribute('data-pp-style-ratio', '8x1')
    paypalContainer.appendChild(creditContainer);

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';
    paypalContainer.appendChild(errorContainer);

    // Hide Old button
    var oldButton = document.getElementById('paypalExpressCheckoutContainerRd');
    oldButton.style.display = 'none';


    createModalDOM();


    loadScripts(function () {

        // Initialize Modal
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);

        console.log('modals', instances);


        paypal.Buttons({
            createOrder: function (data, actions) {

                // THIS was provided to the POST to  https://www.mcafee.com/consumer/ipz/purchaseworkflowservlet?operation=PURCHASE_WORKFLOW&cartVariation=cart.  I am mocking it for this demo.
                var MOCK = '{"PaymentBillingInfo":{"AccountId":"1","EmailAddress":"athroener@gmail.com","BillingAddress":{"County":"","State":"NE","CountryCode":"US","ZipPostalCode":"68128","BillingAddressFields":{"googlepay":["zipcode","state","county"],"creditcard":["firstname","lastname","zipcode","state","county"],"paypal":["zipcode","state","county"]},"ShowState":true,"ShowCounty":false},"PaymentDetails":{"PaymentType":"101","PaymentTypeValue":"paypal","isEncrypted":false,"IsPayPalExpressCheckout":false,"SafetechFraud":{"FraudSessionId":"cea3ca31d8b548dd8c9a1aecacc79394","ImageLocation":"","IframeSource":"","MerchantId":"","IsApplicable":false,"ShowProtectionLogo":false,"IsSafetechServerIsUp":false},"IsAutoRenewable":true,"PayPalPaymentInfo":{"CheckoutToken":"","PayerId":""},"PaymentGatewayType":0,"PaymentGatewayTypeValue":"Undefined","CpfEnabled":false},"BillingCountryCode":"US","BillingFields":"","CartExperience":"rscp"},"UserOptedARDetails":{"UserOptedAREnabled":false,"UpdateCartItemsARRequest":[]},"EulaTrackingRequest":{"Functionality":"registration","PackageCode":"mtp_521","VersionEula":"EULA_v7","TrackingTypeEula":"EULA","VersionPrivacy":"Default","TrackingTypePrivacy":"PRIVACYPOLICY"},"Optins":[]}';

                return new Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', 'https://www.mcafee.com/consumer/ipz/purchaseworkflowservlet?operation=PURCHASE_WORKFLOW&cartVariation=cart');
                    req1.onload = function () {
                        var response = JSON.parse(req1.responseText);
                        var token = response.Purchase.PayPalResponse.Purchase.ExpressCheckoutUrl.match(/(EC-\w+)/i)[0];
                        resolve(token);
                    };
                    req1.setRequestHeader('Accept', 'application/paypal-json-token');
                    req1.setRequestHeader('Content-Type', 'application/json');
                    req1.send(MOCK);
                });
            },
            onApprove: function (data, actions) {
                return actions.order.get().then((res) => {
                    console.log(res);
                    document.getElementById('paypalEmail').value = res.payer.email_address;
                    instances[0].open();
                })

            },
            onCancel: function (data, actions) {
                // Do nothing
            },
            onError: function (err) {
                console.log(err);
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }).render(paypalContainer);
    });
})();
