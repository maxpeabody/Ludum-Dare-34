/* Methods for player movement, drawing/animating the player, etc. etc.
Defined as a singleton object.

Coded by: Max (physics, input, animation implementation/tweaks, sound), 
	Benedict (majority of animation stuff, collisions, physics tweaks),
	Not The Author (animation implementation/tweaks, seed management implementation) */

function Player()
{
	// Movement/location-related things
	this.x = 370; //this.x = 430;
	this.y = 120; //this.y = 428;
	this.z = 4;

	this.vx = 0;
	this.vy = 0;

	this.xSpeed = 3.75;
	this.jumpVelocity = 9;
	this.terminalVelocity = 10.5; //just under half the width of a tile, so it doesn't just clip through
	this.inAir = false;
	
	this.upButtonReleased = true;
	this.landingCooldown = 0;

	this.downHeldDown = false;
	this.dropTimer = new Timer();

	this.heldSeed = false; // Stores the currently-held seed object.
	this.sHeldDown = false;
	
	// SFX stuff
	this.isRunning = false;
	this.runSFXStarted = false;
	// this.runSFX = createjs.Sound.play("ld34-sound/sfx/StepBoth.wav", {loop: -1, volume: 0});
	
	// Animation stuff
	this.facing = "right";
	
	this.setSheet("ld34-images/protag_stand_right.png",64,100);
	this.setDrawBasedOnOrigin(this.bottom);
	
	// Set up collision detection
	var pboxheight = Math.floor(this.image.naturalHeight *.55);
	addColliderToObject(this,20,pboxheight,this.bottom);
	this.trigger = true;
	// window.console.log(this.image.naturalHeight + " is player natural height");
	this.footwatch = new Located();
	this.footwatch.x = this.x;
	this.footwatch.y = this.y;
	addColliderToObject(this.footwatch,this.cW,3,this.top);
	this.footwatch.trigger = true;

	this.update = function() {
		// window.console.log(this.downHeldDown);
		// HANDLING PLAYER INPUT
		if(keyboard["r"] || this.y > 600)
		{
			this.x = 430; 
			this.y = 428;
		}

		if (keyboard["left"] && !keyboard["right"]) {
			this.vx = -this.xSpeed;
			this.facing = "left";

			this.isRunning = true;
			if (this.image.src != "ld34-images/protag_run_left.png") { //a string comparison's faster than setSheet
				this.setSheet("ld34-images/protag_run_left.png", 64, 100);
				this.setDrawBasedOnOrigin(this.origin);
			}
		}
		else if (keyboard["right"] && !keyboard["left"]) {
			this.vx = this.xSpeed;
			this.facing = "right";

			this.isRunning = true;
			if (this.image.src != "ld34-images/protag_run_right.png") {
				this.setSheet("ld34-images/protag_run_right.png", 64, 100);
				this.setDrawBasedOnOrigin(this.origin);
			}
		} else {
			this.vx = 0;
			this.isRunning = false;
			if (this.facing == "left") {
				this.setStatic("ld34-images/protag_stand_left.png");
				this.setDrawBasedOnOrigin(this.origin);
			} else {
				this.setStatic("ld34-images/protag_stand_right.png");
				this.setDrawBasedOnOrigin(this.origin);
			}
		}

		// if in the air, "overwrite" whatever spriteSheet WOULD be used
		// This probably isn't the MOST efficient way to do it, but it should be fine.
		if (this.inAir) {
			this.isRunning = false;
			this.vy += .32;
			if(this.vy > this.terminalVelocity)
				this.vy = this.terminalVelocity;

			if (this.facing == "left" && this.vy < 0)
				this.setStatic("ld34-images/protag_jump_left.png");
			else if (this.facing == "right" && this.vy < 0)
				this.setStatic("ld34-images/protag_jump_right.png");
			else if (this.facing == "left") // velocity >= 0 implicit
				this.setStatic("ld34-images/protag_fall_left.png");
			else // etc.
				this.setStatic("ld34-images/protag_fall_right.png");
			this.setDrawBasedOnOrigin(this.origin);
			if(!keyboard["up"] && this.vy < -2){
				this.vy = -2;
			}
		}

		if (keyboard["up"] && !this.inAir && this.upButtonReleased) {
			this.jump();
		}
		else if (!this.inAir && !keyboard["up"])
			this.upButtonReleased = true;

		if(!this.inAir){
			if(keyboard["down"]){
				if(!this.downHeldDown){
					this.dropTimer.restart();
					this.downHeldDown = true;
				}
			}
		}
		if(this.downHeldDown){
			if(!keyboard["down"]){
				this.downHeldDown =false;
			}
		}

		//we've done all velocity setting
		//now we handle collisions

		var originalX = this.x;
		var originalY = this.y;
		this.x += this.vx;
		this.y += this.vy;
		var firstCollision = this.getFirstNontriggerCollision();
		if(firstCollision && !firstCollision.trigger) {
			var colDirs1 = this.howFarToMoveToGetOut(firstCollision);
			if (firstCollision.hasTriangleCollider) {
				if (this.vx < 0) {//we're moving left
					var dir = this.smallestCollisionEscapeLRUD(colDirs1);
					if (dir == 0) {//left
						this.x -= colDirs1.left;
						this.y += 1;
					} else if (dir == 1) {//right
						this.x += colDirs1.right;
					} else if (dir == 2) {
						this.y -= colDirs1.up;
						if(this.inAir)
							this.land();
					} else {//down
						this.y += colDirs1.down;
					}
					/*if (firstCollision.shape == "J" || firstCollision.shape == "7") {
						if (colDirs1.right < colDirs1.left) {
							this.x += colDirs1.right;
						} else {
							this.x -= colDirs1.left;
						}
					} else if (firstCollision.shape == "L") {
						this.y -= colDirs1.up;
						if (this.inAir)
							this.land();
					} else { //P
						this.y += colDirs1.down;
					}*/
				} else if (this.vx > 0) {//we're moving right
					var dir = this.smallestCollisionEscapeLRUD(colDirs1);
					if (dir == 0) {//left
						this.x -= colDirs1.left;
						this.y += 1;
					} else if (dir == 1) {//right
						this.x += colDirs1.right;
					} else if (dir == 2) {
						this.y -= colDirs1.up;
						if(this.inAir)
							this.land();
					} else {//down
						this.y += colDirs1.down;
					}
					/*if (firstCollision.shape == "L" || firstCollision.shape == "P") {
						if (colDirs1.right < colDirs1.left) {
							this.x += colDirs1.right;
						} else {
							this.x -= colDirs1.left;
						}
					} else if (firstCollision.shape == "J") {
						this.y -= colDirs1.up;
						if (this.inAir)
							this.land();
					} else { //7
						this.y += colDirs1.down;
					}*/
				}
				//horizontal checks take priority over vertical ones
				else if (this.vy > 0) { //we're moving straight down
					this.y -= colDirs1.up;
					if (this.inAir)
						this.land();
				} else if (this.vy < 0) {//we're moving straight up
					this.y += colDirs1.down;
				}
			} else {//rectangular collision
				if (!firstCollision.oneWay) {
					var dir = this.smallestCollisionEscapeLRUD(colDirs1);
					if (dir == 0) {//left
						this.x -= colDirs1.left;
					} else if (dir == 1) {//right
						this.x += colDirs1.right;
					} else if (dir == 2) {
						this.y -= colDirs1.up;
						if(this.inAir)
							this.land();
					} else {//down
						this.y += colDirs1.down;
					}
				} else { //one-way platform
					if(this.dropTimer.timeElapsedMillis() > 200) {
						if (this.vy > 0) {
							if (colDirs1.up <= this.terminalVelocity) {
								this.y -= colDirs1.up;
								if (this.inAir)
									this.land();
							}
						}
					}
				}
			}
		}
		//after you've done all that, get a second opinion on collisions by calling the get-first thing again
		//if you're still colliding with something, reset to your original xy and land

		//handle anything attached to the player that needs to move with it
		this.footwatch.x = this.x;
		this.footwatch.y = this.y;
		var footsteps = this.footwatch.getAllCollisions();
		if(!this.inAir && footsteps.length == 1){
			this.fall();
		}
		else if(!this.inAir && footsteps.length > 1){
			if(footsteps[1].oneWay && this.dropTimer.timeElapsedMillis() < 200){
				this.fall();
			}
		}
		if(this.heldSeed){
			var newSeedX = this.x;
			if(this.facing == "right"){
				newSeedX +=15;
			}else{
				newSeedX -=15;
			}
			this.heldSeed.x = newSeedX;
			this.heldSeed.y = this.y-20;
		}

		// Handles seed pickup and dropoff.
		// May break if more than one seed is collided with at a time.
		if (keyboard["s"] && !this.sHeldDown) {
			this.sHeldDown = true;
			var seedCols = this.getSeedCollisions();
			window.console.log("number of seed collisions: " + seedCols.length);
			if(seedCols.length == 0){
				if(this.heldSeed)
					this.heldSeed.putDown(this); // Drop seed at player's feet
			}else{
				var newSeed = seedCols[0];
				if (this.heldSeed)
					this.heldSeed.putDown(newSeed); // Swap held seed with unheld seed
				newSeed.pickUp();
			}
		}else if(this.sHeldDown && !keyboard["s"]){
			// window.console.log("we're trying to false it");
			this.sHeldDown = false;
		}
		// window.console.log("s held down: "+ this.sHeldDown);
		
		// Handles seed planting.
		// Could be added to pickup/dropoff to handle all seed functions with 1 button,
		// but I'm not sure how just yet.

		if (!this.inAir && keyboard["f"] && this.heldSeed) {
			this.heldSeed.plant(this);
		}


		// Turn running SFX on if the player is running, off if they aren't.
		// At some point this stopped working entirely. Whatever. It's not a huge priority.
		/* if(this.isRunning)
			this.runSFX.volume = 0.12;
		else
			this.runSFX.volume = 0; */
	}

	this.jump = function(){
		this.vy = -1 * this.jumpVelocity;
		this.inAir = true; // Can't jump again until they hit the ground.
		this.upButtonReleased = false; // No jumping repeatedly by holding it down.

		createjs.Sound.play("ld34-sound/sfx/Jump.wav", {loop: 0, volume: 0.35});
		this.isRunning = false;
	}
	this.land = function(){
		if(!this.inAir)
			return;
		this.vy = 0;
		this.inAir = false;
		createjs.Sound.play("ld34-sound/sfx/Land.wav", {loop: 0, volume: 0.35});
	}
	this.fall = function(){
		this.inAir = true;
		this.isRunning = false;
	}
}
Player.prototype = new Animation();