// ==UserScript==
// @name        User Configuration
// @namespace    localhost
// @version      1.5
// @description  Adds new users, sets up permissions.
// @author       Austin Holliman (aholliman@autoloop.com)
// @include      https://autoloop.us/DMS/App/DealershipSettings/EditUser.aspx?UserName=*
// @include      https://autoloop.us/DMS/App/DealershipSettings/EditUser.aspx
// @grant        none
// ==/UserScript==

//================= <AUTOSAVE> ===================//

var AutoSave;
//AutoSave = "on"; // COMMENT THIS OUT IF YOU DONT WANT THE SCRIPT TO AUTOSAVE


// This inputs an email alias for existing users. If one exists, it creates a fix button
if ($('#ctl00_ctl00_Main_Main_txtInboxAlias').val() == "") { //inbox email alias
    $('#ctl00_ctl00_Main_Main_pnlInboxSettings > fieldset > legend').append("<small style='font-size:12px'>(Added by Script)</small>");
    var firstName = $('#ctl00_ctl00_Main_Main_tfFirstName_textBox').val();
    var lastName = $('#ctl00_ctl00_Main_Main_tfLastName_textBox').val();
    $('#ctl00_ctl00_Main_Main_txtInboxAlias').val(firstName + "." + lastName);
    if (AutoSave == "on") {$('#ctl00_ctl00_Main_Main_btnSaveButton').click();};
} else {
    $('#ctl00_ctl00_Main_Main_pnlInboxSettings > fieldset > legend').append("<button id='FixInboxAliasBtn' type='button'>Fix</button>")
    $('#FixInboxAliasBtn').click(function() {
        var firstName = $('#ctl00_ctl00_Main_Main_tfFirstName_textBox').val();
        var lastName = $('#ctl00_ctl00_Main_Main_tfLastName_textBox').val();
        $('#ctl00_ctl00_Main_Main_txtInboxAlias').val(firstName + "." + lastName);
    })
    if (AutoSave == "on") {$('#ctl00_ctl00_Main_Main_btnSaveButton').click();};
}


// Always making sure it doesnt send a welcome email
if($("#ctl00_ctl00_Main_Main_cbWelcomeEmail").prop("checked", false)) {
    $("#ctl00_ctl00_Main_Main_cbWelcomeEmail").prop("checked", false); //welcome email unchecked
}


// Buttons

$('#MainContent > div.container_24.clearfix > h1').append("<br><hr><div id='serviceContainer' class='float_left' style='width: 50%'><small style='font-size:16px'>Service: </small>");

//service advisor settings button
$("#serviceContainer").append("<button id='ServiceAdvisorSettingsBtn' type='button'>Advisor</button>");
$("#ServiceAdvisorSettingsBtn").click(function() {
    ServiceAdvisorSettings();
});

//service manager settings button
$("#serviceContainer").append("<button id='ServiceManagerSettingsBtn' type='button'>Manager</button>");
$("#ServiceManagerSettingsBtn").click(function() {
    ServiceManagerSettings();
});

//service coordinator settings button
$("#serviceContainer").append("<button id='ServiceCoordinatorSettingsBtn' type='button'>Coordinator</button>");
$("#ServiceCoordinatorSettingsBtn").click(function() {
    ServiceCoordinatorSettings();
});

// tech settings button
$("#serviceContainer").append("<button id='TechSettingsBtn' type='button'>Tech</button>");
$("#TechSettingsBtn").click(function() {
    TechSettings();
});

// parts settings button
$("#serviceContainer").append("<button id='PartsSettingsBtn' type='button'>Parts</button>");
$("#PartsSettingsBtn").click(function() {
    PartsSettings();
});

//lane settings button
$("#serviceContainer").append("<button id='LaneSettingsBtn' type='button'>Lane</button>");
$("#LaneSettingsBtn").click(function() {
    LaneSettings();
});


$('#MainContent > div.container_24.clearfix > h1').append("<div id='salesContainer' class='float_right' style='width: 50%'><small style='font-size:16px'>Sales: </small>");

//admin settings button
$("#salesContainer").append("<button id='AdminSettingsBtn' type='button'>General Admin</button>");
$("#AdminSettingsBtn").click(function() {
    AdminSettings();
});

//bdc settings button
$("#salesContainer").append("<button id='BDCSettingsBtn' type='button'>BDC User</button>");
$("#BDCSettingsBtn").click(function() {
    BDCSettings();
});

// bdc admin button
$("#salesContainer").append("<button id='BDCAdminBtn' type='button'>BDC Admin</button>");
$("#BDCAdminBtn").click(function() {
    BDCAdmin();
});

// quote admin settings button
$("#salesContainer").append("<button id='QuoteAdminSettingsBtn' type='button'>Quote Admin</button>");
$("#QuoteAdminSettingsBtn").click(function() {
    QuoteAdminSettings();
});

// quote user settings button
$("#salesContainer").append("<button id='QuoteUserSettingsBtn' type='button'>Quote User</button>");
$("#QuoteUserSettingsBtn").click(function() {
    QuoteUserSettings();
});



//new user button
$("#MainContent > div.container_24.clearfix > h1").append("<br><div style='width: 50%' class='float_left' id='userFunctionContainer'><button id='executeButton' type='button' style='margin-left: 150px'><font color='green'>New User</font></button>");
$("#executeButton").click(function(){
    ExecuteScript();
});

//password button
$("#userFunctionContainer").append("<button id='passwordButton' type='button'><font color='green'>Set Password</font></button>");
$("#passwordButton").click(function(){
    SetPassword();
});


//functions

function SetPassword() {
    var lastName = $('#ctl00_ctl00_Main_Main_tfLastName_textBox').val();
    var password = (lastName + "1");
    while (password.length <=5){
        password += "1";
    }
    $("#ctl00_ctl00_Main_Main_tfNewPassword_textBox").val(password); //new password
    $("#ctl00_ctl00_Main_Main_tfConfirmPassword_textBox").val(password); //confirm password
    $("#ctl00_ctl00_Main_Main_tfNewPassword_label").append('<font color="red"> >[</font>').append(password).append('<font color="red">]< </font>');
    //console.log("pw:", password, " | ln:", lastName);

}

function ExecuteScript() {
    $("#ctl00_ctl00_Main_Main_cbAllowUserPassword").click(); //user chooses password click
    var email = prompt("Email/Username?").toLowerCase();
    var fullName = prompt("Full Name?").toLowerCase();
    fullName = fullName.split(' ');
    var firstName = fullName[0];
    var lastName = fullName[1];
    firstName = (firstName.substring(0, 1).toUpperCase() + firstName.substring(1)); ////capitalize first letter
    lastName = (lastName.substring(0, 1).toUpperCase() + lastName.substring(1)); //capitalize first letter

    $("#ctl00_ctl00_Main_Main_tfUserName_textBox").val(email); //username
    $("#ctl00_ctl00_Main_Main_tfEmailAddress_textBox").val(email); //email address
    $("#ctl00_ctl00_Main_Main_tfFirstName_textBox").val(firstName); //first name
    $("#ctl00_ctl00_Main_Main_tfLastName_textBox").val(lastName); //last name
    $('#ctl00_ctl00_Main_Main_txtInboxAlias').val(firstName + "." + lastName); //inbox email alias

    sessionStorage.setItem("newUser", 0);
}

if (sessionStorage.getItem("newUser") == 0) {
    SetPassword();
    sessionStorage.clear("newUser");
}

function SetAssociation() {
    var counter = 0;

    var firstName = $('#ctl00_ctl00_Main_Main_tfFirstName_textBox').val();
    var upperFirst = firstName.toUpperCase();
    var lowerFirst = firstName.toLowerCase();

    var lastName = $('#ctl00_ctl00_Main_Main_tfLastName_textBox').val();
    var upperLast = lastName.toUpperCase();
    var lowerLast = lastName.toLowerCase();

    $('#ctl00_ctl00_Main_Main_ddlEmployee').children().each(function() {
        if ($('#ctl00_ctl00_Main_Main_ddlEmployee').val() == "") {
            var name = $(this).text();
            var key = $(this).val();
            if ((name.includes(lastName) || name.includes(upperLast) || name.includes(lowerLast)) && (name.includes(firstName) || name.includes(upperFirst) || name.includes(lowerFirst))) {
                $('#ctl00_ctl00_Main_Main_ddlEmployee').val(key);
                counter++;
                $('#ctl00_ctl00_Main_Main_ddlEmployee_chzn > a > span').text(name);
            };
        };
    });
    if (counter == 0 && $('#ctl00_ctl00_Main_Main_ddlEmployee').val() == "") {
        $("#MainContent > div.container_24.clearfix > h1").append("<div style='text-align: center'><br><br>No Association Found!</div>");
    };
};


function ServiceAdvisorSettings() {
    $("#ctl00_ctl00_Main_Main_ddlLandingPage").val(3); //login landing page set to scheduling
    $("#ctl00_ctl00_Main_Main_cblRoles_10").prop("checked", true); //employee
    $("#ctl00_ctl00_Main_Main_cblRoles_2").prop("checked", true); //appointments user
    $("#ctl00_ctl00_Main_Main_cblRoles_11").prop("checked", true); //first appointment
    $("#ctl00_ctl00_Main_Main_cblRoles_19").prop("checked", true); //service advisor
    $('#ctl00_ctl00_Main_Main_cblRoles_47').prop("checked", true); // mpi service advisor
    SetAssociation();
}

function ServiceManagerSettings() {
    $("#ctl00_ctl00_Main_Main_ddlLandingPage").val(3); //login landing page set to scheduling
    $("#ctl00_ctl00_Main_Main_cblRoles_10").prop("checked", true); //employee
    $("#ctl00_ctl00_Main_Main_cblRoles_7").prop("checked", true); //campaign approver
    $("#ctl00_ctl00_Main_Main_cblRoles_1").prop("checked", true); //appointments admin
    $("#ctl00_ctl00_Main_Main_cblRoles_2").prop("checked", true); //appointments user
    $("#ctl00_ctl00_Main_Main_cblRoles_11").prop("checked", true); //first appointment
    $("#ctl00_ctl00_Main_Main_cblRoles_21").prop("checked", true); //service manager
    $("#ctl00_ctl00_Main_Main_cblRoles_50").prop("checked", true); //MPI manager
    SetAssociation();
}

function ServiceCoordinatorSettings() {
    $("#ctl00_ctl00_Main_Main_ddlLandingPage").val(3); //login landing page set to scheduling
    $("#ctl00_ctl00_Main_Main_cblRoles_10").prop("checked", true); //employee
    $("#ctl00_ctl00_Main_Main_cblRoles_2").prop("checked", true); //appointments user
    $("#ctl00_ctl00_Main_Main_cblRoles_11").prop("checked", true); //first appointment
    $("#ctl00_ctl00_Main_Main_cblRoles_20").prop("checked", true); //service coordinator
}

function BDCSettings() {
    $("#ctl00_ctl00_Main_Main_ddlLandingPage").val(3); //login landing page set to scheduling
    $("#ctl00_ctl00_Main_Main_cblRoles_10").prop("checked", true); //employee
    $("#ctl00_ctl00_Main_Main_cblRoles_2").prop("checked", true); //appointments user
    $("#ctl00_ctl00_Main_Main_cblRoles_11").prop("checked", true); //first appointment
    $("#ctl00_ctl00_Main_Main_cblRoles_20").prop("checked", true); //service coordinator
    $("#ctl00_ctl00_Main_Main_cblRoles_4").prop("checked", true); //BDC Rep
    $("#ctl00_ctl00_Main_Main_cblRoles_31").prop("checked", true); // Multi Subdomain User
    $("#ctl00_ctl00_Main_Main_cblRoles_5").prop("checked", true); //BDC User
}

function BDCAdmin() {
    $("#ctl00_ctl00_Main_Main_ddlLandingPage").val(3); //login landing page set to scheduling
    $("#ctl00_ctl00_Main_Main_cblRoles_10").prop("checked", true); //employee
    $("#ctl00_ctl00_Main_Main_cblRoles_2").prop("checked", true); //appointments user
    $("#ctl00_ctl00_Main_Main_cblRoles_11").prop("checked", true); //first appointment
    $("#ctl00_ctl00_Main_Main_cblRoles_20").prop("checked", true); //service coordinator
    $("#ctl00_ctl00_Main_Main_cblRoles_3").prop("checked", true); // bdc admin
    $("#ctl00_ctl00_Main_Main_cblRoles_31").prop("checked", true); // Multi Subdomain User
    $("#ctl00_ctl00_Main_Main_cblRoles_5").prop("checked", true); //BDC User
}

function AdminSettings() {
    $("#ctl00_ctl00_Main_Main_cblRoles_10").prop("checked", true); //employee
    $("#ctl00_ctl00_Main_Main_cblRoles_7").prop("checked", true); //campaign approver
    $("#ctl00_ctl00_Main_Main_cblRoles_1").prop("checked", true); //appointments admin
    $("#ctl00_ctl00_Main_Main_cblRoles_2").prop("checked", true); //appointments user
    $("#ctl00_ctl00_Main_Main_cblRoles_9").prop("checked", true); //email reporting
    $("#ctl00_ctl00_Main_Main_cblRoles_31").prop("checked", true); //multi sub-domain
    $("#ctl00_ctl00_Main_Main_cblRoles_35").prop("checked", true); // message admin
    $("#ctl00_ctl00_Main_Main_cblRoles_37").prop("checked", true);  //payment admin
    $("#ctl00_ctl00_Main_Main_cblRoles_17").prop("checked", true); // quote admin
    $("#ctl00_ctl00_Main_Main_cblRoles_3").prop("checked", true); // bdc admin
}


function TechSettings() {
    $("#ctl00_ctl00_Main_Main_ddlLandingPage").val(3); //login landing page set to scheduling
    $("#ctl00_ctl00_Main_Main_cblRoles_10").prop("checked", true); //employee
    $("#ctl00_ctl00_Main_Main_cblRoles_23").prop("checked", true); //technician
    $("#ctl00_ctl00_Main_Main_cblRoles_2").prop("checked", true); //appointments user
    $('#ctl00_ctl00_Main_Main_cblRoles_48').prop("checked", true); // mpi technician
    SetAssociation();
}

function PartsSettings() {
    $("#ctl00_ctl00_Main_Main_ddlLandingPage").val(3); //login landing page set to scheduling
    $("#ctl00_ctl00_Main_Main_cblRoles_10").prop("checked", true); //employee
    $('#ctl00_ctl00_Main_Main_cblRoles_49').prop("checked", true); // mpi parts user
    $("#ctl00_ctl00_Main_Main_cblRoles_2").prop("checked", true); //appointments user
}


function LaneSettings(){
    $("#ctl00_ctl00_Main_Main_cblRoles_12").prop("checked", true); //lane app user
    $("#ctl00_ctl00_Main_Main_cblRoles_44").prop("checked", true); //walkaround user
    $("#ctl00_ctl00_Main_Main_cblRoles_45").prop("checked", true); //inspection user
    $("#ctl00_ctl00_Main_Main_cblRoles_46").prop("checked", true); //services user
}

function QuoteAdminSettings() {
    $("#ctl00_ctl00_Main_Main_ddlLandingPage").val(9); //login landing page set to quote generation
    $("#ctl00_ctl00_Main_Main_cblRoles_10").prop("checked", true); //employee
    $("#ctl00_ctl00_Main_Main_cblRoles_7").prop("checked", true); //campaign approver
    $("#ctl00_ctl00_Main_Main_cblRoles_17").prop("checked", true); // quote admin
    $("#ctl00_ctl00_Main_Main_cblRoles_9").prop("checked", true); //email reporting
}

function QuoteUserSettings() {
    $("#ctl00_ctl00_Main_Main_ddlLandingPage").val(9); //login landing page set to quote generation
    $("#ctl00_ctl00_Main_Main_cblRoles_10").prop("checked", true); //employee
    $("#ctl00_ctl00_Main_Main_cblRoles_18").prop("checked", true); // quote user
}