/* Handles scenery/non-player objects 

Coded by Benedict; map 1 set up by Max */

function World(){
    this.colliders = [];
    this.drawables = [];
    this.updateables = [];
    this.seeds = [];

	this.worldBuilt = false;

	this.lightingInFront = true;

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
		if(this.worldBuilt){
			window.console.log("world's built already!");
			return;
		}
		// "GROUND FLOOR"
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
		bigwall1.x = -258;
		bigwall1.y = 500;
		bigwall1.z = 0;
		
		bigwall1.image = loadImage("ld34-images/map1/bigwall1.png");
		bigwall1.setDrawBasedOnOrigin(bigwall1.bottomLeft);
		addColliderToObjectBasedOnSprite(bigwall1);
		
		this.addDrawableObject(bigwall1);
		
		// "SECOND FLOOR"
		var tallwall2_chunk1 = new Drawable();
		tallwall2_chunk1.x = 31;
		tallwall2_chunk1.y = 381;
		tallwall2_chunk1.z = 0;
		
		tallwall2_chunk1.image = loadImage("ld34-images/map1/tallwall2_chunk1.png");
		tallwall2_chunk1.setDrawBasedOnOrigin(tallwall2_chunk1.bottomLeft);
		addColliderToObjectBasedOnSprite(tallwall2_chunk1);
		
		this.addDrawableObject(tallwall2_chunk1);
		
		var tallwall2_chunk2 = new Drawable();
		tallwall2_chunk2.x = 54;
		tallwall2_chunk2.y = 344;
		tallwall2_chunk2.z = 0;
		
		tallwall2_chunk2.image = loadImage("ld34-images/map1/tallwall2_chunk2.png");
		tallwall2_chunk2.setDrawBasedOnOrigin(tallwall2_chunk2.bottomLeft);
		addColliderToObjectBasedOnSprite(tallwall2_chunk2);
		
		this.addDrawableObject(tallwall2_chunk2);
		
		var tallwall2_chunk3 = new Drawable();
		tallwall2_chunk3.x = 66;
		tallwall2_chunk3.y = 296;
		tallwall2_chunk3.z = 0;
		
		tallwall2_chunk3.image = loadImage("ld34-images/map1/tallwall2_chunk3.png");
		tallwall2_chunk3.setDrawBasedOnOrigin(tallwall2_chunk3.bottomLeft);
		addColliderToObjectBasedOnSprite(tallwall2_chunk3);
		
		this.addDrawableObject(tallwall2_chunk3);
		
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
		bridge2.y = 285;
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
		bigwall2.x = 268;
		bigwall2.y = 332;
		bigwall2.z = 0;
		
		bigwall2.image = loadImage("ld34-images/map1/bigwall2.png");
		bigwall2.setDrawBasedOnOrigin(bigwall2.bottomLeft);
		addColliderToObjectBasedOnSprite(bigwall2);
		
		this.addDrawableObject(bigwall2);
		
		var mediumwall1 = new Drawable();
		mediumwall1.x = 364;
		mediumwall1.y = 237;
		mediumwall1.z = 0;
		
		mediumwall1.image = loadImage("ld34-images/map1/mediumwall1.png");
		mediumwall1.setDrawBasedOnOrigin(mediumwall1.bottomLeft);
		addColliderToObjectBasedOnSprite(mediumwall1);
		
		this.addDrawableObject(mediumwall1);
		
		// "THIRD FLOOR"
		var overhang1 = new Drawable();
		overhang1.x = 78;
		overhang1.y = 236;
		overhang1.z = 0;
		
		overhang1.image = loadImage("ld34-images/map1/overhang1.png");
		overhang1.setDrawBasedOnOrigin(overhang1.bottomLeft);
		addColliderToObjectBasedOnSprite(overhang1);
		
		overhang1.oneWay = true;
		
		this.addDrawableObject(overhang1);
		
		var overhang2 = new Drawable();
		overhang2.x = 168;
		overhang2.y = 236;
		overhang2.z = 0;
		
		overhang2.image = loadImage("ld34-images/map1/overhang2.png");
		overhang2.setDrawBasedOnOrigin(overhang2.bottomLeft);
		addColliderToObjectBasedOnSprite(overhang2);
		
		overhang2.oneWay = true;
		
		this.addDrawableObject(overhang2);
		
		var small_ceiling1 = new Drawable();
		small_ceiling1.x = 201;
		small_ceiling1.y = 242;
		small_ceiling1.z = 0;
		
		small_ceiling1.image = loadImage("ld34-images/map1/small_ceiling1.png");
		small_ceiling1.setDrawBasedOnOrigin(small_ceiling1.bottomLeft);
		addColliderToObjectBasedOnSprite(small_ceiling1);
		
		this.addDrawableObject(small_ceiling1);

		var ramp_grassy1 = new Drawable();
		ramp_grassy1.x = 199;
		ramp_grassy1.y = 213;
		ramp_grassy1.z = 0;
		
		ramp_grassy1.image = loadImage("ld34-images/map1/ramp_grassy1.png");
		ramp_grassy1.setDrawBasedOnOrigin(ramp_grassy1.bottomLeft);
		addTriangleCollider(ramp_grassy1, false, 0, 0, 47, 24, ramp_grassy1.origin);
		
		this.addDrawableObject(ramp_grassy1);
		
		var bigwall3 = new Drawable();
		bigwall3.x = 268;
		bigwall3.y = 140;
		bigwall3.z = 0;
		
		bigwall3.image = loadImage("ld34-images/map1/bigwall3.png");
		bigwall3.setDrawBasedOnOrigin(bigwall3.bottomLeft);
		addColliderToObjectBasedOnSprite(bigwall3);
		
		this.addDrawableObject(bigwall3);
		
		var overhang3 = new Drawable();
		overhang3.x = 198;
		overhang3.y = 138;
		overhang3.z = 0;
		
		overhang3.image = loadImage("ld34-images/map1/overhang3.png");
		overhang3.setDrawBasedOnOrigin(overhang3.bottomLeft);
		addColliderToObjectBasedOnSprite(overhang3);
		
		// overhang3.oneWay = true;
		
		this.addDrawableObject(overhang3);
		
		var mediumwall2 = new Drawable();
		mediumwall2.x = -185;
		mediumwall2.y = 260;
		mediumwall2.z = 0;
		
		mediumwall2.image = loadImage("ld34-images/map1/mediumwall2.png");
		mediumwall2.setDrawBasedOnOrigin(mediumwall2.bottomLeft);
		addColliderToObjectBasedOnSprite(mediumwall2);
		
		this.addDrawableObject(mediumwall2);
		
		var mediumwall3 = new Drawable();
		mediumwall3.x = -185;
		mediumwall3.y = 212;
		mediumwall3.z = 0;
		
		mediumwall3.image = loadImage("ld34-images/map1/mediumwall3.png");
		mediumwall3.setDrawBasedOnOrigin(mediumwall3.bottomLeft);
		addColliderToObjectBasedOnSprite(mediumwall3);
		
		this.addDrawableObject(mediumwall3);
		
		var tinywall1 = new Drawable();
		tinywall1.x = -89;
		tinywall1.y = 212;
		tinywall1.z = 0;
		
		tinywall1.image = loadImage("ld34-images/map1/tinywall1.png");
		tinywall1.setDrawBasedOnOrigin(tinywall1.bottomLeft);
		addColliderToObjectBasedOnSprite(tinywall1);
		
		this.addDrawableObject(tinywall1);
		
		var bridge3 = new Drawable();
		bridge3.x = -42;
		bridge3.y = 102;
		bridge3.z = 0;
		
		bridge3.image = loadImage("ld34-images/map1/bridge3.png");
		bridge3.setDrawBasedOnOrigin(bridge3.bottomLeft);
		addColliderToObjectBasedOnSprite(bridge3);
		
		bridge3.oneWay = true;
		
		this.addDrawableObject(bridge3);
		
		var landbridge1 = new Drawable();
		landbridge1.x = -212;
		landbridge1.y = 117;
		landbridge1.z = 0;
		
		landbridge1.image = loadImage("ld34-images/map1/landbridge1.png");
		landbridge1.setDrawBasedOnOrigin(landbridge1.bottomLeft);
		addColliderToObjectBasedOnSprite(landbridge1);
		
		this.addDrawableObject(landbridge1);
		
		// Floating platforms
		var island1 = new Drawable();
		island1.x = -17;
		island1.y = 152;
		island1.z = 0;
		
		island1.image = loadImage("ld34-images/generic/island_medium1.png");
		island1.setDrawBasedOnOrigin(island1.bottomLeft);
		addColliderToObjectBasedOnSprite(island1);
		
		island1.oneWay = true;
		
		this.addDrawableObject(island1);
		
		var island2 = new Drawable();
		island2.x = 90;
		island2.y = 176;
		island2.z = 0;
		
		island2.image = loadImage("ld34-images/generic/island_small.png");
		island2.setDrawBasedOnOrigin(island2.bottomLeft);
		addColliderToObjectBasedOnSprite(island2);
		
		island2.oneWay = true;
		
		this.addDrawableObject(island2);
		
		var island3 = new Drawable();
		island3.x = 144;
		island3.y = 140;
		island3.z = 0;
		
		island3.image = loadImage("ld34-images/generic/island_medium2.png");
		island3.setDrawBasedOnOrigin(island3.bottomLeft);
		addColliderToObjectBasedOnSprite(island3);
		
		island3.oneWay = true;
		
		this.addDrawableObject(island3);
		
		// Scenery and lighting
		var lighting1 = new Drawable();
		lighting1.x = -260;
		lighting1.y = 775;
		lighting1.z = 2;
		
		lighting1.image = loadImage("ld34-images/map1/lighting1.png");
		lighting1.setDrawBasedOnOrigin(lighting1.bottomLeft);

		if(this.lightingInFront){
			lighting = lighting1;
		}else {
			this.addDrawableObject(lighting1);
		}

		var testSeed = new TestSeed();
		testSeed.x = 320;
		testSeed.y = 395;
		testSeed.trigger = true;
		this.addDrawableObject(testSeed);

		var scenery1 = new Drawable();
		scenery1.x = -354;
		scenery1.y = 572;
		scenery1.z = -1;
		
		scenery1.image = loadImage("ld34-images/map1/scenery1.png");
		scenery1.setDrawBasedOnOrigin(scenery1.bottomLeft);
		
		this.addDrawableObject(scenery1);

		this.worldBuilt = true;
    }
}
World.prototype = new Updateable();