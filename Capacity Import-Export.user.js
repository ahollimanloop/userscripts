// ==UserScript==
// @name         Capacity Import/Export
// @namespace    localhost
// @version      1.2
// @description  Copy capacity settings from one advisor and import to another
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/Schedule/Settings/Capacities.aspx
// @match        https://autoloop.us/DMS/App/Schedule/Settings/Capacities.aspx#
// @grant        none
// ==/UserScript==

// set timeout for 2 seconds to give capacities time to load, then adds our buttons

$('#mapTitle').append("<button type='button' id='executeBtn' class='float_right'>Apply Script</button>");
$('#executeBtn').click(function() {
    $('#RightContent > div > div').children().children().children().children().each(function() {
        $('td.name > a', this).click(function() {
            AddButtons();
        });
    });
    $('#mapTitle').append("<small style='float: right; font-size:10px'>Script Applied</small>");
});


function AddButtons() {
    setTimeout(function() {
        var button_selector = '#advisorTechCapacityTbl';
        //Button
        $(button_selector).prepend("<button id='importButton' type='button'>Import</button>");
        $("#importButton").click(function(){
            Import();
        });
        $(button_selector).prepend("<textarea name='importBox' id='importBox'>");

        $(button_selector).prepend("<button id='exportButton' type='button'>Export</button>");
        $("#exportButton").click(function(){
            Export();
        });
        $(button_selector).prepend("<textarea name='exportBox' id='exportBox'>");
    }, 1500);
};


function Export() {
    var capacities = [];
    capacities[0] = "Export Data:";
    $('#advisorTechCapacityTbl :input').each(function() {
        var html = $(this)[0].outerHTML;
        html = html.split('"');
        var weekday = html[17];
        var time = html[19];
        var value = $(this).val();
        if (weekday != undefined) {
            try {
                capacities[weekday][time] = value;
            }
            catch(err) {
                var package = {};
                package[time] = value;
                capacities[weekday] = package;
            }
        };
    });
    $('#exportBox').val(JSON.stringify(capacities));
    $('#exportBox').select();
    document.execCommand('copy');
};

function Import() {
    var capacities = JSON.parse($('#importBox').val());
    $('#advisorTechCapacityTbl :input').each(function() {
	var html = $(this)[0].outerHTML;
	html = html.split('"');
	var weekday = html[17];
	var time = html[19];
	try {
		$(this).val(capacities[weekday][time]);
        $(this).trigger('change');
	}
	catch(err) {
		console.log(err)
	}
});
};
