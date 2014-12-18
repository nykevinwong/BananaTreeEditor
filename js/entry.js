var editor = require("./neweditor.js");
var toolbar = require("./toolbar.js");
var asset = require("./asset.js");

var e = editor.createEditorInstance();
var mainLayer = e.getLayer("mainLayer");
    var previousSelected = null;


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
    var mySelect = $('#selectFrames');

    for(var i=0;i < Frames.length; i++)
    {
        var f = Frames[i];
        Frames[f.Name] = f;


        mySelect.append(
            $('<option></option>').val(f.Name).html(f.Name)
        );

    }



    asset.loadTextures( function()
                           {
                                mySelect.bind('change keypress',function()
                                {
                                   if($(this).data('last') !== $(this).val())
                                   {
                                   $(this).data('last', $(this).val());
                                   var frameName = $(this).val();

                                       asset.loadImages(CharDef, frameName, function(frame)
                                       {
                                                if(previousSelected!=null)
                                                {
                                                    previousSelected.remove();
                                                    previousSelected= null;
                                                    }

                                                mainLayer.add(frame);
                                                mainLayer.draw();
                                                previousSelected = frame;
                                       });

                                   }

                                });


                           });


});
