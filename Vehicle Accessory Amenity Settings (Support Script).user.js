// ==UserScript==
// @name         Vehicle Accessory Amenity Settings (Support Script)
// @namespace    localhost
// @version      0.1
// @description  Checks show amenities and sets amenity category to trigger department.
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
	Revisit($('#DealershipDisplay > span').text());
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
    window.onbeforeunload=null;
    var state = sessionStorage.getItem("state");

    // check if done
    if (sessionStorage.stores == "[]") {
        alert("Done");
        alert(JSON.parse(sessionStorage.revisit));
        sessionStorage.stores == 'done';
        sessionStorage.state = "done";
        return;
    };

    if (state == "saved") {
        window.location.href = "https://autoloop.us/dms/app/companyselector.aspx";
        sessionStorage.state = "ready";
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
        StepForward();
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
    // goto services tab
    $('#servicesDetailsTabLi > a').click();
};

function SelectOpcode() {
    console.log('selecting opcode');
    setTimeout(function() {
        console.log('timeout, cancelling');
        var realConfirm = window.confirm;
        window.confirm = function() {
            window.confirm = realConfirm;
            return true;
        };
        var realPrompt = window.prompt;
        window.prompt = function() {
            window.prompt = realPrompt;
            return true;
        };
        $('#lbtnCancel').click();
    }, 30000);
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
                };
            };
        });
    };

    // make sure opcode was found
    if (unableToFind == true) {
        Revisit(storeName);

        sessionStorage.setItem('state', "next");

        var realConfirm = window.confirm;
        window.confirm = function() {
            window.confirm = realConfirm;
            return true;
        };
        $('#lbtnCancel').click();
    }
    $('#appointmentDetailsTabLi > a').click();
    setTimeout(function() {
        // uncheck confirmation and save and close
        $('#chkCustomerEmail').prop('checked', false);
        if ($('#tbAppointmentTime').val() == "" || $('#AppointmentAvailabilityGridContainer > div:nth-child(4)').text().includes('Date Already Passed')) {
            console.log('adding to revisit: no apt time');
            Revisit(storeName);

            var realConfirm = window.confirm;
            window.confirm = function() {
                window.confirm = realConfirm;
                return true;
            };
            console.log('clicking cancel');
            $('#lbtnCancel').click();
        }
        else {
            $('#lbtnSaveClose').click();
        };
    }, 5000);

    sessionStorage.setItem('state', "saved");
    StepForward();
};

// utility functions

function Revisit(store) {
    console.log('adding ' + store + ' to revisit queue');
    var revisitlist = JSON.parse(sessionStorage.getItem("revisit"));
    if (revisitlist.includes(store)) {
        return;
    }
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