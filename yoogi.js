(function () {

    // Update fundings sources and stuff on the URL
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R&disable-funding=card';
    // PayPal button will display after this target
    var target = $('.cart-actions').parent();
    

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