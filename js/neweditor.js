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

