function Mushroom(){
    this.startGrowing = function(left){
        this.mushroom = new MushroomMushroom();
        this.mushroom.x = this.x;
        this.mushroom.y = this.y;
        this.mushroom.startGrowing();
        addColliderToObject(this,32,20,this.mushroom.center); //located doesn't have origin constants is all
        this.trigger = true;
        mainWorld.plantstems.push(this);
    }
    this.uproot = function(){
        mainWorld.removeObjectFromAllLists(this.mushroom);
        mainWorld.removeObjectFromAllLists(this);
        var mushSeed = new ShroomSeed();
        mushSeed.x = this.x;
        mushSeed.y = this.y;
        mainWorld.addDrawableObject(mushSeed);
    }
}
Mushroom.prototype = new Located();

function MushroomMushroom(){ //AGH EEK A SNAKE! SNAAAAAKE, A SNAAAAAKE! OOOOOOOH, IT'S A SNAKE
    this.isAMushroom = true;
    this.grown = false;
    this.startGrowing = function(){
        this.setSheet("ld34-images/plants/shroom_sprout_2.png",80,100);
        this.setDrawBasedOnOrigin(this.bottom);
        this.yoffset -= 2;
        mainWorld.addDrawableObject(this);
        mainWorld.updateables.push(this);
    }
    this.update = function(){
        if(!this.frozen && this.timer.timeElapsedMillis() >= (this.framelength*this.slicecount)-100){
            window.console.log("badger badger badger badger badger badger badger");
            this.frozen = true;
            this.setStatic("ld34-images/plants/shroom_still.png");
            if(!this.grown) {
                addColliderToObject(this, 47, 30, this.bottom);
                this.cY -= 15;
                this.trigger = true;
                this.grown = true;
            }
        }
    }
    this.playBounce = function(){
        this.setSheet("ld34-images/plants/shroom_anim.png",80,60);
       
		if(this.frozen)
		{
			var landsound = new Howl
			({
				urls: ['ld34-sound/sfx/Bounce.wav'],
				volume: 0.2
			}).play();
		}
		
		this.frozen = false;
    }
}
MushroomMushroom.prototype = new Animation();