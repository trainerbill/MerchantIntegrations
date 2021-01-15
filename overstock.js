// https://www.overstock.com/cart
(function () {

    // Globals
    const CLIENT_ID = 'AWc8ZE2OOJ_73lwj7W4D-OZEV37mMQby88Ulrc9Xgkwcpbx_bNdkO4nETExC3EaRfgbyBpHJngQG_0Re';
    const LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    const PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=' + CLIENT_ID;
    const PROMISE = 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js';
    const container = document.body || document.head;

    function loadScripts(callback) {
        const jsloader = document.createElement('script');
        jsloader.setAttribute('src', LOADER_JS);
        container.appendChild(jsloader);
        jsloader.onload = function () {
            loadjs([PAYPAL_SCRIPT, PROMISE], 'paypal');
            loadjs.ready('paypal', function () {
                console.log('Scripts loaded');
                callback();
            });
        };
    }

    // Old Buttons
    const buttons = document.querySelectorAll("a[href*='/paypalcartsubmit']");

    if (buttons.length === 0) {
        // No buttons found
        return;
    }

    const oldButton = buttons[1].parentNode;

    // Hide old Button
    buttons[1].style.display = "none";

    // Link
    const link = buttons[1].href;

    // Create dropin container
    const buttonContainer = document.createElement('span');
    buttonContainer.id = 'paypal-container';
    // buttonContainer.textContent = 'this is a test';
    oldButton.appendChild(buttonContainer);

    // Style
    oldButton.style['margin-top'] = '10px';

    // Load PayPal script and render button.
    loadScripts(function () {
        // Always load the scripts to cache but only execute on certain URLs
        if (window.location.href.match(/https:\/\/www.overstock.com\/cart/)) {
            paypal.Buttons({
                createOrder: function () {
                    return new Promise(function (resolve, reject) {
                        var req1 = new XMLHttpRequest();
                        req1.open('get', link);
                        req1.onload = function () {
                            // THis only works in IE 10+
                            if (req1.responseURL && req1.responseURL.match('paypal.com') === null) {
                                return window.location.href = req1.responseURL;
                            }
                            try {
                                console.log(req1.responseText);
                                if (req1.responseText) {
                                    resolve(JSON.parse(req1.responseText).token);
                                }
                            } catch (err) {
                                throw err;
                            }
                        };
                        req1.setRequestHeader('Accept', 'application/paypal-json-token');
                        req1.send("");

                    });
                }
            }).render(buttonContainer);
        }
    });
})();