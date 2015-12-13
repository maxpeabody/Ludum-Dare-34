/* Sets up a Test Seed object.
Seeds can be collected, dropped, and planted by the player.

Coded by Not The Author. */

function TestSeed()
{
	this.setStatic("ld34-images/arrow_idle.png");
	this.setDrawBasedOnOrigin(this.bottom);
	addColliderToObject(this,this.image.naturalWidth,this.image.naturalHeight,this.origin);
}
TestSeed.prototype = new Seed();
