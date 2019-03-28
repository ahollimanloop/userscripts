// ==UserScript==
// @name         Product Activation Email Generator
// @namespace    localhost
// @version      1.3
// @description  Generates activation email for Go-Live Ready products.
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://csa.autoloop.us/Customer/Edit/*
// @grant        none
// ==/UserScript==



$('#product-lists > div').append("<div id='BtnContainer'>");

// Logo Request Button

function GenerateLogoRequest() {
    var site = $('#Customer_WebPage').val();
    var name = $('#Customer_CompanyName').val();
    var folder = $('#Customer_DealershipFolder').val();

    var subject = ""+name+" - Logo Request";
    var body = 'Hello,%0D%0A%0D%0APlease create a logo for '+name+'%0D%0A%0D%0AHere is the dealership folder: '+folder+'\\%0D%0A%0D%0AHere is their Website: '+site+'%0D%0A%0D%0AThank you,%0D%0A"';

    var html = '<a href="mailto:headerrequest365@autoloop.com?cc=Installs@autoloop.com&subject='+subject+'&body='+body+'>';
    html += "<button type='button' id='logoBtn' style='margin-left: 20px'>Request Logo</button></a>";
    $('#dealer-details > div.input-append').append(html);
};


GenerateLogoRequest();


// activation buttons
$('#product-lists > div > ul').children().each(function() {
    var string = $(this).text();
    var companyName = $('#Customer_CompanyName').val();
	if (string.includes("Go-Live Ready") || companyName.includes("Subaru") && string.includes("Setup")) {
        var product = string.split('—');
        product = product[0];

        var subject = 'Status Change - '+companyName+' - '+product;
        console.log(subject);
        if (string.includes("Re-Shell")) {
            subject = subject +' - Re-Shell';
        }
        else {
            subject = subject +' - New';
        };

        var url = GetLink(product);
        var status = "Active";
        if (string.includes("Re-Shell")) {
            status = 'Archived';
        }
        var body = 'Hello,%0D%0A%0D%0AI am requesting a status change for the following store:%0D%0A%0D%0AStore Name: '+companyName+'%0D%0AStatus: '+status+'%0D%0ACSA Link: '+url+'%0D%0AProduct: '+product+'%0D%0A%0D%0AThank you,%0D%0A"';

        var btnid = product + 'Btn';
        var html = '<a href="mailto:ProductionServices@autoloop.com?cc=Installs@autoloop.com; InstallationsAdmin@autoloop.com&subject='+subject+'&body='+body+'>';
        var button = '<button id="' + product + 'Btn" type=button>Activate ' + product + '</button></a><br>';
        html = html+button;
        console.log(html);
		$('#BtnContainer').append(html);
	};
});

// failed setup buttons

var use_buttons = false;

$('#product-lists > div > ul').children().each(function() {
    var string = $(this).text();
    if (string.includes("Setup")) {
        use_buttons = true;
    };
});

if (use_buttons == true) {
    $('#page_canvas > h1').append('<button type=button id="failBtn" style="float: right">Fail Setup</button>');
    $('#failBtn').click(function() {
        AddStatus('Failed Setup');
    });

    $('#page_canvas > h1').append('<button type=button id="undelivBtn" style="float: right">Undeliver</button>');
    $('#undelivBtn').click(function() {
        AddStatus('Undelivered');
    });
};


function AddStatus(status) {
    $('#product-lists > div > ul').children().each(function() {
        var string = $(this).text();
        var companyName = $('#Customer_CompanyName').val();
        if (string.includes("Setup")) {
            var product = string.split('—');
            product = product[0];

            var subject = 'Status Change - '+companyName+' - '+product;
            console.log(subject);
            if (string.includes("Re-Shell")) {
                subject = subject +' - Re-Shell';
            }
            else {
                subject = subject +' - New';
            };

            var url = GetLink(product);
            var body = 'Hello,%0D%0A%0D%0AI am requesting a status change for the following store:%0D%0A%0D%0AStore Name: '+companyName+'%0D%0AStatus: '+status+'%0D%0ACSA Link: '+url+'%0D%0AProduct: '+product+'%0D%0A%0D%0AThank you,%0D%0A"';

            var btnid = product + 'Btn';
            var html = '<a href="mailto:ProductionServices@autoloop.com?cc=Installs@autoloop.com; InstallationsAdmin@autoloop.com&subject='+subject+'&body='+body+'>';
            var button = '<button id="' + product + 'Btn" type=button>'+ status + ' ' + product + '</button></a><br>';
            html = html+button;
            console.log(html);
            $('#BtnContainer').append(html);
        };
    });
};

function GetLink(product) {
    var link = '';
    $('#product-lists > div > ul').children().each(function() {
        var string = $(this).text();
        if (string.includes(product) == true && string.includes('Archived') == false) {
            link = $(this).html();
            link = link.split('<a href="');
            link = link[1];
            link = link.split('">');
            link = link[0];
        };
    });
    return link;
};
