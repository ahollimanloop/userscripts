// ==UserScript==
// @name         OCAS Settings
// @namespace    localhost
// @version      1.1
// @description  OCAS Settings
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/Schedule/Settings/OCAS.aspx
// @grant        none
// ==/UserScript==

//buttons

//execute button
$("#RightContent > h1").append("<button id='executeButton' type='button' class='float_right'>Set Default Settings</font></button>");
$("#executeButton").click(function(){
    ExecuteScript();
});

//functions

function ExecuteScript() {
    if($("#ctl00_ctl00_ctl00_Main_Main_Main_chkEnableOCAS").prop("checked", false)) {
        $("#ctl00_ctl00_ctl00_Main_Main_Main_chkEnableOCAS").click();
    }
    if($("#chkShowAnyAdvisor").prop("checked", false)) {
		$("#chkShowAnyAdvisor").click();
        $('#ddlFirstApptDefaultAdv').val("00000000-0000-0000-0000-000000000000");
	}
    if($("#ctl00_ctl00_ctl00_Main_Main_Main_chkFirstAppointment").prop("checked", false)) {
		$("#ctl00_ctl00_ctl00_Main_Main_Main_chkFirstAppointment").click();
	}
    if($("#ctl00_ctl00_ctl00_Main_Main_Main_tbFirstApptDefaultMonths").val("4")) {
		$("#ctl00_ctl00_ctl00_Main_Main_Main_tbFirstApptDefaultMonths").val("4");
	}
    if($("#ctl00_ctl00_ctl00_Main_Main_Main_chkFirstAppointmentTimingOverride").prop("checked", false)) {
		$("#ctl00_ctl00_ctl00_Main_Main_Main_chkFirstAppointmentTimingOverride").click();
	}
    if($("#ctl00_ctl00_ctl00_Main_Main_Main_tbMinimumVehicleYear").val("1980")) {
		$("#ctl00_ctl00_ctl00_Main_Main_Main_tbMinimumVehicleYear").val("1980");
	}
    if($("#ctl00_ctl00_ctl00_Main_Main_Main_chkRecommendedServices").prop("checked", false)) {
		$('#ctl00_ctl00_ctl00_Main_Main_Main_chkRecommendedServices').click();
	}
    if($("#ctl00_ctl00_ctl00_Main_Main_Main_chkRequireServiceSelection").prop("checked", false)) {
		$('#ctl00_ctl00_ctl00_Main_Main_Main_chkRequireServiceSelection').click();
	}
    if($("#ctl00_ctl00_ctl00_Main_Main_Main_cbServiceAdvisor").prop("checked", false)) {
		$('#ctl00_ctl00_ctl00_Main_Main_Main_cbServiceAdvisor').click();
	}
}