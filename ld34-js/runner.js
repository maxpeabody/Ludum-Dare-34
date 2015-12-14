/* Main method and game loop.

Coded by: Benedict, Max */
var colliderDebug = false;
function Game(){

    this.testDrawable = new Drawable();
    this.testDrawable.x = -90;
    this.testDrawable.y = 169;
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
	var bgpattern = context.createPattern(loadImage("ld34-images/bgtilev2.png"), 'repeat');
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
        for(seedCounter=0;seedCounter<mainWorld.seeds.length;seedCounter++){
            var a_seed = mainWorld.seeds[seedCounter];
            var seedx = Math.floor(a_seed.x + 0.5 - mainCamera.x + a_seed.cX);
            var seedy = Math.floor(a_seed.y + 0.5 - mainCamera.y + a_seed.cY);
            context.strokeStyle = "green";
            context.strokeRect(seedx,seedy,a_seed.cW,a_seed.cH);
            // window.console.log("we allegedly drew it (" + a_seed.cW + "," + seedx + "," + seedy);
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
	/* createjs.Sound.registerSound("ld34-sound/bgm/Solitude.mp3", "song1");
	createjs.Sound.play("song1"); */
	var bgm1 = new Howl
	({
		urls: ['ld34-sound/bgm/Rainy Place.mp3'],
		volume: 0.18,
		loop: true
	}).play();
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