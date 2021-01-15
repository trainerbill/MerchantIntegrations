(function () {

    // POLYFILL currentScript
    document.currentScript = document.currentScript || (function () {
        return document.getElementById('govBrandsIntegration');
    })();

    // Globals
    var partnerId = document.currentScript.getAttribute('data-partner-id') ? document.currentScript.getAttribute('data-partner-id') : console.error('You must set data-partner-id');
    var containerId = document.currentScript.getAttribute('data-container-id') ? document.currentScript.getAttribute('data-container-id') : console.error('You must set data-container-id');
    var creditMessaging = document.currentScript.getAttribute('data-credit-messaging') ? true : false;
    var vault = document.currentScript.getAttribute('data-vault') ? true : false;

    // THIS IS MY CLIENT ID!  Replace this with the GovBrands main client id
    var clientId = 'AVeVRe54eHMWBZmFvgvSw65ss4XK5fPTR7pwy3xndadp4w11MYnw5YuDwxmo4dxgDFnTDP03FXwDFfzj';

    // Scripts
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&components=buttons,messages&disable-funding=card';
    if (vault) {
        PAYPAL_SCRIPT += '&vault=true';
    }

    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    var PROMISE = 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js';
    var FETCH = 'https://cdnjs.cloudflare.com/ajax/libs/fetch/3.0.0/fetch.min.js';
    var container = document.body || document.head;

    function loadScripts(callback) {
        var jsloader = document.createElement('script');
        jsloader.setAttribute('src', LOADER_JS);
        container.appendChild(jsloader);
        jsloader.onload = function () {
            loadjs([PROMISE, PAYPAL_SCRIPT, FETCH], 'polyfills');
            loadjs.ready('polyfills', function () {
                callback();
            });
        };
    }

    function createMessagingContainer(containerId) {
        var creditContainer = document.createElement('div');
        creditContainer.setAttribute('data-pp-message', '');
        // creditContainer.setAttribute('data-pp-amount', total);
        creditContainer.setAttribute('data-pp-style-layout', 'text');
        creditContainer.setAttribute('data-pp-style-logo-type', 'alternative');
        creditContainer.setAttribute('data-pp-style-logo-position', 'left');
        document.getElementById(containerId).before(creditContainer);
    }

    if (creditMessaging) {
        createMessagingContainer(containerId);
    }

    var createBillingAgreement = undefined;
    var createOrder = undefined;
    if (vault) {
        createBillingAgreement = function () {
            // var amnt = document.getElementById('paypalamnt').value;
            var CREATE_BILLING_AGREEMENT_URL =
                "https://uat.demovps.com/PayPalForPartners.Api/PayPalPartners/CreateBillingAgrementToken";
            return fetch(CREATE_BILLING_AGREEMENT_URL, {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(vm.billingAgreement)
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    console.log(data);
                    return data.token_id;
                });
        }
    } else {
        createOrder = function () {
            return fetch('YOURWEBSERVICE')
                .then(function (res) {
                    return res.json()
                })
                .then(function (data) {
                    return data.token_id;
                })
        }
    }

    loadScripts(function () {
        paypal.Buttons({
            createOrder: createOrder,
            createBillingAgreement: createBillingAgreement,
            onApprove: function (data, actions) {
                var billingObj = {
                    billingAgreementToken: data.billingToken,
                    partner_id: partnerId
                };
                return fetch(
                    "https://uat.demovps.com/PayPalForPartners.Api/PayPalPartners/ExecuteBillingAggrement",
                    {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(billingObj)
                    }
                )
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (details) {
                        // Show a success message to the buyer   
                        console.log(details);
                        vm.isPaypalModal = true;
                        vm.profile.firstName = details.payer.payer_info.first_name;
                        vm.profile.lastName = details.payer.payer_info.last_name;
                        vm.profile.address = details.payer.payer_info.billing_address;
                        vm.profile.phoneNumber = details.payer.payer_info.phone;
                        vm.profile.emailAddress = details.payer.payer_info.email;
                        vm.paypalBillingAgreementId = details.id;
                        vm.showMainPage = false;
                        vm.showPaymentMethodPage = false;
                        vm.showEcheckPage = false;
                        vm.showCardPage = false;
                        vm.profilePage = true;
                        vm.selectedPaymentMethod = 'PayPal';

                    });
            },
            onCancel: function (data, actions) {
                // Do nothing
            },
            onError: function (err) {
                console.log(err);
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }).render('#' + containerId);
    });
})();