// https://hefy.org/index.php/donate
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
    
    // PayPal Container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';

    // Error Container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-button-container-error';
    
    // Hide Old Button
    var oldButton = document.querySelector('img[alt="paypal"]').parentNode;
    oldButton.style.display = 'none';

    // Insert Containers
    oldButton.parentNode.append(buttonContainer);
    oldButton.parentNode.append(errorContainer);

    loadPayPalCheckout(function () {

        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'vertical',
                size: 'responsive',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            commit: true,
            funding: {
                disallowed: [
                    paypal.FUNDING.CREDIT,
                ]
            },

            payment: function (data, actions) {
                var url = 'https://www.roomster.com/api/paypal?package_id=214&cancel_url=https%3A%2F%2Fwww.roomster.com%2Fpayments%2Fchoose-package%2F214%3Freturned_from%3Dpaypal%26action%3Dcancel&confirm_url=https%3A%2F%2Fwww.roomster.com%2Fpayments%2Fchoose-package%2F214%3Freturned_from%3Dpaypal%26action%3Dconfirm';
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', url);
                    req1.onload = function () {
                        // THis only works in IE 10+
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
                    req1.send();
                });
            },
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                document.getElementById('paypal-button-container-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container');
    });

})();

(function() {

    // Globals
    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    var BT_DROPIN_SCRIPT = 'https://js.braintreegateway.com/web/dropin/1.19.0/js/dropin.min.js';
    var container = document.body || document.head;

    function loadScripts(callback) {
        var jsloader = document.createElement('script');
        jsloader.setAttribute('src', LOADER_JS);
        container.appendChild(jsloader);
        jsloader.onload = function() {
            loadjs([BT_DROPIN_SCRIPT], 'braintree');
            loadjs.ready('braintree', function() {
                callback();
            });
        };        
    }

    var old = document.getElementById('paymentFormEl').childNodes[1].childNodes[2];
    old.style.display = 'none';

    // Create dropin container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'dropin-container';
    old.parentNode.append(buttonContainer);

    var applepay = 'sandbox_wq22jzvx_dcpspy2brwdjr3qn';
    var paypal = 'sandbox_f252zhq7_hh4cpc39zq4rgjcg';

    // Load PayPal script and render button.
    loadScripts(function () {
        braintree.dropin.create({
            authorization: paypal,
            container: '#dropin-container',
            paypal: {
                flow: 'vault'
              },
               paypalCredit: {
                flow: 'vault',
                amount: '10.00',
                currency: 'USD'
              },
              venmo: {},
              applePay: {
                displayName: 'My Store',
                paymentRequest: {
                  total: {
                    label: 'My Store',
                    amount: '19.99'
                  },
                  // We recommend collecting billing address information, at minimum
                  // billing postal code, and passing that billing postal code with all
                  // Apple Pay transactions as a best practice.
                  requiredBillingContactFields: ["postalAddress"]
                }
              },
              googlePay: {
                googlePayVersion: 2,
                merchantId: 'merchant-id-from-google',
                transactionInfo: {
                  totalPriceStatus: 'FINAL',
                  totalPrice: '123.45',
                  currencyCode: 'USD'
                },
                cardRequirements: {
                  // We recommend collecting and passing billing address information with all Google Pay transactions as a best practice.
                  billingAddressRequired: true
                }
              }
          }, function (createErr, instance) {
            button.addEventListener('click', function () {
              instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
                // Submit payload.nonce to your server
              });
            });
          });
    });
})();
