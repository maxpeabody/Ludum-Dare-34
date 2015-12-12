function World(){
    this.colliders = [];
    this.drawables = [];

    this.drawAll = new function(){
        for(i=0;i<this.drawables.length;i++){
            this.drawables[i].drawImage(mainCamera);
        }
    }

    this.addDrawableObject = new function(drawable){ //adds object to draw list according to z
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

    this.buildWorld = new function(){
        var wiggles = new Animation();
        wiggles.setDrawBasedOnOrigin(wiggles.center);
        wiggles.x = 200;
        wiggles.y = 140;
        wiggles.z = 1;
        wiggles.setSheet("ld34-images/arrow_left_strip.png",32,100);

        var firstThing = new Drawable();
        firstThing.x = 200;
        firstThing.y = 200;
        firstThing.z = 0;
        firstThing.setDrawBasedOnOrigin(firstThing.bottom);
        firstThing.image = loadImage("ld34-images/testwhatsit.png");

        var secondThing = new Drawable();
        secondThing.x = 150;
        secondThing.y = 300;
        secondThing.z = 0;
        secondThing.setDrawBasedOnOrigin(secondThing.bottomLeft);
        secongThing.image = loadImage("ld34-images/testdoohickey.png");

        this.addDrawableObject(wiggles);
        this.addDrawableObject(firstThing);
        this.addDrawableObject(secondThing);
    }
}
World.prototype = new Updateable();