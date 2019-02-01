// ==UserScript==
// @name         Opcode Vehicle Bot
// @namespace    localhost
// @version      1.0
// @description  Adds vehicles to opcodes. See 'OpCode Vehicle Script Data.xlsx'
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://*/*/App/DealershipSettings/OpCodesNormalize.aspx*
// @grant        none
// ==/UserScript==

// Add Buttons

if (sessionStorage.getItem("veh_state") != undefined) {
    $('#ctl00_ctl00_Main_Main_siteMapPageTitle').append("<button id='vehImportButton' type='button' class='float_right'><font style='color: red'>Import Vehicles</font></button>");
    var data = $("#vehImportButton").click(function(){
        ImportVehicles();
    });
}
else {
    $('#ctl00_ctl00_Main_Main_siteMapPageTitle').append("<button id='vehImportButton' type='button' class='float_right'>Import Vehicles</button>");
    var data = $("#vehImportButton").click(function(){
        ImportVehicles();
    });
};

// Check state on reload

//window.onload = CheckVehState;
window.addEventListener('load', CheckVehState());

// Global variables



// Functions

function CheckVehState() {
    var state = sessionStorage.getItem('veh_state');
    console.log('Opcode Vehicle Bot: current state: ' + state);

    switch(state) {

        case 'found':
            console.log('editing')
            EditCode();
            break;

        case 'editing':
            AddVehicle();
            break;

        case 'new_vehicle':
            SelectMake();
            break;

        case 'selected_make':
            AddSettings();
            break;

        case 'vehicle_saved':
            if (CheckNextCode() == true) {
                console.log('Opcode is same, adding vehicle');
                AddVehicle();
            }
            else {
                console.log('Opcode different, saving opcode');
                SaveCode();
            };
            break;

        case 'saved':
            if (sessionStorage.data == "[]") {
                missing_codes = sessionStorage.opcodes_not_found
                alert("Done. The following Opcodes have not been found: \n" + missing_codes);
                sessionStorage.clear();
                location.reload();
                break;
            };
            SearchCodes();
            break;
    };
};

function ImportVehicles() {
    var data = prompt('Paste data from Excel Sheet');
    data = data.split('{{DELIM}}');
    data.pop();

    //Trim data
    for (i=0; i < data.length; i++) {
        data[i] = data[i].trim();
    }
    sessionStorage.setItem("data", JSON.stringify(data));
    sessionStorage.setItem("on", true);

    SearchCodes();
};

function SearchCodes() {
    console.log('searching codes');

	var data = GetOpCode();
	var opCode = data.opCode;
    var found = false;
    $('#ctl00_ctl00_Main_Main_gvNormalizedOpCodes td').each(function() {
        if ($(this).text().trim() == opCode) {
            console.log('clicking ' + opCode);
            sessionStorage.setItem("veh_state", 'found');
            $(this).click();
            found = true;
        }
    });
    if (found == false) {
        NotFound(opCode);
        StepForward();
        location.reload();
    };
};

function NotFound(opcode) {
    if (sessionStorage.opcodes_not_found == undefined) {
        sessionStorage.setItem('opcodes_not_found', JSON.stringify([opcode]));
    }
    else {
        var opcodes_not_found = JSON.parse(sessionStorage.opcodes_not_found);
        opcodes_not_found.push(opcode);
        sessionStorage.setItem('opcodes_not_found', JSON.stringify(opcodes_not_found))
    };
};

function EditCode() {
    sessionStorage.setItem("veh_state", "editing");
    $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_EditOpCodeButton').click();
}

function AddVehicle() {
    console.log('adding vehicle');
    sessionStorage.setItem("veh_state", "new_vehicle");
    $('#ctl00_ctl00_Main_Main_btnAddNewVehicle').click();
};

function SelectMake() {
    console.log('selecting make');
    var data = GetOpCode();
    sessionStorage.setItem("veh_state", "selected_make");
    $('#ctl00_ctl00_Main_Main_fvNewVehicle_VehicleMakeDDL').val(data.make);
    $('#ctl00_ctl00_Main_Main_fvNewVehicle_VehicleMakeDDL').trigger('change');
};

function AddSettings() {
    console.log('adding settings');
    var data = GetOpCode();

    $('#ctl00_ctl00_Main_Main_fvNewVehicle_VehicleModelDDL').val(data.model);
    $('#ctl00_ctl00_Main_Main_fvNewVehicle_BeginYearTextBox').val(data.begin);
    $('#ctl00_ctl00_Main_Main_fvNewVehicle_EndYearTextBox').val(data.end);

    sessionStorage.setItem("veh_state", "vehicle_saved");
    $('#ctl00_ctl00_Main_Main_fvNewVehicle_btnSaveNewVehicle').click();
};

function CheckNextCode() {
    console.log('checking next code');
    // returns true if next opcode in line is the same as the one before it
    var data = GetOpCode();
    StepForward();
    var data2 = GetOpCode();
    if (data.opCode == data2.opCode) {
        return true;
    }
    else {
        return false;
    };
};

function SaveCode() {
    console.log('saving opcode');
    sessionStorage.setItem("veh_state", "saved");
    $('#ctl00_ctl00_Main_Main_fvNormalizedOpCode_SaveChangesButton').click();
};

function GetOpCode() {
    var data = JSON.parse(sessionStorage.getItem("data"));
    var package = {};
    package['opCode'] = data[0];
    package['make'] = data[1];
    package['model'] = data[2];
    package['begin'] = data[3];
    package['end'] = data[4];
    return package;
}

function StepForward() {
    // move to next op code and save back to session
    var data = sessionStorage.getItem("data");
    data = JSON.parse(data);
    for (i=0;i<5;i++) {
        data.shift();
    }
    sessionStorage.setItem("data", JSON.stringify(data));
}