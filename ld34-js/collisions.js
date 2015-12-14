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
    if(object.colliderIsBasedOnSprite){
        object.cY += 1;
        object.cH -= 1;
    }
    /* window.console.log("object xy: " + object.x + "," + object.y + "\n" +
                "colx: " + (object.x+object.cX) + " to " + (object.x+object.cX+object.cW) + "\n" +
                "coly: " + (object.y+object.cY) + " to " + (object.y+object.cY+object.cH) + "\n"); */


    object.isCollidingWith = function(o2){
        if(o2.hasCollider){
            return this.isRectangleCollidingWith(o2);
        }else if(o2.hasTriangleCollider){
            return this.isTriangleCollidingWith(o2);
        }else{
            return false;
        }
    }
    object.getSeedCollisions = function(){
        var seedcols = [];
        for(seedColCounter=0;seedColCounter<mainWorld.seeds.length;seedColCounter++){
            var o2 = mainWorld.seeds[seedColCounter];
            var isColl = this.isCollidingWith(o2);
            window.console.log("pcol: " + this.cW + "w" + this.cH + "h " + this.cX + "," +this.cY);
            window.console.log("seedcol: " + o2.cW + "w" + o2.cH + "h " + o2.cX + "," +o2.cY);
            window.console.log(isColl + " that it's colliding with player");
            if(o2 != this && o2 != this.heldSeed && this.isCollidingWith(o2)){
                seedcols.push(o2);
            }
        }
        return seedcols;
    }
    object.isRectangleCollidingWith = function(o2){
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
    object.getFirstNontriggerCollision = function(){
        for(firstColCounter=0;firstColCounter<mainWorld.colliders.length;firstColCounter++){
            var o2 = mainWorld.colliders[firstColCounter];
            if(o2 != this && !o2.trigger && this.isCollidingWith(o2)){
                return o2;
            }
        }
        return false;
    }
    object.getAllCollisions = function(){
        var cols = [];
        for(allColCounter=0;allColCounter<mainWorld.colliders.length;allColCounter++){
            var o2 = mainWorld.colliders[allColCounter];
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

        dirs.up = bottom1 - top2 + 1;
        dirs.down = bottom2 - top1 + 1;
        dirs.left = right1-left2 + 1;
        dirs.right = right2-left1 + 1;

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

                for(intersectionCounter=0;intersectionCounter<rectPoints.length;intersectionCounter++){
                    var rpoint = rectPoints[intersectionCounter];
                    if(o2.pointIsInTriangle(rpoint))
                        return true;
                }
                //we've checked if the rectangle has points in triangle- now vice versa
                if(o2.leftPoint.x >= left1 && o2.leftPoint.x <= right1
                        &&o2.leftPoint.y >= top1 && o2.leftPoint.y <= bottom1){
                    return true;
                }else if(o2.rightPoint.x >= left1 && o2.rightPoint.x <= right1
                        &&o2.rightPoint.y >= top1 && o2.rightPoint.y <= bottom1) {
                    return true;
                }else{
                    return false;
                }

            }else{
                return false;
            }
        }else
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
            if(o2.leftPoint.y > o2.rightPoint.y){ //L
                dirs.left = right1-left2 + 1;
                dirs.down = bottom2-top1 + 1;
                if(bottom1 >= bottom2){
                    dirs.right = right2-left + 11;
                }else{
                    var percentTowardsBottom = 1-((bottom2-bottom1)/(bottom2-top2));
                    var horizontalDistance = percentTowardsBottom*(right2-left2);
                    dirs.right = horizontalDistance-(left1-left2);
                }
                if(left1 <= left2){
                    dirs.up = bottom1-top2 + 1;
                }else{
                    var percentToTheLeft = 1-((left1-left2)/(right2-left2));
                    var verticalDistance = percentToTheLeft*(bottom2-top2);
                    dirs.up = verticalDistance-(bottom2-bottom1);
                }
            }else{ //J
                dirs.right = right2-left1 + 1;
                dirs.down = bottom2-top1 + 1;
                if(bottom1 >= bottom2){
                    dirs.left = right1-left2 + 1;
                }else{
                    var percentTowardsBottom = 1-((bottom2-bottom1)/(bottom2-top2));
                    var horizontalDistance = percentTowardsBottom*(right2-left2);
                    dirs.left = horizontalDistance-(right2-right1);
                }
                if(right1 >= right2){
                    dirs.up = bottom1-top2 + 1;
                }else{
                    var percentToTheRight = 1-((right2-right1)/(right2-left2));
                    var verticalDistance = percentToTheRight*(bottom2-top2);
                    dirs.up = verticalDistance-(bottom2-bottom1);
                }
            }
        }else{
            if(o2.leftPoint.y > o2.rightPoint.y){ //7
                dirs.right = right2-left1 + 1;
                dirs.up = bottom1-top2 + 1;
                if(top1 <= top2){
                    dirs.left = right1-left2 + 1;
                }else{
                    var percentTowardsTop = (bottom2-top1)/(bottom2-top2);
                    var horizontalDistance = percentTowardsTop*(right2-left2);
                    dirs.left = horizontalDistance-(right2-right1);
                }
                if(right1 >= right2){
                    dirs.down = bottom1-top2 + 1;
                }else{
                    var percentToTheLeft = (right2-left1)/(right2-left2);
                    var verticalDistance = percentToTheLeft*(bottom2-top2);
                    dirs.down = verticalDistance-(top1-top2);
                }
            }else{ //P
                dirs.left = right1-left2 + 1;
                dirs.up = bottom1-top2 + 1;
                if(top1 <= top2){
                    dirs.right = right2-left1 + 1;
                }else{
                    var percentTowardsTop = (bottom2-top1)/(bottom2-top2);
                    var horizontalDistance = percentTowardsTop*(right2-left2);
                    dirs.right = horizontalDistance-(left2-left1);
                }
                if(left1 <= left2){
                    dirs.down = bottom1-top2 + 1;
                }else{
                    var percentToTheRight = (left1-right2)/(right2-left2);
                    var verticalDistance = percentToTheRight*(bottom2-top2);
                    dirs.down = verticalDistance-(top1-top2);
                }
            }
        }

        return dirs;
    }

    object.smallestCollisionEscapeLRUD = function(directions){
        var dirsArray = [directions.left,directions.right,directions.up,directions.down];
        var best = 2; //if for some asinine reason everything's negative, pick directions.up
        var shortestDist = directions.left;
        var distString = "distances: ";
        for(smallColCount=0;smallColCount<dirsArray.length;smallColCount++){
            var shortDist = dirsArray[smallColCount];
            distString += "(" + smallColCount + ")" + shortDist + ", ";
            if(shortDist > 0 && shortDist <= shortestDist){
                shortestDist = shortDist;
                best = smallColCount;
                // window.console.log("new best is: " + best);
            }
        }
        // window.console.log(distString);
        // window.console.log("shortest distance: " + shortestDist + " on " + best);
        return best;
    }

    mainWorld.colliders.push(object);
}
function addColliderToObjectBasedOnSprite(object)
{
    object.colliderIsBasedOnSprite = true;
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

    object.leftPoint = {x:object.x+leftX+object.tcX,y:object.y+leftY+object.tcY};
    object.rightPoint = {x:object.x+rightX+object.tcX,y:object.y+rightY+object.tcY};
    if(object.leftPoint.y > object.rightPoint.y){
        if(!above){
            object.thirdPoint = {x:object.x+leftX+object.tcX,y:object.y+rightY+object.tcY};
            object.shape = "L";
        }else{
            object.thirdPoint = {x:object.x+rightX+object.tcX,y:object.y+leftY+object.tcY};
            object.shape = "7";
        }
    }else{
        if(!above){
            object.thirdPoint = {x:object.x+rightX+object.tcX,y:object.y+leftY+object.tcY};
            object.shape = "J";
        }else{
            object.thirdPoint = {x:object.x+leftX+object.tcX,y:object.y+rightY+object.tcY};
            object.shape = "P";
        }
    }

    object.pointIsInTriangle = function(point){
        //window.console.log(point.x + "," + point.y);
        var tLeft2 = this.x + this.tcX;
        var tRight2 = this.x + this.tcX + this.tcW
        var tTop2 = this.y + this.tcY;
        var tBottom2 = this.y + this.tcY + this.tcH;
        //window.console.log("bottom left corner: " + tLeft2 + "," + tBottom2);

        if(point.x < tLeft2 || point.x > tRight2 || point.y < tTop2 || point.y > tBottom2){
            return false; //this point isn't in the rectangle even
        }


        if(!this.solidAbove){
            var rightness = (1-((tBottom2-point.y)/(this.tcH)))*this.tcW;
            if(this.leftPoint.y > this.rightPoint.y){ //L
                return (this.x+rightness) > point.x;
            }else{ //J
                return (this.x+this.tcW-rightness) < point.x;
            }
        }else{
            var rightness = (1-((point.y-tBottom2)/(this.tcH)))*this.tcW;
            if(this.leftPoint.y > this.rightPoint.y){ //7
                return (this.x+this.tcW-rightness) < point.x;
            }else{ //P
                return (this.x+rightness) > point.x;
            }
        }

    }

    mainWorld.colliders.push(object);
}