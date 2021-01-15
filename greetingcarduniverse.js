// https://www.greetingcarduniverse.com/shopping/confirm.asp
(function() {

    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }

    function toggleValidationContainer() {
        document.getElementById('paypal-validation').style.display = jQuery('#ship_option_update button').css('display');
    }

    // Targets
    var oldButton = jQuery("img[src='/images/common/paypal_button.png']");
    
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Create PayPal validation container
    var validationContainer = document.createElement('div');
    validationContainer.id = 'paypal-validation';
    validationContainer.style.color = 'red';
    validationContainer.style.display = 'none';


    // Add new containers to DOM under the comment
    oldButton.parent().append(buttonContainer);
    oldButton.parent().append(validationContainer);
    oldButton.parent().append(errorContainer);
    
    // Remove old button
    oldButton.hide();
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        paypal.Button.render({
            env: 'production',
            style: {
                // layout: 'vertical',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            payment: function (data, actions) {
                return new paypal.Promise(function (resolve, reject) {
                    // This will not work in IE less than Edge due to the responseURL
                    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL
                    // It is needed due to redirect if a token and payerid exists in server session.  see comment below.
                    var req = new XMLHttpRequest();
                    req.open('get', '/shopping/paypal.asp');
                    req.setRequestHeader('Accept', 'application/paypal-json-token');
                    req.onload = function () {
                        if (req.responseURL && req.responseURL.match('paypal.com') === null) {
                            return window.location.href = req.responseURL;
                        }
                        try {
                            if (req.responseText) {
                                resolve(JSON.parse(req.responseText).token);
                            }
                        } catch (err) {
                            throw err;
                        }
                        
                    };
                    req.send();
                    /*
                    // There is a check on /shopping/paypal.asp to where if there is a Token and payerid in the server session then it is used
                    // instead of requesting a new token.  If that check is removed then you can use the code below instead of the code above.
                    jQuery.ajax({
                        url: '/shopping/paypal.asp',
                        method: 'GET',
                        headers: {
                            'Accept': 'application/paypal-json-token'
                        },
                        success: function (data, status, jqXHR) {
                            resolve(data.token);
                        },
                        error: function (jqXHR) {
                            reject();
                        }
                    });
                    */
                });
            },
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
            onClick: function() {
                toggleValidationContainer();
            },
            validate: function (actions) {
                jQuery('#ship_option_update button').css('display') === 'none' ? actions.enable() : actions.disable();
                jQuery("#shipping_option input").each(function (index, ele) {
                    ele.on('change', function () {
                        document.getElementById('paypal-validation').innerHTML = 'You must click the update shipping button above!';
                        document.getElementById('paypal-validation').style.display = 'none';
                        jQuery('#ship_option_update button').css('display') === 'none' ? actions.enable() : actions.disable(); 
                    });
                });
            }
        }, '#paypal-button')
    });
    
})();

// https://www.greetingcarduniverse.com/shopping/credit.asp
(function() {

    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }

    function toggleValidationContainer() {
        document.getElementById('paypal-validation').style.display = jQuery('#ship_option_update button').css('display');
    }

    // Targets
    var oldButton = jQuery("img[src='/images/common/paypal_button.png']");
    
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Create PayPal validation container
    var validationContainer = document.createElement('div');
    validationContainer.id = 'paypal-validation';
    validationContainer.style.color = 'red';
    validationContainer.style.display = 'none';


    // Add new containers to DOM under the comment
    oldButton.parent().append(buttonContainer);
    oldButton.parent().append(validationContainer);
    oldButton.parent().append(errorContainer);
    
    // Remove old button
    oldButton.hide();
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        paypal.Button.render({
            env: 'production',
            style: {
                // layout: 'vertical',  // horizontal | vertical
                size:   'medium',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            payment: function (data, actions) {
                return new paypal.Promise(function (resolve, reject) {
                    // This will not work in IE less than Edge due to the responseURL
                    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL
                    // It is needed due to redirect if a token and payerid exists in server session.  see comment below.
                    var req = new XMLHttpRequest();
                    req.open('get', '/shopping/paypal.asp');
                    req.setRequestHeader('Accept', 'application/paypal-json-token');
                    req.onload = function () {
                        if (req.responseURL && req.responseURL.match('paypal.com') === null) {
                            return window.location.href = req.responseURL;
                        }
                        try {
                            if (req.responseText) {
                                resolve(JSON.parse(req.responseText).token);
                            }
                        } catch (err) {
                            throw err;
                        }
                        
                    };
                    req.send();
                    /*
                    // There is a check on /shopping/paypal.asp to where if there is a Token and payerid in the server session then it is used
                    // instead of requesting a new token.  If that check is removed then you can use the code below instead of the code above.
                    jQuery.ajax({
                        url: '/shopping/paypal.asp',
                        method: 'GET',
                        headers: {
                            'Accept': 'application/paypal-json-token'
                        },
                        success: function (data, status, jqXHR) {
                            resolve(data.token);
                        },
                        error: function (jqXHR) {
                            reject();
                        }
                    });
                    */
                });
            },
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button')
    });
    
})();

// https://m.greetingcarduniverse.com/confirm.asp
(function() {

    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }

    function toggleValidationContainer() {
        document.getElementById('paypal-validation').style.display = jQuery('#ship_option_update button').css('display');
    }

    // Targets
    var oldButton = jQuery("img[src='/images/common/paypal_button.gif']");
    
    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Create PayPal validation container
    var validationContainer = document.createElement('div');
    validationContainer.id = 'paypal-validation';
    validationContainer.style.color = 'red';
    validationContainer.style.display = 'none';


    // Add new containers to DOM under the comment
    oldButton.parent().append(buttonContainer);
    oldButton.parent().append(validationContainer);
    oldButton.parent().append(errorContainer);
    
    // Remove old button
    oldButton.hide();
    
    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        paypal.Button.render({
            env: 'production',
            style: {
                // layout: 'vertical',  // horizontal | vertical
                size:   'responsive',    // medium | large | responsive
                color:  'gold'       // gold | blue | silver | black
            },
            payment: function (data, actions) {
                return new paypal.Promise(function (resolve, reject) {
                    // This will not work in IE less than Edge due to the responseURL
                    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL
                    // It is needed due to redirect if a token and payerid exists in server session.  see comment below.
                    var req = new XMLHttpRequest();
                    req.open('get', 'paypal.asp');
                    req.setRequestHeader('Accept', 'application/paypal-json-token');
                    req.onload = function () {
                        if (req.responseURL && req.responseURL.match('paypal.com') === null) {
                            return window.location.href = req.responseURL;
                        }
                        try {
                            if (req.responseText) {
                                resolve(JSON.parse(req.responseText).token);
                            }
                        } catch (err) {
                            throw err;
                        }
                        
                    };
                    req.send();
                    /*
                    // There is a check on /shopping/paypal.asp to where if there is a Token and payerid in the server session then it is used
                    // instead of requesting a new token.  If that check is removed then you can use the code below instead of the code above.
                    jQuery.ajax({
                        url: '/shopping/paypal.asp',
                        method: 'GET',
                        headers: {
                            'Accept': 'application/paypal-json-token'
                        },
                        success: function (data, status, jqXHR) {
                            resolve(data.token);
                        },
                        error: function (jqXHR) {
                            reject();
                        }
                    });
                    */
                });
            },
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                document.getElementById('paypal-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button')
    });
    
})();