function loadPayPalCheckout(callback) {
    var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
    var container = document.body || document.head;
    var script = document.createElement('script');
    script.setAttribute('src', PAYPAL_SCRIPT);
    script.onload = function() { callback() };
    script.onerror = function(err) { callback(err) };     
    container.appendChild(script);
}

// Create PayPal button bottom container
var buttonContainer = document.createElement('div');
buttonContainer.id = 'paypal-button-container';
document.body.appendChild(buttonContainer);

// Load PayPal script and render button.
loadPayPalCheckout(function () {
    paypal.Button.render({
        env: 'sandbox', // sandbox | production
        commit: true,
        style: {
            size: 'medium', // medium | large | responsive
            shape: 'pill',
            color: 'gold' // gold | blue | silver | black
        },
        client: {
            sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
            production: 'GasdfgU690oI-7jzf_LlwZIGMy4qu-mEpYva8xdfhdfhfasdfgmYYuj56nCmIxpfgphasdfas'
        },
        payment: function(data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: 123.00, currency: 'PHP' },
                            item_list: {
                                items: [{
                                    name: 'a',
                                    description: 'abc',
                                    quantity: 1,
                                    price: 123.00,
                                    tax: 0,
                                    sku: 'a',
                                    currency: 'PHP'
                                }],
                                shipping_address: {
                                    recipient_name: 'Brian Robinson',
                                    line1: '4th Floor',
                                    line2: 'Unit #34',
                                    city: 'San Jose',
                                    country_code: 'PH',
                                    postal_code: '1600',
                                    phone: '09567888987',
                                    state: 'Metro Manila'
                                }
                            }
                        }
                    ],
                    redirect_urls: {
                        return_url: window.location.origin + "/success",
                        cancel_url: window.location.origin + "/failure"
                    }
                },
                experience: {
                    input_fields: {
                        no_shipping: 1
                    }
                }
            });
        },
        
        // Wait for the payment to be authorized by the customer
        
        onAuthorize: function(data, actions) {
            // Execute the payment
            console.log('authorization completed...');
            actions.redirect();
        },
        onCancel: function(data, actions) {
            console.log('authorization completed...');
            actions.redirect();
        },
        onError: function (err) {
            // Show an error page here, when an error occurs
            console.log(err);
        }
        }, '#paypal-button-container')
        .then(function() {
        console.log('button rendered...');
        });
});