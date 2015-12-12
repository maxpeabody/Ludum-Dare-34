function PlayerCamera(){

    this.givePlayer = function(newplayer){
        this.player = newplayer;
        this.x = this.player.x - (this.width/2);
        this.y = this.player.y - (this.height/2);
    }
    this.update = function(){
        this.x = this.player.x - (this.width/2);
        this.y = this.player.y - (this.height/2);
    }
}
PlayerCamera.prototype = new Camera();