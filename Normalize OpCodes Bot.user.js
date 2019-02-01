// ==UserScript==
// @name         Normalize OpCodes Bot
// @namespace    localhost
// @version      1.4
// @description  Automate op code normalization and adds IFM codes.
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://*/*/App/DealershipSettings/OpCodesNormalize.aspx*
// @grant        none
// ==/UserScript==

// dynamic button, will be red is script is considered active

if (sessionStorage.getItem("op_state") != undefined) {
    $('#ctl00_ctl00_Main_Main_siteMapPageTitle').append("<button id='importButton' type='button' class='float_right'><font style='color: red'>Import OpCodes</font></button>");
    $("#importButton").click(function(){
        ImportCodes();
    });
}
else {
    $('#ctl00_ctl00_Main_Main_siteMapPageTitle').append("<button id='importButton' type='button' class='float_right'>Import OpCodes</button>");
    $("#importButton").click(function(){
        ImportCodes();
    });
};


// when window loads, check state

//window.onload = CheckState;
window.addEventListener('load', CheckOpState());

// Functions

function CheckOpState() {
    var state = sessionStorage.getItem("op_state");
    console.log('Normalize OpCodes Bot: current state: ' + state);
    if (state == "created") {
        EnterCodes();
    }

    if (state == "saved") {
        if (sessionStorage.getItem("data") == "[]") {
            alert("Done.")
            sessionStorage.clear();
            location.reload();
        }
        else {
            CreateCodes();
        }
    }
}


function ImportCodes() {
    var data = prompt('Paste Data from Excel Sheet (Column "Q")');
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
        console.log('overwrite enabled')
    }
    CreateCodes(); //force first state change
}


function CreateCodes() {
    sessionStorage.setItem("op_state", "created");
    console.log('Creating opcode...');
    $('#ctl00_ctl00_Main_Main_CreateOpCodeButton').click();
}

function EnterCodes() {
    var opcode = GetOpCode();
    var overwrite = sessionStorage.getItem("overwrite");
    if (overwrite != "yes") {
        while (opCodeExistCheck(opcode.opCode) == true){
            console.log("Opcode " + opcode.opCode + " exists, stepping forward");
            StepForward();
            opcode = GetOpCode();
        }
    }
    if (sessionStorage.getItem("data") == "[]") {
        console.log('ran out of data during opCodeExistCheck, cancelling creation')
        sessionStorage.setItem('op_state', 'saved');
        $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_CancelChangesButton').click();
        return;
    };
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
    sessionStorage.setItem("op_state", "saved");
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
    console.log('stepping forward');
    var data = sessionStorage.getItem("data");
    data = JSON.parse(data);
    for (i=0;i<7;i++) {
        data.shift();
    }
    sessionStorage.setItem("data", JSON.stringify(data));
}

// from Ned's old macro, not using jQuery (shouldn't matter)
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

