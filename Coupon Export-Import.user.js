// ==UserScript==
// @name         Coupon Export/Import
// @namespace    localhost
// @version      1.1
// @description  Department Contacts
// @author       Austin Holliman (aholliman@autoloop.com)
// @include      https://autoloop.us/DMS/App/DealershipSettings/CouponDefaultContent.aspx?CouponId=*
// @grant        none
// ==/UserScript==

//Button
$("#MainContent > div.container_24.clearfix > div > h2").append("<textarea name='exportBox' style='margin-left:320px' id='exportBox' >");
$("#MainContent > div.container_24.clearfix > div > h2").append("<button id='exportButton' type='button'>Export</button>");
    $("#exportButton").click(function(){
        Export();
    });

$("#MainContent > div.container_24.clearfix > div > h2").append("<textarea name='importBox' id='importBox'>");
$("#MainContent > div.container_24.clearfix > div > h2").append("<button id='importButton' type='button'>Import</button>");
    $("#importButton").click(function(){
        Import();
    });

$('#MainContent > div.container_24.clearfix > div > h2').append("<button id='mySubmitButton' type='button'>Submit</button>");
    $("#mySubmitButton").click(function(){
        $('#ctl00_ctl00_Main_Main_couponManager_btnSubmit').click();
    });



function Export() {
	// set up dictionary and assign values
	var coupon = {};
	coupon.Title = $('#ctl00_ctl00_Main_Main_couponManager_tfName_textBox').val();
	coupon.Subtitle = $('#ctl00_ctl00_Main_Main_couponManager_tfSubtitle_textBox').val();
	coupon.Internal = $('#ctl00_ctl00_Main_Main_couponManager_tfInternalName_textBox').val();
	coupon.Type = $('#ctl00_ctl00_Main_Main_couponManager_ddlCouponType').val();
	coupon.Amount = $('#ctl00_ctl00_Main_Main_couponManager_txtAmount').val();
	coupon.Expiration = $('#ctl00_ctl00_Main_Main_couponManager_couponExpiration_tfRelativeExpiration_textBox').val();
	coupon.Body = $('#ctl00_ctl00_Main_Main_couponManager_txtBody_textBox').val();
	coupon.Disclaimer = $('#ctl00_ctl00_Main_Main_couponManager_tfDetails_textBox').val();
	coupon.Category = $('#ctl00_ctl00_Main_Main_couponManager_couponCategorySelector_lbCouponCategories').val();

	// package dictionary
	var package = coupon.Title+"{{DELIM}}"+coupon.Subtitle+"{{DELIM}}"+coupon.Internal+"{{DELIM}}"+coupon.Type+"{{DELIM}}"+ coupon.Amount+"{{DELIM}}"+coupon.Expiration+"{{DELIM}}"+ coupon.Body+"{{DELIM}}"+coupon.Disclaimer+"{{DELIM}}"+coupon.Category

	// provide dictionary
	//alert(package);

    $('#exportBox').val(package);
    $('#exportBox').select();
    document.execCommand('copy');

}

function Import() {
	// import and split coupon config
	var package = $('#importBox').val();
	package = package.split("{{DELIM}}");
    console.log(package);

	// set up dictionary
	var coupon = {};
	coupon.Title = package[0];
    coupon.Subtitle = package[1];
    coupon.Internal = package[2];
    coupon.Type = package[3];
    coupon.Amount = package[4];
    coupon.Expiration = package[5];
    coupon.Body = package[6];
    coupon.Disclaimer = package[7];
    coupon.Category = package[8];
    console.log(coupon);

	// input settings
	$('#ctl00_ctl00_Main_Main_couponManager_tfName_textBox').val(coupon.Title);
    $('#ctl00_ctl00_Main_Main_couponManager_tfSubtitle_textBox').val(coupon.Subtitle);
    $('#ctl00_ctl00_Main_Main_couponManager_tfInternalName_textBox').val(coupon.Internal);
    $('#ctl00_ctl00_Main_Main_couponManager_ddlCouponType').val(coupon.Type);
    $('#ctl00_ctl00_Main_Main_couponManager_txtAmount').val(coupon.Amount);
    $('#ctl00_ctl00_Main_Main_couponManager_couponExpiration_tfRelativeExpiration_textBox').val(coupon.Expiration);
    $('#ctl00_ctl00_Main_Main_couponManager_txtBody_textBox').val(coupon.Body);
    $('#ctl00_ctl00_Main_Main_couponManager_tfDetails_textBox').val(coupon.Disclaimer);
    $('#ctl00_ctl00_Main_Main_couponManager_couponCategorySelector_lbCouponCategories').val(coupon.Category);
    $('#ctl00_ctl00_Main_Main_couponManager_couponCategorySelector_lbCouponCategories').trigger('change');

    if ($('#ctl00_ctl00_Main_Main_couponManager_btnImageLink').length == 0) {
        alert("No coupon image");
    }
}