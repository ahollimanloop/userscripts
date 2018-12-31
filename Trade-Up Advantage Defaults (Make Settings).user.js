// ==UserScript==
// @name         Trade-Up Advantage Defaults (Make Settings)
// @namespace    localhost
// @version      1.1
// @description  Fills out make override template for all 4 intervals
// @author       Austin Holliman (aholliman@autoloop.com)
// @include      https://autoloop.us/DMS/App/Notifications/TradeUpAdvantage/MakeSettings.aspx*
// @grant        none
// ==/UserScript==

$('#MainContent > div.container_24.clearfix > h2').append("<button id='ScriptSetDefaults' type='button'>Set Defaults</button>");
$('#ScriptSetDefaults').click(function() {
    SetDefaults();
});

function SetDefaults() {
    // 1st interval
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_rptCustomBatchSettings_ctl00_tfBatchSettingInt_textBox').val("51");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_rptCustomBatchSettings_ctl01_tfBatchSettingInt_textBox').val("200");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_rptCustomBatchSettings_ctl02_ddlBatchSettingsList').val("1");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_emailSelector_ddlTemplate').val("91488732-9e44-410d-99f3-14319cb23398");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_emailSubject_textBox').val("$customerName.firstName, you're up for an upgrade");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_rptCustomBatchSettings_ctl03_cbBatchSettingBool').prop("checked", false);

    // 2nd interval
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl01_schedule_rptCustomBatchSettings_ctl00_tfBatchSettingInt_textBox').val("20");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl01_schedule_rptCustomBatchSettings_ctl01_tfBatchSettingInt_textBox').val("45");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl01_schedule_rptCustomBatchSettings_ctl02_ddlBatchSettingsList').val("2");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl01_schedule_emailSelector_ddlTemplate').val("398e6862-48d9-4e6e-aa43-223ee3c7a2b3");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl01_schedule_emailSubject_textBox').val("$customerName.firstName, your new ${vehicle.Make} inside");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl01_schedule_rptCustomBatchSettings_ctl03_cbBatchSettingBool').prop("checked", true);

    // 3rd interval
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl02_schedule_rptCustomBatchSettings_ctl00_tfBatchSettingInt_textBox').val("8");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl02_schedule_rptCustomBatchSettings_ctl01_tfBatchSettingInt_textBox').val("18");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl02_schedule_rptCustomBatchSettings_ctl02_ddlBatchSettingsList').val("3");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl02_schedule_emailSelector_ddlTemplate').val("f971d9e7-6e90-4d96-9e79-ccda25e3c752");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl02_schedule_emailSubject_textBox').val("$customerName.firstName, now is the time to upgrade");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl02_schedule_rptCustomBatchSettings_ctl03_cbBatchSettingBool').prop("checked", true);

    // 4th interval
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl03_schedule_rptCustomBatchSettings_ctl00_tfBatchSettingInt_textBox').val("-250");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl03_schedule_rptCustomBatchSettings_ctl01_tfBatchSettingInt_textBox').val("7");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl03_schedule_rptCustomBatchSettings_ctl02_ddlBatchSettingsList').val("4");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl03_schedule_emailSelector_ddlTemplate').val("93bd81f9-7664-40ed-a7eb-389c3ea4ce56");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl03_schedule_emailSubject_textBox').val("Use your ${vehicle.Make} to get into a new one");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl03_schedule_rptCustomBatchSettings_ctl03_cbBatchSettingBool').prop("checked", true);
};