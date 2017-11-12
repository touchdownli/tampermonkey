// ==UserScript==
// @name jd
// @namespace http://diveintogreasemonkey.org/download/
// @include https://sale.jd.com/act/*
// @require https://code.jquery.com/jquery-1.12.4.js

// @run-at context-menu
// ==/UserScript==

function Xpath2Jquery(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    
    if (xresult.invalidIteratorState) {
        return null;
    }
    var xnodes = [];
    var xres = xresult.iterateNext();
    while (xres) {
        xnodes.push(xres);
        xres = xresult.iterateNext();
    }
    return xnodes;
}

var xpaths = [
    '//div[@instanceid="29978108"]//ul[@class="clearfix"]//a',
    '//div[@class="btn-go-bg"]/div[@class="btn-go j-chrome-run"]',
    '//div[@instanceid="29960424"]//a'
];
var start_times = [
    "2017-11-12 14:00:02",
];
    
    var coupons = [];
for (var i=0; i < xpaths.length; ++i) {
    console.log("xpath %s", xpaths[i]);
    var coupon = Xpath2Jquery(xpaths[i]);
    if (coupon && coupon.length > 0) {
        console.log("coupon:%s",coupon);
        coupons = coupons.concat(coupon);
    }
}


var start_timestamps = [];
for (var i=0; i < start_times.length; ++i) {
    start_timestamps.push(Date.parse(new Date(start_times[i])));
}
console.log("coupons %d,times %d", coupons.length, start_timestamps.length );
for (var i=0; i < coupons.length; ++i) {
    for (var j = 0; j < start_timestamps.length; ++j) {
        AutoClick(coupons[i], start_timestamps[j]);
    }
}

function StartLoop(coupon_click_ele) {
    for (var i=0; i < 1; i++) {
        setTimeout(coupon_click_ele.click(), i*1000);
        console.log("coupon.click :%d", i);
    }
}

function AutoClick(coupon_click_ele, start_timestamp) {
    var now = (new Date()).getTime();
    var delay_time = start_timestamp - now;
    setTimeout(function(){StartLoop(coupon_click_ele);}, delay_time);
    console.log("StartLoop %s after:%d", coupon_click_ele, delay_time);
}