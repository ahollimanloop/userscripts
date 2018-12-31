// ==UserScript==
// @name         CSA Step Complete Minimizer
// @namespace    localhost
// @version      1.1
// @description  Minimizes complete CSA steps.
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://csa.autoloop.us/CustomerProduct/Edit/*
// @grant        none
// ==/UserScript==

$('#customer-product-setup-actions').prepend('<button type=button style="float: right" id="minimizeBtn">Hide Complete Steps</button>');
$('#minimizeBtn').click(function() {
    MinimizeSteps();
});

function MinimizeSteps() {
    $('#customer-product-setup-actions > form > table > tbody').children().each(function() {
        var prop = $('* > label.ui-button.ui-widget.ui-checkboxradio-radio-label.ui-checkboxradio-label.ui-controlgroup-item.ui-checkboxradio-checked.ui-state-active' , this).prop('className');
        if (prop == 'ui-button ui-widget ui-checkboxradio-radio-label ui-checkboxradio-checked ui-state-active ui-checkboxradio-label ui-controlgroup-item') {
            $(this).css('display', 'none');
        };
    });
};


$('#customer-product-setup-actions > div.row-fluid.section').append('<button type=button style="float: right" id="maximizeBtn">Show Complete Steps</button><br>');
$('#maximizeBtn').click(function() {
    MaximizeSteps();
});

function MaximizeSteps() {
    $('#customer-product-setup-actions > form > table > tbody').children().each(function() {
        var prop = $('* > label.ui-button.ui-widget.ui-checkboxradio-radio-label.ui-checkboxradio-label.ui-controlgroup-item.ui-checkboxradio-checked.ui-state-active' , this).prop('className');
        if (prop == 'ui-button ui-widget ui-checkboxradio-radio-label ui-checkboxradio-checked ui-state-active ui-checkboxradio-label ui-controlgroup-item') {
            $(this).css('display', 'table-row');
        };
    });
};

