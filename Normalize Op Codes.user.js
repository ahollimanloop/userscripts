// ==UserScript==
// @name         Normalize Op Codes
// @namespace    localhost
// @version      1.1
// @description  Automate op code normalization and adds IFM codes.
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/DealershipSettings/OpCodesNormalize.aspx
// @match        https://autoloop.us/DMS/App/DealershipSettings/OpCodesNormalize.aspx?Tab=Normalized
// @grant        none
// ==/UserScript==


if (sessionStorage.getItem("state") != undefined) {
    $('#ctl00_ctl00_Main_Main_siteMapPageTitle').append("<button id='importButton' type='button' class='float_right'><font style='color: red'>Import OpCodes</font></button>");
    var data = $("#importButton").click(function(){
        ImportCodes();
    });
}
else {
    $('#ctl00_ctl00_Main_Main_siteMapPageTitle').append("<button id='importButton' type='button' class='float_right'>Import OpCodes</button>");
    var data = $("#importButton").click(function(){
        ImportCodes();
    });
};


if (sessionStorage.getItem("ifmon") != undefined) {
    $('#ctl00_ctl00_Main_Main_siteMapPageTitle').append("<button id='ifmButton' type='button' class='float_right'><font style='color: red'>Import IFM Codes</font></button>");
    var ifmdata = $("#ifmButton").click(function(){
        IFMCodes();
    });
}
else {
    $('#ctl00_ctl00_Main_Main_siteMapPageTitle').append("<button id='ifmButton' type='button' class='float_right'>Import IFM Codes</button>");
    var ifmdata = $("#ifmButton").click(function(){
        IFMCodes();
    });
};


/*
$('#ctl00_ctl00_Main_Main_siteMapPageTitle').append("<button id='clearButton' type='button'>Clear State</button><hr>");
    $("#clearButton").click(function(){
        sessionStorage.clear("state");
    });
*/

// when window loads, check state -- this is the trigger

window.onload(CheckState());



// Functions

function CheckState() {
    if (sessionStorage.getItem("ifmon")) { IFMCheckState(); return; };
    var state = sessionStorage.getItem("state");
    $('#State').val(state);

    if (state == "created") {
        EnterCodes();
    }

    if (state == "saved") {
        if (sessionStorage.getItem("data") == "[]") {
            alert("Done")
            sessionStorage.clear("state");
        }
        else {
            CreateCodes();
        }
    }
}


function ImportCodes() {
    var data = prompt('Paste Data from Excel Sheet (Column "O")');
    data = data.split('{{DELIM}}');
    data.pop();

    //Trim Data
    for (i=0; i < data.length; i++) {
        data[i] = data[i].trim();
    }
    sessionStorage.setItem("data", JSON.stringify(data));

    var overwrite = prompt('Overwrite existing opcodes with new info? (Only "YES" will overwrite)')
    if (overwrite == 'YES') {
        sessionStorage.setItem("overwrite", "yes");
    }
    CreateCodes(); //force first state change
}


function CreateCodes() {
    $('#ctl00_ctl00_Main_Main_CreateOpCodeButton').click();
    sessionStorage.setItem("state", "created");
}

function EnterCodes() {

    var opcode = GetOpCode();
    var overwrite = sessionStorage.getItem("overwrite");
    if (overwrite != "yes") {
        while (opCodeExistCheck(opcode.opCode) == true){
            console.log("Op code exists, stepping forward");
            StepForward();
            opcode = GetOpCode();
        }
    }
    // fill out boxes
    $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_OpCodeTextBox').val(opcode['opCode']);
    $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_OpCodeDescTextBox').val(opcode['name']);
    if (opcode['desc'] == "{{NONE}}") {
        $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_txtOpCodeOnlineDesc').val(opcode['name']);
    }
    else {
        $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_txtOpCodeOnlineDesc').val(opcode['desc']);
    }
    if (opcode['price'] != "{{NONE}}") {
        $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_BillAmountTextBox').val(opcode['price']);
    }
    if (opcode['dur'] != "{{NONE}}") {
        $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_DurationTextBox_textBox').val(opcode['dur']);
    }
    if (opcode['online'] == "YES"){
        $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_cbNormalizedOnline').click();
    }
    if (opcode['highlight'] == "YES"){
        $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_cbNormalizedHighlight').click();
    }

    StepForward();

    // save state and opcode
    sessionStorage.setItem("state", "saved");
    $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_SaveChangesButton').click();
}

function GetOpCode() {
    var data = sessionStorage.getItem("data");
    data = JSON.parse(data);
    var package = {};
    package['opCode'] = data[0];
    package['name'] = data[1];
    package['desc'] = data[2];
    package['price'] = data[3];
    package['dur'] = data[4];
    package['online'] = data[5];
    package['highlight'] = data[6];
    return package;
}

function StepForward() {
    // move to next op code and save back to session
    var data = sessionStorage.getItem("data");
    data = JSON.parse(data);
    for (i=0;i<7;i++) {
        data.shift();
    }
    sessionStorage.setItem("data", JSON.stringify(data));
}

// from Ned's old macro, not using jQuery calls
function opCodeExistCheck(opCode){
	var found = false;
	var rowCount = window.document.getElementById("ctl00_ctl00_Main_Main_gvNormalizedOpCodes").rows.length;
	for (k=1; k < rowCount; k++) {
	  var text = window.document.getElementById("ctl00_ctl00_Main_Main_gvNormalizedOpCodes").rows[k].cells[0].innerHTML;
	  if (text == opCode) {
          found = true;
      }
    }
	return found;
}


// IFM Functions


function IFMCheckState() {
    if (sessionStorage.getItem("state") == null) {
        sessionStorage.setItem("state", "uninit");
    }
    var state = sessionStorage.getItem("state");

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
            sessionStorage.clear("state");
            alert("Done");
        }
        else {
            IFMSearchCodes();
        }
    }
}

function IFMEditCodes() {
    $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_EditOpCodeButton').click();
    sessionStorage.setItem("state", "edited");
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
    sessionStorage.setItem("state", "searched");
}

function IFMSelectCode() {
    var ifmdata = IFMGetOpCode();
    var opCode = ifmdata['opCode'];
    $("#ctl00_ctl00_Main_Main_gvNormalizedOpCodes > tbody > tr.selectedRow.GridRow > td:nth-child(1)").click();
    sessionStorage.setItem("state", "found");
}

function IFMEnterCodes() {

    var opcode = IFMGetOpCode();

    // fill out boxes
    $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_InfoMediaCodeTextBox').val(opcode['IFM']);

    IFMStepForward();

    // save state and opcode
    sessionStorage.setItem("state", "saved");
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