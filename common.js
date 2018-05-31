// Globals
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function deleteCookie(name) { setCookie(name, '', -1); }

function loadPayPalCheckout(callback) {
    var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';
    var container = document.body || document.head;
    var script = document.createElement('script');
    script.setAttribute('src', PAYPAL_SCRIPT);
    script.onload = function() { callback() };
    script.onerror = function(err) { callback(err) };     
    container.appendChild(script);
}

function formEncodeString(form) {
    var string = '';
    Object.keys(form.elements).forEach(function (key) {
        string += encodeURIComponent(form.elements[key].name) + '=' + encodeURIComponent(form.elements[key].value) + '&';
        console.log(string);
    });
    console.log(string)
    return string.substring(0, string.length - 1);
}

function formEncode(form) {
   var ret = {};
   Object.keys(form.elements).forEach(function (key) {
        ret[form.elements[key].name] = form.elements[key].value;
    });
    return ret;

}