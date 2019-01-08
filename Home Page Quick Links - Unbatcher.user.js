// ==UserScript==
// @name         Home Page Quick Links / Unbatcher
// @namespace    localhost
// @version      1.2
// @description  Adds links to the default page to quickly get to settings
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/Default.aspx
// @grant        none
// ==/UserScript==

// Make a "open all settings, make overrides, test drive pages etc' button

var serviceTriggers = {
    AppointmentConfirmation: {
        settings: "https://autoloop.us/DMS/App/Notifications/AppointmentConfirmation/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/AppointmentConfirmation/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/AppointmentConfirmationSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/AppointmentConfirmation/AQBatches.aspx",
    },
    CustomerRecovery: {
        settings: "https://autoloop.us/DMS/App/Notifications/CustomerRecovery/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/CustomerRecovery/ViewSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/CustomerRecoverySettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/CustomerRecovery/AQBatches.aspx",
    },
    DeclinedRepairs: {
        settings: "https://autoloop.us/DMS/App/Notifications/DeclinedRepairs/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/DeclinedRepairs/EditCategorySettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/DeclinedRepairsTestDrive.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/DeclinedRepairs/AQBatches.aspx",
    },
    MissedAppointment: {
        settings: "https://autoloop.us/DMS/App/Notifications/MissedAppointment/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/MissedAppointment/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/MissedAppointmentSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/MissedAppointment/AQBatches.aspx",
    },
    PartsArrived: {
        settings: "https://autoloop.us/DMS/App/Notifications/PartsArrival/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/PartsArrival/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/PartsArrivalSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/PartsArrival/AQBatches.aspx",
    },
    ScheduledMaintenance: {
        settings: "https://autoloop.us/DMS/App/Notifications/ScheduledMaintenance/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/ScheduledMaintenance/MakeSettings.aspx?type=rr",
        drive: "https://autoloop.us/DMS/App/TestDrive/ScheduledMaintenanceSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/ScheduledMaintenance/AQBatches.aspx",
    },
    ServiceCompletion: {
        settings: "https://autoloop.us/DMS/App/Notifications/ServiceCompletion/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/ServiceCompletion/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/ServiceCompletionSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/ServiceCompletion/AQBatches.aspx",
    },
    ServiceFollowUp: {
        settings: "https://autoloop.us/DMS/App/Notifications/ServiceFollowup/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/ServiceFollowup/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/ServiceFollowUpSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/ServiceFollowup/AQBatches.aspx",
    },
    ServiceIntroduction: {
        settings: "https://autoloop.us/DMS/App/Notifications/ServiceIntroduction/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/ServiceIntroduction/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/ServiceIntroductionSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/ServiceIntroduction/AQBatches.aspx",
    },
    StateInspectionReminder: {
        settings: "https://autoloop.us/DMS/App/Notifications/StateInspectionReminder/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/StateInspectionReminder/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/StateInspectionReminderSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/StateInspectionReminder/AQBatches.aspx",
    },
    TireDue: {
        settings: "https://autoloop.us/DMS/App/Notifications/TireDue/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/TireDue/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/TireDueSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/TireDue/AQBatches.aspx",
    },
    VehicleAccessories: {
        settings: "https://autoloop.us/DMS/App/Notifications/VehicleAccessories/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/VehicleAccessories/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/VehicleAccessoriesSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/VehicleAccessories/AQBatches.aspx",
    },
};

var salesTriggers = {
    CustomerBirthday: {
        settings: "https://autoloop.us/DMS/App/Notifications/CustomerBirthday/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/CustomerBirthday/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/CustomerBirthdaySettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/CustomerBirthday/AQBatches.aspx",
    },
    TradeUpAdvantage: {
        settings: "https://autoloop.us/DMS/App/Notifications/TradeUpAdvantage/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/TradeUpAdvantage/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/TradeUpAdvantageSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/TradeUpAdvantage/AQBatches.aspx",
    },
    TradeUpWelcome: {
        settings: "https://autoloop.us/DMS/App/Notifications/TradeUpWelcome/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/TradeUpWelcome/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/TradeUpWelcomeSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/TradeUpWelcome/AQBatches.aspx",
    },
    WarrantyExpiration: { // AKA extended service contract
        settings: "https://autoloop.us/DMS/App/Notifications/WarrantyExpiration/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/WarrantyExpiration/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/WarrantyExpirationSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/WarrantyExpiration/AQBatches.aspx",
    },
    LeaseExpiration: {
        settings: "https://autoloop.us/DMS/App/Notifications/LeaseExpiration/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/LeaseExpiration/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/LeaseExpirationSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/LeaseExpiration/AQBatches.aspx",
    },
    QuoteProspects: {
        settings: "https://autoloop.us/DMS/App/Notifications/QuoteProspects/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/QuoteProspects/MakeSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/QuoteProspects/AQBatches.aspx",
    },
    SalesFollowup: {
        settings: "https://autoloop.us/DMS/App/Notifications/PurchaseFollowUp/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/PurchaseFollowUp/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/PurchaseFollowUpSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/PurchaseFollowUp/AQBatches.aspx",
    },
    ServiceContractFollowUp: {
        settings: "https://autoloop.us/DMS/App/Notifications/ServiceContractFollowup/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/ServiceContractFollowup/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/ServiceContractFollowUpSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/ServiceContractFollowup/AQBatches.aspx",
    },
    ServiceToSales: {
        settings: "https://autoloop.us/DMS/App/Notifications/ServiceToSales/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/ServiceToSales/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/ServiceToSalesSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/ServiceToSales/AQBatches.aspx",
    },
    TradeCycle: {
        settings: "https://autoloop.us/DMS/App/Notifications/TradeCycle/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/TradeCycle/Default.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/TradeCycleSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/TradeCycle/AQBatches.aspx",
    },
    VehicleAnniversary: {
        settings: "https://autoloop.us/DMS/App/Notifications/VehicleAnniversary/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/VehicleAnniversary/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/VehicleAnniversarySettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/VehicleAnniversary/AQBatches.aspx",
    },
    VehicleUpgrade: {
        settings: "https://autoloop.us/DMS/App/Notifications/VehicleUpgrade/Settings.aspx",
        makes: "https://autoloop.us/DMS/App/Notifications/VehicleUpgrade/MakeSettings.aspx",
        drive: "https://autoloop.us/DMS/App/TestDrive/VehicleUpgradeSettings.aspx",
        queue: "https://autoloop.us/DMS/App/Notifications/VehicleUpgrade/AQBatches.aspx",
    },
};

/* Template
varName: {
        settings: " ",
        makes: " ",
        drive: " "
    },
*/

// Service Triggers link adder call
$('#ctl00_ctl00_Main_Main_mainPageContainer > div.grid_6.element_border.fixedOpsLmCol').children().children().each(function() {
    if ($(this).prop('classList')) {
        if ($(this).prop('classList')[1] == "ServiceEnabled") {
            var tname = $(this).prop('classList')[3];
            if (tname in serviceTriggers){
                $(this).append('<a href="'+serviceTriggers[tname].settings+'"><img src="/DMS/Images/icons/edit.png" style="width:16px;height:16px;"></a>');
                $(this).append('<a href="'+serviceTriggers[tname].makes+'"><img src="/DMS/Images/icons/car.png" style="width:16px;height:16px;"></a>');
                //$(this).append('<a href="'+serviceTriggers[tname].drive+'"target="_blank"><img src="/DMS/Images/icons/lorry_error.png"></a>');
            }
        }
	}
});

// Sales Triggers link adder call
$('#ctl00_ctl00_Main_Main_mainPageContainer > div.grid_6.element_border.salesLmCol').children().children().each(function() {
    if ($(this).prop('classList')) {
        if ($(this).prop('classList')[1] == "ServiceEnabled") {
            var tname = $(this).prop('classList')[3];
            if (tname in salesTriggers){
                $(this).append('<a href="'+salesTriggers[tname].settings+'"><img src="/DMS/Images/icons/edit.png" style="width:16px;height:16px;"></a>');
                $(this).append('<a href="'+salesTriggers[tname].makes+'"><img src="/DMS/Images/icons/car.png" style="width:16px;height:16px;"></a>');
                //$(this).append('<a href="'+salesTriggers[tname].drive+'"target="_blank"><img src="/DMS/Images/icons/lorry_error.png"></a>');
            }
        }
	}
});


// Service Triggers Unbatcher

$('#ContentFooter').append("<div id='unbatchContainer' style='width:960px'>");

$('#unbatchContainer').append('<button type=button style="margin-left:55px" id="ServiceUnbatch">Unbatch Service Triggers</button>');
$('#ServiceUnbatch').click(function() {
    Unbatch('service');
});

$('#unbatchContainer').append('<button type=button style="margin-left:95px" id="SalesUnbatch">Unbatch Sales Triggers</button>');
$('#SalesUnbatch').click(function() {
    Unbatch('sales');
});

function GetServiceQueue() {
    var unbatchQueue = [];
    $('#ctl00_ctl00_Main_Main_mainPageContainer > div.grid_6.element_border.fixedOpsLmCol').children().children().each(function() {
        if ($(this).prop('classList')) {
            if ($(this).prop('classList')[2] == "ApprovalQueueEnabled" && $(this).prop('classList')[1] == "ServiceEnabled") {
                var tname = $(this).prop('classList')[3];
                if (tname in serviceTriggers){
                    unbatchQueue.push(serviceTriggers[tname].queue);
                    unbatchQueue.push(serviceTriggers[tname].settings);
                }
            }
        }
    });
    return unbatchQueue;
};

function GetSalesQueue() {
    var unbatchQueue = [];
    $('#ctl00_ctl00_Main_Main_mainPageContainer > div.grid_6.element_border.salesLmCol').children().children().each(function() {
        if ($(this).prop('classList')) {
            if ($(this).prop('classList')[2] == "ApprovalQueueEnabled" && $(this).prop('classList')[1] == "ServiceEnabled") {
                var tname = $(this).prop('classList')[3];
                if (tname in salesTriggers){
                    unbatchQueue.push(salesTriggers[tname].queue);
                    unbatchQueue.push(salesTriggers[tname].settings);
                }
            }
        }
    });
    return unbatchQueue;
};

function Unbatch(cat) {
    var confirm = prompt("Are you sure you want to unbatch all service triggers? YES or NO");
    if (confirm != "YES") {
        return;
    };
    var unbatchQueue = [];
    if (cat == 'service') {
        unbatchQueue = GetServiceQueue();
    };
    if (cat == 'sales') {
        unbatchQueue = GetSalesQueue();
    };
    sessionStorage.setItem('queue', JSON.stringify(unbatchQueue));
    sessionStorage.setItem('state', 'queued');
    location.reload();
};