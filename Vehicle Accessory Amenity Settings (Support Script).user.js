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
// @grant        none
// ==/UserScript==


window.onload = CheckState();

$('#MainContent > div.container_24.clearfix').append("<button id='VehAccScriptBtn' type='button'>Execute Script</button>");
$('#VehAccScriptBtn').click(function() {
    var data = prompt('Paste Data from Excel Sheet');
    data = data.split('{{DELIM}}');
    data.pop();

    //Trim Data
    for (i=0; i < data.length; i++) {
        data[i] = data[i].trim();
    }
    sessionStorage.setItem("stores", JSON.stringify(data));
    var unfound = [];
    sessionStorage.setItem("unfound", JSON.stringify(unfound));
    MoveToNext();
    sessionStorage.setItem('state', 'saved');
});

function RunScript() {
    console.log('running');
    if ($('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_cbShowAmenities').prop("checked") == false) {
        $('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_cbShowAmenities').click();
        console.log("ENABLING");
        var obj = $('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_cbShowAmenities').parent();
        obj.append("<small>(Checked by Script! Save Page!!)</small>");
        var dep = $('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_ddlTriggerDepartment').val();
        if (dep == 0) {
            $('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_ddlAmenityCategory').val(1);
        }
        if (dep == 1) {
            $('#ctl00_ctl00_Main_Main_loopServiceSettings_loopBaseTriggerSettings_ddlAmenityCategory').val(2);
        }
    };
    $('#ctl00_ctl00_Main_Main_loopServiceSettings_btnSubmit').click();
    sessionStorage.setItem('state', 'saved');
};

function MoveToNext() {
    console.log('moving');
    var stores = JSON.parse(sessionStorage.getItem('stores'));
    var storeName = stores[0];
    var counter = 0;
    $('#ddlCompanies').children().each(function() {
        if ($(this).text() == storeName) {
            console.log($(this).val());
            $('#ddlCompanies').val($(this).val());
            $('#ctl00_ctl00_Main_Main_btnGo').click();
            sessionStorage.setItem('state', "selected");
            counter++;
        };
    });
    if (counter == 0) {
        var nope = JSON.parse(sessionStorage.getItem("unfound"));
        nope.push(storeName);
        sessionStorage.setItem('unfound', JSON.stringify(nope));
        location.reload();
    };
    StepForward();
};

function CheckState() {
    console.log('checking');
    var state = sessionStorage.getItem("state");
    if (sessionStorage.stores == "[]") {
        alert("done" + sessionStorage.unfound);
        sessionStorage.state = "Done";
    };
    if (state == "loaded") {
        RunScript(); // run script and save
    }
    if (state == "saved") {
        window.location.href = "https://autoloop.us/dms/app/companyselector.aspx";
        sessionStorage.state = "ready";
    }
    if (state == "ready") {
        MoveToNext(); // move to next page
    };
    if (state == "selected") {
        window.location.href = "https://autoloop.us/DMS/App/Notifications/VehicleAccessories/Settings.aspx";
        sessionStorage.state = "loaded";
    };
};


function StepForward() {
    console.log('stepping');
    var stores = JSON.parse(sessionStorage.getItem('stores'));
    stores.shift();
    sessionStorage.setItem("stores", JSON.stringify(stores));
};