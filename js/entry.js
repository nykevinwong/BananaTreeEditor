var editor = require("./neweditor.js");
var toolbar = require("./toolbar.js");
var asset = require("./asset.js");

var e = editor.createEditorInstance();

toolbar.createToolBar(e);

$.getJSON( "/xml2js", function( data ) {

    var CharDef = data.CharDef;
    var Animations = CharDef.Animations.Animation;

    for(var i=0;i < Animations.length; i++)
    {
        var a = Animations[i];
        Animations[a.Name] = a;
    }

    var Frames = CharDef.FRAMES.FRAME;

    for(var i=0;i < Frames.length; i++)
    {
        var f = Frames[i];
        Frames[f.Name] = f;
    }
    asset.loadTextures( function()
                           {
                               asset.loadImages(CharDef, "IDLE1", function(image)
                               {
                                   e.addImage(e.getLayer("mainLayer"), image);
                               });


                           });


});
