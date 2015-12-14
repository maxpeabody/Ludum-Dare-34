function Bridgestalk()
{
    this.segmentCount = 14;
    this.segmentsExtruded = 0;
    this.z = 3;
	
	this.startGrowing(growLeft){
		// Grow (left/right)
	}
}
Bridgestalk.prototype = new Located();

function BridgeTrunk()
{
	// Trunk
}
BridgeTrunk.prototype = new Animated();
