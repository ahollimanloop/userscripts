// ==UserScript==
// @name         Company Settings QoL
// @namespace    localhost
// @version      1.1
// @description  Adds link to Global Groups.
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/DealershipSettings/Company.aspx
// @grant        none
// ==/UserScript==

$('#ctl00_ctl00_Main_Main_pnlGroups > fieldset').append('<a href="https://autoloop.us/DMS/App/GlobalSettings/CompanyGroups.aspx" target="_blank" class="float_right" style="margin-top:10px"><button type=button>Groups</button></a>');