(function () {

    // THIS IS MY CLIENT ID!  You will need to go to developer.paypal.com and generate your own before going live.
    var clientId = 'AVeVRe54eHMWBZmFvgvSw65ss4XK5fPTR7pwy3xndadp4w11MYnw5YuDwxmo4dxgDFnTDP03FXwDFfzj';

    // Globals
    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    // Recommending loading the same script on all the pages so that it is cached.  alternatively you can load only the messaging component which is faster.
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=USD&intent=authorize&commit=false&vault=false&disable-funding=card&components=buttons,messages';
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

    var messagingContainer = document.createElement('div');
    messagingContainer.style['background-color'] = '#000000';
    messagingContainer.style['padding-top'] = '5px';

    // Create PayPal Credit Messaging Container
    var creditContainer = document.createElement('div');
    creditContainer.setAttribute('data-pp-message', '');
    creditContainer.setAttribute('data-pp-placement', 'home');
    creditContainer.setAttribute('data-pp-style-layout', 'text');
    creditContainer.setAttribute('data-pp-style-text-color', 'white');
    creditContainer.style['width'] = '600px';
    creditContainer.style['margin'] = 'auto';

    messagingContainer.append(creditContainer);

    document.querySelectorAll('.jss_35')[1].after(messagingContainer);

    loadScripts(function () {

    });

})();