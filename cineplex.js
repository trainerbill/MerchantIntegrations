
(function() {
    // Targets
    var oldButton = jQuery("#t1");
    
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Add new containers to DOM
    oldButton.after(buttonContainer);
    oldButton.after(errorContainer);
    
    // Remove old button
    oldButton.hide();
    
    
    paypal.Button.render({
        env: 'sandbox',
        style: {
            layout: 'horizontal',  // horizontal | vertical
            size:   'medium',    // medium | large | responsive
            color:  'blue',       // gold | blue | silver | black
            tagline: false,
            label: 'generic'
        },
        payment: function (data, actions) {
            return paypal.request.get(oldButton.attr('href'));
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
    }, '#paypal-button');
        
})();