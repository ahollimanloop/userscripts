// ==UserScript==
// @name         General Book Settings
// @namespace    localhost
// @version      1.2
// @description  General Book Settings
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/Schedule/Settings/Default.aspx
// @grant        none
// ==/UserScript==

//Button
$('#RightContent > h1').append("<button id='executeButton' type='button' class='float_right'>Set Default Settings</font></button><hr><br>");
    $("#executeButton").click(function(){
        ExecuteScript();
    });

function ExecuteScript() {
    if($("#SendAppointmentSynchronizationFailure").prop("checked", false)) {
        $("#SendAppointmentSynchronizationFailure").click();
    }
    if($("#EnableOCAS").prop("checked", false)) {
		$("#EnableOCAS").click();
	}
    if($("#FirstApptEnabled").prop("checked", false)) {
		$("#FirstApptEnabled").click();
	}
    if($("#WelcomeBoardEnabled").prop("checked", false)) {
		$("#WelcomeBoardEnabled").click();
	}
    if($("#ControlPanelEnabled").prop("checked", false)) {
		$("#ControlPanelEnabled").click();
	}
    if($("#ControlPanelV2Enabled").prop("checked", false)) {
		$("#ControlPanelV2Enabled").click();
	}
    if($("#AllowEmailDeletion").prop("checked", false)) {
		$("#AllowEmailDeletion").click();
	}
    if($("#EnableFirstAppointmentAdvsiorNotification").prop("checked", false)) {
		$("#EnableFirstAppointmentAdvsiorNotification").click();
	}
    if($("#CheckInWithNoROStatus").prop("checked", false)) {
		$("#CheckInWithNoROStatus").click();
	}
    if($("#enableShopLoading").prop("checked", false)) {
		$("#enableShopLoading").click();
	}
    if($("#EnableCarryOvers").prop("checked", false)) {
		$("#EnableCarryOvers").click();
	}
    if($("#EnableAutomaticCarryOvers").prop("checked", false)) {
		$("#EnableAutomaticCarryOvers").click();
	}
    if($("#DmsCommentSaveTransportType").prop("checked", false)) {
		$("#DmsCommentSaveTransportType").click();
	}
    if($("#DmsCommentSaveCreatedOn").prop("checked", false)) {
		$("#DmsCommentSaveCreatedOn").click();
	}
    if($("#DmsCommentSaveCreatedBy").prop("checked", false)) {
		$("#DmsCommentSaveCreatedBy").click();
	}
    if($("#DmsCommentSaveModifiedOn").prop("checked", false)) {
		$("#DmsCommentSaveModifiedOn").click();
	}
    if($("#DmsCommentSaveModifiedBy").prop("checked", false)) {
		$("#DmsCommentSaveModifiedBy").click();
	}
    if($("#DmsCommentSaveStatus").prop("checked", false)) {
		$("#DmsCommentSaveStatus").click();
    }
    if($("#RequireServiceSelectionInBook").prop("checked", false)) {
		$("#RequireServiceSelectionInBook").click();
	}
}

