// ==UserScript==
// @name         Trade-Up Advantage Defaults (Notification Settings)
// @namespace    localhost
// @version      1.1
// @description  try to take over the world!
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/Notifications/TradeUpAdvantage/Settings.aspx
// @grant        none
// ==/UserScript==


$('#ctl00_ctl00_Main_Main_loopServiceSettings_fsTriggerSettings > legend').append("<button id='ScriptSetDefaultSettings' type='button'>Set To Default</button>");
$('#ScriptSetDefaultSettings').click(function() {
    SetDefaults();
});

function SetDefaults() {
    $('#ctl00_ctl00_Main_Main_loopServiceSettings_rptCustomSettings_ctl01_ddlSetting').val("13");
    $('#ctl00_ctl00_Main_Main_loopServiceSettings_rptCustomSettings_ctl04_ddlSetting').val("14");
    $('#ctl00_ctl00_Main_Main_loopServiceSettings_rptCustomSettings_ctl05_ddlSetting').val("120");
    $('#ctl00_ctl00_Main_Main_loopServiceSettings_rptCustomSettings_ctl06_ddlSetting').val("14");
    $('#ctl00_ctl00_Main_Main_loopServiceSettings_rptCustomSettings_ctl07_ddlSetting').val("14");
}
