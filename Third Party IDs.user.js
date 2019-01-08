// ==UserScript==
// @name         Third Party IDs
// @namespace    localhost
// @version      1.2
// @description  Third Party IDs
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/DealershipSettings/ThirdPartyIDs.aspx
// @grant        none
// ==/UserScript==

// The selectors have changed, need to update this but not a priority


//Notice
$('#MainContent > div.container_24.clearfix > h1').append("<small style='font-size:16px'> | Script Active | </small></u>");


//buttons

$("#MainContent > div.container_24.clearfix > h1").append("Loop ID: <input name='Loop ID' type='text' id='LoopIDForScript'>");

$('#MainContent > div.container_24.clearfix > h1').append("<button id='executeButton' type='button'>Execute</font></button>");
    $("#executeButton").click(function(){
        ExecuteScript();
    });

var thirdparties = ['Amms  Generic', 'Documation', 'Salem  One', 'Subaru  United  Mail'];

//functions
function ExecuteScript() {
    var thirdPartyID = $('#LoopIDForScript').val();
    $('#MainContent > div.container_24.clearfix > div > div').children().each(function() {
        var text = $(this).text();
        text = text.trim();
        if (thirdparties.indexOf(text) > -1) {
            $(':input', this).val("AL"+thirdPartyID);
        };
    });
}



