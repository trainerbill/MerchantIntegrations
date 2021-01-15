var el = document.querySelector('.js_braintree_paypal_billing_button');
var config = JSON.parse(el.getAttribute('data-braintree-config'));
config.options = {
    flow: 'vault',
    locale: 'en_US',
    commit: false,
    enableShippingAddress: true,

};
el.setAttribute('data-braintree-config', JSON.stringify(config));
document.querySelector('div[data-method*="PayPal"]').style.display = 'initial';


