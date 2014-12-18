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

    var group =  new Kinetic.Group({x: 200, y:200 });

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
            draggable: true,
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