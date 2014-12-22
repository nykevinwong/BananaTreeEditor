var asset = require("./asset.js");
var utils = require("./utils.js");

var previousSelected = null;

module.exports.initPanel = initPanel;
module.exports.initFrameSelector = initFrameSelector;
module.exports.initLoadCharacterButton = initLoadCharacterButton;

function initPanel(mainLayer)
{
    initLoadCharacterButton(mainLayer);
    initCharacterList();
}

function initFrameSelector(mainLayer, CharDef, AnimationName)
{

   asset.loadTextures(

   function(){
      var mySelect = $('#selectFrames');


      var KeyFrames = CharDef.Animations.Animation[AnimationName].KeyFrames.KeyFrame;
      var Frames = CharDef.FRAMES.FRAME;
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

      mySelect.attr("size",KeyFrames.length ); // make it a list box

      mySelect.unbind('change keypress');
      mySelect.bind('change keypress',function()
      {
         if($(this).data('last') !== $(this).val())
         {
         $(this).data('last', $(this).val());
             var frameName = $(this).val();

             asset.loadImages(CharDef, frameName, function(group)
             {
               // replace previously selected character frame to a current one.
                      if(previousSelected!=null)
                      {
                          previousSelected.remove();
                          previousSelected= null;
                      }

                      mainLayer.add(group);
                      mainLayer.draw();
                      previousSelected = group;
             });

   /*
             var Scripts = frame.Scripts.Script;
             var s ="";
             for(var i=0;i<Scripts.length;i++)
             {
              s+=  "#[" + i  + "]" + Scripts[i] +"\n";
             }

             if(s.length>0)
             {
                 alert("Scripts:\n" + s);
             } */

         }

      });

      utils.triggerSelectChange("#selectFrames");

     });

    }


function initLoadCharacterButton(mainLayer)
{

$("#LoadCharacter").click(function()
{
    var name = $("#selectCharacters").val();


    $.getJSON( "/xml2js/"+ name, function( data ) {

        var CharDef = data.CharDef;
        var Animations = CharDef.Animations.Animation;

        var animationSelect = $("#selectAnimations");
        animationSelect.empty();

        for(var i=0;i < Animations.length; i++)
        {
            var a = Animations[i];
            Animations[a.Name] = a;

            animationSelect.append(
                            $('<option></option>').val(a.Name).html(a.Name)
                        );

        }


        animationSelect.unbind('change keypress');
        animationSelect.bind('change keypress',function()
        {
           if($(this).data('last') !== $(this).val())
           {
               $(this).data('last', $(this).val());
                var AnimationName = $(this).val();

                initFrameSelector(mainLayer, CharDef, AnimationName);


           }
        });

                utils.triggerSelectChange("#selectAnimations");


    });

});

}

function initCharacterList()
{

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

}