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

    this.buildWorld = function(){
        var wiggles = new Animation();
        wiggles.x = 200;
        wiggles.y = 180;
        wiggles.z = 1;
        wiggles.setSheet("ld34-images/arrow_left_strip.png",32,100);
        wiggles.setDrawBasedOnOrigin(wiggles.center);

        var firstThing = new Drawable();
        firstThing.x = 200;
        firstThing.y = 200;
        firstThing.z = 0;
        firstThing.image = loadImage("ld34-images/testwhatsit.png");
        firstThing.setDrawBasedOnOrigin(firstThing.bottom);


        var secondThing = new Drawable();
        secondThing.x = 150;
        secondThing.y = 400;
        secondThing.z = 0;
        secondThing.image = loadImage("ld34-images/testdoohickey.png");
        secondThing.setDrawBasedOnOrigin(secondThing.bottomLeft);
        addColliderToObject(secondThing,270,23,secondThing.origin);

        var triangle = new Drawable();
        triangle.x = 160;
        triangle.y = 380;
        triangle.z = 1;
        triangle.image = loadImage("ld34-images/UGLYTESTRAMP.png");
        triangle.setDrawBasedOnOrigin(triangle.bottomLeft);
        addTriangleCollider(triangle,false,0,70,141,0,triangle.origin);

        var floor = new Drawable();
        floor.x = -100;
        floor.y = 450;
        floor.image = loadImage("ld34-images/big_long_floor.png");
        floor.setDrawBasedOnOrigin(floor.topLeft);
        addColliderToObject(floor,floor.image.naturalWidth,floor.image.naturalHeight,floor.origin);

        this.addDrawableObject(wiggles);
        this.addDrawableObject(firstThing);
        this.addDrawableObject(secondThing);
        this.addDrawableObject(floor);
        this.addDrawableObject(triangle);
    }
}
World.prototype = new Updateable();