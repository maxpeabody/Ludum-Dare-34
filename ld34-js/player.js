/* Methods for player movement, drawing/animating the player, etc. etc.
Defined as a singleton object.

Coded by: Max (physics and input), Benedict (animation) */

//"use strict";

// if app exists use the existing copy
// else create a new object literal
//var app = app || {};

/*app.player =
{
	// declare variables
	animation: undefined,
	
	x: 24, y: 24,
	xSpeed: 3.5, yVelocity: 0, jumpSpeed: 22,
	inAir: false,
	
	init: function(defAnimation, defX, defY)
	{
		console.log("Initializing player.")
		
		this.x = defX; this.y = defY;
		this.animation = defAnimation;
	}
}; // end app.player*/

function Player(){

	this.x = 24;
	this.y = 24;
	this.z = 5;
	this.xSpeed = 3.5;
	this.yVelocity = 0;
	this.jumpVelocity = 22;
	this.inAir = false;

	this.setSheet("ld34-images/arrow_right_strip.png",32,100);
	this.setDrawBasedOnOrigin(this.bottom);

	this.update = function() {
		if (keyboard["left"]) // Need to make it so the this.player "flips"
			this.x -= this.xSpeed;
		if (keyboard["right"])
			this.x += this.xSpeed;
		if (keyboard["up"] && !this.inAir) {
			this.yVelocity = -1 * this.jumpVelocity;
			this.inAir = true; // Can't jump again until they hit the ground.
		}

		// effect of gravity on player
		if (this.y < 456) // Later, replace this with "if the player isn't colliding on the bottom"
			this.yVelocity += 1.5;
		// add conditional for player "hitting their head" here (or maybe before "hitting the ground?")
		// When player hits the ground, stop their movement + allow them to jump again
		else if (this.yVelocity > 0) {
			this.yVelocity = 0;
			this.inAir = false;
		}

		this.y += this.yVelocity;
	}
}
Player.prototype = new Animation();