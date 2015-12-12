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
        }else{
            return false;
        }
    }
    object.howFarToMoveToGetOut = function(o2){ //only call after you've confirmed a collision
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

    mainWorld.colliders.push(object);
}