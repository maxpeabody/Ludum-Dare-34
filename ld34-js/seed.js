/* Sets up the generic functions of a Seed object.
Seeds can be collected, dropped, and planted by the player.

Coded by: Not The Author (Core implementation & functionality, physics)
	Benedict (Tweaks) */

function Seed()
{
	this.z = 3;
	
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
		this.isPlanted = false;
		game.player.heldSeed = false;
		this.setZCoordinate(3);
	}
	this.plant = function(located){ // Needs location to plant to
		this.isHeld = false;
		this.inAir = false;
		this.isPlanted = true;
		game.player.heldSeed = false;
		this.x = located.x;
		this.y = located.y;
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
				this.y -= colDirs1.up + this.image.naturalHeight;
				this.land();
			}
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
