/* Methods for player movement, drawing/animating the player, etc. etc.
Defined as a singleton object.

Coded by: Max (physics and input), Benedict (animation) */

function Player(){

	this.x = 24;
	this.y = 24;
	this.z = 5;
	this.xSpeed = 3.75;
	this.yVelocity = 0;
	this.jumpVelocity = 9;
	this.inAir = false;

	this.setSheet("ld34-images/arrow_right_strip.png",32,100);
	this.setDrawBasedOnOrigin(this.bottom);

	addColliderToObject(this,32,32,this.bottom);

	this.update = function() {
		if (keyboard["left"]) { // Need to make it so the this.player "flips"
			this.x -= this.xSpeed;
			this.setSheet("ld34-images/arrow_left_strip.png",32,100);
		}
		if (keyboard["right"]) {
			this.x += this.xSpeed;
			this.setSheet("ld34-images/arrow_right_strip.png",32,100);
		}
		if (keyboard["up"] && !this.inAir) {
			this.yVelocity = -1 * this.jumpVelocity;
			this.inAir = true; // Can't jump again until they hit the ground.
		}

		// effect of gravity on player
		if (this.y < 456) // Later, replace this with "if the player isn't colliding on the bottom"
			this.yVelocity += 0.22;
		// add conditional for player "hitting their head" here (or maybe before "hitting the ground?")
		// When player hits the ground, stop their movement + allow them to jump again
		else if (this.yVelocity > 0) {
			this.yVelocity = 0;
			this.inAir = false;
		}

		this.y += this.yVelocity;

		if(mainWorld.colliders[1]){
			if(this.isCollidingWith(mainWorld.colliders[1])){
				window.console.log("colliding");
			}
		}
	}
}
Player.prototype = new Animation();