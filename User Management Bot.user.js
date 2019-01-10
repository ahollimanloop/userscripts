// ==UserScript==
// @name         User Management Bot
// @namespace    localhost
// @version      1.4
// @description  Automate user management.
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/DealershipSettings/UserManagement.aspx
// @match        https://autoloop.us/DMS/App/DealershipSettings/EditUser.aspx
// @match        https://autoloop.us/DMS/App/DealershipSettings/AddExistingUser.aspx?UserName=*
// @match        https://autoloop.us/DMS/App/DealershipSettings/AddExistingUser.aspx?UserName=*
// @match        https://autoloop.us/DMS/App/DealershipSettings/EditUser.aspx?UserName=*
// @grant        none
// ==/UserScript==

// Global variables

// when window loads, check state -- this is the trigger

var timeOut = 1000;
window.onload = CheckState();

// Buttons

if (window.location.href == 'https://autoloop.us/DMS/App/DealershipSettings/UserManagement.aspx' || window.location.href == 'https://autoloop.us/DMS/App/DealershipSettings/UserManagement.aspx#!') {
    $('#MainContent > div.container_24.clearfix > h1').append("<button id='importButton' type='button' class='float_right'>Import Users</button>");
    var data = $("#importButton").click(function(){
        ImportUsers();
    });

    if (sessionStorage.getItem("state")) {
        $('#MainContent > div.container_24.clearfix > h1').append("<button id='clearButton' type='button' class='float_right'>Clear Users</button>");
        var data = $("#clearButton").click(function(){
            ClearUsers();
        });
    };
};

// Functions

function ClearUsers() {
    sessionStorage.clear();
    location.reload();
}

function CheckState() {
    // console logging
    //console.log(sessionStorage.getItem("state"));
    //console.log(sessionStorage.getItem("users"));

    var state = sessionStorage.getItem("state");

    if (state == "created") {
        $("#ctl00_ctl00_Main_Main_cbAllowUserPassword").click(); //user chooses password click
        sessionStorage.setItem("state", "ready");
    }
    if (state == "ready") {
        setTimeout(function() {
            EnterUser();
        }, timeOut);
    }

    if (state == "existing") {
        $('#ctl00_ctl00_Main_Main_btnAdd').click();
        sessionStorage.setItem("state", "existing_saved");
    }

    if (state == "existing_saved") {
        sessionStorage.setItem("state", "ready");
        var user_data = GetUserData();
        window.location.href = "https://autoloop.us/DMS/App/DealershipSettings/EditUser.aspx?UserName=" + user_data['email'];
        sessionStorage.setItem("pw_exists", "true");
    }

    if (state == "saved") {
        if (window.location.href == 'https://autoloop.us/DMS/App/DealershipSettings/UserManagement.aspx' || window.location.href == 'https://autoloop.us/DMS/App/DealershipSettings/UserManagement.aspx#!') {
            StepForward();
            if (sessionStorage.getItem("users") == "[]") {
                alert("The following users were not found to have any associations:\n\n" + ReturnFailedAss())
                sessionStorage.clear("state");
            }
            else {
                CreateUser();
            }
        }
        else if (window.location.href == "https://autoloop.us/DMS/App/DealershipSettings/EditUser.aspx") {
            AddExisting();
        }
    }
}

function ReturnFailedAss() {
    var string = '';
    var no_associations = JSON.parse(sessionStorage.getItem('no_ass'));
    var length = no_associations.length;
    for (i=0;i<length;i++) {
        string += no_associations[i];
        string += "\n";
    };
    return string;
};


function ImportUsers() {
    var data = prompt('Paste Data from Excel Sheet');
    data = data.split('{{DELIM}}');
    data.pop();

    //Trim Data
    for (i=0; i < data.length; i++) {
        data[i] = data[i].trim();
    }
    sessionStorage.setItem("users", JSON.stringify(data));

    CreateUser(); //force first state change
}


function CreateUser() {
    $('#ctl00_ctl00_Main_Main_btnAddNewUser').click();
    sessionStorage.setItem("state", "created");
}



function EnterUser() {

    var user_data = GetUserData();

    // parse full name
    fullName = user_data['name'].split(' ');
    var firstName = fullName[0];
    var lastName = fullName[1];
    firstName = (firstName.substring(0, 1).toUpperCase() + firstName.substring(1)); ////capitalize first letter
    lastName = (lastName.substring(0, 1).toUpperCase() + lastName.substring(1)); //capitalize first letter
    var email = user_data['email'];

    // check if this is existing user or not
    if (sessionStorage.getItem("pw_exists") == "true") {
        sessionStorage.removeItem("pw_exists");
    }
    else {
        // generate password and enter
        var password = (lastName + "1");
        while (password.length <=5){
            password += "1";
        }
        $("#ctl00_ctl00_Main_Main_tfNewPassword_textBox").val(password); //new password
        $("#ctl00_ctl00_Main_Main_tfConfirmPassword_textBox").val(password); //confirm password
        $("#ctl00_ctl00_Main_Main_tfNewPassword_label").append('<font color="red"> >[</font>').append(password).append('<font color="red">]< </font>');
    }

    // enter data
    $("#ctl00_ctl00_Main_Main_tfUserName_textBox").val(email); //username
    $("#ctl00_ctl00_Main_Main_tfEmailAddress_textBox").val(email); //email address
    $("#ctl00_ctl00_Main_Main_tfFirstName_textBox").val(firstName); //first name
    $("#ctl00_ctl00_Main_Main_tfLastName_textBox").val(lastName); //last name
    $('#ctl00_ctl00_Main_Main_txtInboxAlias').val(firstName + "." + lastName); //inbox email alias

    //roles
    switch(user_data['role']) {
		case 'Service Advisor':
			$('#ServiceAdvisorSettingsBtn').click();
			break;
		case 'Service Manager':
			$('#ServiceManagerSettingsBtn').click();
			break;
        case 'Service Coordinator':
			$('#ServiceCoordinatorSettingsBtn').click();
			break;
        case 'Technician':
			$('#TechSettingsBtn').click();
			break;
        case 'Admin':
			$('#AdminSettingsBtn').click();
			break;
        case 'BDC User':
			$('#BDCSettingsBtn').click();
			break;
        case 'Quote Admin':
			$('#QuoteAdminSettingsBtn').click();
			break;
        case 'Quote User':
			$('#QuoteUserSettingsBtn').click();
			break;
        case 'BDC Admin':
            $('#BDCAdminBtn').click();
            break;
        case 'Parts User':
            $('#PartsSettingsBtn').click();
	};

    // lane
    if (user_data['lane'] == "Lane" || user_data['lane'] == "Both") {
        if (user_data['role'] == "Service Manager" || user_data['role'] == "Service Advisor") {
            $('#LaneSettingsBtn').click();
        }
    };

    // MPI
    if (user_data['lane'] == "Mpi" || user_data['lane'] == "Both") {
        if (user_data['role'] == "Service Manager") {
            $('#ctl00_ctl00_Main_Main_cblRoles_50').click();
        }
        if (user_data['role'] == "Service Advisor") {
            $('#ctl00_ctl00_Main_Main_cblRoles_47').click();
        }
        if (user_data['role'] == "Technician") {
            $('#ctl00_ctl00_Main_Main_cblRoles_48').click();
            $('#ctl00_ctl00_Main_Main_cblRoles_2').click();
            $("#ctl00_ctl00_Main_Main_ddlLandingPage").val(17); //login landing page set to MPI ledger
        }
        if (user_data['role'] == "Parts User") {
            $('#ctl00_ctl00_Main_Main_cblRoles_49').click();
            $("#ctl00_ctl00_Main_Main_ddlLandingPage").val(17); //login landing page set to MPI ledger
        }
    };

    // Save non-existing employee Associations (for applicable roles)
    if (user_data['role'] == "Service Manager" || user_data['role'] == "Service Advisor" || user_data['role'] == "Technician" || user_data['role'] == "Parts User") {
        if ($('#ctl00_ctl00_Main_Main_ddlEmployee_chzn > a > span').text() == "(None)") {
            var no_association = [];
            if (sessionStorage.getItem('no_ass') == null) {
                var no_ass = [];
                no_association = no_ass;
            }
            else {
                no_association = JSON.parse(sessionStorage.getItem('no_ass'));
            };
            var name_ass = firstName + " " + lastName;
            if (no_association.includes(name_ass) == false) {
                no_association.push(name_ass);
                sessionStorage.setItem('no_ass', JSON.stringify(no_association));
            };
        };
    };

    setTimeout(function() {
        // save state
        sessionStorage.setItem("state", "saved");
        $('#ctl00_ctl00_Main_Main_btnSaveButton').click();
    }, timeOut);
}

function GetUserData() {
    var data = sessionStorage.getItem("users");
    data = JSON.parse(data);
    var package = {};
    package['name'] = data[0];
    package['email'] = data[1];
    package['role'] = data[2];
    package['lane'] = data[3];
    return package;
};

function StepForward() {
    // move to next op code and save back to session
    console.log("Stepping forward");
    var data = sessionStorage.getItem("users");
    data = JSON.parse(data);
    for (i=0;i<4;i++) {
        data.shift();
    }
    sessionStorage.setItem("users", JSON.stringify(data));
};

function AddExisting() {
    var user_data = GetUserData();
    sessionStorage.setItem("state", "existing");
    window.location.href = "https://autoloop.us/DMS/App/DealershipSettings/AddExistingUser.aspx?UserName=" + user_data['email'];
};