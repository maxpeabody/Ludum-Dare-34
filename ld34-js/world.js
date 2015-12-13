/* Handles scenery/non-player objects 

Coded by Benedict */

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
		var startFloor = new Drawable();
		startFloor.x = 150;
		startFloor.y = 500;
		startFloor.z = 0;
		
		startFloor.image = loadImage("ld34-images/map1/ground_start.png");
		startFloor.setDrawBasedOnOrigin(startFloor.bottomLeft);
		addColliderToObjectBasedOnSprite(startFloor);
		
		this.addDrawableObject(startFloor);
		
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
		
		// Next, add scenery objects and lighting
		var lighting1 = new Drawable();
		lighting1.x = -260;
		lighting1.y = 775;
		lighting1.z = 2;
		
		lighting1.image = loadImage("ld34-images/map1/lighting1.png");
		lighting1.setDrawBasedOnOrigin(lighting1.bottomLeft);
		
		this.addDrawableObject(lighting1);
		
		var cactus1 = new Drawable();
		cactus1.x = 252;
		cactus1.y = 428;
		cactus1.z = 1;
		
		cactus1.image = loadImage("ld34-images/scenery/tsundere.png");
		cactus1.setDrawBasedOnOrigin(cactus1.bottomLeft);
		
		this.addDrawableObject(cactus1);
		
		var grass1 = new Drawable();
		grass1.x = 106;
		grass1.y = 452;
		grass1.z = 1;
		
		grass1.image = loadImage("ld34-images/scenery/grass_patch_big.png");
		grass1.setDrawBasedOnOrigin(grass1.bottomLeft);
		
		this.addDrawableObject(grass1);
		
        /* var secondThing = new Drawable();
        secondThing.x = 150;
        secondThing.y = 400;
        secondThing.z = 0;
        secondThing.image = loadImage("ld34-images/testdoohickey.png");
        secondThing.setDrawBasedOnOrigin(secondThing.bottomLeft);
        addColliderToObject(secondThing,270,22,secondThing.origin);
        secondThing.oneWay = true;

        var secondThing2 = new Drawable();
        secondThing2.x = -110;
        secondThing2.y = 332;
        secondThing2.z = 0;
        secondThing2.image = loadImage("ld34-images/testdoohickey.png");
        secondThing2.setDrawBasedOnOrigin(secondThing2.bottomLeft);
        addColliderToObject(secondThing2,270,22,secondThing2.origin);

        var triangle = new Drawable();
        triangle.x = 160;
        triangle.y = 380;
        triangle.z = 1;
        triangle.image = loadImage("ld34-images/UGLYTESTRAMP.png");
        triangle.setDrawBasedOnOrigin(triangle.bottomLeft);
        addTriangleCollider(triangle,false,0,70,141,0,triangle.origin);

        var triangle2 = new Drawable();
        triangle2.x = 500;
        triangle2.y = 451;
        triangle2.z = 1;
        triangle2.image = loadImage("ld34-images/UGLYTESTRAMP2.png");
        triangle2.setDrawBasedOnOrigin(triangle2.bottomLeft);
        addTriangleCollider(triangle2,false,0,0,141,70,triangle2.origin);

        var triangle3 = new Drawable();
        triangle3.x = 408;
        triangle3.y = 270;
        triangle3.z = 1;
        triangle3.image = loadImage("ld34-images/UGLYTESTRAMP2.png");
        triangle3.setDrawBasedOnOrigin(triangle3.bottomLeft);
        addTriangleCollider(triangle3,false,0,0,141,70,triangle3.origin);

        var floor = new Drawable();
        floor.x = -100;
        floor.y = 450;
        floor.image = loadImage("ld34-images/big_long_floor.png");
        floor.setDrawBasedOnOrigin(floor.topLeft);
        addColliderToObjectBasedOnSprite(floor);

        this.addDrawableObject(secondThing);
        this.addDrawableObject(floor);
        this.addDrawableObject(triangle);
        this.addDrawableObject(triangle2);
        this.addDrawableObject(triangle3);
        this.addDrawableObject(secondThing2); */
    }
}
World.prototype = new Updateable();