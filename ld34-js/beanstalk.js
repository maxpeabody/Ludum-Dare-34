function Beanstalk(){
    this.segmentCount = 6;
    this.segmentsExtruded = 0;
    this.z = 3;

    this.segments = [];

    this.update()
}
Beanstalk.prototype = new Located();

function BeanTrunk(){
    this.percentExtruded = 0;

}
BeanTrunk.prototype = new Drawable()
function BeanLeaf(){

}
BeanLeaf.prototype = new Animation();