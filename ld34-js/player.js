/* Methods for player movement, drawing/animating the player, etc. etc.
Defined as a singleton object.

Coded by: Max (physics and input), Benedict (animation) */

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.player =
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
}; // end app.player