// ==UserScript==
// @name         IFM Code Bot
// @namespace    localhost
// @version      1.1
// @description  Enters IFM codes into Opcode Normalization
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://*/*/App/DealershipSettings/OpCodesNormalize.aspx*
// @grant        none
// ==/UserScript==



// IFM buttons

if (sessionStorage.getItem("ifmon") != undefined) {
    $('#ctl00_ctl00_Main_Main_siteMapPageTitle').append("<button id='ifmButton' type='button' class='float_right'><font style='color: red'>Import IFM Codes</font></button>");
    $("#ifmButton").click(function(){
        IFMCodes();
    });
}
else {
    $('#ctl00_ctl00_Main_Main_siteMapPageTitle').append("<button id='ifmButton' type='button' class='float_right'>Import IFM Codes</button>");
    $("#ifmButton").click(function(){
        IFMCodes();
    });
};

// when window loads, check state

// window.onload = IFMCheckState;
window.addEventListener('load', IFMCheckState());

// IFM Functions

function IFMCheckState() {
    var state = sessionStorage.getItem("ifm_state");
    console.log('IFM Code Bot: current state: ' + state);

    if (state == "searched") {
        IFMSelectCode();
    }

    if (state == "notfound") {
        IFMStepForward();
        IFMSearchCodes();
    }

    if (state == "found") {
        IFMEditCodes();
    }

    if (state == "edited") {
        IFMEnterCodes();
    }

    if (state == "saved") {
        if (sessionStorage.getItem("ifmdata") == "[]") {
            sessionStorage.clear("ifm_state");
            alert("Done");
            location.reload();
        }
        else {
            IFMSearchCodes();
        }
    }
}

function IFMEditCodes() {
    $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_EditOpCodeButton').click();
    sessionStorage.setItem("ifm_state", "edited");
}

function IFMCodes() {
    var ifmdata = prompt('Paste ifmdata from Excel Sheet');
    ifmdata = ifmdata.split('{{DELIM}}');
    ifmdata.pop();

    //Trim ifmdata
    for (i=0; i < ifmdata.length; i++) {
        ifmdata[i] = ifmdata[i].trim();
    }
    sessionStorage.setItem("ifmdata", JSON.stringify(ifmdata));
    sessionStorage.setItem("ifmon", true);

    IFMSearchCodes(); //force first state change
}


function IFMSearchCodes() {
	var ifmdata = IFMGetOpCode();
	var opCode = ifmdata['opCode'];
    $('#ctl00_ctl00_Main_Main_gvNormalizedOpCodes').children().children().each(function() {
        if ($(this).text().indexOf(opCode) > -1) {
            $(this).children().click();
        }
    });
    sessionStorage.setItem("ifm_state", "searched");
}

function IFMSelectCode() {
    var ifmdata = IFMGetOpCode();
    var opCode = ifmdata['opCode'];
    $("#ctl00_ctl00_Main_Main_gvNormalizedOpCodes > tbody > tr.selectedRow.GridRow > td:nth-child(1)").click();
    sessionStorage.setItem("ifm_state", "found");
}

function IFMEnterCodes() {

    var opcode = IFMGetOpCode();

    // fill out boxes
    $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_InfoMediaCodeTextBox').val(opcode['IFM']);

    IFMStepForward();

    // save state and opcode
    sessionStorage.setItem("ifm_state", "saved");
    $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_SaveChangesButton').click();
}

function IFMGetOpCode() {
    var ifmdata = sessionStorage.getItem("ifmdata");
    ifmdata = JSON.parse(ifmdata);
    var package = {};
    package['opCode'] = ifmdata[0];
    package['IFM'] = ifmdata[1];
    return package;
}

function IFMStepForward() {
    // move to next op code and save back to session
    var ifmdata = sessionStorage.getItem("ifmdata");
    ifmdata = JSON.parse(ifmdata);
    for (i=0;i<2;i++) {
        ifmdata.shift();
    }
    sessionStorage.setItem("ifmdata", JSON.stringify(ifmdata));
}