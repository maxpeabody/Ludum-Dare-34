/* Handles scenery/non-player objects 

Coded by Benedict; map 1 set up by Max */

function World(){
    this.colliders = [];
    this.drawables = [];
    this.updateables = [];

    this.drawAll = function(){
        for(i=0;i<this.drawables.length;i++){
            this.drawables[i].drawImage(mainCamera);
        }
    }
	
    this.update = function(){
        for(i=0;i<this.updateables.length;i++){
            this.updateables[i].update();
        }
    }

    this.addDrawableObject = function(drawable){ //adds object to draw list according to z
        var z = drawable.z;
        var found = false;
        for(i=0;i<this.drawables.length;i++){
            if(this.drawables[i].z > z){
                this.drawables.splice(i,0,drawable);
                found = true;
                break;
            }
        }
        if(!found){
            this.drawables.push(drawable);
        }
    }

    this.buildWorld = function()
	{
		// First, build the basic map + set up its colliders
		var startFloor = new Drawable(); // this, as the name implies, is where the player starts
		startFloor.x = 150;
		startFloor.y = 500;
		startFloor.z = 0;
		
		startFloor.image = loadImage("ld34-images/map1/ground_start.png");
		startFloor.setDrawBasedOnOrigin(startFloor.bottomLeft);
		addColliderToObjectBasedOnSprite(startFloor);
		
		this.addDrawableObject(startFloor);
		
		/* Walls to prevent the player going out of bounds and seeing the cracks.
		
		This is a TEMPORARY MEASURE - at some point, we should look into making everything out of
		bounds black (or, at least, ENOUGH of it black that the player will never notice the seams
		before they respawn or something... */
		var boundaryRight = new Drawable();
		boundaryRight.x = 462;
		boundaryRight.y = 500;
		boundaryRight.z = 0;
		
		boundaryRight.image = loadImage("ld34-images/map1/tallwall1.png");
		boundaryRight.setDrawBasedOnOrigin(boundaryRight.bottomLeft);
		addColliderToObjectBasedOnSprite(boundaryRight);
		
		this.addDrawableObject(boundaryRight);
		
		var valley1 = new Drawable();
		valley1.x = 29;
		valley1.y = 500;
		valley1.z = 0;
		
		valley1.image = loadImage("ld34-images/map1/valley1.png");
		valley1.setDrawBasedOnOrigin(valley1.bottomLeft);
		addColliderToObjectBasedOnSprite(valley1);
		
		this.addDrawableObject(valley1);
		
		var bigwall1 = new Drawable();
		bigwall1.x = -260;
		bigwall1.y = 500;
		bigwall1.z = 0;
		
		bigwall1.image = loadImage("ld34-images/map1/bigwall1.png");
		bigwall1.setDrawBasedOnOrigin(bigwall1.bottomLeft);
		addColliderToObjectBasedOnSprite(bigwall1);
		
		this.addDrawableObject(bigwall1);
		
		// "SECOND FLOOR"
		var bridge1 = new Drawable();
		bridge1.x = 66;
		bridge1.y = 356;
		bridge1.z = 0;
		
		bridge1.image = loadImage("ld34-images/map1/bridge1.png");
		bridge1.setDrawBasedOnOrigin(bridge1.bottomLeft);
		addColliderToObjectBasedOnSprite(bridge1);
		
		bridge1.oneWay = true;
		
		this.addDrawableObject(bridge1);
		
		var bridge2 = new Drawable();
		bridge2.x = 77;
		bridge2.y = 292;
		bridge2.z = 0;
		
		bridge2.image = loadImage("ld34-images/map1/bridge2.png");
		bridge2.setDrawBasedOnOrigin(bridge2.bottomLeft);
		addColliderToObjectBasedOnSprite(bridge2);
		
		bridge2.oneWay = true;
		
		this.addDrawableObject(bridge2);
		
		var floor1 = new Drawable();
		floor1.x = 162;
		floor1.y = 355;
		floor1.z = 0;
		
		floor1.image = loadImage("ld34-images/map1/ground1.png");
		floor1.setDrawBasedOnOrigin(floor1.bottomLeft);
		addColliderToObjectBasedOnSprite(floor1);
		
		this.addDrawableObject(floor1);
		
		var tinyslope_ceiling1 = new Drawable();
		tinyslope_ceiling1.x = 319;
		tinyslope_ceiling1.y = 344;
		tinyslope_ceiling1.z = 0;
		
		tinyslope_ceiling1.image = loadImage("ld34-images/map1/tinyslope_ceiling1.png");
		tinyslope_ceiling1.setDrawBasedOnOrigin(tinyslope_ceiling1.bottomLeft);
		addColliderToObjectBasedOnSprite(tinyslope_ceiling1);
		
		this.addDrawableObject(tinyslope_ceiling1);
		
		var bigwall2 = new Drawable();
		bigwall2.x = 307;
		bigwall2.y = 332;
		bigwall2.z = 0;
		
		bigwall2.image = loadImage("ld34-images/map1/bigwall2.png");
		bigwall2.setDrawBasedOnOrigin(bigwall2.bottomLeft);
		addColliderToObjectBasedOnSprite(bigwall2);
		
		this.addDrawableObject(bigwall2);
		
		var mediumwall1 = new Drawable();
		mediumwall1.x = 403;
		mediumwall1.y = 237;
		mediumwall1.z = 0;
		
		mediumwall1.image = loadImage("ld34-images/map1/mediumwall1.png");
		mediumwall1.setDrawBasedOnOrigin(mediumwall1.bottomLeft);
		addColliderToObjectBasedOnSprite(mediumwall1);
		
		this.addDrawableObject(mediumwall1);
		
		// Next, add scenery and lighting
		var lighting1 = new Drawable();
		lighting1.x = -260;
		lighting1.y = 775;
		lighting1.z = 2;
		
		lighting1.image = loadImage("ld34-images/map1/lighting1.png");
		lighting1.setDrawBasedOnOrigin(lighting1.bottomLeft);
		
		this.addDrawableObject(lighting1);
		
		var scenery1 = new Drawable();
		scenery1.x = -354;
		scenery1.y = 572;
		scenery1.z = -1;
		
		scenery1.image = loadImage("ld34-images/map1/scenery1.png");
		scenery1.setDrawBasedOnOrigin(scenery1.bottomLeft);
		
		this.addDrawableObject(scenery1);
    }
}
World.prototype = new Updateable();