var editor = require("./neweditor.js");
var toolbar = require("./toolbar.js");
var utils = require("./utils.js");

var characterPanel = require("./characterPanel.js");

var e = editor.createEditorInstance();
var mainLayer = e.getLayer("mainLayer");

;


toolbar.createToolBar(e);

function triggerChange(selector)
{
utils.triggerSelectChange(selector);
}




$("#LoadCharacter").click(function()
{
    var name = $("#selectCharacters").val();

    $.getJSON( "/xml2js/"+ name, function( data ) {

        var CharDef = data.CharDef;
        var Animations = CharDef.Animations.Animation;

        var animationSelect = $("#selectAnimations");
        animationSelect.empty();
        $('#selectFrames').empty();
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

                characterPanel.initFrameSelector(mainLayer, CharDef, AnimationName);
                triggerChange("#selectFrames");

           }
        });

                triggerChange("#selectAnimations");


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
