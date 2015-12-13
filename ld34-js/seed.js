/* Sets up the generic functions of a Seed object.
Seeds can be collected, dropped, and planted by the player.

Coded by Not The Author. */

function Seed()
{
	var self = this; // I'm not sure why self is red? But this should be fine, probably.
	
	this.z = 3;
	
	this.isHeld = false;
	this.isPlanted = false;
	// this.canPlant = true; // May be redundant depending on implementation
	
	// Functions to set held/planted states
	this.pickUp = function(){
		isHeld = true;
		isPlanted = false;
		player.heldSeed = this.self;
	}
	this.putDown = function(located){ // Needs position to be put down to
		isHeld = false;
		isPlanted = false;
		player.heldSeed = false;
		this.x = located.x;
		this.y = located.y;
	}
	this.plant = function(located){
		isHeld = false;
		isPlanted = true;
		player.heldSeed = false;
		this.x = located.x;
		this.y = located.y;
	}
	
	this.update = function(){
		if (isPlanted) {
			isHeld = false;
			this.grow();
		}
		else if (isHeld) {
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