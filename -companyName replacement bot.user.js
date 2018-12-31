// ==UserScript==
// @name         $companyName replacement bot
// @namespace    localhost
// @version      1.1
// @description  Goes through searched coupons and replaces $companyName with the dealership name
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/DealershipSettings/CouponManager.aspx*
// @match        https://autoloop.us/DMS/App/DealershipSettings/CouponDefaultContent.aspx?CouponId=*
// @grant        none
// ==/UserScript==

window.onload = CheckState();

function CheckState() {
    var state = sessionStorage.state;
    if (state == 'ready') {
        var urls = JSON.parse(sessionStorage.urls);
        var url = urls[0];
        urls.shift();
        sessionStorage.urls = JSON.stringify(urls);
        sessionStorage.state = 'couponing';
        if (url == undefined) {
            window.location.href = 'https://autoloop.us/DMS/App/DealershipSettings/CouponManager.aspx';
            sessionStorage.clear();
            alert("Done");
            return;
        };
        window.location.href = url;
    };
    if (state == 'couponing') {
        ReplaceName();
        sessionStorage.state = 'ready';
        $('#ctl00_ctl00_Main_Main_couponManager_btnSubmit').click();
    };
};


// button

$('#MainContent > div.container_24.clearfix > div > div.couponToolBar').append("<button id='startButton' type='button' class='float_right'>$companyName Bot</button>");
    $("#startButton").click(function(){
        Start();
    });

function Start() {
    var companyName = prompt("Dealership Name?");
    sessionStorage.setItem('companyName', companyName);
    var urls = [];
    var currentPage = 1;
    // this gets urls
    while ($('#MainContent > div.container_24.clearfix > div > table > tbody > tr.GridPager > td > table > tbody > tr > td:nth-child('+currentPage+') > span').length == true) {
        for (i=1;i<17;i++) { // curl = coupon url...
            var curl = $('#MainContent > div.container_24.clearfix > div > table > tbody > tr:nth-child('+i+') > td:nth-child(1)').html();
            if (curl != undefined) {
                curl = curl.split('<a data-ng-href="');
                curl = curl[1];
                if (curl != undefined) {
                    curl = curl.split('" class=');
                    urls.push(curl[0]);
                };
            };
        };
        currentPage++;
        $('#MainContent > div.container_24.clearfix > div > table > tbody > tr.GridPager > td > table > tbody > tr > td:nth-child('+currentPage+') > a').click();
    };
    sessionStorage.setItem('urls',JSON.stringify(urls));
    sessionStorage.setItem('state','ready');
    location.reload();
};

function ReplaceName() {
    var name = sessionStorage.companyName;
    var text = $('#ctl00_ctl00_Main_Main_couponManager_tfDetails_textBox').val();
    text = text.split('$companyName');
    if (text[1] != undefined) {
        text = text[0] + name + text[1];
        $('#ctl00_ctl00_Main_Main_couponManager_tfDetails_textBox').val(text);
    };
};