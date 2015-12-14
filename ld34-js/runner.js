/* Main method and game loop.

Coded by: Benedict, Max */
var colliderDebug = true;
function Game(){

    this.testDrawable = new Drawable();
    this.testDrawable.x = 201;
    this.testDrawable.y = 189;
    this.testDrawable.image = loadImage("ld34-images/arrow_idle.png");
    this.testDrawable.setDrawBasedOnOrigin(this.testDrawable.center);

    //this.zoom = 2;

	this.player = new Player();
    mainWorld.buildWorld();
    mainWorld.addDrawableObject(this.player);

    this.update = function(){
        mainWorld.drawAll();
        mainWorld.update();
		this.player.update();
        if(lighting)
            lighting.drawImage(mainCamera);
    }
}
Game.prototype = new Updateable();

function animate() {
    requestAnimFrame( animate );
	var bgpattern = context.createPattern(loadImage("ld34-images/bgtile.png"), 'repeat');
    context.clearRect(0,0,canvas.width,canvas.height);
	context.fillStyle = bgpattern;
    context.fillRect(0, 0, canvas.width,canvas.height);
	
    //here's where you do all the draw and update calls to whatever's in the game!
    game.update();
    if(colliderDebug){
        for(debugCounter=0;debugCounter<mainWorld.colliders.length;debugCounter++){
            var colObj = mainWorld.colliders[debugCounter];
            var xcoord = Math.floor(colObj.x + 0.5 - mainCamera.x + colObj.cX);
            var ycoord = Math.floor(colObj.y + 0.5 - mainCamera.y + colObj.cY);
            if(colObj.oneWay){
                context.strokeStyle = "white";
            }else{
                context.strokeStyle = "blue";
            }
            if(!colObj.hasTriangleCollider)
                context.strokeRect(xcoord,ycoord,colObj.cW,colObj.cH);
            if(colObj.hasTriangleCollider){
                //window.console.log("triangle colliders exist");
                context.strokeStyle = "red";
                var txcoord = Math.floor(colObj.x + 0.5 - mainCamera.x + colObj.tcX);
                var tycoord = Math.floor(colObj.y + 0.5 - mainCamera.y + colObj.tcY);
                context.strokeRect(txcoord,tycoord,colObj.tcW,colObj.tcH);
            }

            //context.drawImage(this.image,xcoord,ycoord);
        }
    }

    //game.testDrawable.drawImage(mainCamera);

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


var mainWorld;
var mainCamera;
var game;
var lighting;

function init()
{
    preloadStuff();
	
	// start the soundtrack
	createjs.Sound.play("ld34-sound/bgm/Solitude.mp3", {loop: -1, volume: 0.4});
}
function afterLoad(){
    window.console.log("did we call afterload");
    mainWorld = new World();
    mainCamera = new PlayerCamera();
    game = new Game();
    mainCamera.givePlayer(game.player);
    mainWorld.updateables.push(mainCamera);
    animate();
}