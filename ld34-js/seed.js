/* Sets up the generic functions of a Seed object.
Seeds can be collected, dropped, and planted by the player.

Coded by Not The Author. */

function Seed()
{
	//var self = this; // I'm not sure why self is red? But this should be fine, probably.
	
	this.z = 3;
	
	this.isHeld = false;
	this.isPlanted = false;
	// this.canPlant = true; // May be redundant depending on implementation
	
	// Functions to set held/planted states
	this.pickUp = function(){
		this.isHeld = true;
		this.isPlanted = false;
		game.player.heldSeed = this;
		this.setZCoordinate(6);
	}
	this.putDown = function(located){ // Needs position to be put down to
		this.isHeld = false;
		this.isPlanted = false;
		game.player.heldSeed = false;
		this.y = located.y;
		this.setZCoordinate(3);
	}
	this.plant = function(located){
		this.isHeld = false;
		this.isPlanted = true;
		game.player.heldSeed = false;
		this.x = located.x;
		this.y = located.y;
		this.setZCoordinate(3);
	}
	
	this.update = function(){
		if (this.isPlanted) {
			this.isHeld = false;
			this.grow();
		}
		else if (this.isHeld) {
			// Lock position relative to player and ignore collision? (e.g. carry on head)
			// 'self' is stored in the player; is it a reference or copy?
		}
		// Do nothing if both are false.
		// Both being true is not expected, forces isPlanted, may cause problems.
	};
	
	this.grow = function(){
		// Spawns new plant.
		// Defined per seed type.
	};
}
Seed.prototype = new Animation();

function TestSeed()
{
	this.setStatic("ld34-images/arrow_idle.png");
	this.setDrawBasedOnOrigin(this.center);
	addColliderToObject(this,this.image.naturalWidth,this.image.naturalHeight,this.origin);
	mainWorld.seeds.push(this);
}
TestSeed.prototype = new Seed();
