(function () {

    // Update fundings sources and stuff on the URL
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R&disable-funding=card';
    // PayPal button will display after this target
    var target = $('.cart-actions');
    

    function loadPayPalCheckout(callback) {
        
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }

    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style['margin-top'] = '10px';
    
    
    target.append(buttonContainer);

    loadPayPalCheckout(function () {
        paypal.Buttons({
            
            createOrder: function (data, actions) {
                // Set up the transaction
                return actions.order.create({
                    purchase_units: [{
                    amount: {
                        value: '0.01'
                    }
                    }]
                });
            }
        }).render(buttonContainer);
    
    });

})();

(function () {

    // Update fundings sources and stuff on the URL
    var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
    // PayPal button will display after this target
    var target = document.getElementById('checkout-billing-submit').parentElement;
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style['margin-top'] = '10px';
    buttonContainer.style.display = 'none';

    jq('.component-CREDIT_CARD').hide();
    document.querySelectorAll('input[name="dwfrm_billing_paymentMethods_selectedPaymentMethodID"]').forEach(function(node) {
        jq(node).attr('checked', false);
        jq(node).parent().attr('class', '');
        node.addEventListener('change', function(event) {
            if (event.target.value === 'PAYPAL_DIRECT') {
                document.getElementById('checkout-billing-submit').style.display = 'none';
                buttonContainer.style.display = 'block';
            } else {
                document.getElementById('checkout-billing-submit').style.display = 'initial';
                buttonContainer.style.display = 'none';
                jq('.component-CREDIT_CARD').show();
            }
        });
    });

    function loadPayPalCheckout(callback) {
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }

    target.appendChild(buttonContainer);

    loadPayPalCheckout(function () {
        paypal.Button.render({
            env: 'production',
            style: {
                shape: 'rect',
                layout: 'vertical',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            funding: {
                allowed: [ paypal.FUNDING.CREDIT ],
                disallowed: [ paypal.FUNDING.CARD ]
            },
            payment: function (data, actions) {
                var formData = jq('#dwfrm_billing').serialize();
                formData += '&dwfrm_billing_save=' + encodeURIComponent('Continue to overview');
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', jq('#dwfrm_billing').attr('action'));
                    req1.onload = function () {
                        resolve(JSON.parse(req1.responseText).token);
                    };
                    req1.setRequestHeader('Accept', 'application/paypal-json-token');
                    req1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    req1.send(formData);
                });
            },
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container');
    
    });

})();