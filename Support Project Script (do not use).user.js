// ==UserScript==
// @name         Support Project Script (do not use)
// @namespace    localhost
// @version      0.1
// @description  For appointment resubmission.
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://*/DMS/App/Notifications/VehicleAccessories/Settings.aspx
// @match        https://*/dms/app/companyselector.aspx
// @match        https://autoloop.us/DMS/App/DealershipSettings/Default.aspx
// @match        https://autoloop.us/DMS/App/Default.aspx
// @match        https://autoloop.us/DMS/App/Schedule/Default.aspx
// @match        https://autoloop.us/DMS/App/Schedule/Details.aspx?AppointmentId=*
// @match        https://autoloop.us/DMS/App/Schedule/Customers.aspx
// @grant        none
// ==/UserScript==

window.onload = CheckState();

$('#lbtnCancel').click(function() {
    var stores = GetStoreData();
    storeName = stores['name'];
    Revisit(storeName);
});

$('#MainContent > div.container_24.clearfix').append("<button id='VehAccScriptBtn' type='button'>Execute Script</button>");
$('#VehAccScriptBtn').click(function() {
    ImportData();
});

function ImportData() {
    var data = prompt('Paste Data from Excel Sheet');
    data = data.split('{{DELIM}}');
    data.pop();

    //Trim Data
    for (i=0; i < data.length; i++) {
        data[i] = data[i].trim();
    }

    sessionStorage.setItem("stores", JSON.stringify(data));

    var revisit = [];
    sessionStorage.setItem("revisit", JSON.stringify(revisit));

    MoveToNext();
    sessionStorage.setItem('state', 'saved');
};

function CheckState() {
    console.log('checking');
    var state = sessionStorage.getItem("state");

    // check if done
    if (sessionStorage.stores == "[]") {
        var revisitlist = JSON.parse(sessionStorage.revisit);
        var revisitpack = 'Stores: \n';
        for (i=0;i<revisitlist.length;i++) {
            revisitpack += revisitlist[i] + '\n';
        };
        console.log("Done\n\n" + revisitpack);
        alert('done');
        sessionStorage.stores == 'done';
        sessionStorage.state = "done";
        return;
    };

    if (state == "saved") {
        StepForward();
        if (window.location.href == "https://autoloop.us/dms/app/companyselector.aspx") {
            sessionStorage.state = "ready";
            MoveToNext();
        }
        else {
            window.location.href = "https://autoloop.us/dms/app/companyselector.aspx";
            sessionStorage.state = "ready";
        };
    };
    if (state == "ready") {
        MoveToNext();
    };
    if (state == "selected") {
        GoToAppointment();
    };
    if (state == "loaded") {
        RunScript()
        setTimeout(function() {
            SelectOpcode();
        }, 4000);
    };
    if (state == "next") {
        sessionStorage.setItem('state', "saved");
    };
};

// state functions

function MoveToNext() {
    console.log('moving');
    var stores = GetStoreData();
    var storeName = stores['name'];
    var found = false;
    $('#ddlCompanies').children().each(function() {
        if ($(this).text() == storeName) {
            //console.log($(this).val());
            $('#ddlCompanies').val($(this).val());
            $('#ctl00_ctl00_Main_Main_btnGo').click();
            sessionStorage.setItem('state', "selected");
            found = true;
        };
    });
    if (found == false) {
        Revisit(storeName);
        StepForward();
        location.reload();
    };
};

function GoToAppointment() {
    var store = GetStoreData();
    var apptid = store['id'];
    var url = 'https://autoloop.us/DMS/App/Schedule/Details.aspx?AppointmentId=' + apptid + '&DetailsPageTab=appointment&ReturnUrl=Customers.aspx';
    window.location.href = url;
    sessionStorage.state = "loaded";
};

function RunScript() {
    console.log('running');
    stores = GetStoreData();
    storeName = stores['name'];
    setTimeout(function() {
        if ($('#AppointmentAvailabilityGridContainer > div:nth-child(1)').prop('class') != 'ng-hide' || $('#AppointmentAvailabilityGridContainer > div:nth-child(2)').prop('class') != 'ng-hide' || $('#AppointmentAvailabilityGridContainer > div:nth-child(3)').prop('class') != 'ng-hide' || $('#AppointmentAvailabilityGridContainer > div:nth-child(4)').prop('class') != 'ng-hide') {
            if ($('#tbAppointmentTime').val() != "") {
                $('#servicesDetailsTabLi > a').click();
            }
            else {
                console.log('adding to revisit: no apt time');
                Revisit(storeName);
                sessionStorage.setItem('state', "saved");
                window.location.href = "https://autoloop.us/dms/app/companyselector.aspx";
            };
        }
        else {
            $('#servicesDetailsTabLi > a').click();
        };
    }, 3000);
};

function SelectOpcode() {
    console.log('selecting opcode');
    var store = GetStoreData();
    var opcodelist = store['opcode'];
    var storeName = store['name'];
    var unableToFind = true;

    // look for opcode in list of normalized
    opcodelist = opcodelist.split(' ');
    var opcodelen = opcodelist.length;
    var services = [];
    $('.opcode_column.valign_top :input').each(function() {
        services.push($(this).val());
	});
    var foundopcodes = 0;
    for (i=0;i<opcodelen;i++) {
        var importedOpcode = opcodelist[i];
        $('#ddlVehicleServices').children().each(function() {
            var opcode = $(this).text();
            opcode = opcode.split(' ');
            opcode = opcode[0];
            if (opcode == importedOpcode) {
                if (services.includes(opcode) == false) {
                    console.log('adding opcode: ' + opcode);
                    var opcodeVal = $(this).val();
                    $('#ddlVehicleServices').val(opcodeVal);
                    $('#ddlVehicleServices').trigger('change');
                    $('#ctl00_ctl00_ctl00_Main_Main_Main_btAddRecommends').click();
                    unableToFind = false;
                }
                else {
                    unableToFind = false;
                    console.log('opcode exists');
                    foundopcodes++;
                };
            };
        });
    };

    if (foundopcodes == opcodelen) {
        console.log('all opcodes already added');
        sessionStorage.setItem('state', "saved");
        window.location.href = "https://autoloop.us/dms/app/companyselector.aspx";
    };
    // make sure opcode was found
    if (unableToFind == true) {
        console.log('unable to find 1 or more opcode');
        Revisit(storeName);

        sessionStorage.setItem('state', "next");
    }
    $('#appointmentDetailsTabLi > a').click();
    setTimeout(function() {
        // uncheck confirmation and save and close
        if ($('#AppointmentAvailabilityGridContainer > div:nth-child(1)').prop('class') != 'ng-hide' || $('#AppointmentAvailabilityGridContainer > div:nth-child(2)').prop('class') != 'ng-hide' || $('#AppointmentAvailabilityGridContainer > div:nth-child(3)').prop('class') != 'ng-hide' || $('#AppointmentAvailabilityGridContainer > div:nth-child(4)').prop('class') != 'ng-hide') {
            if ($('#tbAppointmentTime').val() != "") {
                $('#chkCustomerEmail').prop('checked', false);
                $('#lbtnSaveClose').click();
            }
            else {
                console.log('adding to revisit: no apt time');
                Revisit(storeName);
                sessionStorage.setItem('state', "saved");
                window.location.href = "https://autoloop.us/dms/app/companyselector.aspx";
            };
        }
        else {
            $('#chkCustomerEmail').prop('checked', false);
            $('#lbtnSaveClose').click();
        };
    }, 5000);

    sessionStorage.setItem('state', "saved");
};

// utility functions

function Revisit(store) {
    console.log('adding ' + store + ' to revisit queue');
    var revisitlist = JSON.parse(sessionStorage.getItem("revisit"));
    revisitlist.push(store);
    sessionStorage.setItem('revisit', JSON.stringify(revisitlist));
};

function GetStoreData() {
    var data = JSON.parse(sessionStorage.getItem("stores"));
    var package = {};
    package['name'] = data[0];
    package['id'] = data[1];
    package['opcode'] = data[2];
    return package;
}


function StepForward() {
    console.log('stepping');
    var stores = JSON.parse(sessionStorage.getItem('stores'));
    for (i=0;i<3;i++) {
        stores.shift();
    }
    sessionStorage.setItem("stores", JSON.stringify(stores));
};