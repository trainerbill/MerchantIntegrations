// Minibag
(function() {
    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=sb&disable-funding=card&commit=false';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }
    
    const target = jQuery('.sidebar-bag');

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.style['margin-left'] = '20px';
    buttonContainer.style['margin-right'] = '20px';
    buttonContainer.id = 'paypal-button';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Append containers
    target.after(errorContainer);
    target.after(buttonContainer);

    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                        value: jQuery('.total').children()[1].textContent.substring(1),
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                let qs = Object.keys(data).map(function(key) {
                    return key + '=' + data[key]
                }).join('&');
                return actions.order.get().then(response => {
                    sessionStorage.setItem('PPorder', JSON.stringify(response));
                    window.location.href = '/cart/checkout?' + qs;
                });
              }
        }).render('#paypal-button');
    });
})();

// https://www.halsbrook.com/catalog/product
(function() {
    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=sb&disable-funding=card&commit=false';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }
    
    const target = jQuery('#product_form');

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.style['margin-top'] = '20px';
    //buttonContainer.style['margin-right'] = '20px';
    buttonContainer.id = 'paypal-button';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Append containers
    
    target.append(errorContainer);
    target.append(buttonContainer);

    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        paypal.Buttons({
            createOrder: function(data, actions) {
                return new Promise((resolve, rejet) => {
                    jQuery.post(target.attr('action'), target.serialize(), () => {
                        const total = jQuery('#price').text().substring(1)
                        actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: total,
                                }
                            }]
                        })
                        .then((res) => resolve(res))
                        .catch((err) => reject(err))
                    });
                });
              },
              onApprove: function(data, actions) {
                let qs = Object.keys(data).map(function(key) {
                    return key + '=' + data[key]
                }).join('&');
                return actions.order.get().then(response => {
                    sessionStorage.setItem('PPorder', JSON.stringify(response));
                    window.location.href = '/cart/checkout?' + qs;
                });
              }
        }).render('#paypal-button');
    });
})();

// https://www.halsbrook.com/cart/preview
(function() {
    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=sb&disable-funding=card&commit=false';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }
    
    const target = jQuery('#proceed');

    // Create PayPal button container
    var buttonContainer = document.createElement('div');
    buttonContainer.style['margin-top'] = '20px';
    //buttonContainer.style['margin-right'] = '20px';
    buttonContainer.id = 'paypal-button';

    // Create PayPal error container
    var errorContainer = document.createElement('div');
    errorContainer.id = 'paypal-error';
    errorContainer.style.color = 'red';

    // Append containers
    
    target.after(errorContainer);
    target.after(buttonContainer);

    // Load PayPal script and render button.
    loadPayPalCheckout(function () {
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                        value: jQuery('.total').children()[1].textContent.substring(1),
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                let qs = Object.keys(data).map(function(key) {
                    return key + '=' + data[key]
                }).join('&');
                return actions.order.get().then(response => {
                    sessionStorage.setItem('PPorder', JSON.stringify(response));
                    window.location.href = '/cart/checkout?' + qs;
                });
              }
        }).render('#paypal-button');
    });
})();

// https://www.halsbrook.com/cart/checkout
(function() {
    function loadPayPalCheckout(callback) {
        var PAYPAL_SCRIPT = 'https://www.paypal.com/sdk/js?client-id=sb&commit=false';
        var container = document.body || document.head;
        var script = document.createElement('script');
        script.setAttribute('src', PAYPAL_SCRIPT);
        script.onload = function() { callback() };
        script.onerror = function(err) { callback(err) };     
        container.appendChild(script);
    }

    function setInformation(order) {
        document.getElementById('firstname').value = order.payer.name.given_name;
        document.getElementById('lastname').value = order.payer.name.surname;
        document.getElementById('createEmail').value = order.payer.email_address;
        document.getElementById('shippingFirstName').value = order.payer.name.given_name;
        document.getElementById('shippingLastName').value = order.payer.name.surname;
        document.getElementById('shippingAddress').value = order.payer.address.address_line_1;
        document.getElementById('shippingCity').value = order.payer.address.admin_area_2;
        document.getElementById('shippingState').value = order.payer.address.admin_area_1;
        document.getElementById('shippingZip').value = order.payer.address.postal_code;
        document.getElementById('shippingTelephone').value = order.payer.phone ? order.payer.phone.phone_number.national_number : '';
    }

    function addPayPalOption(selected = false) {
        let option = document.createElement('option');
        option.value = 'PP';
        option.innerHTML = 'PayPal';
        option.selected = selected;
        document.getElementById('newcc-type').append(option);
        document.getElementById('newcc-type').disabled = selected
        document.getElementById('newcc-type').addEventListener('change', function (event) {
            if (event.target.value === 'PP') {
                hideCreditCard();
                showPayPal()
            } else {
                hidePayPal();
                showCreditCard();
            }
        });

        
    }

    function createPayPalIntegration() {
        let buttonContainer = document.createElement('div');
        buttonContainer.id = 'paypal-button';
        buttonContainer.style.width = '400px';

        // Create PayPal error container
        let errorContainer = document.createElement('div');
        errorContainer.id = 'paypal-error';
        errorContainer.style.color = 'red';

        let integrationContainer = document.createElement('div');
        integrationContainer.id = 'paypalIntegration';
        integrationContainer.style.display = 'none';


        integrationContainer.append(buttonContainer);
        integrationContainer.append(errorContainer);
        document.getElementById('cc').append(integrationContainer);

        // Load PayPal script and render button.
        loadPayPalCheckout(function () {
            paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: jQuery('.total').children()[1].textContent.substring(1),
                        }
                    }]
                    });
                },
                onApprove: function(data, actions) {
                    createOrderInputs(data.orderID, data.payerID);
                    hidePayPal();
                }
            }).render('#paypal-button');
        });
    }

    function hideCreditCard() {
        jQuery('#newcc-number').parent().hide();
        jQuery('#newcc-month').parent().parent().parent().hide();
        jQuery('.cards').hide();
    }

    function showCreditCard() {
        jQuery('#newcc-number').parent().show();
        jQuery('#newcc-month').parent().parent().parent().show();
        jQuery('.cards').show();
    }

    function showPayPal() {
        document.getElementById('paypalIntegration').style.display = 'initial';
    }

    function hidePayPal() {
        document.getElementById('paypalIntegration').style.display = 'none';
    }

    function createOrderInputs(orderId, payerId) {
        const oid = document.createElement('input');
        oid.name = "paypalOrderId";
        oid.type = "hidden";
        oid.value = orderId;
        document.getElementById('checkout-form').append(oid);

        const pid = document.createElement('input');
        pid.name = "paypalPayerId";
        pid.type = "hidden";
        pid.value = payerId;
        document.getElementById('checkout-form').append(pid);
    }
    
    const qp = new URLSearchParams(window.location.search);
    if (qp.get('orderID') && qp.get('payerID')) {
        // ECS flow
        const order = JSON.parse(sessionStorage.getItem('PPorder'));
        console.log(order);
        setInformation(order);
        addPayPalOption(true);
        hideCreditCard();
        createOrderInputs(qp.get('orderID'), qp.get('payerID'));
    } else {
        addPayPalOption();
        createPayPalIntegration();
    }
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