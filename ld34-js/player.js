/* Methods for player movement, drawing/animating the player, etc. etc.
Defined as a singleton object.

Coded by: Max (physics, input, animation implementation/tweaks, sound), 
	Benedict (majority of animation stuff, collisions), Not The Author (animation implementation/tweaks) */

function Player()
{
	// Movement/location-related things
	this.x = 400;
	this.y = 70;
	this.z = 5;
	this.xSpeed = 3.75;
	this.yVelocity = 0;
	this.jumpVelocity = 9;
	this.inAir = false;
	
	this.upButtonReleased = true;
	this.landingCooldown = 0;
	
	// SFX stuff
	this.isRunning = false;
	this.runSFXStarted = false;
	this.runSFX = createjs.Sound.play("ld34-sound/sfx/StepBoth.wav", {loop: -1, volume: 0});
	
	// Animation stuff
	this.facing = "right";

	this.setSheet("ld34-images/protag_stand_right.png",64,100);
	this.setDrawBasedOnOrigin(this.bottom);

	// Set up collision detection
	addColliderToObject(this,20,this.image.naturalHeight,this.origin);

	this.update = function() 
	{
		// HANDLING PLAYER INPUT
		if (keyboard["left"] && !keyboard["right"]) 
		{
			this.x -= this.xSpeed;
			this.facing = "left";
			
			if(!this.inAir)
			{
				this.isRunning = true;
				this.setSheet("ld34-images/protag_run_left.png", 64, 100);
				this.setDrawBasedOnOrigin(this.origin);
			}
			else
				this.isRunning = false;
		}
		else if (keyboard["right"] && !keyboard["left"]) 
		{
			this.x += this.xSpeed;
			
			this.facing = "right";
			if(!this.inAir)
			{
				this.isRunning = true;
				this.setSheet("ld34-images/protag_run_right.png", 64, 100);
				this.setDrawBasedOnOrigin(this.origin);
			}
			else
				this.isRunning = false;
		}
		else if (this.facing == "left" && !this.inAir) 
		{
			this.setSheet("ld34-images/protag_stand_left.png", 64, 100);
			this.setDrawBasedOnOrigin(this.origin);
			
			this.isRunning = false;
		}
		else if(!this.inAir) // facing right is implicit
		{
			this.setSheet("ld34-images/protag_stand_right.png", 64, 100);
			this.setDrawBasedOnOrigin(this.origin);
			
			this.isRunning = false;
		}
		
		// if in the air, "overwrite" whatever spriteSheet WOULD be used
		// This probably isn't the MOST efficient way to do it, but it should be fine.
		if(this.inAir)
		{
			if(this.facing == "left" && this.yVelocity < 0)
				this.setSheet("ld34-images/protag_jump_left.png", 64, 100);
			else if(this.facing == "right" && this.yVelocity < 0)
				this.setSheet("ld34-images/protag_jump_right.png", 64, 100);
			else if(this.facing == "left") // velocity >= 0 implicit
				this.setSheet("ld34-images/protag_fall_left.png", 64, 100);
			else // etc.
				this.setSheet("ld34-images/protag_fall_right.png", 64, 100);
				
			this.setDrawBasedOnOrigin(this.origin);
		}
		
		if (keyboard["up"] && !this.inAir && this.upButtonReleased) 
		{
			this.yVelocity = -1 * this.jumpVelocity;
			this.inAir = true; // Can't jump again until they hit the ground.
			this.upButtonReleased = false; // No jumping repeatedly by holding it down.
			
			createjs.Sound.play("ld34-sound/sfx/Jump.wav", {loop: 0, volume: 0.35});
			this.isRunning = false;
		}
		else if(!this.inAir && !keyboard["up"])
			this.upButtonReleased = true;

		this.y += this.yVelocity;

		// effect of gravity on player
		if (!this.isColliding()) // Later, replace this with "if the player isn't colliding on the bottom"
			this.yVelocity += .42;
		// add conditional for player "hitting their head" here (or maybe before "hitting the ground?")
		// When player hits the ground, stop their movement + allow them to jump again
		else if (this.yVelocity > 0) 
		{
			var collidedObject = this.isColliding();
			if(collidedObject){
				this.y -= this.howFarToMoveToGetOut(collidedObject).up;
				window.console.log("player xy: " + this.x + "," + this.y + "\n" +
					"colx: " + (this.x+this.cX) + " to " + (this.x+this.cX+this.cW) + "\n" +
					"coly: " + (this.y+this.cY) + " to " + (this.y+this.cY+this.cH) + "\n");
			}
			this.yVelocity = 0;
			this.inAir = false;
			
			createjs.Sound.play("ld34-sound/sfx/Land.wav", {loop: 0, volume: 0.35});
			
			// Animates the player landing
			// ...There isn't a GREAT way to implement this, yet.
			/* if(this.facing == "left")
				this.setSheet("ld34-images/protag_land_left.png", 64, 100);
			else
				this.setSheet("ld34-images/protag_land_right.png", 64, 100);
			
			this.setDrawBasedOnOrigin(this.origin);
			this.landingCooldown = 10; */
		}

		// Turn running SFX on if the player is running, off if they aren't.
		// This solution... isn't great, but it's functional and doesn't seem to harm performance.
		if(this.isRunning)
			this.runSFX.volume = 0.12;
		else
			this.runSFX.volume = 0;
		
		/* if(this.isRunning == true)
		{
			console.log("Start Running!");
			this.runSFXStarted = true;
			this.runSFX.play();
		}
		else if(this.runSFXStarted);
		{
			console.log("STOP RUNNING!");
			
			this.runSFXStarted = false;
			this.runSFX.pause();
		} */
	}
	this.isColliding = function(){
		for(playerCollisionLoopCounter=0;playerCollisionLoopCounter < mainWorld.colliders.length; playerCollisionLoopCounter++)
		{
			var o2 = mainWorld.colliders[playerCollisionLoopCounter];
			if(o2 != this && this.isCollidingWith(o2))
			{
				return o2;
			}
		}
		this.inAir = true; // If there's nothing underfoot, you must be falling!
		return false;
	}
}
Player.prototype = new Animation();