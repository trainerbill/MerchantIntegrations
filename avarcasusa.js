// https://www.gearbubble.com/buy/checkout
(function() {

    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }
    
    // Targets
    $('.paypal-checkout > img').hide();
    
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Create PayPal validation container
    var validationContainer = document.createElement('div');
    validationContainer.id = 'paypal-validation';
    validationContainer.style.color = 'red';
    validationContainer.style.display = 'none';

    // Append containers
    $('.paypal-checkout > img').after(errorContainer);
    $('.paypal-checkout > img').after(buttonContainer);


    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        paypal.Button.render({
            commit: true,
            env: 'production',
            style: {
                // layout: 'vertical',  // horizontal | vertical
                size:   'large',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            payment: function () {
                return paypal.request.get('/bin/CheckOut.php', {
                    headers: {
                        'Accept': 'application/paypal-json-token'
                    }
                })
                .then(function (res) {
                    return res.token;
                }).catch(function (err) {
                    throw err;
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
            /*
            onClick: function() {
                toggleValidationContainer();
            },
            validate: function (actions) {
                validateForm() ? actions.enable() : actions.disable();
                document.forms[0].querySelectorAll('input[type="text"]').forEach(function (ele) {
                    document.getElementById(ele.id).addEventListener('change', function () {
                        document.getElementById('paypal-validation').style.display = 'none';
                        validateForm() ? actions.enable() : actions.disable(); 
                    });
                });
            }
            */
        }, '#paypal-button')
    });
})();


// Mock
(function() {
    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }
    
    function formEncode(form) {
       var ret = {};
       Object.keys(form.elements).forEach(function (key) {
            ret[form.elements[key].name] = form.elements[key].value;
        });
        return ret;
    
    }

    // Targets
    var oldButton = document.getElementsByName('commit')[0];
    var comment = document.getElementsByClassName('comment')[0];

    // Change comment text
    comment.innerHTML = 'By clicking the PayPal button you agree to our privacy policy and terms of service.';
    
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Mock form values
    document.getElementById('order_name').value = "Test";
    document.getElementById('order_email').value = "test@awesome.com";
    document.getElementById('order_address1').value = "Test";
    document.getElementById('order_city').value = "Test";
    document.getElementById('order_zip_code').value = "Test";
    document.getElementById('states_select').value = "AL";
    document.getElementById('countries_select').value = "US";
    
    // Hide form values
    document.forms[0].querySelectorAll('.row').forEach(function (ele) {
        ele.style.display = "none";
    });
    document.querySelector('.form-title').style.display = 'none';
    
    // Add new containers to DOM under the comment
    comment.parentNode.insertBefore(buttonContainer, comment.nextSibling);
    comment.parentNode.insertBefore(errorContainer, comment.nextSibling);
    
    // Remove old button
    oldButton.remove();

    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        paypal.Button.render({
            commit: true,
            env: 'production',
            funding: {
                allowed: [
                    paypal.FUNDING.VENMO,
                    paypal.FUNDING.CREDIT
                ]
            },
            style: {
                layout: 'vertical',  // horizontal | vertical
                size:   'large',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            payment: function () {
                return paypal.request.post('https://www.gearbubble.com/buy/checkout', formEncode(document.forms[0]), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/paypal-json-token'
                    }
                })
                .then(function (res) {
                    return res.token;
                }).catch(function (err) {
                    throw err;
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
        }, '#paypal-button')
    });
})();