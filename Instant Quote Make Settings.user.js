// ==UserScript==
// @name         Instant Quote Make Settings
// @namespace    localhost
// @version      1.0
// @description  Fills out instant quote make settings
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/Notifications/InstantQuote/MakeSettings.aspx*
// @grant        none
// ==/UserScript==

var container = "#ctl00_ctl00_Main_Main_pnlGroup";

$(container).append("<button type='button' id='Custom' class='float_right'>Custom</button>");
$(container).append("<button type='button' id='ServicingSoon' class='float_right'>Servicing Soon</button>");
$(container).append("<button type='button' id='QuoteFollowUp' class='float_right'>Quote Service Follow-Up</button>");
$(container).append("<button type='button' id='StandardQuote' class='float_right'>Standard Quote</button>");
$(container).append("<small style='font-size: 16px; margin-top: 7px' class='float_right'>Defaults:</small>");

$('#StandardQuote').click(function() {
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_emailSubject_textBox').val('You’re in a great position to upgrade');
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_emailSelector_ddlTemplate').val("3f2c01ff-5a87-4d88-b8ed-22c4c0b0cfb7");
});

$('#QuoteFollowUp').click(function() {
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_emailSubject_textBox').val('Thank you for servicing your vehicle with us');
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_emailSelector_ddlTemplate').val("054cfd79-71f9-490e-8523-eb893483f9ee");
});

$('#ServicingSoon').click(function() {
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_emailSubject_textBox').val('Your appointment is coming up – here’s an offer you’ll like');
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_emailSelector_ddlTemplate').val("59024b85-f721-4563-a3cf-9fef6dfeecae");
});

$('#Custom').click(function() {
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_emailSubject_textBox').val('You’re in a great position to upgrade');
    $('#ctl00_ctl00_Main_Main_rptSchedule_ctl00_schedule_emailSelector_ddlTemplate').val("335af731-e3c1-487e-9fe7-e9b7a2627191");
});
