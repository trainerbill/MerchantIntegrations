// https://www.vacationsmadeeasy.com/vacationPackages/cartContents.cfm
(function () {

    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }
    
    // PayPal Container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';

    // Error Container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-button-container-error';
    
    // Hide Old Button
    var oldButton = document.querySelector('#cart_paypal_button div a').parentNode;
    oldButton.style.display = 'none';

    // Insert Containers
    oldButton.parentNode.append(buttonContainer);
    oldButton.parentNode.append(errorContainer);

    loadPayPalCheckout(function () {

        var oldForm = document.getElementById('cartForm');


        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'vertical',
                size: 'responsive',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            funding: {
                disallowed: [
                    paypal.FUNDING.CARD,
                ]
            },
            commit: true,
            payment: function (data, actions) {
                document.getElementById('moreData').value = 'paypal';
                var data = jQuery('#cartForm').serialize();
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('post', oldForm.action);
                    req1.onload = function () {
                        // THis only works in IE 10+
                        if (req1.responseURL && req1.responseURL.match('paypal.com') === null) {
                            return window.location.href = req1.responseURL;
                        }
                        try {
                            if (req1.responseText) {
                                resolve(JSON.parse(req1.responseText).token);
                            }
                        } catch (err) {
                            throw err;
                        }
                    };
                    req1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    req1.setRequestHeader('Accept', 'application/paypal-json-token');
                    req1.send(data);
                });
            },
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                document.getElementById('paypal-button-container-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container');
    });

})();

// https://secure.vacationsmadeeasy.com/checkout2.cfm
(function () {

    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }

    
    
    // PayPal Container
    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'paypal-button-container';
    buttonContainer.style.display = 'none';
    buttonContainer.style.width = '300px';


    // Error Container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-button-container-error';
    
    // Hide Old Button
    var oldButton = document.getElementById('payMethod_paypal');
    oldButton.style.display = 'none';

    // Create new radio button
    var newInput = document.createElement('input');
    newInput.id = 'payMethod_paypal';
    newInput.name = "payMethod";
    newInput.value = 'paypal';
    newInput.type = 'radio';
    oldButton.parentNode.prepend(newInput);

    // Remove default selection
    document.querySelectorAll('input[name="payMethod"]').forEach(function (radio) { radio.checked = false });

    // Hide Credit card form on page load
    document.querySelector('#CCAcceptForm table').style.display = 'none';

    // Change Handler
    document.querySelectorAll('input[name="payMethod"]').forEach(function (radio) {
        radio.addEventListener('change', function (event) {
            if (event.target.value === 'paypal') {
                buttonContainer.style.display = 'initial';
                document.querySelector('#CCAcceptForm table').style.display = 'none';
            } else {
                buttonContainer.style.display = 'none';
                document.querySelector('#CCAcceptForm table').style.display = 'initial';
            }
        });
    })

    // Insert Containers
    oldButton.parentNode.parentNode.append(buttonContainer);
    oldButton.parentNode.parentNode.append(errorContainer);

    loadPayPalCheckout(function () {

        var oldForm = document.getElementById('cartForm');


        paypal.Button.render({
            env: 'production',
            style: {
                layout: 'vertical',
                size: 'responsive',    // medium | large | responsive
                color: 'gold',       // gold | blue | silver | black
                shape: 'rect',
            },
            commit: true,
            payment: function (data, actions) {
                
                return new paypal.Promise(function (resolve, reject) {
                    var req1 = new XMLHttpRequest();
                    req1.open('get', 'index.cfm?moreData=paypal&fromPage=checkout2');
                    req1.onload = function () {
                        // THis only works in IE 10+
                        if (req1.responseURL && req1.responseURL.match('paypal.com') === null) {
                            return window.location.href = req1.responseURL;
                        }
                        try {
                            if (req1.responseText) {
                                resolve(JSON.parse(req1.responseText).token);
                            }
                        } catch (err) {
                            throw err;
                        }
                    };
                    // req1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    req1.setRequestHeader('Accept', 'application/paypal-json-token');
                    req1.send();
                });
            },
            onAuthorize: function (data, actions) {
                return actions.redirect();
            },
            onCancel: function (data, actions) {
                return actions.redirect();
            },
            onError: function (err) {
                document.getElementById('paypal-button-container-error').innerHTML = 'An error occured. ' + JSON.stringify(err);
            },
        }, '#paypal-button-container');
    });

})();


/*
    DO NOT USE THIS CODE.  It is for video demo only
    1. Go here:  https://www.paypal.com/tagmanager/settings?entry=website
    2. Click add new website
    3. Select continue
    4. Select other at the bottom
    5. Copy and paste the javascript onto your site.
*/

(function () {
    var script = document.createElement('script');
    script.innerHTML =  ";(function(a,t,o,m,s){a[m]=a[m]||[];a[m].push({t:new Date().getTime(),event:'snippetRun'});var f=t.getElementsByTagName(o)[0],e=t.createElement(o),d=m!=='paypalDDL'?'&m='+m:'';e.async=!0;e.src='https://www.paypal.com/tagmanager/pptm.js?id='+s+d;f.parentNode.insertBefore(e,f);})(window,document,'script','paypalDDL','72c78d11-9fef-11e7-8e06-e965c75268e8');";
    document.head.appendChild(script);

})();
