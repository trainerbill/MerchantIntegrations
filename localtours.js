paypal.Buttons({
    createOrder: function() {
      // DO whatever you need to do to get the EC token and return it here.  
      // Normally this would be done with an XHR call to a webservice.
      return 'EC-YOURTOKEN'

      // Example
      // WEBSERVICE_URL returns a JSON object { token: 'EC-TOKEN'}
      /*
      return fetch('WEBSERVICE_URL', {
        method: 'get',
        headers: {
            'content-type': 'application/json'
        }
        }).then(function(res) {
            return res.json();
        }).then(function(data) {
            return data.token;
       });
      */
    },
    onApprove: function(data, actions) {
        // Here you can do a redirect or use the data argument to perform other actions
        console.log(data);
        actions.redirect('http://www.google.com');
    },
  }).render('#paypal-button-container');