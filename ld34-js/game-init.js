/* Sets up keyboard callbacks + the canvas.

Coded by: Max (sound stuff), Benedict (everything else) */

var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;
context.scale(2,2);

var keyboard = {};

var images = {};
var allImagesLoaded = false;
var imageMax = 26;
var imageCount = 0;
function loadImage(imageFileName){ //call this to load image files- prevent loading same image more than once
    if(imageFileName in images)
        return images[imageFileName];
    else{
        var imgToAdd = new Image();
        imgToAdd.imageRendering = "pixelated";
        imgToAdd.src = imageFileName;
        if(!allImagesLoaded) {
            imgToAdd.onload = function () {
                imageCount++;
                window.console.log("loading image " + imageCount);
                if (imageCount >= imageMax) {
                    allImagesLoaded = true;
                    window.console.log("all images loaded (" + imageMax + ")");
                    afterLoad();
                }
            };
        }
        images[imageFileName] = imgToAdd;
        return images[imageFileName];
    }
}

var sounds = {};
var allSoundsLoaded = false;
var soundsMax = 5;
var soundCount = 0;
function loadSound(soundFileName)
{
	if(soundFileName in sounds)
		return sounds[soundFileName];
	else
	{
		var soundToAdd = new Audio();
		soundToAdd.src = soundFileName;
		if(!allSoundsLoaded)
		{
			// Console logs aren't happening, but it's still apparently working?? Weird.
			soundToAdd.onload = function()
			{
				soundCount++;
				window.console.log("loading sound " + soundCount);
				if(soundCount >= soundsMax)
				{
					allSoundsLoaded = true;
					window.console.log("all images loaded (" + soundsMax + ")");
					afterLoad();
				}
			};
		}
		
		sounds[soundFileName] = soundToAdd;
		return sounds[soundFileName];
	}
}

function preloadStuff(){
    window.console.log("we're calling the preloader");
   
	// Load images: Testing stuff
    /* loadImage("ld34-images/arrow_right_strip.png");
    loadImage("ld34-images/arrow_left_strip.png");
    loadImage("ld34-images/arrow_idle.png");
    loadImage("ld34-images/testdoohickey.png");
    loadImage("ld34-images/testwhatsit.png");
    loadImage("ld34-images/big_long_floor.png");
    loadImage("ld34-images/UGLYTESTRAMP.png");
    loadImage("ld34-images/UGLYTESTRAMP2.png");
    loadImage("ld34-images/UGLYTESTRAMP3.png"); */
	
	// Load images: Collision objects
	loadImage("ld34-images/generic/island_small.png");
	loadImage("ld34-images/generic/island_medium.png");
	
	loadImage("ld34-images/map1/ground_start.png");
	loadImage("ld34-images/map1/ground1.png");
	loadImage("ld34-images/map1/valley1.png");
	loadImage("ld34-images/map1/bridge1.png");
	loadImage("ld34-images/map1/bridge2.png");
	loadImage("ld34-images/map1/bridge3.png");
	
	loadImage("ld34-images/map1/overhang1.png");
	
	loadImage("ld34-images/map1/bigwall1.png");
	loadImage("ld34-images/map1/bigwall2.png");
	loadImage("ld34-images/map1/tallwall1.png");
	
	// Load images: Scenery and lighting
	loadImage("ld34-images/map1/lighting1.png");
	loadImage("ld34-images/scenery/grass_patch_small.png");
	loadImage("ld34-images/scenery/grass_patch_big.png");
	loadImage("ld34-images/scenery/tsundere.png");
	loadImage("ld34-images/scenery/cattail_lone.png");
	loadImage("ld34-images/scenery/cattail_twins.png");
	loadImage("ld34-images/scenery/red_reeds_big.png");
	loadImage("ld34-images/scenery/red_reeds_small.png");
	
	// Load images: Player sprites
	loadImage("ld34-images/protag_fall_left.png");
	loadImage("ld34-images/protag_fall_right.png");
    loadImage("ld34-images/protag_fall_left.png");
    loadImage("ld34-images/protag_fall_right.png");
    loadImage("ld34-images/protag_jump_left.png");
    loadImage("ld34-images/protag_jump_right.png");
    loadImage("ld34-images/protag_run_left.png");
    loadImage("ld34-images/protag_run_right.png");
    loadImage("ld34-images/protag_stand_left.png");
    loadImage("ld34-images/protag_stand_left.png");
	
	// Load music and SFX
	loadSound("ld34-sound/bgm/Rainy Place.mp3");
	loadSound("ld34-sound/bgm/Solitude.mp3");
	loadSound("ld34-sound/sfx/Jump.wav");
	loadSound("ld34-sound/sfx/Land.wav");
	loadSound("ld34-sound/sfx/StepBoth.wav");
	
	console.log(sounds);
}

//some stuff for getting keyboard events- just ask if(keyboard["nameOfKey"]) and boom
document.addEventListener("keydown",function(event){
    if(event.keyCode == 37)
        keyboard["left"] = true;
    if(event.keyCode == 38)
        keyboard["up"] = true;
    if(event.keyCode == 39)
        keyboard["right"] = true;
    if(event.keyCode == 40)
        keyboard["down"] = true;
});
document.addEventListener("keyup",function(event){
    if(event.keyCode == 37)
        keyboard["left"] = false;
    if(event.keyCode == 38)
        keyboard["up"] = false;
    if(event.keyCode == 39)
        keyboard["right"] = false;
    if(event.keyCode == 40)
        keyboard["down"] = false;
});

function Updateable(){
    this.update = function(){
        //do nothing
    };
}