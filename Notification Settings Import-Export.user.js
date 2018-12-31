// ==UserScript==
// @name         Notification Settings Import/Export
// @namespace    localhost
// @version      1.2
// @description  Exports the notification settings so you can import it to another page.
// @author       Austin Holliman (aholliman@autoloop.com)
// @include      https://autoloop.us/DMS/App/Notifications/*/Settings.aspx
// @include      https://autoloop.us/DMS/App/DealershipSettings/Notifications.aspx
// @grant        none
// ==/UserScript==


var page_selectors = ['#ctl00_ctl00_Main_Main_loopServiceSettings_loopNotificationSettings_fsWhatToSend',
                     '#ctl00_ctl00_Main_Main_loopServiceSettings_loopNotificationSettings_fsGeneralSettings',
                     '#ctl00_ctl00_Main_Main_loopServiceSettings_loopNotificationSettings_fsBasicSettings',
                     '#ctl00_ctl00_Main_Main_loopServiceSettings_loopNotificationSettings_fsVoiceMail',
                     '#ctl00_ctl00_Main_Main_loopServiceSettings_loopNotificationSettings_fsEmailSettings',
                     '#ctl00_ctl00_Main_Main_loopServiceSettings_loopNotificationSettings_fsMailSettings',
//                   '#ctl00_ctl00_Main_Main_loopServiceSettings_loopDmsCacheSettings_pnlWiqSettings',
                     '#MainContent > div.container_24.clearfix > div > div > fieldset:nth-child(6)'];

// add page specific fields
// appt conf
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/AppointmentConfirmation/Settings.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_fsReminderSettings');
}
// customer recovery
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/CustomerRecovery/Settings.aspx") {
    page_selectors.push('#MainContent > div.container_24.clearfix > div > div > fieldset:nth-child(10)');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_divSA');
}
// declined repairs
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/DeclinedRepairs/Settings.aspx") {
    page_selectors.push('#MainContent > div.container_24.clearfix > div > div > fieldset:nth-child(11)');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_fsRecommends');
    page_selectors.push('#MainContent > div.container_24.clearfix > div > div > fieldset:nth-child(13)');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_loopCustomGreetingPrompt_pnlCustomGreetingPrompt');
}
// missed appointment
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/MissedAppointment/Settings.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_pnlMissedAppointmentSettings');
}
// parts arrival
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/PartsArrival/Settings.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_fsReCallSettings');
}
// sched maint
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/ScheduledMaintenance/Settings.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_Fieldset1');
}
// service completion
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/ServiceCompletion/Settings.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_fsCompletionSettings');
}
// service follow-up
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/ServiceFollowup/Settings.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_fsRepManagement');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_loopCustomGreetingPrompt_pnlCustomGreetingPrompt');
    page_selectors.push('#MainContent > div.container_24.clearfix > div > div > fieldset:nth-child(12)');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_Fieldset1');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_fsSecondIntervalSuppressed');
}
// service introduction
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/ServiceIntroduction/Settings.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_fsTriggerSettings');
}
// state inspection
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/StateInspectionReminder/Settings.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_pnlInspectionSettings');
}
// tires due
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/TireDue/Settings.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_pnlTireDueSettings');
}
// vehicle accessory
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/VehicleAccessories/Settings.aspx") {
    page_selectors.push('#MainContent > div.container_24.clearfix > div > div > fieldset:nth-child(9)');
}
// customer birthday
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/CustomerBirthday/Settings.aspx") {
    page_selectors.push('#MainContent > div.container_24.clearfix > div > div > fieldset:nth-child(9)');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_loopCustomGreetingPrompt_pnlCustomGreetingPrompt');
}
// Warranty expiration
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/WarrantyExpiration/Settings.aspx") {
    page_selectors.push('#MainContent > div.container_24.clearfix > div > fieldset:nth-child(9)');
}
/* Lease expiration - no special fields
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/LeaseExpiration/Settings.aspx") {
    page_selectors.push('');
}
*/
// sales follow up
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/PurchaseFollowUp/Settings.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_fsRepManagement');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_loopCustomGreetingPrompt_pnlCustomGreetingPrompt');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_Fieldset1');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_fsSecondIntervalSuppressed');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_fsDoSurvey');
}
// Service contract follow up
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/ServiceContractFollowup/Settings.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_Fieldset2');
}
/* service to sales - no specific settings
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/ServiceToSales/Settings.aspx") {
    page_selectors.push('');
}
*/
// trade cycle
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/TradeCycle/Settings.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_Fieldset2');
}
// vehicle anniversary
if (window.location.href == "https://autoloop.us/DMS/App/Notifications/VehicleAnniversary/Settings.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_Fieldset1');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopServiceSettings_divSA');
}
// Notification settings

if (window.location.href == "https://autoloop.us/DMS/App/DealershipSettings/Notifications.aspx") {
    page_selectors.push('#ctl00_ctl00_Main_Main_loopNotificationSettings_fsWhatToSend');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopNotificationSettings_fsBdcSettings');
    page_selectors.push('#ctl00_ctl00_Main_Main_pnlEmailCoupons > fieldset');
    page_selectors.push('#MainContent > div.container_24.clearfix > div > fieldset:nth-child(11)');
    page_selectors.push('#ctl00_ctl00_Main_Main_dncV2');
    page_selectors.push('#ctl00_ctl00_Main_Main_pnlOptOutSettings');
    page_selectors.push('#ctl00_ctl00_Main_Main_pnlAreaCodeOptIns > fieldset');
    page_selectors.push('#ctl00_ctl00_Main_Main_pnlSendCampaignApprovalEmailNotification');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopNotificationSettings_fsGeneralSettings');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopNotificationSettings_fsBasicSettings');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopNotificationSettings_fsGeneralSettings');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopNotificationSettings_fsBasicSettings');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopNotificationSettings_fsVoiceMail');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopNotificationSettings_fsEmailSettings');
    page_selectors.push('#ctl00_ctl00_Main_Main_loopNotificationSettings_fsMailSettings');
    page_selectors.push('#ctl00_ctl00_Main_Main_pnlEmailTemplate > fieldset');
}

console.log(page_selectors);
//Button


$('#MainContent > div.container_24.clearfix > h1').append("<button id='importButton' type='button' class='float_right'>Import</button>");
    $("#importButton").click(function(){
        Import();
    });
$("#MainContent > div.container_24.clearfix > h1").append("<textarea name='importBox' id='importBox' class='float_right'>");


$('#MainContent > div.container_24.clearfix > h1').append("<button id='exportButton' type='button' class='float_right'>Export</button>");
    $("#exportButton").click(function(){
        DoExport();
    });
$("#MainContent > div.container_24.clearfix > h1").append("<textarea name='exportBox' id='exportBox' class='float_right'>");


var trigger_settings = {};
var checkboxes = {};

function Export(main_selector) {
	$(main_selector + ' :input').each(function() {
        var selector = $(this).prop("id");

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
    });
    return trigger_settings;
}

function Import() {

	var trigger_settings = $('#importBox').val();
    console.log(trigger_settings);
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

function DoExport() {
    var arraylen = page_selectors.length;
    for (i=0; i<arraylen; i++) {
        Export(page_selectors[i]);
    }
    $('#exportBox').val(JSON.stringify(trigger_settings));
    $('#exportBox').select();
    document.execCommand('copy');
}