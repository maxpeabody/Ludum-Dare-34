function Beanstalk(){
    this.segmentCount = 14;
    this.segmentsExtruded = 0;
    this.z = 3;
    this.heightPerFrame = 2;

    this.segmentHeight = 1;
    this.totalHeight = 0;

    this.budSpacing = 100;
    this.budLeft = false;

    this.segments = [];
    this.buds = [];

    this.startGrowing = function(){
        this.cap = new Animation();
        this.cap.setSheet("ld34-images/plants/stalk_anim.png",32,100);
        this.cap.setDrawBasedOnOrigin(this.cap.bottom);
        mainWorld.addDrawableObject(this.cap);
        this.cap.x = this.x;
        this.cap.y = this.y;
        this.cap.z = 1;

        this.addNewSegment();
        this.segmentHeight = this.segments[0].image.naturalHeight;
        this.maxHeight = this.segmentHeight*this.segmentCount;
        mainWorld.updateables.push(this);
        this.spawnBud();
    }

    this.addNewSegment = function(){
        var trunkPiece = new BeanTrunk();
        mainWorld.addDrawableObject(trunkPiece);
        trunkPiece.x = this.x;
        trunkPiece.y = this.y;
        trunkPiece.z = 1;
        trunkPiece.stalk = this;
        this.segments.push(trunkPiece);
    }
    this.spawnBud = function(){
        var newBud = new BeanLeaf();
        newBud.y = this.y;
        newBud.setupLeft(this.x,this.budLeft);
        this.budLeft = !this.budLeft;
        this.buds.push(newBud);
        mainWorld.addDrawableObject(newBud);
        mainWorld.updateables.push(newBud);
        window.console.log("we spawned a bud");
    }

    this.update = function(){
        if(this.segmentsExtruded < this.segmentCount){//we're growing
            var growthThisCycle = this.heightPerFrame;
            if(this.totalHeight + this.heightPerFrame > this.maxHeight)
                growthThisCycle = (this.totalHeight + this.heightPerFrame - this.maxHeight)

            //decide whether to spawn a bud
            if(Math.floor(this.totalHeight/this.budSpacing) < Math.floor((this.totalHeight+growthThisCycle)/this.budSpacing)){
                this.spawnBud();
            }

            this.totalHeight += growthThisCycle;//increase height
            this.cap.y = this.y-this.totalHeight+1;//-this.cap.image.naturalHeight;
            for(segCount=0;segCount<this.segments.length;segCount++){
                var seg = this.segments[segCount];
                seg.y -= growthThisCycle;
                if(!seg.doneExtruding){
                    seg.percentExtruded += growthThisCycle/this.segmentHeight;
                }
            }
            for(budCount=0;budCount<this.buds.length;budCount++){
                var bud = this.buds[budCount];
                bud.y -= growthThisCycle;
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
                }else{
                    //we're done
                    window.console.log("done growing");
                    this.cap.setStatic("ld34-images/plants/stalk_cap.png")
                    for(statify=0;statify<this.segments.length;statify++){
                        this.segments[statify].setStatic("ld34-images/plants/stalk_still.png");
                    }
                }
            }

        }
    }
}
Beanstalk.prototype = new Located();

function BeanTrunk(){
    this.percentExtruded = 0;
    this.doneExtruding = false;
    //this.setStatic("ld34-images/plants/stalk_still.png");
    this.setSheet("ld34-images/plants/stalk_mid.png",32,100);
    this.setDrawBasedOnOrigin(this.top);

    this.drawImage = function(camera){
        if(!this.animated) {
            if (this.stalk && !this.doneExtruding) {
                if (this.image) {

                    var xcoord = Math.floor(this.x + 0.5 - camera.x - this.xoffset + this.positionParent.x);
                    var ycoord = Math.floor(this.y + 0.5 - camera.y - this.yoffset + this.positionParent.y);

                    context.drawImage(this.image, 0, 0, this.image.naturalWidth, this.percentExtruded * this.image.naturalHeight,
                        xcoord, ycoord, this.image.naturalWidth, this.percentExtruded * this.image.naturalHeight);
                    //window.console.log("slice size: 0,0 to " + this.image.naturalWidth + "," + this.percentExtruded*this.image.naturalHeight );
                    //window.console.log("draw coords: " + xcoord + "," + ycoord + " to " + this.image.naturalWidth + "," + this.percentExtruded*this.image.naturalHeight );
                }
            } else {
                if (this.image) {
                    var xcoord = Math.floor(this.x + 0.5 - camera.x - this.xoffset + this.positionParent.x);
                    var ycoord = Math.floor(this.y + 0.5 - camera.y - this.yoffset + this.positionParent.y);
                    context.drawImage(this.image, xcoord, ycoord);
                }
            }
        }else{
            var loopPosition = this.timer.timeElapsedMillis()%(this.framelength*this.slicecount);
            var frameIndex = Math.floor(loopPosition/this.framelength);
            var xcoord = Math.floor(this.x + 0.5 - camera.x - this.xoffset + this.positionParent.x);
            var ycoord = Math.floor(this.y + 0.5 - camera.y - this.yoffset + this.positionParent.y);
            if (this.stalk && !this.doneExtruding) {
                context.drawImage(this.image, frameIndex*this.slicewidth, 0, this.slicewidth, this.percentExtruded * this.image.naturalHeight,
                    xcoord, ycoord, this.slicewidth, this.percentExtruded * this.image.naturalHeight);
            }else{
                context.drawImage(this.image,
                    frameIndex*this.slicewidth,0,this.slicewidth,this.image.naturalHeight,
                    xcoord,ycoord,this.slicewidth,this.image.naturalHeight);
            }
        }
    };

    this.finishExtruding = function(){
        this.doneExtruding = true;
        //spawn buds
    }
}
BeanTrunk.prototype = new Animation()
function BeanLeaf(){
    this.leftFacing = true;
    this.frozen = false;
    this.setupLeft = function(x,dir){
        this.leftFacing = dir;
        if(dir) { //we're facing left
            this.x = x-3;
            this.setSheet("ld34-images/plants/bean_leaf_left.png", 80, 100);
            this.setDrawBasedOnOrigin(this.right);
        }else{
            this.x = x+4;
            this.setSheet("ld34-images/plants/bean_leaf_right.png", 80, 100);
            this.setDrawBasedOnOrigin(this.left);
        }
    }
    this.update = function(){
        if(!this.frozen && this.timer.timeElapsedMillis() >= this.framelength*this.slicecount){
            this.frozen = true;
            var leafCode = this.topLeft;
            this.setStatic("ld34-images/plants/leaf_frozen_right.png");
            if(this.leftFacing){
                this.setStatic("ld34-images/plants/leaf_frozen_left.png");
                leafCode = this.topRight;
            }
            addColliderToObject(this,35,23,leafCode);
            this.cY += 5;
            if(this.leftFacing)
                this.cX -=20;
            else
                this.cX +=20;
            this.oneWay = true;
            mainWorld.colliders.push(this);
        }
    }
}
BeanLeaf.prototype = new Animation();