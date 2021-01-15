localStorage.setItem('BRAINTREE_PUBLIC_KEY', 'b2nzckyks7cwdbnv');
localStorage.setItem('BRAINTREE_PRIVATE_KEY', '15172c79fc67b36a6b072d41c5eb186d');
localStorage.setItem('BRAINTREE_GATEWAY_ID', '8sgh7d7cq8yzqcj5');
localStorage.setItem('BRAINTREE_ENVIRONMENT', 'sandbox');
localStorage.setItem('BRAINTREE_TOKENIZATION_KEY', 'sandbox_fw9crhcn_8sgh7d7cq8yzqcj5');

var jsloader = document.createElement('script');
jsloader.setAttribute('src', 'https://unpkg.com/braintree-isomorphic-functions@1.0.2/lib/braintree-isomorphic-functions.js');
document.head.appendChild(jsloader);
jsloader.onload = function () {
    const secure = window.btoa('b2nzckyks7cwdbnv:15172c79fc67b36a6b072d41c5eb186d');

    const body = '<transaction><type>sale</type><amount>10</amount><payment-method-nonce>fake-valid-nonce</payment-method-nonce><options><submit-for-settlement>true</submit-for-settlement></options></transaction>';
    fetch("https://api.sandbox.braintreegateway.com/merchants/8sgh7d7cq8yzqcj5/transactions", {
        body,
        headers: {
            Authorization: "Basic " + secure,
            "Content-Type": "application/xml",
            "X-Apiversion": "4"
        },
        method: "POST"
    }).then(res => res.text()).then(data => console.log(data))

    const data = {
        query: `mutation chargePaymentMethod($input: ChargePaymentMethodInput!) {
            chargePaymentMethod(input: $input) {
                transaction {
                id
                legacyId
                status
                statusHistory {
                    ... on GatewayRejectedEvent {
                    gatewayRejectionReason
                    }
                }
                }
            }
            }`,
        variables: {
            input: {
                paymentMethodId: 'fake-valid-visa-nonce',
                transaction: {
                    amount: '5'
                }
            }
        }
    };

    braintreeFunctions.Payments.chargePaymentMethod('fake-valid-visa-nonce', { amount: '15.60' }).then(res => res.text()).then(data => console.log(data))
};

curl https://forwarding.sandbox.braintreegateway.com/ \
  -H "Content-Type: application/json" \
  -X POST \
  -u "b2nzckyks7cwdbnv:15172c79fc67b36a6b072d41c5eb186d" \
  -d '{"merchant_id":"8sgh7d7cq8yzqcj5","payment_method_nonce":"fake-apple-pay-visa-nonce","url":"https://httpbin.org/post","method":"POST","config":{"name":"inline_example","methods":["POST"],"url":"^https://httpbin\\.org/post$","request_format":{"/body":"urlencode"},"types":["ApplePayCard"],"transformations":[{"path":"/body/card[number]","value":"$number"}]}}'