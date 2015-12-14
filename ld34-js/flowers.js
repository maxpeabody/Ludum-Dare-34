function FlowerVine(){
    this.z = 3;
    this.flowers = [];
    this.budPositions = [{x:45,y:42},{x:91,y:81},{x:183,y:99},{x:215,y:148},{x:306,y:185}];
    this.budPercents = [.6,.4,.65,.8,.999];
    this.flowerOffsetX = -8;
    this.flowerOffsetY = -4;

    this.startGrowing = function(left){
        this.vine = new Vine();
        this.vine.y = this.y;
        this.vine.setupLeft(this.x,left);
        addColliderToObject(this,32,20,this.vine.center); //located doesn't have origin constants is all
        //window.console.log("we started growing and our collider stuff is " + this.cX + "+" + this.cW + " " + this.cY + "+" + this.cH);
        this.trigger = true;
        mainWorld.plantstems.push(this);
        mainWorld.updateables.push(this.vine);
        for(flo=0;flo<this.budPositions.length;flo++){
            var newFlower = new Flower();
            if(left){
                newFlower.x = this.x - this.budPositions[flo].x - this.flowerOffsetX;
            }else{
                newFlower.x = this.x + this.budPositions[flo].x + this.flowerOffsetX;
            }
            newFlower.y = this.y - this.budPositions[flo].y + this.flowerOffsetY;
            this.flowers.push(newFlower);
        }
        //window.console.log("this x is " + this.x);
        mainWorld.updateables.push(this);
    }
    this.update = function(){
        var flowerPercent = this.vine.getPercentProgress();
        for(flo=0;flo<this.flowers.length;flo++){
            var currentFlower = this.flowers[flo];
            if(currentFlower.blooming){
                continue;
            }
            if(flowerPercent > this.budPercents[flo]){
                currentFlower.startGrowing();
            }
        }
    }
    this.uproot = function(){
        mainWorld.removeObjectFromAllLists(this.vine);
        for(prunecount=0;prunecount<this.flowers.length;prunecount++){
            mainWorld.removeObjectFromAllLists(this.flowers[prunecount]);
        }
        mainWorld.removeObjectFromAllLists(this);
        var flowerSeed = new FlowerSeed();
        flowerSeed.x = this.x;
        flowerSeed.y = this.y;
        mainWorld.addDrawableObject(flowerSeed);
    }
}
FlowerVine.prototype = new Located();

function Vine(){
    this.vineOffsetX = 13;
    this.leftFacing = false;

    this.setupLeft = function(x,dir){
        this.leftFacing = dir;
        if(dir) { //we're facing left
            this.x = x+this.vineOffsetX;
            this.setSheet("ld34-images/plants/big_long_vine_left.png",320,100);
            this.setDrawBasedOnOrigin(this.bottomRight);
        }else{
            this.x = x-this.vineOffsetX;
            this.setSheet("ld34-images/plants/big_long_vine_right.png",320,100);
            this.setDrawBasedOnOrigin(this.bottomLeft);
        }
        this.z = 3;
        mainWorld.addDrawableObject(this);
    }

    this.update = function(){
        if(!this.frozen && this.timer.timeElapsedMillis() >= (this.framelength*this.slicecount)-100){
            this.frozen = true;
            this.setStatic("ld34-images/plants/frozen_vine_right.png");
            if(this.leftFacing){
                this.setStatic("ld34-images/plants/frozen_vine_left.png");
            }
        }
    }

    this.getPercentProgress = function(){
        var pp = this.timer.timeElapsedMillis() / (this.framelength*this.slicecount);
        if(pp > 1){
            pp = 1;
        }
        return pp;
    }

}
Vine.prototype = new Animation();

function Flower(){
    this.blooming = false;
    this.frozen = false;
    this.z = 4;
    this.startGrowing = function(){
        this.blooming = true;
        this.setSheet("ld34-images/plants/your_best_friend.png",60,100);
        this.setDrawBasedOnOrigin(this.center);
        mainWorld.addDrawableObject(this);
        mainWorld.updateables.push(this);
    }
    this.update = function(){
        if(!this.frozen && this.timer.timeElapsedMillis() >= (this.framelength*this.slicecount)-100){
            window.console.log("Howdy! I'm FLOWEY! FLOWEY the FLOWER!");
            this.frozen = true;
            this.setStatic("ld34-images/plants/you_IDIOT.png");
            addColliderToObject(this,40,23,this.origin);
            this.cY += 15;
            this.cX -= 3;
            this.oneWay = true;
        }
    }
}
Flower.prototype = new Animation();