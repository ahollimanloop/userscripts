// ==UserScript==
// @name         Company Settings QoL
// @namespace    localhost
// @version      1.2
// @description  Adds link to Global Groups.
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/DealershipSettings/Company.aspx
// @grant        none
// ==/UserScript==

// Hours tool to copy mondays hours to rest of week (besides sunday)

$('#MainContent > div.container_24.clearfix > div > fieldset:nth-child(5)').append("<button class='float_right' id='CopyMondayHoursBtn' type=button>Copy Monday Hours to Rest of Week</button>");
$('#CopyMondayHoursBtn').click(function() {
    var monOpen = $('#ctl00_ctl00_Main_Main_ochMon_ddlOpen').val();
    var monClose = $('#ctl00_ctl00_Main_Main_ochMon_ddlClose').val();

    $('#ctl00_ctl00_Main_Main_ochTue_ddlOpen').val(monOpen);
    $('#ctl00_ctl00_Main_Main_ochTue_ddlClose').val(monClose);

    $('#ctl00_ctl00_Main_Main_ochWed_ddlOpen').val(monOpen);
    $('#ctl00_ctl00_Main_Main_ochWed_ddlClose').val(monClose);

    $('#ctl00_ctl00_Main_Main_ochThu_ddlOpen').val(monOpen);
    $('#ctl00_ctl00_Main_Main_ochThu_ddlClose').val(monClose);

    $('#ctl00_ctl00_Main_Main_ochFri_ddlOpen').val(monOpen);
    $('#ctl00_ctl00_Main_Main_ochFri_ddlClose').val(monClose);

    $('#ctl00_ctl00_Main_Main_ochSat_ddlOpen').val(monOpen);
    $('#ctl00_ctl00_Main_Main_ochSat_ddlOpen').trigger('change');
    $('#ctl00_ctl00_Main_Main_ochSat_ddlClose').val(monClose);
});

$('#MainContent > div.container_24.clearfix > div > fieldset:nth-child(6)').append("<button class='float_right' id='CopyMondaySalesHoursBtn' type=button>Copy Monday Hours to Rest of Week</button>");
$('#CopyMondaySalesHoursBtn').click(function() {
    var monOpen = $('#ctl00_ctl00_Main_Main_ochSalesMon_ddlOpen').val();
    var monClose = $('#ctl00_ctl00_Main_Main_ochSalesMon_ddlClose').val();

    $('#ctl00_ctl00_Main_Main_ochSalesTue_ddlOpen').val(monOpen);
    $('#ctl00_ctl00_Main_Main_ochSalesTue_ddlClose').val(monClose);

    $('#ctl00_ctl00_Main_Main_ochSalesWed_ddlOpen').val(monOpen);
    $('#ctl00_ctl00_Main_Main_ochSalesWed_ddlClose').val(monClose);

    $('#ctl00_ctl00_Main_Main_ochSalesThr_ddlOpen').val(monOpen);
    $('#ctl00_ctl00_Main_Main_ochSalesThr_ddlClose').val(monClose);

    $('#ctl00_ctl00_Main_Main_ochSalesFri_ddlOpen').val(monOpen);
    $('#ctl00_ctl00_Main_Main_ochSalesFri_ddlClose').val(monClose);

    $('#ctl00_ctl00_Main_Main_ochSalesSat_ddlOpen').val(monOpen);
    $('#ctl00_ctl00_Main_Main_ochSalesSat_ddlOpen').trigger('change');
    $('#ctl00_ctl00_Main_Main_ochSalesSat_ddlClose').val(monClose);
});


// Link to Dealership Groups global page

$('#ctl00_ctl00_Main_Main_pnlGroups > fieldset').append('<a href="https://autoloop.us/DMS/App/GlobalSettings/CompanyGroups.aspx" target="_blank" class="float_right" style="margin-top:10px"><button type=button>Groups</button></a>');