var editor = require("./neweditor.js");
var toolbar = require("./toolbar.js");
var asset = require("./asset.js");

var e = editor.createEditorInstance();
var mainLayer = e.getLayer("mainLayer");
var previousSelected = null;
var CharDef =null;

toolbar.createToolBar(e);


asset.loadTextures( function()
                       {
                            var mySelect = $('#selectFrames');
                            mySelect.unbind('change keypress');
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

$("#LoadCharacter").click(function()
{
    var name = $("#selectCharacters").val();

    $.getJSON( "/xml2js/"+ name, function( data ) {

        CharDef = data.CharDef;
        var Animations = CharDef.Animations.Animation;

        var animationSelect = $("#selectAnimations");
        animationSelect.empty();
        animationSelect.unbind('change keypress');

        for(var i=0;i < Animations.length; i++)
        {
            var a = Animations[i];
            Animations[a.Name] = a;

            animationSelect.append(
                            $('<option></option>').val(a.Name).html(a.Name)
                        );

        }

        animationSelect.bind('change keypress',function()
        {
           if($(this).data('last') !== $(this).val())
           {
               $(this).data('last', $(this).val());
                var AnimationName = $(this).val();
                var KeyFrames = CharDef.Animations.Animation[AnimationName].KeyFrames.KeyFrame;

                       var Frames = CharDef.FRAMES.FRAME;
                       var mySelect = $('#selectFrames');
                       mySelect.empty();

                       for(var i=0;i < KeyFrames.length; i++)
                       {
                           var index = KeyFrames[i].FrameRef;
                           var f = Frames[index];
                           Frames[f.Name] = f;


                           mySelect.append(
                               $('<option></option>').val(f.Name).html(f.Name)
                           );

                       }

                       $("#selectFrames").val($("#selectFrames option:eq(2)").val());
                       $("#selectFrames").trigger("change");
                       $("#selectFrames").val($("#selectFrames option:first").val());
                       $("#selectFrames").trigger("change");

           }
        });




    });

});

var c = $("#selectCharacters");
var characterNames = ["carlos","guy","spiderman","wraith","zombie"];
for(var i=0;i< characterNames.length;i++)
{
 var name = characterNames[i];
 c.append(
                $('<option></option>').val(name).html(name)
            );
}

c.bind('change keypress',function()
{
   if($(this).data('last') !== $(this).val())
   {
     $(this).data('last', $(this).val());
     $("#LoadCharacter").click();
   }
});

var ElapsedTime = 0;

var anim = new Kinetic.Animation(function(frame) {
       ElapsedTime += frame.timeDiff

       var t = ElapsedTime / 1000;

       if(t>=5)
       {
        alert("it is now 5 secons");
        anim.stop();
       }
  }, mainLayer);
