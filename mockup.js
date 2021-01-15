(function () {

    // Update fundings sources and stuff on the URL
    var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=sb&disable-funding=card';
    // PayPal button will display after this target
    var oldButton = jQuery('input[value="Add to Cart"]').parent().parent();
    

    function loadPayPalCheckout(callback) {
        
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }

    var buttonContainer = document.createElement('li');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style['margin-top'] = '10px';
    buttonContainer.style['margin-left'] = '5px';
    buttonContainer.style.width = "98%";
    
    oldButton.after(buttonContainer);

    loadPayPalCheckout(function () {
        paypal.Buttons().render(buttonContainer);
    
    });

})();