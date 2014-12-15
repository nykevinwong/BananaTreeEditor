var editor = require("./neweditor.js");
var toolbar = require("./toolbar.js");
var e = editor.createEditorInstance();

toolbar.createToolBar(e);

$.getJSON( "/xml2js", function( data ) {

    var a = eval(data);

});
