/* Main method and game loop.

Coded by: Benedict, Max */



function Game(){

	this.player = new Player();
    mainWorld.buildWorld();
    mainWorld.addDrawableObject(this.player);

    this.update = function(){
        mainWorld.drawAll();
		this.player.update();
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


var mainWorld = new World();
var mainCamera = new Camera();
var game = new Game();
function init()
{
    preloadStuff();
}
function afterLoad(){
    animate();
}