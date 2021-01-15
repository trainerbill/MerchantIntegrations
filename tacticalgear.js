
// https://titlecheck.us/record_search.html#m=purchaseReport&vin=JH4KA7660RC001542
(function () {

    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=sb';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }

   
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';

    var oldButton = jQuery(jQuery('button[name="action_cart_add"]')[0]);

    oldButton.parent().after(buttonContainer);
    

    loadPayPalCheckout(function () {
        paypal.Buttons().render(buttonContainer);
    });

})();