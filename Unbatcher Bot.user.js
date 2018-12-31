// ==UserScript==
// @name         Unbatcher Bot
// @namespace    localhost
// @version      1.1
// @description  Unbatches triggers. Use with caution.
// @author       Austin Holliman (aholliman@autoloop.com)
// @include      https://autoloop.us/DMS/App/Notifications/*/Settings.aspx*
// @include      https://autoloop.us/DMS/App/Notifications/*/AQBatches.aspx*
// @include      https://autoloop.us/DMS/App/Default.aspx*
// @grant        none
// ==/UserScript==

window.onload = CheckState();

function CheckState() {
    var state = sessionStorage.state;
    if (state == undefined) {
        return;
    };
    var queue = JSON.parse(sessionStorage.queue);
    console.log(queue);
    var url = queue[0];
    if (state == 'queued') {
        queue.shift();
        sessionStorage.queue = JSON.stringify(queue);
        sessionStorage.state = 'batch';
        if (url == undefined) {
            window.location.href = 'https://autoloop.us/DMS/App/Default.aspx';
            sessionStorage.clear();
            alert("Done");
            return;
        };
        window.location.href = url;
    };
    if (state == 'queued2') {
        queue.shift();
        sessionStorage.queue = JSON.stringify(queue);
        sessionStorage.state = 'edit';
        if (url == undefined) {
            window.location.href = 'https://autoloop.us/DMS/App/Default.aspx';
            sessionStorage.clear();
            alert("Done");
            return;
        };
        window.location.href = url;
    };
    if (state == 'batch') {
        sessionStorage.state = 'queued2';
        DeleteBatches();
    };
    if (state == 'edit') {
        sessionStorage.state = 'queued';
        DisableQueues();
    };
};

function DeleteBatches() {
    var realConfirm = window.confirm;
    window.confirm = function() {
        window.confirm = realConfirm;
        return true;
    };
    if (window.location.href == 'https://autoloop.us/DMS/App/Notifications/PartsArrival/AQBatches.aspx') {
        $('#ctl00_ctl00_Main_Main_btnCancelAll').click();
    }
    else {
        $('#ctl00_ctl00_Main_Main_btnDeleteAll').click();
    };
};

function DisableQueues() {
    $('#ctl00_ctl00_Main_Main_loopServiceSettings_loopNotificationSettings_loopApprovalQueueSettings_cbApprovalQueues').click();
    $('#ctl00_ctl00_Main_Main_loopServiceSettings_btnSubmit').click();
};