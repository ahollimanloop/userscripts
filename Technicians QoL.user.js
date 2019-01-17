// ==UserScript==
// @name         Technicians QoL
// @namespace    localhost
// @version      1.0
// @description  New
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/Schedule/Settings/Technicians.aspx*
// @grant        none
// ==/UserScript==

$('#RightContent > h1').append('<button type=button id="areaCodeFill" class="float_right">Fill Area Codes with 1</button>')
$('#areaCodeFill').click(function() {
    $('input[name="countryCode"]').val('1');
    $('input[name="countryCode"]').trigger('change');
});