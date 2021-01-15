(function () {

    function populateInputs(payload, data) {

        document.getElementById('braintreePaypalNonce').value = payload.nonce;
        document.getElementById('braintreePaypalEmail').value = payload.details.email;
        // Not sure if this is right 
        document.querySelector('input[name*="braintreePaypalShippingAddress"]').value = JSON.stringify(payload.details.billingAddress);
        document.querySelector('input[name*="braintreePaypalBillingAddress"]').value = JSON.stringify(payload.details.shippingAddress);

        // Billing Form
        document.getElementById('dwfrm_billing_billingAddress_addressFields_firstName').value = payload.details.firstName;
        document.getElementById('dwfrm_billing_billingAddress_addressFields_lastName').value = payload.details.lastName;
        document.getElementById('dwfrm_billing_billingAddress_addressFields_address1').value = payload.details.billingAddress.line1;
        document.getElementById('dwfrm_billing_billingAddress_addressFields_city').value = payload.details.billingAddress.city;
        // This needs help
        document.getElementById('dwfrm_billing_billingAddress_addressFields_states_state').value = payload.details.billingAddress.state;
        document.getElementById('dwfrm_billing_billingAddress_addressFields_postal').value = payload.details.billingAddress.postalCode;
        // This needs help
        document.getElementById('dwfrm_billing_billingAddress_addressFields_country').value = payload.details.billingAddress.state;
        document.querySelector('input[name*="dwfrm_billing_billingAddress_phone_"]').value = payload.details.phone;

    }

    var orderButton = document.querySelector('.place-order');
    orderButton.style.display = 'none';

    // Payment method selection
    document.querySelectorAll('input[name*="dwfrm_billing_paymentMethods_selectedPaymentMethodID"]').forEach(function (node) {
        node.checked = false;
        node.addEventListener('click', function (event) {
            if (event.target.value === "CREDIT_CARD") {
                // Hide billing information
                document.querySelector('.billing-information').style.display = 'initial';
                document.getElementById('paypal-button-container').style.display = 'none';
                orderButton.style.display = 'initial';
            } else if (event.target.value === "PayPal") {
                // Hide billing information
                document.querySelector('.billing-information').style.display = 'none';
                document.getElementById('paypal-button-container').style.display = 'initial';
                orderButton.style.display = 'none';
            }
        });
    });



    // Hide old button
    var oldButton = document.querySelector('.js_braintree_paypalContent');
    oldButton.style.display = 'none';

    // Hide billing information
    document.querySelector('.billing-information').style.display = 'none';

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style.display = 'none';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);

    var el = document.querySelector('.js_braintree_paypal_billing_button');
    var config = JSON.parse(el.getAttribute('data-braintree-config'));
    console.log(config);
    braintree.client.create({
        authorization: config.clientToken
    }, function (clientErr, clientInstance) {

        // Stop if there was a problem creating the client.
        // This could happen if there is a network error or if the authorization
        // is invalid.
        if (clientErr) {
            console.error('Error creating client:', clientErr);
            return;
        }

        // Create a PayPal Checkout component.
        braintree.paypalCheckout.create({
            client: clientInstance
        }, function (paypalCheckoutErr, paypalCheckoutInstance) {

            paypal.Button.render({
                env: 'sandbox',
                style: {
                    size: 'medium',    // medium | large | responsive
                    color: 'gold'       // gold | blue | silver x| black
                },
                payment: function (data, actions) {
                    return paypalCheckoutInstance.createPayment({
                        flow: 'vault',
                        enableShippingAddress: true,
                    });
                },
                onAuthorize: function (data, actions) {
                    console.log("data", data);
                    return paypalCheckoutInstance.tokenizePayment(data)
                        .then(function (payload) {
                            // Insert nonce into form
                            console.log('payload', payload);
                            populateInputs(payload, data);
                            // Trigger click of order button.  Optional
                            orderButton.click();
                            // return new paypal.Promise();
                        });

                },
                onCancel: function (data, actions) {

                },
                onError: function (err) {
                    console.log(err);
                    document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
                },
            }, '#paypal-button-container');
        });

    });

})();