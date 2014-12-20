var asset = require("./asset.js");
var previousSelected = null;

module.exports.initFrameSelector = function(mainLayer, CharDef, AnimationName)
{

asset.loadTextures(

function(){
   var mySelect = $('#selectFrames');
   mySelect.empty();

   var KeyFrames = CharDef.Animations.Animation[AnimationName].KeyFrames.KeyFrame;
   var Frames = CharDef.FRAMES.FRAME;

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


  });

 };