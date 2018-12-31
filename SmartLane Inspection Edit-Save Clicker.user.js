// ==UserScript==
// @name         SmartLane Inspection Edit/Save Clicker
// @namespace    localhost
// @version      1.1
// @description  Edits/Saves all smartlane inspection items at once.
// @author       Austin Holliman (aholliman@autoloop.com)
// @match        https://autoloop.us/DMS/App/Schedule/Settings/LaneInspection.aspx*
// @grant        none
// ==/UserScript==

// top buttons
$('#RightContent > h2').append('<button type=button id="ScriptSaveAll" class="float_right">Save All</button>');
$('#ScriptSaveAll').click(function() {
    SaveAll();
});
$('#RightContent > h2').append('<button type=button id="ScriptEditAll" class="float_right">Edit All</button>');
$('#ScriptEditAll').click(function() {
    EditAll();
});

// bottom buttons
$('#RightContent').append('<button type=button id="ScriptSaveAll2" class="float_right">Save All</button>');
$('#ScriptSaveAll2').click(function() {
    SaveAll();
});
$('#RightContent').append('<button type=button id="ScriptEditAll2" class="float_right">Edit All</button>');
$('#ScriptEditAll2').click(function() {
    EditAll();
});

function EditAll() {
    $('#ulQuestions').children().each(function() {
        $('a.question_edit.btn-default.GeneratedButtonLink').click();
        $('a.question_edit.btn-default.GeneratedButtonLink').trigger('change');
    });
}

function SaveAll() {
    $('#ulQuestions').children().each(function() {
        $('a.question_save.btn-default.GeneratedButtonLink').click();
        $('a.question_save.btn-default.GeneratedButtonLink').trigger('change');
    });
}