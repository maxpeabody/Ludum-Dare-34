/* Methods for player movement, drawing/animating the player, etc. etc.
Defined as a singleton object.

Coded by: Max (physics, input, animation tweaks), Benedict (majority of animation stuff, collisions) */

function Player(){

	this.x = 24;
	this.y = 24;
	this.z = 5;
	this.xSpeed = 3.75;
	this.yVelocity = 0;
	this.jumpVelocity = 9;
	this.inAir = false;
	
	this.facing = "right";

	this.setSheet("ld34-images/protag_stand_right.png",64,100);
	this.setDrawBasedOnOrigin(this.bottom);

	addColliderToObject(this,20,this.image.naturalHeight,this.origin);

	this.update = function() {
		if (keyboard["left"] && !keyboard["right"]) { // Need to make it so the this.player "flips"
			this.x -= this.xSpeed;
			this.setSheet("ld34-images/protag_run_left.png", 64, 100);
			this.setDrawBasedOnOrigin(this.origin);
			this.facing = "left";
		}
		else if (keyboard["right"] && !keyboard["left"]) {
			this.x += this.xSpeed;
			this.setSheet("ld34-images/protag_run_right.png", 64, 100);
			this.setDrawBasedOnOrigin(this.origin);
			this.facing = "right";
		}
		else if (this.facing == "left") {
			this.setSheet("ld34-images/protag_stand_left.png", 64, 100);
			this.setDrawBasedOnOrigin(this.origin);
		}else{
			this.setSheet("ld34-images/protag_stand_right.png", 64, 100);
			this.setDrawBasedOnOrigin(this.origin);
		}
		
		if (keyboard["up"] && !this.inAir) {
			this.yVelocity = -1 * this.jumpVelocity;
			this.inAir = true; // Can't jump again until they hit the ground.
		}

		this.y += this.yVelocity;

		// effect of gravity on player
		if (!this.isColliding()) // Later, replace this with "if the player isn't colliding on the bottom"
			this.yVelocity += .42;
		// add conditional for player "hitting their head" here (or maybe before "hitting the ground?")
		// When player hits the ground, stop their movement + allow them to jump again
		else if (this.yVelocity > 0) {
			var collidedObject = this.isColliding();
			if(collidedObject){
				this.y -= this.howFarToMoveToGetOut(collidedObject).up;
				window.console.log("player xy: " + this.x + "," + this.y + "\n" +
					"colx: " + (this.x+this.cX) + " to " + (this.x+this.cX+this.cW) + "\n" +
					"coly: " + (this.y+this.cY) + " to " + (this.y+this.cY+this.cH) + "\n");
			}
			this.yVelocity = 0;
			this.inAir = false;
		}


	}
	this.isColliding = function(){
		for(i=0;i < mainWorld.colliders.length; i++){
			var o2 = mainWorld.colliders[i];
			if(o2 != this && this.isCollidingWith(o2)){
				return o2;
			}
		}
		return false;
	}
}
Player.prototype = new Animation();