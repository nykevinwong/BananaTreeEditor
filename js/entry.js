var editor = require("./neweditor.js");
var toolbar = require("./toolbar.js");
var utils = require("./utils.js");
var characterPanel = require("./characterPanel.js");
var e = editor.createEditorInstance();
var mainLayer = e.getLayer("mainLayer");

toolbar.createToolBar(e);
characterPanel.initPanel(mainLayer);



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
