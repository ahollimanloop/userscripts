// ==UserScript==
// @name         User Import/Export
// @namespace    localhost
// @version      1.1
// @description  Import/Export for User Permissions
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/DealershipSettings/EditUser.aspx*
// @grant        none
// ==/UserScript==


var main_selector = '#ctl00_ctl00_Main_Main_pnlEdit';

$('#MainContent > div.container_24.clearfix > h1').append("<div id='importContainer' style='width: 50%' class='float_right'>");

//Button
$('#importContainer').append("<button id='importButton' type='button' class='float_right'>Import</button>");
    $("#importButton").click(function(){
        Import();
    });
$("#importContainer").append("<textarea name='importBox' id='importBox' class='float_right'>");

$('#importContainer').append("<button id='exportButton' type='button' class='float_right'>Export</button>");
    $("#exportButton").click(function(){
        Export();
    });
$("#importContainer").append("<textarea name='exportBox' id='exportBox' class='float_right'>");


function Export() {

	var trigger_settings = {};
    var checkboxes = {};

	$(main_selector + ' :input').each(function() {
        var selector = $(this).prop("id");
        if (selector.indexOf('coupon') < 0 && selector.indexOf('Coupon') < 0) {
            if ($(this).prop('type') == 'checkbox') {
                if ($(this).prop('checked') == true) {
                    trigger_settings[selector] = 'checked';
                }
                if ($(this).prop('checked') == false) {
                    trigger_settings[selector] = 'unchecked';
                }
            }
            else {
                trigger_settings[selector] = $(this).val();
            }
        }
    });

    $('#exportBox').val(JSON.stringify(trigger_settings));
    $('#exportBox').select();
    document.execCommand('copy');
}

function Import() {

	var trigger_settings = $('#importBox').val();
    trigger_settings = JSON.parse(trigger_settings);
	trigger_keys = Object.keys(trigger_settings);

	for (i=0; i<trigger_keys.length; i++) {
        if (trigger_settings[trigger_keys[i]] == 'checked') {
            $("#" + trigger_keys[i]).prop('checked', true);
        }
        else if (trigger_settings[trigger_keys[i]] == 'unchecked') {
            $("#" + trigger_keys[i]).prop('checked', false);
        }
        else {
            $("#" + trigger_keys[i]).val(trigger_settings[trigger_keys[i]]);
        }
    }
}