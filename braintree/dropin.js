// https://www.splendid.com/checkout/cart/
(function() {

    // Globals
    var LOADER_JS = 'https://cdnjs.cloudflare.com/ajax/libs/loadjs/3.6.1/loadjs.min.js';
    var BT_DROPIN_SCRIPT = 'https://js.braintreegateway.com/web/dropin/1.19.0/js/dropin.min.js';
    var container = document.body || document.head;

    function loadScripts(callback) {
        var jsloader = document.createElement('script');
        jsloader.setAttribute('src', LOADER_JS);
        container.appendChild(jsloader);
        jsloader.onload = function() {
            loadjs([BT_DROPIN_SCRIPT], 'braintree');
            loadjs.ready('braintree', function() {
                console.log('Scripts loaded');
                callback();
            });
        };        
    }

    var old = jQuery('#bsd-contribution-section-header-paymentinfo');
    old.hide();

    // Create dropin container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'dropin-container';
    old.after(buttonContainer);

    // Load PayPal script and render button.
    loadScripts(function () {

        var vaultedToken = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSjkuZXlKbGVIQWlPakUxTmpZMk5qa3pOemdzSW1wMGFTSTZJbVEwTTJSa05qUmlMV1JpTlRJdE5ESmlPQzA0WVRNekxXWmtNRGszTldJNVkyVXhZU0lzSW5OMVlpSTZJamQ0ZWpKdWREaHljM0EzY1dKNGJqUWlMQ0pwYzNNaU9pSkJkWFJvZVNJc0ltMWxjbU5vWVc1MElqcDdJbkIxWW14cFkxOXBaQ0k2SWpkNGVqSnVkRGh5YzNBM2NXSjRialFpTENKMlpYSnBabmxmWTJGeVpGOWllVjlrWldaaGRXeDBJanAwY25WbGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnZjSFJwYjI1eklqcDdJbU4xYzNSdmJXVnlYMmxrSWpvaU5qWTJPREF4TnpJMkluMTkuT0FBMlBZTlhHME44NWZkVnJkSllWMGdBYUJIUUJCTUVweUpybE4wWEFZOWR0QUJ4NDNCY0p3TUp0ZW5jM2k0V2ZiNjlOTGxXSHQ0bXlZRUpxamJhV3c/Y3VzdG9tZXJfaWQ9IiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzd4ejJudDhyc3A3cWJ4bjQvY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4In0sImNoYWxsZW5nZXMiOltdLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvN3h6Mm50OHJzcDdxYnhuNC9jbGllbnRfYXBpIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9vcmlnaW4tYW5hbHl0aWNzLXNhbmQuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS83eHoybnQ4cnNwN3FieG40In0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInBheXBhbEVuYWJsZWQiOnRydWUsInBheXBhbCI6eyJkaXNwbGF5TmFtZSI6IlJ5YW4ncyBTYW5kYm94IEdhdGV3YXkiLCJjbGllbnRJZCI6IkFUVlphMEVZcGV2Z29PVFBnUnEzZW93bkg2TE1ISkhtUElzOGlTcnlkeTVsMVRwNURVUUNxNFlkdWQyUm9JUVd5Z1ZRS1ZVeXYySjdEazVlIiwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6ZmFsc2UsImVudmlyb25tZW50Ijoib2ZmbGluZSIsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJiaWxsaW5nQWdyZWVtZW50c0VuYWJsZWQiOnRydWUsIm1lcmNoYW50QWNjb3VudElkIjoiZHJncnc1eGs2NmRkNjc4YiIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoiN3h6Mm50OHJzcDdxYnhuNCIsInZlbm1vIjoib2ZmbGluZSIsImFwcGxlUGF5Ijp7InN0YXR1cyI6Im1vY2siLCJjb3VudHJ5Q29kZSI6IlVTIiwiY3VycmVuY3lDb2RlIjoiVVNEIiwibWVyY2hhbnRJZGVudGlmaWVyIjoibWVyY2hhbnQuY29tLmJyYWludHJlZXNhbmRib3gucnlhbmpyZWdhbiIsInN1cHBvcnRlZE5ldHdvcmtzIjpbInZpc2EiLCJtYXN0ZXJjYXJkIiwiYW1leCIsImRpc2NvdmVyIl19LCJicmFpbnRyZWVfYXBpIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbSIsImFjY2Vzc190b2tlbiI6InNhbmRib3hfa3RyaHpzX2hqYmJ0aF9tNHR2c3BfNmZtdDNzXzk5NCJ9fQ==';
        var applepay = 'sandbox_wq22jzvx_dcpspy2brwdjr3qn';
        var paypal = 'sandbox_f252zhq7_hh4cpc39zq4rgjcg';

        braintree.dropin.create({
            authorization: paypal,
            container: '#dropin-container',
            paypal: {
                flow: 'vault'
              },
               paypalCredit: {
                flow: 'vault',
                amount: '10.00',
                currency: 'USD'
              },
              venmo: {},
              applePay: {
                displayName: 'My Store',
                paymentRequest: {
                  total: {
                    label: 'My Store',
                    amount: '19.99'
                  },
                  // We recommend collecting billing address information, at minimum
                  // billing postal code, and passing that billing postal code with all
                  // Apple Pay transactions as a best practice.
                  requiredBillingContactFields: ["postalAddress"]
                }
              },
          }, function (createErr, instance) {
            button.addEventListener('click', function () {
              instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
                // Submit payload.nonce to your server
              });
            });
          });
    });
})();