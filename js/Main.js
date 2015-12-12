// Main.js
// Description: singleton object
// This object will be our Main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.Main = 
{
	// DECLARE VARIABLES
	// Canvas stuff
    canvas: undefined,
    ctx: undefined,
	
	// Game stuff
	
	mouseSelection: undefined,
	mouseX: undefined, mouseY: undefined,
	
	// Undefined, static "this" for Reasons
	self: undefined,
    
    // initialization
	init: function() 
	{
		console.log("app.Main.init() called");
		// declare properties
		self = this;
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');
			
		// start the game loopin
		this.update();
	},
	
	// animate and draw mobile sprites
	moveSprites: function()
	{
	},
	
    update: function()
	{		
		// LOOP
		requestAnimationFrame(this.update.bind(this));
		
		// clear the screen
		// this.ctx.clearRect(0, 0, 900, 700);
		this.ctx.drawImage(this.mapImage, 0, 0, 900, 526);
		
		// GAME LOGIC
		
		// DRAWING/ANIMATION
	}
	
}; // end app.Main