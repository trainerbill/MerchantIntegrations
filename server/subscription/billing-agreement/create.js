var client = 'ARkR7soWd2kUxFCNPHOmyb3IQhOwiL-wYhRmsRRD1SdslE0u-lCEps4LdN_KocpyEPgaWJXcsFuwd99M';
var secret = 'ECSQrtNCk09UyKoHfSWuogfaQRmjbgVy9Mg7nc6JOI48z_dMfNonz-3Z3KFCLeX5qhFLGJ9e--DY59gV';

var req = new XMLHttpRequest();
req.open('post', ' https://api.sandbox.paypal.com/v1/oauth2/token');
req.setRequestHeader('Authorization', 'Basic ' + window.btoa(client + ':' + secret));
req.setRequestHeader('Accept', 'application/json');
req.setRequestHeader('Accept-Language', 'en_US');
req.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
req.onload = function () {
    var response = JSON.parse(req.responseText);
    var req2 = new XMLHttpRequest();
    req2.open('post', 'https://api.sandbox.paypal.com/v1/payments/billing-plans');
    req2.setRequestHeader('Authorization', 'Bearer ' + response.access_token);
    req2.setRequestHeader('Accept', 'application/json');
    req2.setRequestHeader('Content-Type', "application/json");
    req2.onload = function () {
      var response2 = JSON.parse(req2.responseText);
      var req3 = new XMLHttpRequest();
      req3.open('PATCH', 'https://api.sandbox.paypal.com/v1/payments/billing-plans/' + response2.id);
      req3.setRequestHeader('Authorization', 'Bearer ' + response.access_token);
      req3.setRequestHeader('Accept', 'application/json');
      req3.setRequestHeader('Content-Type', "application/json");
      req3.onload = function () {
        var req4 = new XMLHttpRequest();
        req4.open('post', 'https://api.sandbox.paypal.com/v1/payments/billing-agreements');
        req4.setRequestHeader('Authorization', 'Bearer ' + response.access_token);
        req4.setRequestHeader('Accept', 'application/json');
        req4.setRequestHeader('Content-Type', "application/json");
        req4.onload = function () {
          console.log(req4.responseText);
          var done = JSON.parse(req4.responseText);
          var token = done.links[0].href.match(/(EC-\w+)/i)[0];
          console.log("Return the token in the payment callback of the checkoutjs script.  TOKEN: " + token);
        }
        req4.send(JSON.stringify(
          {
            "name": "Override Agreement",
            "description": "PayPal payment agreement that overrides merchant preferences and shipping fee and tax information.",
            "start_date": "2019-12-22T09:13:49Z",
            "payer": {
              "payment_method": "paypal"
            },
            "plan": {
              "id": response2.id
            },
            "shipping_address": {
              "line1": "Hotel Staybridge",
              "line2": "Crooke Street",
              "city": "San Jose",
              "state": "CA",
              "postal_code": "95112",
              "country_code": "US"
            },
          }
        ));
      }
      req3.send(JSON.stringify([
        {
          "op": "replace",
          "path": "/",
          "value": {
            "state": "ACTIVE"
          }
        }
      ]));
    }
    req2.send(JSON.stringify({
      "name": "Plan with Regular and Trial Payment Definitions",
      "description": "Plan with regular and trial payment definitions.",
      "type": "FIXED",
      "payment_definitions": [
        {
          "name": "Regular payment definition",
          "type": "REGULAR",
          "frequency": "MONTH",
          "frequency_interval": "2",
          "amount": {
            "value": "100",
            "currency": "USD"
          },
          "cycles": "12",
          "charge_models": [
            {
              "type": "SHIPPING",
              "amount": {
                "value": "10",
                "currency": "USD"
              }
            },
            {
              "type": "TAX",
              "amount": {
                "value": "12",
                "currency": "USD"
              }
            }
          ]
        }
      ],
      "merchant_preferences": {
        "setup_fee": {
          "value": "1",
          "currency": "USD"
        },
        "return_url": "https://example.com",
        "cancel_url": "https://example.com/cancel",
        "auto_bill_amount": "YES",
        "initial_fail_amount_action": "CONTINUE",
        "max_fail_attempts": "0"
      }
    }));
    
};
req.send("grant_type=client_credentials");