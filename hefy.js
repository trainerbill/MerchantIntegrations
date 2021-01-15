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

    var form = jQuery('#member-payment');
    jQuery('.form-actions a').hide();
    jQuery('.form-actions input').hide();
    
    
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    jQuery('.form-actions').append(buttonContainer);

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
                allowed: [],
                disallowed: [paypal.FUNDING.CREDIT]
            },

            payment: function (data, actions) {
               
            
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', form.attr('action'));
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
    });

})();
