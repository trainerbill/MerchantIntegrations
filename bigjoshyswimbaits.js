
var strToken2;
var strResult;
var strRetToken = "";
var reportError;

paypal.Button.render({
    env: 'production',
    commit: true, // Show a 'Pay Now' button
    style: {
        layout: 'vertical',   // horizontal | vertical
        size: 'medium',     // medium | large | responsive
        shape: 'rect',    // pill | rect
        color: 'gold',     // gold | blue | silver | black
        fundingicons: false
    },

    funding: {
        allowed: [],
        disallowed: [paypal.FUNDING.CREDIT, paypal.FUNDING.CARD]
    },

    payment: function (data, actions) {
        return new paypal.Promise(function (resolve, reject) {
            jQuery.ajax({
                url: 'paypal_express.asp?ch=0&ajaxpp=1&originCheckout=0',
                type: 'POST',
                async: false,
                cache: false,
                headers: { 'Accept': 'application/paypal-json-token' },
                success: function (res, status, jqXHR) {
                    resolve(res.token);
                },
                error: function (err) {
                    reject(err);
                    reportError(err);
                }
            });
        });
    },

    onAuthorize: function (data, actions) {

        jQuery.ajax({
            url: 'paypal_express.asp?ajaxpp=1&token=' + strRetToken,
            dataType: 'html',
            type: 'POST',
            async: false,
            cache: false,
            success: function (strResult) {
                strRetURL = strResult;
            },
            error: reportError
        });
        if (strRetURL !== '')
            window.location.href = strRetURL;
        else
            alert("Error processing Paypal request. Please, try again.");

    },

    onCancel: function (data, actions) { },
    onError: function (err) { }


}, '#paypal-button');
