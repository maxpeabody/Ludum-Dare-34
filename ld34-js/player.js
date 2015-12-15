/* Methods for player movement, drawing/animating the player, etc. etc.
Defined as a singleton object.

Coded by: Max (physics, input, animation implementation/tweaks, sound), 
	Benedict (majority of animation stuff, collisions, physics tweaks),
	Not The Author (animation implementation/tweaks, seed management implementation) */

function Player()
{
	// Movement/location-related things

	this.x = 425;//-33;
	this.y = 428;//188;
	this.z = 4;

	this.vx = 0;
	this.vy = 0;

	this.xSpeed = 3.5;
	this.jumpVelocity = 8.2;
	this.terminalVelocity = 10.5; //just under half the width of a tile, so it doesn't just clip through
	this.inAir = false;
	
	this.upButtonReleased = true;
	this.landingCooldown = 0;

	this.downHeldDown = false;
	this.dropTimer = new Timer();

	this.heldSeed = false; // Stores the currently-held seed object.
	this.sHeldDown = false;
	this.gHeldDown = false;
	
	// SFX stuff
	this.isRunning = false;
	this.runSFXStarted = false;
	// this.runSFX = createjs.Sound.play("ld34-sound/sfx/StepBoth.wav", {loop: -1, volume: 0});
	
	// Animation stuff
	this.facing = "left";
	
	this.setSheet("ld34-images/protag_stand_left.png",64,100);
	this.setDrawBasedOnOrigin(this.bottom);

	this.eyes = new Animation();
	this.eyes.x = this.x;
	this.eyes.y = this.y;
	this.eyes.z = 11;
	this.eyes.setStatic("ld34-images/eyes_left.png");
	this.eyes.setDrawBasedOnOrigin(this.bottom);
	mainWorld.addDrawableObject(this.eyes);
	
	// Set up collision detection
	var pboxheight = Math.floor(this.image.naturalHeight *.55);
	addColliderToObject(this,12,pboxheight,this.bottom);
	this.trigger = true;
	// window.console.log(this.image.naturalHeight + " is player natural height");
	this.footwatch = new Located();
	this.footwatch.x = this.x;
	this.footwatch.y = this.y;
	addColliderToObject(this.footwatch,this.cW,3,this.top);
	this.footwatch.trigger = true;

	this.update = function() {
		if(this.immobile){ //a mushroom is bouncing you
			var timePassed = this.immobilityTimer.timeElapsedMillis();
			if(timePassed < 150){
				this.y = this.immobilityStartY + 1.2*(timePassed/100);
				this.eyes.y = this.y;

			}else{
				this.immobile = false;
				this.mushJump();
			}
		}
		// window.console.log(this.downHeldDown);
		// HANDLING PLAYER INPUT
		if(keyboard["r"] || this.y > 600)
		{
			this.x = 425; 
			this.y = 428;
			this.facing = "left";
		}

		if (keyboard["left"] && !keyboard["right"]) {
			this.vx = -this.xSpeed;

			if (!this.isRunning || this.facing == "right") 
			{
				this.facing = "left";
				this.isRunning = true;
				this.setSheet("ld34-images/protag_run_left.png", 64, 100);
				this.eyes.setSheet("ld34-images/runanimsheet_trans_left_eyesonly.png",64,100);
				this.setDrawBasedOnOrigin(this.origin);
			}
		}
		else if (keyboard["right"] && !keyboard["left"]) {
			this.vx = this.xSpeed;
			
			if (!this.isRunning || this.facing == "left") 
			{
				this.facing = "right";
				this.isRunning = true;
				this.setSheet("ld34-images/protag_run_right.png", 64, 100);
				this.eyes.setSheet("ld34-images/runanimsheet_trans_right_eyesonly.png",64,100);
				this.setDrawBasedOnOrigin(this.origin);
			}
		} else {
			this.vx = 0;
			this.isRunning = false;
			if (this.facing == "left") {
				this.setStatic("ld34-images/protag_stand_left.png");
				this.eyes.setStatic("ld34-images/eyes_left.png");
				this.setDrawBasedOnOrigin(this.origin);
			} else {
				this.setStatic("ld34-images/protag_stand_right.png");
				this.eyes.setStatic("ld34-images/eyes_right.png");
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

			if (this.facing == "left" && this.vy < 0) {
				this.setStatic("ld34-images/protag_jump_left.png");
				this.eyes.setStatic("ld34-images/jump_up_eyesonly_left.png");
			}else if (this.facing == "right" && this.vy < 0) {
				this.setStatic("ld34-images/protag_jump_right.png");
				this.eyes.setStatic("ld34-images/jump_up_eyesonly.png");
			}else if (this.facing == "left") { // velocity >= 0 implicit
				this.setStatic("ld34-images/protag_fall_left.png");
				this.eyes.setStatic("ld34-images/jump_fall_eyesonly_left.png");
			}else { // etc.
				this.setStatic("ld34-images/protag_fall_right.png");
				this.eyes.setStatic("ld34-images/jump_fall_eyesonly.png");
			}
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
		var mushCollisions = this.footwatch.getAllCollisions();
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

		}else if(mushCollisions.length > 0){
			// window.console.log("there's some trigger collisions");
			var theresAMushroom = false;
			var mushIndex = -1;
			for(dshjh=0;dshjh<mushCollisions.length;dshjh++){
				if(mushCollisions[dshjh].isAMushroom){
					theresAMushroom = true;
					mushIndex = dshjh;
				}
			}
			if(theresAMushroom && this.inAir && this.vy > 0){//we're falling
				// window.console.log("well we reached the condition");
				this.mushGrab(mushCollisions[mushIndex]);
				return;
			}
		}
		//after you've done all that, get a second opinion on collisions by calling the get-first thing again
		//if you're still colliding with something, reset to your original xy and land

		//handle anything attached to the player that needs to move with it
		this.eyes.x = this.x;
		this.eyes.y = this.y;
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
			if(this.facing == "left"){
				newSeedX -= 16;
			} else {
				newSeedX += 16;
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
		} else if(this.sHeldDown && !keyboard["s"]){
			// window.console.log("we're trying to false it");
			this.sHeldDown = false;
		}
		// window.console.log("s held down: "+ this.sHeldDown);
		
		// Handles seed planting.
		// Could be added to pickup/dropoff to handle all seed functions with 1 button,
		// but I'm not sure how just yet.
		
		if (keyboard["g"] && !this.gHeldDown && this.heldSeed && !this.inAir) {
			window.console.log("Attempting to plant seed...");
			this.heldSeed.plant(this.x,this.y);
			this.gHeldDown = true;
		}
		else if (this.gHeldDown && !keyboard["g"]) {
			this.gHeldDown = false;
		}


		// Turn running SFX on if the player is running, off if they aren't.
		// At some point this stopped working entirely. Whatever. It's not a huge priority.
		/* if(this.isRunning)
			this.runSFX.volume = 0.12;
		else
			this.runSFX.volume = 0; */

		if(this.buttonBoundAction){
			window.console.log("oh man we have a bound action");
			this.buttonBoundAction();
			this.buttonBoundAction = false;
		}
	}
	this.bindButtonAction = function(key){
		if(key == "u"){
			this.buttonBoundAction = function(){
				//try to uproot a plant
				var stemFound = false;
				for(stemcount=0;stemcount<mainWorld.plantstems.length;stemcount++){
					var stem = mainWorld.plantstems[stemcount];
					if(this.isCollidingWith(stem)){
						stemFound = stemcount;
						if(stemcount == 0){
							stemFound = -1; //because god damn it javascript
						}
						break;
					}
				}
				if(stemFound){
					if(stemFound == -1) //because god DAMN it javascript
						stemFound++;
					var foundStem = mainWorld.plantstems[stemFound];
					foundStem.uproot();
				}
			}
		}
	};

	this.jump = function(){
		this.vy = -1 * this.jumpVelocity;
		this.inAir = true; // Can't jump again until they hit the ground.
		this.upButtonReleased = false; // No jumping repeatedly by holding it down.

		var jumpsound = new Howl
		({
			urls: ['ld34-sound/sfx/Jump.wav'],
			volume: 0.35
		}).play();

		this.isRunning = false;
	};
	this.mushGrab = function(shroom){
		window.console.log("mush grabbed");
		shroom.playBounce();
		this.immobile = true;
		this.immobilityTimer = new Timer();
		this.immobilityStartX = this.x;
		this.immobilityStartY = this.y;

	};
	this.mushJump = function(){
		this.vy = -2 * this.jumpVelocity;
		this.inAir = true;
		this.isRunning = false;
		this.upButtonReleased = false;
	};
	this.land = function(){
		if(!this.inAir)
			return;
		this.vy = 0;
		this.inAir = false;
		
		console.log(this.x + ", " + this.y);
		
		var landsound = new Howl
		({
			urls: ['ld34-sound/sfx/Land.wav'],
			volume: 0.35
		}).play();
	};
	this.fall = function(){
		this.inAir = true;
		this.isRunning = false;
	}
}
Player.prototype = new Animation();