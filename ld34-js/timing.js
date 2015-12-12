function Timer(){
    this.startTime = (new Date()).getTime();
    this.restart = function(){
        this.startTime = (new Date()).getTime();
    };
    this.timeElapsedMillis = function(){
        return (new Date()).getTime() - this.startTime;
    };
}