/* Sets up keyboard callbacks + the canvas.

Coded by: Max (sound stuff), Benedict (everything else) */

var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;
context.scale(2,2);

var keyboard = {};

var images = {};
var allImagesLoaded = false;
var imageMax = 111;
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

	// Load images: Testing and miscellaneous
	loadImage("ld34-images/arrow_idle.png");
	
	// Load images: Background
	loadImage("ld34-images/bgtile.png");

	// Load images: Collision objects
	loadImage("ld34-images/islands/island_small.png");
	loadImage("ld34-images/islands/island_medium1.png");
	loadImage("ld34-images/islands/island_medium2.png");
	loadImage("ld34-images/islands/island_large1.png");
	loadImage("ld34-images/islands/isl1_tile1.png");
	loadImage("ld34-images/islands/isl2_tile.png");
	loadImage("ld34-images/islands/isl6_tile1.png");
	loadImage("ld34-images/islands/isl6_tile2.png");
	loadImage("ld34-images/islands/isl6_tile3.png");
	loadImage("ld34-images/islands/island_mysterious.png");
	
	loadImage("ld34-images/map1/ground_start.png");
	loadImage("ld34-images/map1/ground1.png");
	loadImage("ld34-images/map1/valley1.png");
	loadImage("ld34-images/map1/bridge1.png");
	loadImage("ld34-images/map1/bridge2.png");
	loadImage("ld34-images/map1/bridge3.png");
	
	loadImage("ld34-images/map1/ramp_grassy1.png");
	loadImage("ld34-images/map1/ramp_grassy2.png");
	loadImage("ld34-images/map1/ramp_grassy3.png");
	loadImage("ld34-images/map1/ramp_sandy1.png");
	loadImage("ld34-images/map1/ramp_sandy2.png");
	loadImage("ld34-images/map1/ramp_tinysandy1.png");
	loadImage("ld34-images/map1/ramp_tinysandy2.png");
	// loadImage("ld34-images/map1/ramp_smallsandy1.png");
	loadImage("ld34-images/map1/ramp_tinygrassy1.png");
	loadImage("ld34-images/map1/block_tinysandy1.png");
	loadImage("ld34-images/map1/block_smallsandy1.png");
	loadImage("ld34-images/map1/notchedwall1.png");
	loadImage("ld34-images/map1/block_sandy1.png");
	loadImage("ld34-images/map1/block_sandy2.png");
	loadImage("ld34-images/map1/block_grassy1.png");
	loadImage("ld34-images/map1/block_jutting1.png");
	
	loadImage("ld34-images/map1/tinywall1.png");
	loadImage("ld34-images/map1/smallwall1.png");
	loadImage("ld34-images/map1/smallwall2.png");
	loadImage("ld34-images/map1/smallwall3.png");
	loadImage("ld34-images/map1/bigwall1.png");
	loadImage("ld34-images/map1/bigwall2.png");
	loadImage("ld34-images/map1/bigwall3.png");
	loadImage("ld34-images/map1/mediumwall1.png");
	loadImage("ld34-images/map1/mediumwall2.png");
	loadImage("ld34-images/map1/mediumwall3.png");
	loadImage("ld34-images/map1/tallwall1.png");
	loadImage("ld34-images/map1/tallwall2_chunk1.png");
	loadImage("ld34-images/map1/tallwall2_chunk2.png");
	loadImage("ld34-images/map1/tallwall2_chunk3.png");
	loadImage("ld34-images/map1/tallwall3.png");
	
	loadImage("ld34-images/map1/overhang1.png");
	loadImage("ld34-images/map1/overhang2.png");
	loadImage("ld34-images/map1/overhang3.png");
	loadImage("ld34-images/map1/overhang4.png");
	loadImage("ld34-images/map1/overhang5.png");
	loadImage("ld34-images/map1/overhang6.png");
	loadImage("ld34-images/map1/overhang7.png");
	loadImage("ld34-images/map1/overhang_thick1.png");
	loadImage("ld34-images/map1/overhang_thick2.png");
	loadImage("ld34-images/map1/overhang_double1.png");
	
	loadImage("ld34-images/map1/landbridge1.png");
	loadImage("ld34-images/map1/tinyslope_ceiling1.png");
	loadImage("ld34-images/map1/small_ceiling1.png");
	loadImage("ld34-images/map1/ceiling1.png");
	
	// Load images: Scenery and lighting
	loadImage("ld34-images/map1/lighting1.png");
	loadImage("ld34-images/map1/scenery1.png");
	loadImage("ld34-images/map1/sceneryfg1.png");

	// Load images: Seeds
	loadImage("ld34-images/plants/placeholder_seed.png");
	loadImage("ld34-images/plants/stalk_seed.png");
	loadImage("ld34-images/plants/shroom_seed.png");
	loadImage("ld34-images/plants/flower_seed.png");

	// Load images: Plant parts
	loadImage("ld34-images/plants/stalk_anim.png");
	loadImage("ld34-images/plants/stalk_cap.png");
	loadImage("ld34-images/plants/stalk_mid.png");
	loadImage("ld34-images/plants/stalk_still.png");
	loadImage("ld34-images/plants/bean_leaf_right.png");
	loadImage("ld34-images/plants/bean_leaf_left.png");
	loadImage("ld34-images/plants/leaf_frozen_right.png");
	loadImage("ld34-images/plants/leaf_frozen_left.png");
	
	loadImage("ld34-images/plants/big_long_vine_right.png");
	loadImage("ld34-images/plants/big_long_vine_left.png");
	loadImage("ld34-images/plants/frozen_vine_right.png");
	loadImage("ld34-images/plants/frozen_vine_left.png");
	loadImage("ld34-images/plants/your_best_friend.png");
	loadImage("ld34-images/plants/you_IDIOT.png");
	
	loadImage("ld34-images/plants/shroom_anim.png");
	loadImage("ld34-images/plants/shroom_sprout_2.png");
	loadImage("ld34-images/plants/shroom_still.png");
	loadImage("ld34-images/plants/shroomsheetrough.png");
	
	loadImage("ld34-images/plants/bridgestalk_anim_right.png");
	loadImage("ld34-images/plants/bridgestalk_anim_left.png");
	loadImage("ld34-images/plants/bridgestalk_still_right.png");
	loadImage("ld34-images/plants/bridgestalk_still_left.png");
	loadImage("ld34-images/plants/bridgestalk_cap_right.png");
	loadImage("ld34-images/plants/bridgestalk_cap_left.png");
	
	// Load images: Player sprites
    loadImage("ld34-images/protag_fall_left.png");
    loadImage("ld34-images/protag_fall_right.png");
    loadImage("ld34-images/protag_jump_left.png");
    loadImage("ld34-images/protag_jump_right.png");
    loadImage("ld34-images/protag_run_left.png");
    loadImage("ld34-images/protag_run_right.png");
    loadImage("ld34-images/protag_stand_left.png");
    loadImage("ld34-images/protag_stand_right.png");

	loadImage("ld34-images/jump_fall_eyesonly.png");
	loadImage("ld34-images/jump_land_eyesonly.png");
	loadImage("ld34-images/jump_up_eyesonly.png");
	loadImage("ld34-images/jump_fall_eyesonly_left.png");
	loadImage("ld34-images/jump_land_eyesonly_left.png");
	loadImage("ld34-images/jump_up_eyesonly_left.png");
	loadImage("ld34-images/runanimsheet_trans_left_eyesonly.png");
	loadImage("ld34-images/runanimsheet_trans_right_eyesonly.png");
	loadImage("ld34-images/eyes_left.png");
	loadImage("ld34-images/eyes_right.png");
	
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
	if(event.keyCode == 71)
		keyboard["g"] = true;
	if(event.keyCode == 82)
		keyboard["r"] = true;
	if(event.keyCode == 83)
		keyboard["s"] = true;
	if(event.keyCode == 85){
		//do something kinda unorthodox
		window.console.log("bound action u fired");
		game.player.bindButtonAction("u");
	}
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
	if(event.keyCode == 71)
		keyboard["g"] = false;
	if(event.keyCode == 82)
		keyboard["r"] = false;
	if(event.keyCode == 83)
		keyboard["s"] = false;
});

function Updateable(){
    this.update = function(){
        //do nothing
    };
}