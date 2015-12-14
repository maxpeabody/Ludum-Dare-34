function Mushroom(){
    this.startGrowing = function(left){
        this.mushroom = new MushroomMushroom();
        this.mushroom.startGrowing();
        addColliderToObject(this,32,20,this.mushroom.center); //located doesn't have origin constants is all
        this.trigger = true;
    }
    this.uproot = function(){
        mainWorld.removeObjectFromAllLists(this.mushroom);
        var mushSeed = new ShroomSeed();
        mushSeed.x = this.x;
        mushSeed.y = this.y;
        mainWorld.addDrawableObject(mushSeed);
    }

}
Mushroom.prototype = new Located();

function MushroomMushroom(){ //AGH EEK A SNAKE! SNAAAAAKE, A SNAAAAAKE! OOOOOOOH, IT'S A SNAKE
    this.isAMushroom = true;
    this.startGrowing = function(){
        this.setSheet("ld34-images/plants/shroom_sprout_2.png",80,100);
        this.setDrawBasedOnOrigin(this.bottom);
        mainWorld.addDrawableObject(this);
        mainWorld.updateables.push(this);
    }
    this.update = function(){
        if(!this.frozen && this.timer.timeElapsedMillis() >= (this.framelength*this.slicecount)-100){
            window.console.log("badger badger badger badger badger badger badger");
            this.frozen = true;
            this.setStatic("ld34-images/plants/shroom_still.png");
            addColliderToObject(this,47,23,this.bottom);
            this.trigger = true;
        }
    }
    this.playBounce = function(){
        this.setSheet("ld34-images/plants/shroom_anim.png",80,100);
        this.frozen = false;
    }
}
MushroomMushroom.prototype = new Animation();