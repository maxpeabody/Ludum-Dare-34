

function Located(){
    this.x = 0;
    this.y = 0;
    this.z = 0;
}
Located.prototype = new Updateable();

//this is for static sprites if you know they'll be static
function Drawable(){
    //enum for sprite origin presets
    this.positionParent = new Located();

    this.topRight = 9;
    this.top = 8;
    this.topLeft = 7;
    this.left = 4;
    this.center = 5;
    this.right = 6;
    this.bottomLeft = 1;
    this.bottom = 2;
    this.bottomRight = 3;

    this.xoffset = 0;
    this.yoffset = 0;
    this.setDrawBasedOnOrigin = function(originCode){
        if(this.image){
            var imgWid = this.image.naturalWidth;
            var imgHi = this.image.naturalHeight;

            this.origin = originCode;

            if(originCode == this.topLeft){
                this.xoffset = 0;
                this.yoffset = 0;
            }else if(originCode ==this.top){
                this.xoffset = Math.floor(imgWid/2);
                this.yoffset = 0;
            }else if(originCode ==this.topRight){
                this.xoffset = imgWid;
                this.yoffset = 0;
            }else if(originCode ==this.left){
                this.xoffset = 0;
                this.yoffset = Math.floor(imgHi/2);
            }else if(originCode ==this.center){
                this.xoffset = Math.floor(imgWid/2);
                this.yoffset = Math.floor(imgHi/2);
            }else if(originCode ==this.right){
                this.xoffset = imgWid;
                this.yoffset = Math.floor(imgHi/2);
            }else if(originCode ==this.bottomLeft){
                this.xoffset = 0;
                this.yoffset = imgHi;
            }else if(originCode ==this.bottom){
                this.xoffset = Math.floor(imgWid/2);
                this.yoffset = imgHi;
            }else{//originCode == this.bottomRight
                this.xoffset = imgWid;
                this.yoffset = imgHi;
            }
        }
    }


    this.drawImage = function(camera){
        //window.console.log("we called drawImage on the drawable" + this.image.src);
        if(this.image){
            var xcoord = Math.floor(this.x + 0.5 - camera.x - this.xoffset + this.positionParent.x);
            var ycoord = Math.floor(this.y + 0.5 - camera.y - this.yoffset + this.positionParent.y);
            context.drawImage(this.image,xcoord,ycoord);
        }

    };

}
Drawable.prototype = new Located();

function Animation(){
    this.slicewidth = 1; //how wide each frame is in the sheet
    this.slicecount = 1; //how many frames
    this.framelength = 100; //milliseconds per frame
    this.timer = new Timer();
    this.animated = false;
    this.setSheet = function(filename,framewidth,msPerFrame){
        this.image = loadImage(filename);
        //this next line tells the image to wait until it's loaded, and then execute the finish slicing function
        //it does this by setting the onload function to this.finishSlicing
        //the reason it does the .bind thing is because otherwise the function will run in the image's scope
        //instead of in the Animation's scope
        this.slicewidth = framewidth;
        this.slicecount = Math.floor(this.image.naturalWidth / this.slicewidth);
        this.framelength = msPerFrame;
        this.animated = true;
    }
    this.setStatic = function(filename){
        this.animated = false;
        this.image = loadImage(filename);
    }
    this.drawImage = function(camera){
        if(this.image){
            var xcoord = Math.floor(this.x + 0.5 - camera.x - this.xoffset + this.positionParent.x);
            var ycoord = Math.floor(this.y + 0.5 - camera.y - this.yoffset + this.positionParent.y);
            //window.console.log("coords: " + xcoord+ ", " + ycoord);

            if(this.animated){
                var loopPosition = this.timer.timeElapsedMillis()%(this.framelength*this.slicecount);
                var frameIndex = Math.floor(loopPosition/this.framelength);
                context.drawImage(this.image,
                    frameIndex*this.slicewidth,0,this.slicewidth,this.image.naturalHeight,
                    xcoord,ycoord,
                    this.slicewidth,this.image.naturalHeight);
            }else{
                context.drawImage(this.image,xcoord,ycoord);
            }
        }

    };
}
Animation.prototype = new Drawable();

function Camera(){
    this.width = canvas.width;
    this.height = canvas.height;
}
Camera.prototype = new Located();