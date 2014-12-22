/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var editor = __webpack_require__(1);
	var toolbar = __webpack_require__(2);
	var utils = __webpack_require__(4);
	var characterPanel = __webpack_require__(5);
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports.createEditorInstance = createEditorInstance;
	module.exports.writeMessage = writeMessage;


	function Editor(id, width, height)
	{
	    this.id = id;
	    this.width = width;
	    this.height = height;
	    this.stage = new Kinetic.Stage({
	                                         container: id,
	                                         width: width,
	                                         height: height
	                                     });
	    this.layers = new Array();
	}

	Editor.prototype.createLayer = function(name)
	{
	   var l = new Kinetic.Layer();
	   this.layers[name] = l;
	   this.stage.add(l);
	   return l;
	}

	Editor.prototype.getLayer = function(name)
	{
	   return this.layers[name];
	}

	Editor.prototype.addImage = function(layer, kineticImg) {
	            var stage = this.stage;
	                layer.add(kineticImg);
	                layer.draw();

	}

	Editor.prototype.addImageURL = function(layer, imageURL) {
	            var stage = this.stage;
	            var img = new Image();
	            img.src = 'http://www.html5canvastutorials.com/demos/assets/yoda.jpg';

	            img.onload = function(){
	                var kineticImg = new Kinetic.Image({
	                    x: (stage.getWidth() / 2) - img.width / 2,
	                    y: (stage.getHeight() / 2) - img.height / 2,
	                    image: img,
	                    name: 'image',
	                    draggable: true
	                });

	                layer.add(kineticImg);
	                layer.draw();

	            };

	}

	function createEditorInstance()
	{
	    var width = 800;
	    var height = 600;
	    var containerId = 'container';

	    var editor = new Editor(containerId, width, height);
	    editor.createLayer("mainLayer");
	    editor.createLayer("infoLayer");

	    writeMessage(editor.getLayer("infoLayer") ,"hello");
	    return editor;
	}


	function writeMessage(messageLayer, message)
	{
	    var context = messageLayer.getContext();
	    messageLayer.clear();
	    context.font = '14pt Calibri';
	    context.fillStyle = 'black';
	    context.fillText(message, 10, 25);
	}



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports.createToolBar = createToolBar;

	function createButton(id, func)
	{
	    document.getElementById(id).addEventListener("click", func, false);
	}

	function createToolBar(e)
	{

	createButton("addImageBtn",
	function()
	{
	    e.addImageURL(e.getLayer("mainLayer"), null);
	});


	}




/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports.loadTextures = loadTextures;
	module.exports.loadImages = loadImages;

	var headTex = new Array();
	var torsoTex = new Array();
	var legsTex = new Array();
	var weaponTex = new Array();

	var imageLoaded = 0;

	function onTexturesLoaded(callback)
	{
	    if(imageLoaded==16) // complete loaded
	    {
	        callback();
	    }
	}

	function createImage(url, callback)
	{
	        var img = new Image();
	        img.src = url;

	        img.onload = function(){
	             imageLoaded++;
	             onTexturesLoaded(callback);
	        };

	        return img;
	}

	function loadTextures(callback)
	{
	    imageLoaded = 0;

	    for (var i = 1; i <= 5; i++)
	    {
	        headTex[i-1] = createImage("assest/gfx/head" + i + ".png", callback);
	    }

	    for (var i = 1; i <= 5; i++)
	    {
	        torsoTex[i-1] = createImage("assest/gfx/torso" + i + ".png", callback);
	    }

	    for (var i = 1; i <= 3; i++)
	    {
	        legsTex[i-1] = createImage("assest/gfx/legs" + i + ".png", callback);
	    }

	    for (var i = 1; i <= 3; i++)
	    {
	        weaponTex[i-1] = createImage("assest/gfx/weapon" + i + ".png", callback);
	    }

	}

	function getTexture(part, charDef)
	{
	   var t = Math.floor( part.Index / 64 );
	   var texture;

	    switch (t)
	    {
	        case 0:
	        {
	            texture = headTex[charDef.HeadIndex];
	        }break;
	        case 1:
	        {
	            texture = torsoTex[charDef.TorsoIndex];
	        }break;
	        case 2:
	        {
	            texture = legsTex[charDef.LegsIndex];
	        }break;
	        case 3:
	        {
	            texture = weaponTex[charDef.WeaponIndex];
	        }break;
	    }

	    return texture;
	}

	function getPartDestRect(part)
	{
	   var sRect = new Object();

	   if (part.Index > -1 && part.Index < 1000)
	   {
	                sRect.x = ((part.Index % 64) % 5) * 64;
	                sRect.y = Math.floor((part.Index % 64) / 5) * 64;
	                sRect.width = 64;
	                sRect.height = 64;


	                if (part.Index >= 192)
	                {
	                    sRect.x = ((part.Index % 64) % 4) * 80;
	                    sRect.y = Math.floor((part.Index % 64) / 4) * 64;
	                    sRect.width = 80;


	                }

	                    sRect.SX=1;
	                    sRect.SY=1;
	                 if (part.Index >= 128)
	                 {
	                        sRect.SX = part.SX * 1.35;
	                        sRect.SY = part.SY * 1.35;
	                  }
	    }

	    return sRect;
	}

	function loadImages(CharDef, FrameName, getFrameFunc)
	{
	    var Frame = CharDef.FRAMES.FRAME[FrameName]
	    var Parts = Frame.PARTS.PART;

	    var group =  new Kinetic.Group({x: 200, y:400, draggable: true });

	    for(var i=0;i < Parts.length; i++)
	    {
	        var part = Parts[i];
	        var imgTexture = getTexture(part, CharDef);
	        var s = getPartDestRect(part);

	        var angle = (part.Rotation/(2*Math.PI)) * 360;// in raidian alredy.  (rotation) / 360) * Math.PI;
	        var destWidth = s.width * s.SX;
	        var destHeight =s.height * s.SY;
	        var originX = destWidth / 2;
	        var originY = destHeight / 2;
	        var dx = Math.floor(part.X);
	        var dy = Math.floor(part.Y);

	        var tmpSX = 1;
	        // need to fix rotation
	       if(part.Flip=="1")
	       {
	           tmpSX= -1;
	       }

	        var image = new Kinetic.Image({
	            x: dx,
	            y: dy ,
	            width: destWidth,
	            height: destHeight,
	            name: "part[" + part.Index + "]",
	            image: imgTexture,
	            crop: {
	                    x: s.x,
	                    y: s.y,
	                    width: s.width,
	                    height: s.height
	                },
	          //  draggable: true,
	            offset: {
	                x: originX,
	                y: originY
	            },
	            scaleX: tmpSX
	        });

	        image.rotate(angle);


	        group.add(image);
	    }

	    getFrameFunc(group);

	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports.triggerSelectChange = function(selector)
	{
	   $(selector).val(null);
	   $(selector).data('last', null);
	   $(selector).val($(selector+" option:first").val());
	   $(selector).trigger("change");
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var asset = __webpack_require__(3);
	var utils = __webpack_require__(4);

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

/***/ }
/******/ ])