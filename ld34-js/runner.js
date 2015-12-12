/* Main method and game loop.

Coded by: Benedict, Max */

function Game(){
	
    this.update = function(){
		// player movement
		if(keyboard["left"]) // Need to make it so the this.player "flips"
			player.x -= player.xSpeed; player.animation.x -= player.xSpeed;
		if(keyboard["right"])
			player.x += player.xSpeed; player.animation.x += player.xSpeed;
		if(keyboard["up"] && !player.inAir)
		{
			player.yVelocity = -1 * player.jumpVelocity;
			player.inAir = true; // Can't jump again until they hit the ground.
		}
		
		// effect of gravity on player
		if(player.y < 456) // Later, replace this with "if the player isn't colliding on the bottom"
			player.yVelocity += 1.5;
		// add conditional for player "hitting their head" here (or maybe before "hitting the ground?")
		// When player hits the ground, stop their movement + allow them to jump again
		else if(player.yVelocity > 0)
		{
			player.yVelocity = 0;
			player.inAir = false;
		}
		
		player.y += player.yVelocity;
		
		// draw player
		player.animation.drawImage(mainCamera);
    }
}
Game.prototype = new Updateable();

function animate(player) {
    requestAnimFrame( animate );
    context.clearRect(0, 0, canvas.width,canvas.height);

    //here's where you do all the draw and update calls to whatever's in the game!
    game.update(player);
}

//don't ask me how this works- it pretty much just sets up an animation context
//and sets the window up to render it. bit of code i ganked from a tutorial,
//allegedly improves efficiency. ignore this.
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var game = new Game();
var mainCamera = new Camera();
function init()
{
	// Initialize the player character.
	var playerAnimation = new Animation();
    playerAnimation.setSheet("ld34-images/arrow_right_strip.png",32,100);
    playerAnimation.setDrawBasedOnOrigin(playerAnimation.bottom);
	
	this.player = app.player;
	this.player.init(playerAnimation, 50, 50);
	
	// Start the animation/game loop
    animate(this.player);
}