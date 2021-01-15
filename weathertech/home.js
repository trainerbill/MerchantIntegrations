(function () {

    // THIS IS MY CLIENT ID!  You will need to go to developer.paypal.com and generate your own before going live.
    var clientId = 'AVeVRe54eHMWBZmFvgvSw65ss4XK5fPTR7pwy3xndadp4w11MYnw5YuDwxmo4dxgDFnTDP03FXwDFfzj';

    // Globals
    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    // Recommending loading the same script on all the pages so that it is cached.  alternatively you can load only the messaging component which is faster.
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=USD&intent=capture&commit=false&vault=false&disable-funding=card&components=buttons,messages';
    var container = document.body || document.head;

    function loadScripts(callback) {

        if (window.paypal) {
            delete window.paypal;
        }

        var jsloader = document.createElement('script');
        jsloader.setAttribute('src', LOADER_JS);
        container.appendChild(jsloader);
        jsloader.onload = function () {
            loadjs([PAYPAL_SCRIPT], 'paypal');
            loadjs.ready('paypal', function () {
                callback();
            });
        };
    }

    // Create PayPal Credit Messaging Container
    var creditContainer = document.createElement('div');
    creditContainer.setAttribute('data-pp-message', '');
    creditContainer.setAttribute('data-pp-placement', 'home');
    // creditContainer.setAttribute('data-pp-amount', brontoCart.grandTotal);
    creditContainer.setAttribute('data-pp-style-layout', 'flex');
    creditContainer.setAttribute('data-pp-style-logo-type', 'alternative');
    creditContainer.setAttribute('data-pp-style-logo-position', 'left');
    creditContainer.setAttribute('data-pp-style-color', 'black');
    creditContainer.setAttribute('data-pp-style-ratio', '20x1');
    creditContainer.style['margin-bottom'] = '15px';
    creditContainer.style['margin-top'] = '-10px';

    document.querySelector('.block').before(creditContainer);

    loadScripts(function () {

    });

})();