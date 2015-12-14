/* Handles scenery/non-player objects 

Coded by Benedict; Map set up by Max */

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

	this.removeObjectFromAllLists = function(object){
		var idx = this.colliders.indexOf(object);
		if(idx != -1){
			this.colliders.splice(idx,1);
		}
		idx = this.drawables.indexOf(object);
		if(idx != -1){
			this.drawables.splice(idx,1);
		}
		idx = this.updateables.indexOf(object);
		if(idx != -1){
			this.updateables.splice(idx,1);
		}
		idx = this.seeds.indexOf(object);
		if(idx != -1){
			this.seeds.splice(idx,1);
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
		var startFloor = new Drawable(); // this, as the name implies, is where the player starts
		startFloor.x = 150;
		startFloor.y = 500;
		startFloor.z = 0;
		
		startFloor.image = loadImage("ld34-images/map1/ground_start.png");
		startFloor.setDrawBasedOnOrigin(startFloor.bottomLeft);
		addColliderToObjectBasedOnSprite(startFloor);
		
		this.addDrawableObject(startFloor);
		
		/* Walls to prevent the player going out of bounds and seeing the cracks.
		
		We might want to cut this at some point? Depends how we feel about the overall layout, I guess... */
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
		bridge1.y = 364;
		bridge1.z = 0;
		
		bridge1.image = loadImage("ld34-images/map1/bridge1.png");
		bridge1.setDrawBasedOnOrigin(bridge1.bottomLeft);
		addColliderToObjectBasedOnSprite(bridge1);
		
		bridge1.oneWay = true;
		
		this.addDrawableObject(bridge1);
		
		// Cut this bridge so the player has to use the seed to progress.
		/* var bridge2 = new Drawable();
		bridge2.x = 77;
		bridge2.y = 285;
		bridge2.z = 0;
		
		bridge2.image = loadImage("ld34-images/map1/bridge2.png");
		bridge2.setDrawBasedOnOrigin(bridge2.bottomLeft);
		addColliderToObjectBasedOnSprite(bridge2);
		
		bridge2.oneWay = true;
		
		this.addDrawableObject(bridge2); */
		
		var floor1 = new Drawable();
		floor1.x = 162;
		floor1.y = 355;
		floor1.z = 0;
		
		floor1.image = loadImage("ld34-images/map1/ground1.png");
		floor1.setDrawBasedOnOrigin(floor1.bottomLeft);
		addColliderToObjectBasedOnSprite(floor1);
		
		this.addDrawableObject(floor1);
		
		var ceiling1 = new Drawable();
		ceiling1.x = 194;
		ceiling1.y = 354;
		ceiling1.z = 0;
		
		// We'll place this one's origin at the top left to give the player a little leeway - it's a very low ceiling!
		ceiling1.image = loadImage("ld34-images/map1/ceiling1.png");
		ceiling1.setDrawBasedOnOrigin(ceiling1.topLeft);
		addColliderToObject(ceiling1, 72, 23, ceiling1.topLeft);
		
		this.addDrawableObject(ceiling1);
		
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
		
		ramp_grassy1.image = loadImage("ld34-images/map1/ramp_grassy2.png"); // Don't ask.
		ramp_grassy1.setDrawBasedOnOrigin(ramp_grassy1.bottomLeft);
		addTriangleCollider(ramp_grassy1, false, 0, 0, 69, 36, ramp_grassy1.origin);
		
		this.addDrawableObject(ramp_grassy1);
		
		var smallwall3 = new Drawable();
		smallwall3.x = 245;
		smallwall3.y = 261;
		smallwall3.z = 0;
		
		smallwall3.image = loadImage("ld34-images/map1/smallwall3.png");
		smallwall3.setDrawBasedOnOrigin(smallwall3.bottomLeft);
		addColliderToObjectBasedOnSprite(smallwall3);
		
		this.addDrawableObject(smallwall3);
		
		var bigwall3 = new Drawable();
		bigwall3.x = 268;
		bigwall3.y = 140;
		bigwall3.z = 0;
		
		bigwall3.image = loadImage("ld34-images/map1/bigwall3.png");
		bigwall3.setDrawBasedOnOrigin(bigwall3.bottomLeft);
		addColliderToObjectBasedOnSprite(bigwall3);
		
		this.addDrawableObject(bigwall3);
		
		var overhang4 = new Drawable();
		overhang4.x = 182;
		overhang4.y = 115;
		overhang4.z = 0;
		
		overhang4.image = loadImage("ld34-images/map1/overhang4.png");
		overhang4.setDrawBasedOnOrigin(overhang4.bottomLeft);
		addColliderToObjectBasedOnSprite(overhang4);
		
		overhang4.oneWay = true;
		
		this.addDrawableObject(overhang4);
		
		var overhang5 = new Drawable();
		overhang5.x = -62;
		overhang5.y = 104;
		overhang5.z = 0;
		
		overhang5.image = loadImage("ld34-images/map1/overhang5.png");
		overhang5.setDrawBasedOnOrigin(overhang5.bottomLeft);
		//addColliderToObjectBasedOnSprite(overhang5);
		
		//overhang5.oneWay = true;
		
		this.addDrawableObject(overhang5);
		
		var overhang_thick1 = new Drawable();
		overhang_thick1.x = 217;
		overhang_thick1.y = 128;
		overhang_thick1.z = 0;
		
		overhang_thick1.image = loadImage("ld34-images/map1/overhang_thick1.png");
		overhang_thick1.setDrawBasedOnOrigin(overhang_thick1.bottomLeft);
		addColliderToObjectBasedOnSprite(overhang_thick1);
		
		this.addDrawableObject(overhang_thick1);
		
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
		
		var ramp_grassy3 = new Drawable();
		ramp_grassy3.x = -90;
		ramp_grassy3.y = 193;
		ramp_grassy3.z = 0;
		
		ramp_grassy3.image = loadImage("ld34-images/map1/ramp_grassy3.png");
		ramp_grassy3.setDrawBasedOnOrigin(ramp_grassy3.bottomLeft);
		addTriangleCollider(ramp_grassy3, false, 0, 23, 45, 0, ramp_grassy3.origin);
		
		this.addDrawableObject(ramp_grassy3);
		
		/*var block_grassy1 = new Drawable();
		block_grassy1.x = -89;
		block_grassy1.y = 191;
		block_grassy1.z = 0;
		
		block_grassy1.image = loadImage("ld34-images/map1/block_grassy1.png");
		block_grassy1.setDrawBasedOnOrigin(block_grassy1.bottomLeft);
		addColliderToObjectBasedOnSprite(block_grassy1);
		
		this.addDrawableObject(block_grassy1);*/
		
		var bridge3 = new Drawable();
		bridge3.x = -50;
		bridge3.y = 115;
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
		
		var ramp_grassy2 = new Drawable();
		ramp_grassy2.x = -225;
		ramp_grassy2.y = 92;
		ramp_grassy2.z = 0;
		
		ramp_grassy2.image = loadImage("ld34-images/map1/ramp_grassy2.png");
		ramp_grassy2.setDrawBasedOnOrigin(ramp_grassy2.bottomLeft);
		addTriangleCollider(ramp_grassy2, false, 0, 0, 69, 36, ramp_grassy2.origin);
		
		this.addDrawableObject(ramp_grassy2);
		
		var overhang6 = new Drawable();
		overhang6.x = -235;
		overhang6.y = 107;
		overhang6.z = 0;
		
		overhang6.image = loadImage("ld34-images/map1/overhang6.png");
		overhang6.setDrawBasedOnOrigin(overhang6.bottomLeft);
		addColliderToObjectBasedOnSprite(overhang6);
		
		overhang6.oneWay = true;
		
		this.addDrawableObject(overhang6);
		
		var overhang7 = new Drawable();
		overhang7.x = -232;
		overhang7.y = 215;
		overhang7.z = 0;
		
		overhang7.image = loadImage("ld34-images/map1/overhang7.png");
		overhang7.setDrawBasedOnOrigin(overhang7.bottomLeft);
		addColliderToObjectBasedOnSprite(overhang7);
		
		overhang7.oneWay = true;
		
		this.addDrawableObject(overhang7);
		
		var block_jutting1 = new Drawable();
		block_jutting1.x = -318;
		block_jutting1.y = 332;
		block_jutting1.z = 0;
		
		block_jutting1.image = loadImage("ld34-images/map1/block_jutting1.png");
		block_jutting1.setDrawBasedOnOrigin(block_jutting1.bottomLeft);
		addColliderToObjectBasedOnSprite(block_jutting1);
		
		this.addDrawableObject(block_jutting1);
		
		var overhang_thick2 = new Drawable();
		overhang_thick2.x = -342;
		overhang_thick2.y = 288;
		overhang_thick2.z = 0;
		
		overhang_thick2.image = loadImage("ld34-images/map1/overhang_thick2.png");
		overhang_thick2.setDrawBasedOnOrigin(overhang_thick2.bottomLeft);
		addColliderToObjectBasedOnSprite(overhang_thick2);
		
		this.addDrawableObject(overhang_thick2);
		
		var block_smallsandy1 = new Drawable();
		block_smallsandy1.x = -291;
		block_smallsandy1.y = 260;
		block_smallsandy1.z = 0;
		
		block_smallsandy1.image = loadImage("ld34-images/map1/block_smallsandy1.png");
		block_smallsandy1.setDrawBasedOnOrigin(block_smallsandy1.bottomLeft);
		addColliderToObjectBasedOnSprite(block_smallsandy1);
		
		this.addDrawableObject(block_smallsandy1);
		
		var ramp_tinysandy1 = new Drawable();
		ramp_tinysandy1.x = -156;
		ramp_tinysandy1.y = 68;
		ramp_tinysandy1.z = 0;
		
		ramp_tinysandy1.image = loadImage("ld34-images/map1/ramp_tinysandy1.png");
		ramp_tinysandy1.setDrawBasedOnOrigin(ramp_tinysandy1.bottomLeft);
		addTriangleCollider(ramp_tinysandy1, false, 0, 12, 23, 0, ramp_tinysandy1.origin);
		
		this.addDrawableObject(ramp_tinysandy1);
		
		/*var ramp_sandy1 = new Drawable();
		ramp_sandy1.x = -110;
		ramp_sandy1.y = 94;
		ramp_sandy1.z = 0;
		
		ramp_sandy1.image = loadImage("ld34-images/map1/ramp_sandy1.png");
		ramp_sandy1.setDrawBasedOnOrigin(ramp_sandy1.bottomLeft);
		addTriangleCollider(ramp_sandy1, false, 0, 24, 47, 0, ramp_sandy1.origin);
		
		this.addDrawableObject(ramp_sandy1);*/
		
		var block_sandy1 = new Drawable();
		block_sandy1.x = -156;
		block_sandy1.y = 92;
		block_sandy1.z = 0;
		
		block_sandy1.image = loadImage("ld34-images/map1/block_sandy1.png");
		block_sandy1.setDrawBasedOnOrigin(block_sandy1.bottomLeft);
		addColliderToObjectBasedOnSprite(block_sandy1);
		
		this.addDrawableObject(block_sandy1);
		
		var smallwall1 = new Drawable();
		smallwall1.x = -268;
		smallwall1.y = 260;
		smallwall1.z = 0;
		
		smallwall1.image = loadImage("ld34-images/map1/smallwall1.png");
		smallwall1.setDrawBasedOnOrigin(smallwall1.bottomLeft);
		addColliderToObjectBasedOnSprite(smallwall1);
		
		this.addDrawableObject(smallwall1);
		
		var smallwall2 = new Drawable();
		smallwall2.x = 245;
		smallwall2.y = -15;
		smallwall2.z = 0;
		
		smallwall2.image = loadImage("ld34-images/map1/smallwall2.png");
		smallwall2.setDrawBasedOnOrigin(smallwall2.bottomLeft);
		addColliderToObjectBasedOnSprite(smallwall2);
		
		this.addDrawableObject(smallwall2);
		
		// To the right
		var overhang3 = new Drawable();
		overhang3.x = 173;
		overhang3.y = -50;
		overhang3.z = 0;
		
		overhang3.image = loadImage("ld34-images/map1/overhang3.png");
		overhang3.setDrawBasedOnOrigin(overhang3.bottomLeft);
		addColliderToObjectBasedOnSprite(overhang3);
		
		overhang3.oneWay = true;
		
		this.addDrawableObject(overhang3);
		
		var ramp_sandy2 = new Drawable();
		ramp_sandy2.x = 271;
		ramp_sandy2.y = -75;
		ramp_sandy2.z = 0;
		
		ramp_sandy2.image = loadImage("ld34-images/map1/ramp_sandy2.png");
		ramp_sandy2.setDrawBasedOnOrigin(ramp_sandy2.bottomLeft);
		addTriangleCollider(ramp_sandy2, false, 0, 0, 47, 25, ramp_sandy2.origin);
		
		this.addDrawableObject(ramp_sandy2);
		
		var block_tinysandy1 = new Drawable();
		block_tinysandy1.x = 318;
		block_tinysandy1.y = -90;
		block_tinysandy1.z = 0;
		
		block_tinysandy1.image = loadImage("ld34-images/map1/block_tinysandy1.png");
		block_tinysandy1.setDrawBasedOnOrigin(block_tinysandy1.bottomLeft);
		addColliderToObjectBasedOnSprite(block_tinysandy1);
		
		this.addDrawableObject(block_tinysandy1);
		
		/*var ramp_tinysandy1_inst2 = new Drawable();
		ramp_tinysandy1_inst2.x = 330;
		ramp_tinysandy1_inst2.y = -89;
		ramp_tinysandy1_inst2.z = 0;
		
		ramp_tinysandy1_inst2.image = loadImage("ld34-images/map1/ramp_tinysandy1.png");
		ramp_tinysandy1_inst2.setDrawBasedOnOrigin(ramp_tinysandy1_inst2.bottomLeft);
		addTriangleCollider(ramp_tinysandy1_inst2, false, 0, 12, 23, 0, ramp_tinysandy1_inst2.origin);
		
		this.addDrawableObject(ramp_tinysandy1_inst2);*/
		
		var notchedwall1 = new Drawable();
		notchedwall1.x = 318;
		notchedwall1.y = -7;
		notchedwall1.z = 0;
		
		notchedwall1.image = loadImage("ld34-images/map1/notchedwall1.png");
		notchedwall1.setDrawBasedOnOrigin(notchedwall1.bottomLeft);
		addColliderToObjectBasedOnSprite(notchedwall1);
		
		this.addDrawableObject(notchedwall1);
		
		var overhang_double1 = new Drawable();
		overhang_double1.x = 354;
		overhang_double1.y = -18;
		overhang_double1.z = 0;
		
		overhang_double1.image = loadImage("ld34-images/map1/overhang_double1.png");
		overhang_double1.setDrawBasedOnOrigin(overhang_double1.bottomLeft);
		addColliderToObjectBasedOnSprite(overhang_double1);
		
		this.addDrawableObject(overhang_double1);
		
		// Floating platforms
		var island1 = new Drawable();
		island1.x = -17;
		island1.y = 154;
		island1.z = 0;
		
		island1.image = loadImage("ld34-images/generic/island_medium1.png");
		island1.setDrawBasedOnOrigin(island1.bottomLeft);
		addColliderToObjectBasedOnSprite(island1);
		
		island1.oneWay = true;
		
		this.addDrawableObject(island1);
		
		var island2 = new Drawable();
		island2.x = 45;
		island2.y = 176;
		island2.z = 0;
		
		island2.image = loadImage("ld34-images/generic/island_small.png");
		island2.setDrawBasedOnOrigin(island2.bottomLeft);
		addColliderToObjectBasedOnSprite(island2);
		
		island2.oneWay = true;
		
		this.addDrawableObject(island2);
		
		var island3 = new Drawable();
		island3.x = 138;
		island3.y = 161;
		island3.z = -2;
		
		island3.image = loadImage("ld34-images/generic/island_medium2.png");
		island3.setDrawBasedOnOrigin(island3.bottomLeft);
		addColliderToObjectBasedOnSprite(island3);
		
		island3.oneWay = true;
		
		this.addDrawableObject(island3);
		
		var island4 = new Drawable();
		island4.x = 118;
		island4.y = 30;
		island4.z = 0;
		
		island4.image = loadImage("ld34-images/generic/island_large1.png");
		island4.setDrawBasedOnOrigin(island4.bottomLeft);
		addColliderToObjectBasedOnSprite(island4);
		
		island4.oneWay = true;
		
		this.addDrawableObject(island4);
		
		/* var ramp_tinygrassy1 = new Drawable();
		ramp_tinygrassy1.x = 119;
		ramp_tinygrassy1.y = 6;
		ramp_tinygrassy1.z = 0;
		
		ramp_tinygrassy1.image = loadImage("ld34-images/map1/ramp_tinygrassy1.png");
		ramp_tinygrassy1.setDrawBasedOnOrigin(ramp_tinygrassy1.bottomLeft);
		addTriangleCollider(ramp_tinygrassy1, false, 0, 0, 18, 12, ramp_tinygrassy1.origin);
		
		this.addDrawableObject(ramp_tinygrassy1);
		
		var block_sandy1 = new Drawable();
		block_sandy1.x = 137;
		block_sandy1.y = 6;
		block_sandy1.z = 0;
		
		block_sandy1.image = loadImage("ld34-images/map1/block_sandy1.png");
		block_sandy1.setDrawBasedOnOrigin(block_sandy1.bottomLeft);
		addColliderToObjectBasedOnSprite(block_sandy1);
		
		this.addDrawableObject(block_sandy1);
		
		var ramp_tinysandy2 = new Drawable();
		ramp_tinysandy2.x = 153;
		ramp_tinysandy2.y = 6;
		ramp_tinysandy2.z = 0;
		
		ramp_tinysandy2.image = loadImage("ld34-images/map1/ramp_tinysandy2.png");
		ramp_tinysandy2.setDrawBasedOnOrigin(ramp_tinysandy2.bottomLeft);
		addTriangleCollider(ramp_tinysandy2, false, 0, 12, 19, 0, ramp_tinysandy2.origin);
		
		this.addDrawableObject(ramp_tinysandy2); */
		
		var island5 = new Drawable();
		island5.x = -340;
		island5.y = 140;
		island5.z = 0;
		
		island5.image = loadImage("ld34-images/generic/island_medium1.png");
		island5.setDrawBasedOnOrigin(island5.bottomLeft);
		addColliderToObjectBasedOnSprite(island5);
		
		island5.oneWay = true;
		
		this.addDrawableObject(island5);
		
		var island6 = new Drawable();
		island6.x = 423;
		island6.y = 56;
		island6.z = -2;
		
		island6.image = loadImage("ld34-images/generic/island_medium1.png");
		island6.setDrawBasedOnOrigin(island6.bottomLeft);
		addColliderToObjectBasedOnSprite(island6);
		
		island6.oneWay = true;
		
		this.addDrawableObject(island6);
		
		var island7 = new Drawable();
		island7.x = 379;
		island7.y = 92;
		island7.z = -2;
		
		island7.image = loadImage("ld34-images/generic/island_medium2.png");
		island7.setDrawBasedOnOrigin(island7.bottomLeft);
		addColliderToObjectBasedOnSprite(island7);
		
		island7.oneWay = true;
		
		this.addDrawableObject(island7);
		
		var island8 = new Drawable();
		island8.x = 381;
		island8.y = 5;
		island8.z = -2;
		
		island8.image = loadImage("ld34-images/generic/island_small.png");
		island8.setDrawBasedOnOrigin(island8.bottomLeft);
		addColliderToObjectBasedOnSprite(island8);
		
		island8.oneWay = true;
		
		this.addDrawableObject(island8);
		
		var easterisland = new Drawable();
		easterisland.x = -203;
		easterisland.y = 385;
		easterisland.z = -1;
		
		easterisland.image = loadImage("ld34-images/generic/island_mysterious.png");
		easterisland.setDrawBasedOnOrigin(easterisland.bottomLeft);
		addColliderToObjectBasedOnSprite(easterisland);
		
		easterisland.oneWay = true;
		
		this.addDrawableObject(easterisland);
		
		// Seeds and any other interactables
		var flowerSeed = new FlowerSeed(-30, 100);
		this.addDrawableObject(flowerSeed);
		
		var stalkSeed = new StalkSeed(60, 468);
		this.addDrawableObject(stalkSeed);

		/* var testStalk = new Beanstalk();
		testStalk.x = 50;
		testStalk.y = 97;
		testStalk.startGrowing(); */
		
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

		var scenery1 = new Drawable();
		scenery1.x = -354;
		scenery1.y = 572;
		scenery1.z = -1;
		
		scenery1.image = loadImage("ld34-images/map1/scenery1.png");
		scenery1.setDrawBasedOnOrigin(scenery1.bottomLeft);
		
		this.addDrawableObject(scenery1);
		
		var sceneryfg1 = new Drawable();
		sceneryfg1.x = -354;
		sceneryfg1.y = 572;
		sceneryfg1.z = 5;
		
		sceneryfg1.image = loadImage("ld34-images/map1/sceneryfg1.png");
		sceneryfg1.setDrawBasedOnOrigin(sceneryfg1.bottomLeft);
		
		this.addDrawableObject(sceneryfg1);

		this.worldBuilt = true;
    }
}
World.prototype = new Updateable();