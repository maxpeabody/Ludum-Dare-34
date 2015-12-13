/* Handles collision detection. 

Coded by Benedict. */

function addColliderToObject(object,width,height,offsetcode){
    object.cW = width;
    object.cH = height;
    object.cX = 0;
    object.cY = 0;

    object.hasCollider = true;

    var topRight = 9;
    var top = 8;
    var topLeft = 7;
    var left = 4;
    var center = 5;
    var right = 6;
    var bottomLeft = 1;
    var bottom = 2;
    var bottomRight = 3;

    if(offsetcode == topLeft){
        object.cX = 0;
        object.cY = 0;
    }else if(offsetcode == top){
        object.cX = -Math.floor(width/2);
        object.cY = 0;
    }else if(offsetcode == topRight){
        object.cX = -width;
        object.cY = 0;
    }else if(offsetcode == left){
        object.cX = 0;
        object.cY = -Math.floor(height/2);
    }else if(offsetcode == center){
        object.cX = -Math.floor(width/2);
        object.cY = -Math.floor(height/2);
    }else if(offsetcode == right){
        object.cX = -width;
        object.cY = -Math.floor(height/2);
    }else if(offsetcode == bottomLeft){
        object.cX = 0;
        object.cY = -height;
    }else if(offsetcode == bottom){
        object.cX = -Math.floor(width/2);
        object.cY = -height;
    }else{//offsetcode == var bottomRight
        object.cX = -width;
        object.cY = -height;
    }
    window.console.log("object xy: " + object.x + "," + object.y + "\n" +
                "colx: " + (object.x+object.cX) + " to " + (object.x+object.cX+object.cW) + "\n" +
                "coly: " + (object.y+object.cY) + " to " + (object.y+object.cY+object.cH) + "\n");


    object.isCollidingWith = function(o2){
        if(o2.hasCollider){
            return this.isRectangleCollidingWith(o2);
        }else if(o2.hasTriangleCollider){
            return this.isTriangleCollidingWith(o2);
        }else{
            return false;
        }
    }
    object.isRectangleCollidingWith = function(o2){
        window.console.log("are we getting in here");
        if(o2.hasCollider){
            var left1 = object.x + object.cX;
            var right1 = object.x + object.cX + object.cW
            var top1 = object.y + object.cY;
            var bottom1 = object.y + object.cY + object.cH;

            var left2 = o2.x + o2.cX;
            var right2 = o2.x + o2.cX + o2.cW
            var top2 = o2.y + o2.cY;
            var bottom2 = o2.y + o2.cY + o2.cH;

            return !(left2 > right1 ||
            right2 < left1 ||
            top2 > bottom1 ||
            bottom2 < top1);
        }
        else
            return false;
    }
    object.getFirstCollision = function(){
        for(i=0;i<mainWorld.colliders.length;i++){
            var o2 = mainWorld.colliders[i];
            if(o2 != this && this.isCollidingWith(o2)){
                return o2;
            }
        }
        return false;
    }
    object.getAllCollisions = function(){
        var cols = [];
        for(i=0;i<mainWorld.colliders.length;i++){
            var o2 = mainWorld.colliders[i];
            if(o2 != this && this.isCollidingWith(o2)){
                cols.push(o2);
            }
        }
        return cols;
    }
    object.howFarToMoveToGetOut = function(o2){ //only call after you've confirmed a collision
        if(o2.hasCollider){
            return this.rectangleHFTMTGO(o2);
        }else if(o2.hasTriangleCollider){
            return this.triangleHFTMTGO(o2);
        }
    }
    object.rectangleHFTMTGO = function(o2){
        var dirs = {left:0,right:0,up:0,down:0};

        var left1 = object.x + object.cX;
        var right1 = object.x + object.cX + object.cW
        var top1 = object.y + object.cY;
        var bottom1 = object.y + object.cY + object.cH;

        var left2 = o2.x + o2.cX;
        var right2 = o2.x + o2.cX + o2.cW
        var top2 = o2.y + o2.cY;
        var bottom2 = o2.y + o2.cY + o2.cH;

        dirs.up = bottom1 - top2;
        dirs.down = bottom2 - top1;
        dirs.left = right1-left2;
        dirs.right = right2-left1;

        return dirs;
    }
    object.isTriangleCollidingWith = function(o2){
        if(o2.hasTriangleCollider){
            var left1 = object.x + object.cX;
            var right1 = object.x + object.cX + object.cW
            var top1 = object.y + object.cY;
            var bottom1 = object.y + object.cY + object.cH;

            var left2 = o2.x + o2.tcX;
            var right2 = o2.x + o2.tcX + o2.tcW
            var top2 = o2.y + o2.tcY;
            var bottom2 = o2.y + o2.tcY + o2.tcH;

            var intersectsRectangular = !(left2 > right1 ||
                                        right2 < left1 ||
                                        top2 > bottom1 ||
                                        bottom2 < top1);

            if(intersectsRectangular){
                //points of the rectangle
                var upperLeft = {x:left1,y:top1};
                var upperRight = {x:right1,y:top1};
                var lowerLeft = {x:left1,y:bottom1};
                var lowerRight = {x:right1,y:bottom1};
                var rectPoints = [upperLeft,upperRight,lowerLeft,lowerRight];

                var lineVector = {x:o2.rightPoint.x-o2.leftPoint.x,y:o2.rightPoint.y-o2.leftPoint.y};
                for(i=0;i<rectPoints.length;i++){
                    var point = rectPoints[i];
                    var pointVector = {x:o2.rightPoint.x-point.x,y:o2.rightPoint.y-point.y};
                    var scalarCrossProd = (lineVector.x*pointVector.y) - (lineVector.y*pointVector.x);
                    if(scalarCrossProd > 0){
                        if(o2.solidAbove){
                            return true;
                        }
                    }else if(scalarCrossProd < 0){
                        if(!o2.solidAbove){
                            return true;
                        }
                    }else{
                        return true;
                    }
                }

            }
        }
        else
            return false;
    }
    object.triangleHFTMTGO = function(o2){
        var dirs = {left:0,right:0,up:0,down:0};

        var left1 = object.x + object.cX;
        var right1 = object.x + object.cX + object.cW
        var top1 = object.y + object.cY;
        var bottom1 = object.y + object.cY + object.cH;

        var left2 = o2.x + o2.tcX;
        var right2 = o2.x + o2.tcX + o2.tcW
        var top2 = o2.y + o2.tcY;
        var bottom2 = o2.y + o2.tcY + o2.tcH;

        //figure out what shape of triangle this is
        if(!o2.solidAbove){
            if(o2.leftPoint.y > o2.rightPoint.y){ //|_
                dirs.left = right1-left2;
                dirs.down = bottom2-top1;
                if(bottom1 >= bottom2){
                    dirs.right = right2-left1;
                }else{
                    var percentTowardsBottom = 1-((bottom2-bottom1)/(bottom2-top2));
                    var horizontalDistance = percentTowardsBottom*(right2-left2);
                    dirs.right = horizontalDistance-(left1-left2);
                }
                if(left1 <= left2){
                    dirs.up = bottom1-top2;
                }else{
                    var percentToTheLeft = 1-((left1-left2)/(right2-left2));
                    var verticalDistance = percentToTheLeft*(bottom2-top2);
                    dirs.up = verticalDistance-(bottom2-bottom1);
                }
            }else{ //_|

            }
        }else{
            if(o2.leftPoint.y > o2.rightPoint.y){ //7

            }else{ //P

            }
        }

        return dirs;
    }

    mainWorld.colliders.push(object);
}
function addColliderToObjectBasedOnSprite(object)
{
    if(object.animated && object.slicewidth)
        addColliderToObject(object,object.slicewidth,object.image.naturalHeight,object.origin);
    else
        addColliderToObject(object,object.image.naturalWidth,object.image.naturalHeight,object.origin);
}



function addTriangleCollider(object,above,leftX,leftY,rightX,rightY,offsetcode){
    object.tcW = rightX-leftX;
    object.tcH = Math.abs(rightY-leftY);
    object.tcX = 0;
    object.tcY = 0;
    object.leftPoint = {x:leftX,y:leftY};
    object.rightPoint = {x:rightX,y:rightY};
    if(object.leftPoint.y > object.rightPoint.y){
        if(above){
            object.thirdPoint = {x:leftX,y:rightY};
        }else{
            object.thirdPoint = {x:rightX,y:leftY};
        }
    }else{
        if(above){
            object.thirdPoint = {x:rightX,y:leftY};
        }else{
            object.thirdPoint = {x:leftX,y:rightY};
        }
    }

    object.hasTriangleCollider = true;
    object.solidAbove = above;

    var topRight = 9;
    var top = 8;
    var topLeft = 7;
    var left = 4;
    var center = 5;
    var right = 6;
    var bottomLeft = 1;
    var bottom = 2;
    var bottomRight = 3;

    if(offsetcode == topLeft){
        object.tcX = 0;
        object.tcY = 0;
    }else if(offsetcode == top){
        object.tcX = -Math.floor(object.tcW/2);
        object.tcY = 0;
    }else if(offsetcode == topRight){
        object.tcX = -object.tcW;
        object.tcY = 0;
    }else if(offsetcode == left){
        object.tcX = 0;
        object.tcY = -Math.floor(object.tcH/2);
    }else if(offsetcode == center){
        object.tcX = -Math.floor(object.tcW/2);
        object.tcY = -Math.floor(object.tcH/2);
    }else if(offsetcode == right){
        object.tcX = -object.tcW;
        object.tcY = -Math.floor(object.tcH/2);
    }else if(offsetcode == bottomLeft){
        object.tcX = 0;
        object.tcY = -object.tcH;
    }else if(offsetcode == bottom){
        object.tcX = -Math.floor(object.tcW/2);
        object.tcY = -object.tcH;
    }else{//offsetcode == var bottomRight
        object.tcX = -object.tcW;
        object.tcY = -object.tcH;
    }

    mainWorld.colliders.push(object);
}