function Beanstalk(){
    this.segmentCount = 6;
    this.segmentsExtruded = 0;
    this.z = 3;
    this.heightPerFrame = 1.5;

    this.segmentHeight = 1;
    this.totalHeight = 0;

    this.segments = [];
    this.buds = [];

    this.startGrowing = function(){
        this.addNewSegment();
        this.segmentHeight = this.segments[0].image.naturalHeight;
        this.maxHeight = this.segmentHeight*this.segmentCount;
        mainWorld.updateables.push(this);
    }

    this.addNewSegment = function(){
        var trunkPiece = new BeanTrunk();
        mainWorld.addDrawableObject(trunkPiece);
        trunkPiece.x = this.x;
        trunkPiece.y = this.y;
        trunkPiece.stalk = this;
        this.segments.push(trunkPiece);
    }

    this.update = function(){
        if(this.segmentsExtruded < this.segmentCount){//we're growing
            var growthThisCycle = this.heightPerFrame;
            if(this.totalHeight + this.heightPerFrame > this.maxHeight)
                growthThisCycle = (this.totalHeight + this.heightPerFrame - this.maxHeight)
            this.totalHeight += growthThisCycle;//increase height
            for(segCount=0;segCount<this.segments.length;segCount++){
                var seg = this.segments[segCount];
                seg.y -= growthThisCycle;
                if(!seg.doneExtruding){
                    seg.percentExtruded += growthThisCycle/this.segmentHeight;
                }
            }
            if(this.segments.length*this.segmentHeight < this.totalHeight){
                var overshoot = this.totalHeight-(this.segments.length*this.segmentHeight);
                this.segments[this.segments.length-1].finishExtruding();
                this.segmentsExtruded++;
                if(this.segmentsExtruded != this.segmentCount){
                    this.addNewSegment();
                    var newseg =  this.segments[this.segments.length-1];
                    newseg.y -= overshoot;
                    newseg.percentExtruded += overshoot/this.segmentHeight;
                }
            }
            //now see if we're done


        }
    }
}
Beanstalk.prototype = new Located();

function BeanTrunk(){
    this.percentExtruded = 0;
    this.doneExtruding = false;
    this.image = loadImage("ld34-images/plants/beanstalk_trunk.png");
    this.setDrawBasedOnOrigin(this.top);

    this.drawImage = function(camera){
        if(this.stalk && !this.doneExtruding){
            if(this.image){

                var xcoord = Math.floor(this.x + 0.5 - camera.x - this.xoffset + this.positionParent.x);
                var ycoord = Math.floor(this.y + 0.5 - camera.y - this.yoffset + this.positionParent.y);

                //context.drawImage(this.image,0,0,this.image.naturalWidth,this.percentExtruded*this.image.naturalHeight,
                //    xcoord,ycoord,this.image.naturalWidth,this.percentExtruded*this.image.naturalHeight);
                //window.console.log("slice size: 0,0 to " + this.image.naturalWidth + "," + this.percentExtruded*this.image.naturalHeight );
                //window.console.log("draw coords: " + xcoord + "," + ycoord + " to " + this.image.naturalWidth + "," + this.percentExtruded*this.image.naturalHeight );
            }
        }else{
            if(this.image){
                var xcoord = Math.floor(this.x + 0.5 - camera.x - this.xoffset + this.positionParent.x);
                var ycoord = Math.floor(this.y + 0.5 - camera.y - this.yoffset + this.positionParent.y);
                context.drawImage(this.image,xcoord,ycoord);
            }
        }
    };

    this.finishExtruding = function(){
        this.doneExtruding = true;
        //spawn buds
    }
}
BeanTrunk.prototype = new Drawable()
function BeanLeaf(){

}
BeanLeaf.prototype = new Animation();