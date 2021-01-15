var oldButton = $('.braintree-cart-paypal-button');

// Create PayPal button container
var buttonContainer = document.createElement('div');
buttonContainer.id = 'paypal-button';

oldButton.after(buttonContainer);

oldButton.hide();
paypal.Button.render({
    env: 'production', // you don't need to ever change this
    validate: function (actions) {
        actions.disable();
    },
    onClick: function () {
        window.location.href = oldButton.attr('href');
    },
    payment: function () {},
    onAuthorize: function () {},
    style: {
        color: 'silver',
        shape: 'rect',
        size: 'responsive',
        tagline: false,
        label: 'paypal'
    }

}, '#paypal-button');