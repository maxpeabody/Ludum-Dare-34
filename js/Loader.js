/*
Loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// image data
/* app.IMAGES =
{
	shipImage: "images/Hunter1.png",
	enemyImage: "images/Drone1.png",
	explosionImage: "images/explosion.png",
	explosionImage2: "images/explosion2.png",
	explosionImage3: "images/explosion3.png"
}; */

window.onload = function()
{
	console.log("window.onload called");
	
	app.Main.app = app; // call this BEFORE init
	app.Main.init(); // move later, if we implement preloading
	
	// preload images and sound
	/* app.queue = new createjs.LoadQueue(false);
	app.queue.installPlugin(createjs.Sound);
	app.queue.on("complete", function()
		{
			console.log("images loaded called");
			app.Main.init(app.Map);
		});
	
	app.queue.loadManifest(
		[
			// load images
			{id: "shipImage", src: "images/Hunter1.png"},
			{id: "enemyImage", src: "images/Drone1.png"},
			{id: "explosionImage", src: "images/explosion.png"},
			{id: "explosionImage2", src: "images/explosion2.png"},
			{id: "explosionImage3", src: "images/explosion3.png"},
			
			// load sounds
			{id:"bullet", src:"sounds/laser4.mp3"},
			{id:"explosion", src:"sounds/fireball4.mp3"},
			{id:"soundtrack", src:"sounds/soundtrack.mp3"}
		]); */
} // end app.Loader