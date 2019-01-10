// ==UserScript==
// @name         CSA Step Complete Minimizer
// @namespace    localhost
// @version      1.3
// @description  Minimizes complete CSA steps.
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://csa.autoloop.us/CustomerProduct/Edit/*
// @grant        none
// ==/UserScript==


// min max buttons

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

// QA Recheck / Incomplete step checker

$('#page_canvas > div.sub-nav.row-fluid').append('<div id="recheckerbox" style="float: right;text-align: center; width: 100%">')

var incompleteSteps = false;

function GetProdStatus() {
    var package = '';
	var prodStatusVal = $('#CustomerProduct_ProductStatusId').val();
	$('#CustomerProduct_ProductStatusId').children().each(function() {
		if ($(this).prop('value') == prodStatusVal) {
            package = $(this).text();
		};
	});
    return package;
};

if (GetProdStatus() == "Go-Live Ready") {
	$('#customer-product-setup-actions > form > table > tbody').children().each(function() {
		var text = $('td:nth-child(1)', this).text();
		if (text.includes('QA Approved') || text.includes('Approved by QA')) {
			// gets date from the step on page
			var date = $('td:nth-child(4)', this).text();
			date = date.split('/');

			var dateNow = Date.now();
			var dateTwoWeeksAgo = new Date(Date.now() - 12096e5).valueOf();
			var dateStepCompleted = new Date();
			dateStepCompleted.setMonth(date[0] - 1); // months start on 0
			dateStepCompleted.setDate(date[1]);
			dateStepCompleted.setYear(date[2]);

			if (dateStepCompleted.valueOf() < dateTwoWeeksAgo) {
                // needs QA recheck!
                var header = $('#page_canvas > h1').text();
                header = header.split('Product for ');
                header = header[1];
                header = header.split(' (');
                var companyName = header[0];
                header = header[1];
                header = header.split('): ');
                var product = header[1];

                var url = window.location.href;
                var subject = 'Autoloop - ' + companyName + ' - ' + product + ' QA Recheck';
                var body = 'Hello Sarah,%0D%0A%0D%0APlease recheck ' + product + ' for ' + companyName + '.  It has been over 2 weeks since last QA.%0D%0ALink: ' + url + '%0D%0A%0D%0AThank you,';
                var html = '<fieldset style="padding-top: 30px; width: 30%; margin: auto"><h2>';
                html += '<a href="mailto:installationsQA@autoloop.com?cc=Installs@autoloop.com&subject='+subject+'&body='+body+'">';
                html += 'This product requires a QA recheck!</a></h2></fieldset>';
				$('#recheckerbox').append(html);
			};
		};
        var prop = $('* > label.ui-button.ui-widget.ui-checkboxradio-radio-label.ui-checkboxradio-label.ui-controlgroup-item.ui-checkboxradio-checked.ui-state-active' , this).prop('className');
        if (prop == 'ui-corner-left ui-button ui-widget ui-checkboxradio-radio-label ui-checkboxradio-checked ui-state-active ui-checkboxradio-label ui-controlgroup-item') {
            incompleteSteps = true;
        };
	});
};

if (incompleteSteps == true) {
    $('#recheckerbox').append('<fieldset style="padding-top: 30px; width: 30%; margin: auto"><h2>Incomplete Steps!</h2></fieldset>');
};
