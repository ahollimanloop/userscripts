// ==UserScript==
// @name         Department Contacts
// @namespace    localhost
// @version      1.2
// @description  Department Contacts
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/DealershipSettings/DealershipRepDefaultContact.aspx
// @grant        none
// ==/UserScript==

//Buttons

$('#MainContent > div.container_24.clearfix > fieldset:nth-child(2) > fieldset:nth-child(5)').append("<button id='quoteButton' type='button' class='float_right'>Use Sales Contact</button>");
    $("#quoteButton").click(function(){
        QuoteButton();
    });

$('#MainContent > div.container_24.clearfix > fieldset:nth-child(3) > h4').append("<button id='serviceButton' type='button'>Service Contact</button>");
    $("#serviceButton").click(function(){
        ServiceButton();
    });

$('#MainContent > div.container_24.clearfix > fieldset:nth-child(3) > h4').append("<button id='serviceTriggerButton' type='button'>Service Triggers</button>");
    $("#serviceTriggerButton").click(function(){
        ServiceTriggerButton();
    });

$('#MainContent > div.container_24.clearfix > fieldset:nth-child(3) > h4').append('   |   ');

$('#MainContent > div.container_24.clearfix > fieldset:nth-child(3) > h4').append("<button id='salesButton' type='button'>Sales Contact</button>");
    $("#salesButton").click(function(){
        SalesButton();
    });

$('#MainContent > div.container_24.clearfix > fieldset:nth-child(3) > h4').append("<button id='salesTriggerButton' type='button'>Sales Triggers</button>");
    $("#salesTriggerButton").click(function(){
        SalesTriggerButton();
    });

$('#MainContent > div.container_24.clearfix > fieldset:nth-child(3) > h4').append('   |   ');

$('#MainContent > div.container_24.clearfix > fieldset:nth-child(3) > h4').append("<button id='resetTriggerButton' type='button'>Reset Triggers</button>");
    $("#resetTriggerButton").click(function(){
        ResetTriggers();
    });


function QuoteButton() {
    var name = $('#ctl00_ctl00_Main_Main_SalesDealershipRep_tfRepName_textBox').val();
    var title = $('#ctl00_ctl00_Main_Main_SalesDealershipRep_tfRepTitle_textBox').val();
    var email = $('#ctl00_ctl00_Main_Main_SalesDealershipRep_tfCSREmail_textBox').val();
    var csrcb = $('#ctl00_ctl00_Main_Main_SalesDealershipRep_tfCSRCallBack_textBox').val();
    var csrcbext = $('#ctl00_ctl00_Main_Main_SalesDealershipRep_tfCSRCallBackExt_textBox').val();

    $("#ctl00_ctl00_Main_Main_tfQuoteContactName_textBox").val(name);
    $("#ctl00_ctl00_Main_Main_tfQuoteContactTitle_textBox").val(title);
    $("#ctl00_ctl00_Main_Main_tfQuoteContactEmail_textBox").val(email);
    $("#ctl00_ctl00_Main_Main_tfQuoteContactPhone_textBox").val(csrcb);
    $("#ctl00_ctl00_Main_Main_tfQuoteContactExtension_textBox").val(csrcbext);
}

function SalesButton() {
    var name = $('#ctl00_ctl00_Main_Main_SalesDealershipRep_tfRepName_textBox').val();
    var title = $('#ctl00_ctl00_Main_Main_SalesDealershipRep_tfRepTitle_textBox').val();
    var email = $('#ctl00_ctl00_Main_Main_SalesDealershipRep_tfCSREmail_textBox').val();
    var callid = $('#ctl00_ctl00_Main_Main_SalesDealershipRep_tfCallerId_textBox').val();
    var csrcb = $('#ctl00_ctl00_Main_Main_SalesDealershipRep_tfCSRCallBack_textBox').val();
    var csrcbext = $('#ctl00_ctl00_Main_Main_SalesDealershipRep_tfCSRCallBackExt_textBox').val();
    var transfer = $('#ctl00_ctl00_Main_Main_SalesDealershipRep_loopCallTransfer_tfCallTransfer_textBox').val();
    var transferext = $('#ctl00_ctl00_Main_Main_SalesDealershipRep_loopCallTransfer_tfExtension_textBox').val();

    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_tfRepName_textBox").val(name);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_tfRepTitle_textBox").val(title);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_tfCSREmail_textBox").val(email);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_tfCallerId_textBox").val(callid);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_tfCSRCallBack_textBox").val(csrcb);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_tfCSRCallBackExt_textBox").val(csrcbext);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_loopCallTransfer_tfCallTransfer_textBox").val(transfer);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_loopCallTransfer_tfExtension_textBox").val(transferext);
}

function ServiceButton() {
    var name = $('#ctl00_ctl00_Main_Main_ServiceDealershipRep_tfRepName_textBox').val();
    var title = $('#ctl00_ctl00_Main_Main_ServiceDealershipRep_tfRepTitle_textBox').val();
    var email = $('#ctl00_ctl00_Main_Main_ServiceDealershipRep_tfCSREmail_textBox').val();
    var callid = $('#ctl00_ctl00_Main_Main_ServiceDealershipRep_tfCallerId_textBox').val();
    var csrcb = $('#ctl00_ctl00_Main_Main_ServiceDealershipRep_tfCSRCallBack_textBox').val();
    var csrcbext = $('#ctl00_ctl00_Main_Main_ServiceDealershipRep_tfCSRCallBackExt_textBox').val();
    var transfer = $('#ctl00_ctl00_Main_Main_ServiceDealershipRep_loopCallTransfer_tfCallTransfer_textBox').val();
    var transferext = $('#ctl00_ctl00_Main_Main_ServiceDealershipRep_loopCallTransfer_tfExtension_textBox').val();

    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_tfRepName_textBox").val(name);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_tfRepTitle_textBox").val(title);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_tfCSREmail_textBox").val(email);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_tfCallerId_textBox").val(callid);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_tfCSRCallBack_textBox").val(csrcb);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_tfCSRCallBackExt_textBox").val(csrcbext);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_loopCallTransfer_tfCallTransfer_textBox").val(transfer);
    $("#ctl00_ctl00_Main_Main_TriggerDealershipRep_loopCallTransfer_tfExtension_textBox").val(transferext);
}



/*
value = x
2 // service completion
4 // service follow-up
5 // parts arrived
13 // sched maint
14 // appt conf
20 // customer recovery
21 // declined repair
28 // state inspection
35 // missed appointment
40 // tire due
41 // veh access
57 // serv intro

15 // sales follow up
16 // warranty expiration / ext service contract
17 // lease expriation
29 // customer birthday
33 // serv contract follow up
36 // veh anniv
37 // service 2 sales
38 // trade cycle
43 // vehicle upgrade
44 // quote prospects
55 / Traide-Up welcome
56 // trade up advantage
*/

var serviceValues = ['2,', '4,', '5,', '13,', '14,', '20,', '21,', '28,', '35,', '40,', '41,', '57,']
var salesValues= ['15,', '16,', '17,', '29,', '33,', '36,', '37,', '38,', '43,', '44,', '55,', '56,']

function ServiceTriggerButton() {
    $('#ctl00_ctl00_Main_Main_lstTriggers :input').each(function() {
        if (serviceValues.includes($(this).prop('value'))) {
            $(this).click();
        };
    });
}

function SalesTriggerButton() {
    $('#ctl00_ctl00_Main_Main_lstTriggers :input').each(function() {
        if (salesValues.includes($(this).prop('value'))) {
            $(this).click();
        };
    });
}

function ResetTriggers() {
    $('#ctl00_ctl00_Main_Main_lstTriggers :input').each(function() {
        $(this).prop("checked", false);
    });
}

