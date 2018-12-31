// ==UserScript==
// @name         Make Override Import/Export
// @namespace    localhost
// @version      1.2
// @description  Exports the Make Override template so you can import it to another page.
// @author       Austin Holliman (aholliman@autoloop.com)
// @include      https://autoloop.us/DMS/App/Notifications/AppointmentConfirmation/MakeSettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/CustomerRecovery/ViewSettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/PartsArrival/MakeSettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/TireDue/MakeSettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/VehicleAccessories/MakeSettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/CustomerBirthday/MakeSettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/LeaseExpiration/MakeSettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/PurchaseFollowUp/MakeSettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/ServiceContractFollowup/MakeSettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/TradeCycle/MakeSettings.aspx?type=cash
// @include      https://autoloop.us/DMS/App/Notifications/TradeCycle/MakeSettings.aspx?type=loan
// @include      https://autoloop.us/DMS/App/Notifications/VehicleAnniversary/MakeSettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/DeclinedRepairs/EditCategorySettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/ScheduledMaintenance/MakeSettings.aspx?type=*
// @include      https://autoloop.us/DMS/App/Notifications/MissedAppointment/MakeSettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/ServiceCompletion/MakeSettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/WarrantyExpiration/MakeSettings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/ServiceToSales/MakeSettings.aspx*
// @grant        none
// ==/UserScript==


var main_selector = '#ctl00_ctl00_Main_Main_divNotifications';
// declined repairs
if (window.location.href == 'https://autoloop.us/DMS/App/Notifications/DeclinedRepairs/EditCategorySettings.aspx') {
    main_selector = '#divSettingTypes';
}
// sched maint
if (window.location.href == 'https://autoloop.us/DMS/App/Notifications/ScheduledMaintenance/MakeSettings.aspx?type=rr' || window.location.href == 'https://autoloop.us/DMS/App/Notifications/ScheduledMaintenance/MakeSettings.aspx?type=s2s') {
    main_selector = '#ctl00_ctl00_Main_Main_makeWrapper > div.float_center.text_left > div';
}
// weird defaults
if (window.location.href == 'https://autoloop.us/DMS/App/Notifications/MissedAppointment/MakeSettings.aspx' ||
    window.location.href == 'https://autoloop.us/DMS/App/Notifications/ServiceCompletion/MakeSettings.aspx' ||
    window.location.href == 'https://autoloop.us/DMS/App/Notifications/WarrantyExpiration/MakeSettings.aspx' ||
    window.location.href == 'https://autoloop.us/DMS/App/Notifications/ServiceToSales/MakeSettings.aspx') {
    main_selector = '#MainContent > div.container_24.clearfix > div > div > div:nth-child(2)';
}

console.log("Pulling config from " + main_selector);

//Buttons
var button_selector = '#MainContent > div.container_24.clearfix > h1';
$(button_selector).append("<button id='importButton' type='button' class='float_right'>Import</button>");
    $("#importButton").click(function(){
        Import();
    });
$(button_selector).append("<textarea name='importBox' id='importBox' class='float_right'>");

$(button_selector).append("<button id='exportButton' type='button' class='float_right'>Export</button>");
    $("#exportButton").click(function(){
        Export();
    });
$(button_selector).append("<textarea name='exportBox' id='exportBox' class='float_right'>");

function Export() {

	var trigger_settings = {};
    var checkboxes = {};

	$(main_selector + ' :input').each(function() {
        var selector = $(this).prop("id");
        if (selector.indexOf('coupon') < 0 && selector.indexOf('Coupon') < 0) {
            if ($(this).prop('type') == 'checkbox') {
                if ($(this).prop('checked') == true) {
                    trigger_settings[selector] = 'checked';
                }
                if ($(this).prop('checked') == false) {
                    trigger_settings[selector] = 'unchecked';
                }
            }
            else {
                trigger_settings[selector] = $(this).val();
            }
        }
    });

    $('#exportBox').val(JSON.stringify(trigger_settings));
    $('#exportBox').select();
    document.execCommand('copy');
}

function Import() {

	var trigger_settings = $('#importBox').val();
    trigger_settings = JSON.parse(trigger_settings);
	trigger_keys = Object.keys(trigger_settings);

	for (i=0; i<trigger_keys.length; i++) {
        if (trigger_settings[trigger_keys[i]] == 'checked') {
            $("#" + trigger_keys[i]).prop('checked', true);
        }
        else if (trigger_settings[trigger_keys[i]] == 'unchecked') {
            $("#" + trigger_keys[i]).prop('checked', false);
        }
        else {
            $("#" + trigger_keys[i]).val(trigger_settings[trigger_keys[i]]);
        }
    }
}

