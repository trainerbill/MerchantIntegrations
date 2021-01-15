var client = 'ARFJ1BDV3Y3PGlpFylb8G6Ry58CNX1Uz8mQumhvEReq4BEsgSwdZnLp3BcJA';
var secret = 'EFFN8BBLrpboHGC-DzaA5kIqzaKTre-lhJesk0K7LDeV_oTWpoIoTd5tmpOl';

var req = new XMLHttpRequest();
req.open('post', ' https://api.sandbox.paypal.com/v1/oauth2/token');
req.setRequestHeader('Authorization', 'Basic ' + window.btoa(client + ':' + secret));
req.setRequestHeader('Accept', 'application/json');
req.setRequestHeader('Accept-Language', 'en_US');
req.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
req.onload = function () {
    var response = JSON.parse(req.responseText);
    var req2 = new XMLHttpRequest();
    req2.open('post', 'https://api.sandbox.paypal.com/v1/payments/payment');
    req2.setRequestHeader('Authorization', 'Bearer ' + response.access_token);
    req2.setRequestHeader('Accept', 'application/json');
    req2.setRequestHeader('Content-Type', "application/json");
    req2.onload = function () {
        console.log(req2.responseText);
    }
    req2.send(JSON.stringify({
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
        "transactions": [
          {
            "amount": {
              "total": "30.11",
              "currency": "USD",
            },
          }
        ],
        "note_to_payer": "Contact us for any questions on your order.",
        "redirect_urls": {
          "return_url": "https://example.com/return",
          "cancel_url": "https://example.com/cancel"
        }
      }));
    
};
req.send("grant_type=client_credentials");