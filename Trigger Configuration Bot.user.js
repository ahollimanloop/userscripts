// ==UserScript==
// @name         Trigger Configuration Bot
// @namespace    localhost
// @version      0.1
// @description  New
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/*
// @grant        none
// ==/UserScript==

window.onload = LoadPanel();

function LoadPanel() {
    var installPanel = "<div id='installPanel' style='" + // start styles
        "position: fixed;" +
        "left: 12px;" +
        "top: 170px;" +
        "'></div>";
    $('#ctl00_ctl00_MasterPageBodyTag').append(installPanel);

    if (sessionStorage.panel_state == "panelMinimized") {
        MinimizePanel();
    }
    else {
        MaximizePanel();
    };
    CheckState();
};

function CheckState() {
    switch (sessionStorage) {
        case 'panelLoaded':
            NextPage();
            break;
    };
};

function MaximizePanel() {
    var installPanel = "<div id='installPanel' style='" + // start styles
        "position: fixed;" +
        "left: 12px;" +
        "top: 170px;" +
        "width: 20%;" +
        //"height: 500px;" +
        "background-color: white;" +
        "border: 1px solid'>";                           // end styles
    installPanel += "<table id='triggers' style='width: 100%; text-align: center'><tr><td style='width: 49%'><button type='button' id='executeBtn'>Configure Triggers</button></td>" +
        "<td style='width: 17%'>Email<input type='checkbox' id='checkAllEmail'></td>" +
        "<td style='width: 17%'>SMS<input type='checkbox' id='checkAllSMS'></td>" +
        "<td style='width: 17%'>Voice<input type='checkbox' id='checkAllVoice'></td>" +
        "</tr><tr>" +
        "<td>Appointment Confirmation</td>" +
        "<td><input type='checkbox' id='apptConfEmail'></td>" +
        "<td><input type='checkbox' id='apptConfSMS'></td>" +
        "<td><input type='checkbox' id='apptConfVoice'></td>" +
        "</tr><tr>" +
        "<td>Customer Recovery</td>" +
        "<td><input type='checkbox' id='custRecEmail'></td>" +
        "<td><input type='checkbox' id='custRecSMS'></td>" +
        "<td><input type='checkbox' id='custRecVoice'></td>" +
        "</tr><tr>" +
        "<td>Declined Repairs</td>" +
        "<td><input type='checkbox' id='decRepEmail'></td>" +
        "<td><input type='checkbox' id='decRepSMS'></td>" +
        "<td><input type='checkbox' id='decRepVoice'></td>" +
        "</tr><tr>" +
        "<td>Missed Appointment</td>" +
        "<td><input type='checkbox' id='missedApptEmail'></td>" +
        "<td><input type='checkbox' id='missedApptSMS'></td>" +
        "<td><input type='checkbox' id='missedApptVoice'></td>" +
        "</tr><tr>" +
        "<td>Parts Arrival</td>" +
        "<td><input type='checkbox' id='partsArrEmail'></td>" +
        "<td><input type='checkbox' id='partsArrSMS'></td>" +
        "<td><input type='checkbox' id='partsArrVoice'></td>" +
        "</tr><tr>" +
        "<td>Scheduled Maintenance</td>" +
        "<td><input type='checkbox' id='schedMaintEmail'></td>" +
        "<td><input type='checkbox' id='schedMaintSMS'></td>" +
        "<td><input type='checkbox' id='schedMaintVoice'></td>" +
        "</tr><tr>" +
        "<td>Service Completion</td>" +
        "<td><input type='checkbox' id='servComEmail'></td>" +
        "<td><input type='checkbox' id='servComSMS'></td>" +
        "<td><input type='checkbox' id='servComVoice'></td>" +
        "</tr><tr>" +
        "<td>Service Follow-Up</td>" +
        "<td><input type='checkbox' id='servFolEmail'></td>" +
        "<td><input type='checkbox' id='servFolSMS'></td>" +
        "<td><input type='checkbox' id='servFolVoice'></td>" +
        "</tr><tr>" +
        "<td>State Inspection</td>" +
        "<td><input type='checkbox' id='stateInspEmail'></td>" +
        "<td><input type='checkbox' id='stateInspSMS'></td>" +
        "<td><input type='checkbox' id='stateInspVoice'></td>" +
        "</tr><tr>" +
        "<td>Tires Due</td>" +
        "<td><input type='checkbox' id='tiresDueEmail'></td>" +
        "<td><input type='checkbox' id='tiresDuSMS'></td>" +
        "<td><input type='checkbox' id='tiresDuVoice'></td>" + /*
        "</tr><tr>" +
        "<td>Vehicle Accessories</td>" +
        "<td><input type='checkbox' id='vehAccEmail'></td>" +
        "<td><input type='checkbox' id='vehAccSMS'></td>" +
        "<td><input type='checkbox' id='vehAccVoice'></td>" + */
        "</table>";
    installPanel += "<a id='minimizeBtn' class='float_right'>Minimize</a>";
    $('#installPanel').replaceWith(installPanel);
    $('#minimizeBtn').click(function() {
        MinimizePanel();
    });
    $('#checkAllEmail').click(function() {
        CheckAllEmail();
    });
    $('#checkAllSMS').click(function() {
        CheckAllSMS();
    });
    $('#checkAllVoice').click(function() {
        CheckAllVoice();
    });
    $('#executeBtn').click(function() {
        ExecuteScript();
    });
    if (sessionStorage.triggerConfig != undefined) {
        console.log("Trigger config for panel exists");
        var triggerConfig = JSON.parse(sessionStorage.triggerConfig);
        var triggerConfigKeys = Object.keys(triggerConfig);

        for (i=0; i<triggerConfigKeys.length; i++) {
            if (triggerConfig[triggerConfigKeys[i]] == true) {
                $("#" + triggerConfigKeys[i]).prop('checked', true);
            }
            else if (triggerConfig[triggerConfigKeys[i]] == false) {
                $("#" + triggerConfigKeys[i]).prop('checked', false);
            };
        };
    };
    sessionStorage.panel_state = 'maximized';
};

function MinimizePanel() {
    SaveConfig();
    var installPanel = "<div id='installPanel' style='" + // start styles
        "position: fixed;" +
        "left: 12px;" +
        "top: 170px;" +
        "'>";                                             // end styles
    installPanel += "<a id='maximizeBtn'>Expand</a></div>";
    $('#installPanel').replaceWith(installPanel);
    $('#maximizeBtn').click(function() {
        MaximizePanel();
    });
    sessionStorage.setItem('panel_state','minimized');
};

function CheckAllEmail() {
    $('#apptConfEmail').click();
    $('#custRecEmail').click();
    $('#decRepEmail').click();
    $('#missedApptEmail').click();
    $('#partsArrEmail').click();
    $('#schedMaintEmail').click();
    $('#servComEmail').click();
    $('#servFolEmail').click();
    $('#stateInspEmail').click();
    $('#tiresDueEmail').click();
    //$('#vehAccEmail').click();
};

function CheckAllSMS() {
    $('#apptConfSMS').click();
    $('#custRecSMS').click();
    $('#decRepSMS').click();
    $('#missedApptSMS').click();
    $('#partsArrSMS').click();
    $('#schedMaintSMS').click();
    $('#servComSMS').click();
    $('#servFolSMS').click();
    $('#stateInspSMS').click();
    $('#tiresDueSMS').click();
    //$('#vehAccSMS').click();
};

function CheckAllVoice() {
    $('#apptConfVoice').click();
    $('#custRecVoice').click();
    $('#decRepVoice').click();
    $('#missedApptVoice').click();
    $('#partsArrVoice').click();
    $('#schedMaintVoice').click();
    $('#servComVoice').click();
    $('#servFolVoice').click();
    $('#stateInspVoice').click();
    $('#tiresDueVoice').click();
    //$('#vehAccVoice').click();
};

function ExecuteScript() {
    SaveConfig();
    sessionStorage.setItem('state', 'panelLoaded');
    BuildQueue();
};

function SaveConfig() {
    var triggerConfig = {};
    $('#installPanel :input').each(function() {
        var selector = $(this).prop('id');
        var checked = $(this).prop('checked');
        triggerConfig[selector] = checked;
    });
    sessionStorage.setItem('triggerConfig', JSON.stringify(triggerConfig));
};

function BuildQueue() {
    var urlQueue = [];
    var settingsQueue = [];

    var triggerConfig = JSON.parse(sessionStorage.triggerConfig);

    if (triggerConfig.apptConfEmail == true || triggerConfig.apptConfSMS  == true || triggerConfig.apptConfVoice  == true) {
        urlQueue.push(TriggerSettings.apptConf.notif.url);
        settingsQueue.push(TriggerSettings.apptConf.notif.settings);
        urlQueue.push(TriggerSettings.apptConf.make.url);
        settingsQueue.push(TriggerSettings.apptConf.make.settings);
    };
    if (triggerConfig.custRecEmail == true || triggerConfig.custRecSMS  == true || triggerConfig.custRecVoice  == true) {
        urlQueue.push(TriggerSettings.custRec.notif.url);
        settingsQueue.push(TriggerSettings.custRec.notif.settings);
        urlQueue.push(TriggerSettings.custRec.make.url);
        settingsQueue.push(TriggerSettings.custRec.make.settings);
    };
    if (triggerConfig.decRepEmail == true || triggerConfig.decRepSMS  == true || triggerConfig.decRepVoice  == true) {
        urlQueue.push(TriggerSettings.decRep.notif.url);
        settingsQueue.push(TriggerSettings.decRep.notif.settings);
        urlQueue.push(TriggerSettings.decRep.make.url);
        settingsQueue.push(TriggerSettings.decRep.make.settings);
    };
    if (triggerConfig.missedApptEmail == true || triggerConfig.missedApptSMS  == true || triggerConfig.missedApptVoice  == true) {
        urlQueue.push(TriggerSettings.missedAppt.notif.url);
        settingsQueue.push(TriggerSettings.missedAppt.notif.settings);
        urlQueue.push(TriggerSettings.missedAppt.make.url);
        settingsQueue.push(TriggerSettings.missedAppt.make.settings);
    };
    if (triggerConfig.partsArrEmail == true || triggerConfig.partsArrSMS  == true || triggerConfig.partsArrVoice  == true) {
        urlQueue.push(TriggerSettings.partsArr.notif.url);
        settingsQueue.push(TriggerSettings.partsArr.notif.settings);
        urlQueue.push(TriggerSettings.partsArr.make.url);
        settingsQueue.push(TriggerSettings.partsArr.make.settings);
	};
    if (triggerConfig.schedMaintEmail == true || triggerConfig.schedMaintSMS  == true || triggerConfig.schedMaintVoice  == true) {
        urlQueue.push(TriggerSettings.schedMaint.notif.url);
        settingsQueue.push(TriggerSettings.schedMaint.notif.settings);
        urlQueue.push(TriggerSettings.schedMaint.make.url);
        settingsQueue.push(TriggerSettings.schedMaint.make.settings);
	};
    if (triggerConfig.servComEmail == true || triggerConfig.servComSMS  == true || triggerConfig.servComVoice  == true) {
        urlQueue.push(TriggerSettings.servCom.notif.url);
        settingsQueue.push(TriggerSettings.servCom.notif.settings);
        urlQueue.push(TriggerSettings.servCom.make.url);
        settingsQueue.push(TriggerSettings.servCom.make.settings);
	};
    if (triggerConfig.servFolEmail == true || triggerConfig.servFolSMS  == true || triggerConfig.servFolVoice  == true) {
        urlQueue.push(TriggerSettings.servFol.notif.url);
        settingsQueue.push(TriggerSettings.servFol.notif.settings);
        urlQueue.push(TriggerSettings.servFol.make.url);
        settingsQueue.push(TriggerSettings.servFol.make.settings);
	};
    if (triggerConfig.stateInspEmail == true || triggerConfig.stateInspSMS  == true || triggerConfig.stateInspVoice  == true) {
        urlQueue.push(TriggerSettings.stateInsp.notif.url);
        settingsQueue.push(TriggerSettings.stateInsp.notif.settings);
        urlQueue.push(TriggerSettings.stateInsp.make.url);
        settingsQueue.push(TriggerSettings.stateInsp.make.settings);
	};
    if (triggerConfig.tiresDueEmail == true || triggerConfig.tiresDueSMS  == true || triggerConfig.tiresDueVoice  == true) {
        urlQueue.push(TriggerSettings.tiresDue.notif.url);
        settingsQueue.push(TriggerSettings.tiresDue.notif.settings);
        urlQueue.push(TriggerSettings.tiresDue.make.url);
        settingsQueue.push(TriggerSettings.tiresDue.make.settings);
	};
};

var TriggerSettings = {
    'apptConf': {
        'notif': {
            'url': "https://autoloop.us/DMS/App/Notifications/AppointmentConfirmation/Settings.aspx",
            'settings': ""
        },
        'make': {
            'url': "https://autoloop.us/DMS/App/Notifications/AppointmentConfirmation/MakeSettings.aspx",
            'settings': ""
        }
    },
    'custRec': {
        'notif': {
            'url': "https://autoloop.us/DMS/App/Notifications/CustomerRecovery/Settings.aspx",
            'settings': ''
        },
        'make': {
            'url': "https://autoloop.us/DMS/App/Notifications/CustomerRecovery/ViewSettings.aspx",
            'settings': ""
        }
    },
    'decRep': {
        'notif': {
            'url': "https://autoloop.us/DMS/App/Notifications/DeclinedRepairs/Settings.aspx",
            'settings': ''
        },
        'make': {
            'url': "https://autoloop.us/DMS/App/Notifications/DeclinedRepairs/EditCategorySettings.aspx",
            'settings': ""
        }
    },
    'missedAppt': {
        'notif': {
            'url': 'https://autoloop.us/DMS/App/Notifications/MissedAppointment/Settings.aspx',
            'settings': ""
        },
        'make': {
            'url': 'https://autoloop.us/DMS/App/Notifications/MissedAppointment/MakeSettings.aspx',
            'settings': ""
        }
    },
    'partsArr': {
        'notif': {
            'url': 'https://autoloop.us/DMS/App/Notifications/PartsArrival/Settings.aspx',
            'settings': ""
        },
        'make': {
            'url': 'https://autoloop.us/DMS/App/Notifications/PartsArrival/MakeSettings.aspx',
            'settings': ""
        }
    },
    'schedMaint': {
        'notif': {
            'url': '',
            'settings': ""
        },
        'make': {
            'url': '',
            'settings': ""
        }
    },
    'servCom': {
        'notif': {
            'url': '',
            'settings': ""
        },
        'make': {
            'url': '',
            'settings': ""
        }
    },
    'servFol': {
        'notif': {
            'url': '',
            'settings': ""
        },
        'make': {
            'url': '',
            'settings': ""
        }
    },
    'stateInsp': {
        'notif': {
            'url': '',
            'settings': ""
        },
        'make': {
            'url': '',
            'settings': ""
        }
    },
    'tiresDue': {
        'notif': {
            'url': '',
            'settings': ""
        },
        'make': {
            'url': '',
            'settings': ""
        }
    },
};