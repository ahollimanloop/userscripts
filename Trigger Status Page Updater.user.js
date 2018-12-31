// ==UserScript==
// @name         Trigger Status Page Updater
// @namespace    localhost
// @version      1.1
// @description  Checks all the boxes!
// @author       You
// @include      https://csa.autoloop.us/CustomerTrigger/Customer/*
// @grant        none
// ==/UserScript==

$('#page_canvas > form > div.key.section').append("<button type=button id='setSalesTriggers'>Update Sales</button>");
$('#setSalesTriggers').click(function() {
    UpdateSales();
});

$('#page_canvas > form > div.key.section').append("<button type=button id='setServiceTriggers'>Update Service</button>");
$('#setServiceTriggers').click(function() {
    UpdateService();
});

function UpdateSales() {
    $('#page_canvas > form > div:nth-child(4) > div > table').children().children().children().each(function() {
        if ($(this).prop('class') == "checkbox loop-setting-differs") {
            console.log($(this).children());
            $(this).children().click();
        }
    });
    $('#page_canvas > form > div:nth-child(4) > div > table > tbody').children().each(function() {
        if ($('td:nth-child(4)', this).prop('class') == "loop-setting-differs" || $('td:nth-child(4)', this).prop('class') == "loop-setting-unknown") {
            var tstatus = $('td:nth-child(4)', this).text();
            tstatus = $.trim(tstatus);
            switch(tstatus) {
                case 'Batched':
                    $('td:nth-child(3) > select:nth-child(1)', this).val('1');
                    break;
                case 'Active':
                    $('td:nth-child(3) > select:nth-child(1)', this).val('2');
                    break;
                case 'Declined':
                    $('td:nth-child(3) > select:nth-child(1)', this).val('5');
                    break;
                case '':
                    $('td:nth-child(3) > select:nth-child(1)', this).val('8');
                    break;
            }
        }
    });
}

function UpdateService() {
    $('#page_canvas > form > div:nth-child(5) > div > table').children().children().children().each(function() {
        if ($(this).prop('class') == "checkbox loop-setting-differs") {
            console.log($(this).children());
            $(this).children().click();
        }
    });
    $('#page_canvas > form > div:nth-child(5) > div > table > tbody').children().each(function() {
        if ($('td:nth-child(4)', this).prop('class') == "loop-setting-differs" || $('td:nth-child(4)', this).prop('class') == "loop-setting-unknown") {
            var tstatus = $('td:nth-child(4)', this).text();
            tstatus = $.trim(tstatus);
            switch(tstatus) {
                case 'Batched':
                    $('td:nth-child(3) > select:nth-child(1)', this).val('1');
                    break;
                case 'Active':
                    $('td:nth-child(3) > select:nth-child(1)', this).val('2');
                    break;
                case 'Declined':
                    $('td:nth-child(3) > select:nth-child(1)', this).val('5');
                    break;
                case '':
                    $('td:nth-child(3) > select:nth-child(1)', this).val('8');
                    break;
            }
        }
    });
}