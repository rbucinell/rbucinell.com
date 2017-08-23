Rect.prototype = new Shape();
Rect.prototype.constructor = Rect;

function Rect( x, y, w, h )
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.Vx = 0;
	this.Vy = 0;
	this.Ax = 0;
	this.Ay = 0;
	this.g = -.5;
	this.color = green;
	
	this.draw = function( g )
	{
		g.fillStyle = this.color;
		g.fillRect( this.x, this.y, this.w, this.h );
	}
	
}