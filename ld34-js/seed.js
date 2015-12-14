/* Sets up the islands functions of a Seed object.
Seeds can be collected, dropped, and planted by the player.

Coded by: Not The Author (Core implementation & functionality, physics)
	Benedict (Tweaks), Max (Tweaks) */

function Seed(getX, getY)
{
	this.z = 3;
	this.initialX = getX; this.x = getX; 
	this.initialY = getY; this.y = getY;
	
	this.isHeld = false;
	this.inAir = true;
	this.isPlanted = false;
	// this.canPlant = true; // May be redundant depending on implementation
	
	this.vy = 4.8;
	
	// Functions to set held/planted states
	this.pickUp = function(){
		this.isHeld = true;
		this.inAir = true;
		this.isPlanted = false;
		game.player.heldSeed = this;
		this.setZCoordinate(6);
	}
	this.putDown = function(){ // Uses seed's fall logic to simply drop seed 
		this.isHeld = false;
		this.inAir = true;
		this.isPlanted = false;
		game.player.heldSeed = false;
		this.setZCoordinate(3);
	}
	this.plant = function(newX, newY){ // Needs location to plant to
		this.isHeld = false;
		this.inAir = false;
		this.isPlanted = true;
		game.player.heldSeed = false;
		this.x = newX;
		this.y = newY;
		this.setZCoordinate(3);
	}
	this.land = function(){
		if(!this.inAir)
			return;
		this.vy = 0;
		this.inAir = false;
	}
	
	this.update = function(){
		if (this.isPlanted && (this.isHeld || this.inAir)) { // Shouldn't be possible
			this.putDown();
		}
		
		if (this.isPlanted) {
			this.grow();
			mainWorld.removeObjectFromAllLists(this);
		}
		else if (!this.isHeld && this.inAir) {
			// Fall speed
			this.vy = 4.8;
		}
		
		// Collision detection
		// Always pushes seeds up; may cause problems if seed dropped inside a platform
		if(this.inAir) {
			var originalY = this.y;
			this.y += this.vy;
			var firstCollision = this.getFirstNontriggerCollision();
			if(firstCollision && !firstCollision.trigger) {
				var colDirs1 = this.howFarToMoveToGetOut(firstCollision);
				this.y -= colDirs1.up;
				this.land();
			}
		}
		
		// Return the seed to its original location if it goes offscreen or the player resets
		if(keyboard["r"] || this.y > 600)
		{
			this.x = this.initialX;
			this.y = this.initialY;
			this.inAir = true;
		}
	}
	
	this.grow = function(){
		// Spawns new plant. Defined per seed type.
	}
}
Seed.prototype = new Animation();

function TestSeed()
{
	this.setStatic("ld34-images/seed_placeholder.png");
	this.setDrawBasedOnOrigin(this.center);
	addColliderToObject(this,this.image.naturalWidth,this.image.naturalHeight,this.origin);
	this.trigger = true;
	mainWorld.seeds.push(this);
	mainWorld.updateables.push(this)
}
TestSeed.prototype = new Seed();

function StalkSeed(getX, getY)
{
	this.initialX = getX; this.x = getX; 
	this.initialY = getY; this.y = getY;
	
	this.setStatic("ld34-images/stalk_seed_placeholder.png");
	this.setDrawBasedOnOrigin(this.center);
	addColliderToObject(this,this.image.naturalWidth,this.image.naturalHeight,this.origin);
	this.trigger = true;
	mainWorld.seeds.push(this);
	mainWorld.updateables.push(this)
	
	this.grow = function(){
		// Spawns a beanstalk at its current location, then self-annihilates.
		var newStalk = new Beanstalk();
		newStalk.x = this.x;
		newStalk.y = this.y;
		//window.console.log("this xy = " + this.x + "," + this.y);
		newStalk.startGrowing();
	};
}
StalkSeed.prototype = new Seed();

function FlowerSeed(getX, getY)
{
	this.initialX = getX; this.x = getX; 
	this.initialY = getY; this.y = getY;
	
	this.setStatic("ld34-images/flower_seed_placeholder.png");
	this.setDrawBasedOnOrigin(this.center);
	addColliderToObject(this,this.image.naturalWidth,this.image.naturalHeight,this.origin);
	this.trigger = true;
	mainWorld.seeds.push(this);
	mainWorld.updateables.push(this)

	this.grow = function(){
		// Spawns a beanstalk at its current location, then self-annihilates.
		var newFlow = new FlowerVine();
		newFlow.x = this.x;
		newFlow.y = this.y;
		//window.console.log("this xy = " + this.x + "," + this.y);
		var growLeft = game.player.facing == "left";
		newFlow.startGrowing(growLeft);
	};
}
FlowerSeed.prototype = new Seed();

function ShroomSeed()
{
	this.setStatic("ld34-images/shroom_seed_placeholder.png");
	this.setDrawBasedOnOrigin(this.center);
	addColliderToObject(this,this.image.naturalWidth,this.image.naturalHeight,this.origin);
	this.trigger = true;
	mainWorld.seeds.push(this);
	mainWorld.updateables.push(this)
}
ShroomSeed.prototype = new Seed();
