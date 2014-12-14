    var writeMessage = function(messageLayer, message) {
        var context = messageLayer.getContext();
        messageLayer.clear();
        context.font = '14pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
    };

var editor = (function () {

    // private variables and functions
    var width = 800;
    var height = 600;
    var containerId = 'container';
    var stage = null;
    var mainLayer = null;
    var infoLayer = null;

    // constructor
    var module = function () {

        stage = new Kinetic.Stage({
                    container: containerId,
                    width: width,
                    height: height
                });


      mainLayer = new Kinetic.Layer();
        infoLayer = new Kinetic.Layer();

        stage.add(mainLayer);
        stage.add(infoLayer);



            var addCustomShape = function() {

                /*
                * create a digger shape by defining a
                * drawing function which draws a digger
                */
                var digger = new Kinetic.Shape({
                    drawFunc: function(context) {
                        var x = stage.getWidth()/2;
                        var y = stage.getHeight()/2;
                        var radius = 50;
                        var startAngle = 1.2 * Math.PI;
                        var endAngle = 2.8 * Math.PI;
                        var counterClockwise = false;

                        context.beginPath();
                        context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
                        context.lineTo(x, y);
                        context.closePath();
                        context.fillStrokeShape(this);
                    },
                    fill: '#FF0000',
                    stroke: 'black',
                    strokeWidth: 3,
                     draggable: true
                });

                // add the digger shape to the layer
                mainLayer.add(digger);
                mainLayer.draw();

                writeMessage(infoLayer, 'Drawing a custom shape...');
            };


     var addImage = function() {

            writeMessage(infoLayer, 'Downloading an image...');

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

                mainLayer.add(kineticImg);
                mainLayer.draw();

                writeMessage(infoLayer, 'The image has been added.');
            }

        };


 var addStar = function() {

        var star = new Kinetic.Star({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            numPoints: 6,
            innerRadius: 20,
            outerRadius: 70,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 2,
            draggable: true
        });

        mainLayer.add(star);
        mainLayer.draw();

        writeMessage(infoLayer, 'Drawing a star...');
    };

        document.getElementById("addCustomShapeBtn").addEventListener("click", addCustomShape, false);
        document.getElementById("addImageBtn").addEventListener("click", addImage, false);
        document.getElementById("addStarBtn").addEventListener("click", addStar, false);

    };

    // prototype
    module.prototype = {
        constructor: module
    };


    // return module
    return module;
})();