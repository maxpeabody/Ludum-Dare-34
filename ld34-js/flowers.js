function FlowerVine(){
    this.z = 3;
    this.startGrowing = function(left){

    }
}
FlowerVine.prototype = new Located();

function Vine(){
    this.leftFacing = false;

    this.percentExtruded = 0;
    this.doneExtruding = false;
    this.setSheet("ld34-images/plants/big_long_vine.png",320,100);
    this.setDrawBasedOnOrigin(this.bottomLeft);

    this.setupLeft = function(x,dir){
        this.leftFacing = dir;
        if(dir) { //we're facing left
            this.x = x-3;
            this.setSheet("ld34-images/plants/bean_leaf_left.png", 80, 100);
            this.setDrawBasedOnOrigin(this.right);
        }else{
            this.x = x+4;
            this.setSheet("ld34-images/plants/bean_leaf_right.png", 80, 100);
            this.setDrawBasedOnOrigin(this.left);
        }
    }

    this.update = function(){
        if(!this.frozen && this.timer.timeElapsedMillis() >= this.framelength*this.slicecount){
            this.frozen = true;
            //this.setStatic("ld34-images/plants/big_long_vine.png");
            if(this.leftFacing){
                //this.setStatic("ld34-images/plants/big_long_vine_left.png");
            }
        }
    }

}
Vine.prototype = new Animation();

function Flower(){

}
Flower.prototype = new Animation();