// ==UserScript==
// @name         Trade-Up Welcome Defaults (Make Settings)
// @namespace    localhost
// @version      1.1
// @description  Configure Trade up Welcome Make
// @author       Austin Holliman (aholliman@autoloop.com)
// @include        https://autoloop.us/DMS/App/Notifications/TradeUpWelcome/MakeSettings.aspx*
// @grant        none
// ==/UserScript==

$('#MainContent > div.container_24.clearfix > h2').append("<button id='ScriptSetDefaults' type='button'>Set Defaults</button>");
$('#ScriptSetDefaults').click(function() {
    SetDefaults();
});

function SetDefaults() {
    // 1st interval
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_ddlDelay').val("13");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_emailSelector_ddlTemplate').val("a4bc5c1b-f410-46bd-b957-3026db69adb4");
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_emailSubject_textBox').val("We value you - and your vehicle");
}