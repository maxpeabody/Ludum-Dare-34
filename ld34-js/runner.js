function Game(){

    var wiggly = new Animation();
    wiggly.setSheet("ld34-images/arrow_right_strip.png",32,100);
    wiggly.x = 50;
    wiggly.y = 50;
    wiggly.setDrawBasedOnOrigin(wiggly.bottom);

    this.update = function(){
        wiggly.drawImage(mainCamera);
    }
}
Game.prototype = new Updateable();

function animate() {
    requestAnimFrame( animate );
    context.clearRect(0,0,canvas.width,canvas.height);

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