// https://www.propertyroom.com/l/14kt-gold-2985g-bracelet/13369794?source=HPPANEL
(function () {
    var script = document.createElement('script');
    script.style['margin-top'] = '10px';
    script.setAttribute('type', "text/javascript");
    script.setAttribute('data-pp-payerid', '9KEZ3NUGD83JG');
    script.setAttribute('data-pp-placementtype', '1169x50');
    script.setAttribute('data-pp-style', 'BLUWHTYCSS');
    script.innerHTML = '(function (d, t) { "use strict"; var s = d.getElementsByTagName(t)[0], n = d.createElement(t); n.src = "//www.paypalobjects.com/upstream/bizcomponents/js/merchant.js"; s.parentNode.insertBefore(n, s);}(document, "script"));';
    jQuery('.content-container').append(script);
})();

// https://www.propertyroom.com/account/listing-bid.aspx
(function () {
    var script = document.createElement('script');
    script.setAttribute('type', "text/javascript");
    script.setAttribute('data-pp-payerid', '9KEZ3NUGD83JG');
    script.setAttribute('data-pp-placementtype', '1169x50');
    script.setAttribute('data-pp-style', 'BLUWHTYCSS');
    script.innerHTML = '(function (d, t) { "use strict"; var s = d.getElementsByTagName(t)[0], n = d.createElement(t); n.src = "//www.paypalobjects.com/upstream/bizcomponents/js/merchant.js"; s.parentNode.insertBefore(n, s);}(document, "script"));';
    jQuery('.bidpage-header').after(script);
})();

// https://www.propertyroom.com/account/listing-bid.aspx
(function () {
    var script = document.createElement('script');
    script.setAttribute('type', "text/javascript");
    script.setAttribute('data-pp-payerid', '9KEZ3NUGD83JG');
    script.setAttribute('data-pp-placementtype', '180x150');
    script.setAttribute('data-pp-style', 'BLUWHTYCSS');
    script.innerHTML = '(function (d, t) { "use strict"; var s = d.getElementsByTagName(t)[0], n = d.createElement(t); n.src = "//www.paypalobjects.com/upstream/bizcomponents/js/merchant.js"; s.parentNode.insertBefore(n, s);}(document, "script"));';
    jQuery('.bidpage-column-left').append(document.createElement('br'));
    jQuery('.bidpage-column-left').append(script);
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