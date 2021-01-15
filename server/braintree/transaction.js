const braintree = require("braintree");

const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "jxr4n8f2ttsbjs4r",
    publicKey: "3rd5wqzpxfw78tq5",
    privateKey: "86d9433c9c5395d1bc93e367973b2480"
});


gateway.transaction.sale({
    amount: "10.00",
    creditCard: {
        number: '4111111111111111',
        expirationDate: '02/2025',
        cvv: '123',
    },
    options: {
        submitForSettlement: true
    }
}, function (err, result) {
    if (result.success) {
        console.log(result);
    } else {
        // Handle errors
    }
});