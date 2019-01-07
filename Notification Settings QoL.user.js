// ==UserScript==
// @name         Notification Settings QoL
// @namespace    localhost
// @version      1.3
// @description  Various QoL Addons for Trigger Notifications
// @author       Austin Holliman (aholliman@autoloop.com
// @include      https://autoloop.us/DMS/App/Notifications/*/Settings.aspx
// @grant        none
// ==/UserScript==

// also adds a save button next to the approval queue
$('#ctl00_ctl00_Main_Main_loopServiceSettings_loopNotificationSettings_loopApprovalQueueSettings_fsApprovalQueues > table > tbody > tr > td:nth-child(1)').append("<button type='button' id='BatchSaveBtn'>Save</button>");
$('#BatchSaveBtn').click(function () {
	$('#ctl00_ctl00_Main_Main_loopServiceSettings_btnSubmit').click();
});


// check amenities automatically
if ($('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_cbShowAmenities').prop("checked") == false) {
    $('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_cbShowAmenities').click();
    var obj = $('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_cbShowAmenities').parent();
    obj.append("<small>(Checked by Script! Save Page!!)</small>");
    var dep = $('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_ddlTriggerDepartment').val();
    if (dep == 0) {
        $('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_ddlAmenityCategory').val(1);
    }
    if (dep == 1) {
        $('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_ddlAmenityCategory').val(2);
    }
};



/*

// Button to submit and go to make settings
$('#MainContent > div.container_24.clearfix').append("<button type='button' style='float: right' id='MakeSettingsBtn'>Make Settings</button>");
$('#MakeSettingsBtn').click(function () {
    GoToMake();
    sessionStorage.clear();
});

$('#MainContent > div.container_24.clearfix').append("<button type='button' style='float: right' id='SubmitMakeSettingsBtn'> Submit and Go To Make Settings</button>");
$('#SubmitMakeSettingsBtn').click(function () {
    sessionStorage.setItem('state', "SubmitAndGoToMake");
    $('#ctl00_ctl00_Main_Main_loopServiceSettings_btnSubmit').click();
});


window.onload = CheckState();

function CheckState() {
    var state = sessionStorage.state;
    if (state == "SubmitAndGoToMake") {
        GoToMake();
    };
};

function GoToMake() {
    var url = window.location.href;
	url = url.split("https://autoloop.us/DMS/App/Notifications/");
	url = url[1];
	url = url.split("/Settings.aspx");
	url = url[0];
	location.href='https://autoloop.us/DMS/App/Notifications/' + url + '/MakeSettings.aspx';
};
*/