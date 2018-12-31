// ==UserScript==
// @name         Appointment Scheduling QoL
// @namespace    localhost
// @version      1.1
// @description  Selects all highlighted opcodes when verifying appointment writes
// @author       Austin Holliman (aholliman@autoloop.com)
// @include      https://autoloop.us/DMS/App/Schedule/Details.aspx?*
// @grant        none
// ==/UserScript==

if ($('#chkCustomerEmail').prop('checked') == true) {
    $('#chkCustomerEmail').click();
}

$("#servicesDetailsTab > div.grid_17 > div.content_block_header > h2").prepend("<div id='BtnContainer' class='float_right'>");

$("#BtnContainer").append("<button id='AddAll' class='float_right' type='button'>Add All</button>");
$("#AddAll").click(function() {
    AddAll();
});

$("#BtnContainer").append("<button id='ZeroDurations' class='float_right' type='button'>Zero Durations</button>");
$("#ZeroDurations").click(function() {
    ZeroDurations();
});

/*   This is now ran automatically at the end of ZeroDurations
$("#servicesDetailsTab > div.grid_17 > div.content_block_header > h2").append("<button id='SaveAll' type='button'>Save All</button>");
$("#SaveAll").click(function() {
    SaveAll();
});
*/

// quick save for reshells.
$('#appointmentDetailsTab > div.grid_10 > div > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2)').append("<button type='button' id='quickSaveBtn'>Save</button>")
$('#quickSaveBtn').click(function() {
	$('#lbtnSaveClose').click();
});


function AddAll() {
    var codes = $('#highlightJobList').children().children().length;
    var number = 7; // this is the first child in the row of highlighted opcodes
    while (number < codes) {
        string = "#highlightJobList > div.clear_both.hide-print > div:nth-child("+number.toString()+") > div.highlighted_service_select > span"
        $(string).click();
        number++;
    }
}

function ZeroDurations() {
    var codes = $('#AppointmentServiceDetails').children().children().length;
    var number = 2;
    var duration = 0;
    while (number < codes) {
        var string = '#AppointmentServiceDetails > tbody > tr:nth-child('+number.toString()+') > td.price_column.valign_top > div.float_right > a:nth-child(1)'
        $(string).click();
        var durstring = '#jobDuration_'+duration.toString()
        $(durstring).val(0);
        $(durstring).trigger('change');
        number++;
        duration++;
    }
    SaveAll();
}

function SaveAll() {
    $('#AppointmentServiceDetails > tbody > tr.ServiceItem.ng-pristine.ng-valid.ng-scope.ng-valid-required.ng-valid-maxlength.EditMode > td.price_column.valign_top > div.float_right > a.SaveButton.EditingButton.text_center.btn-small.GeneratedButtonLink').click();
    var codes = $('#AppointmentServiceDetails').children().children().length;
    var number = 2;
    while (number < codes) {
        var savestring = '#AppointmentServiceDetails > tbody > tr:nth-child('+number+') > td.price_column.valign_top > div.float_right > a.SaveButton.EditingButton.text_center.btn-small.GeneratedButtonLink'
        $(savestring).click();
        number++;
    }
}