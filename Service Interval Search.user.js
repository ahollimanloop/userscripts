// ==UserScript==
// @name         Service Interval Search
// @namespace    localhost
// @version      1.2
// @description  Service Intervals
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/DealershipSettings/ServicePlans/Dealership/ServiceIntervals.aspx
// @grant        none
// ==/UserScript==

//Button

$('#MainContent > div.container_24.clearfix > h2').append('<table class="float_right GridTable" id="scriptContainer">');

$('#scriptContainer').append("<tr class='GridRow'><td><small style='font-size:14px'>Select Intervals at Mileage: </small>" +
                           "<td><input type='text' id='mileageBox'></td>" +
                           "<td class='text_center'><button id='executeButton' type='button' class='btn-default'>Select Intervals</button></td>");
$("#executeButton").click(function(){
    ExecuteScript();
});



$('#scriptContainer').append("<tr class='GridRowAlt'><td><small style='font-size:14px'>OpCode for Above Mileage: </small>" +
                           "<td><input type='text' id='opcodeBox'></td>" +
                           "<td class='text_center'><button id='saveCodes' type='button' class='btn-default'>Save OpCodes</button></td>");
$("#saveCodes").click(function(){
    SaveCodes();
});

$('#scriptContainer').append("<tr class='GridRow'><td><small style='font-size:14px'>Select Plans Containing: </small>" +
                           "<td><input type='text' id='planSearchBox'></td>" +
                           "<td class='text_center'><button id='planSearchButton' type='button' class='btn-default'>Select Plans</button></td>");
$("#planSearchButton").click(function(){
    SearchPlans();
});


function ExecuteScript() {
    var mileage = $("#mileageBox").val();
    if($('#cbSelectAllServiceIntervals').prop("checked", "checked")){
       $('#cbSelectAllServiceIntervals').click();
    }
    $('#ulServiceIntervalsServiceIntervals').children().each(function() {
        if ($(this).children().attr('data-mileage') % mileage === 0 ) {
            $(this).children().click()
        }
    });
    $('#divUpdateBySearchContent > div.float_right > a').click();
}

function SaveCodes() {
    var opcode = $("#opcodeBox").val();
    if ($('#cbUpdateOpCode').prop("checked", false)) {
        $('#cbUpdateOpCode').click();
    }
    $('#opCodeUpdate').val(opcode);
    $('#divUpdateResults > div.task_nav > a').click();
}

function SearchPlans() {
    var string = $("#planSearchBox").val();

    /*
    if($('#cbSelectAllServicePlans').prop("checked", "checked")){
        $('#cbSelectAllServicePlans').click();
    }
    */

    $('#ulServiceIntervalsServicePlans').children().each(function() {
        if ($(this).text().indexOf(string) > -1) {
            $(this).children().click();
        }
    })

}