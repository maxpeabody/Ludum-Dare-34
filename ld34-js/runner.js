function Game(){

	// NOTE: WE'RE PROBABLY GONNA WANT TO MOVE THIS TO A "player.js" CLASS.
    var player = new Animation();
    player.setSheet("ld34-images/arrow_right_strip.png",32,100);
    player.x = 50; player.xSpeed = 3.5;
    player.y = 50; player.yVelocity = 0; player.jumpVelocity = 22;
	player.inAir = false;
    player.setDrawBasedOnOrigin(player.bottom);

    this.update = function(){
		// player movement
		if(keyboard["left"]) // Need to make it so the player "flips"
			player.x -= player.xSpeed;
		if(keyboard["right"])
			player.x += player.xSpeed;
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
		player.drawImage(mainCamera);
    }
}
Game.prototype = new Updateable();

function animate() {
    requestAnimFrame( animate );
    context.clearRect(0, 0, canvas.width,canvas.height);

    //here's where you do all the draw and update calls to whatever's in the game!
    game.update();
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
function init(){
    animate();
}