var green = "#0F0";
var blue  = "#00F";
var red   = "#F00";
var white = "#FFF";

function Circle(x,y,r)
{
	this.x = x;
	this.y = y;
	this.r = r;
	this.Vx = 0;
	this.Vy = 0;
	this.Ax = 0;
	this.Ay = 0;
	this.g = -0.5;
	this.color = blue;
	
	var bb = new BoundingBox( this.x, this.y, this.x+this.r*2, this.y+this.r*2 );
	var drawBB = true;
	
	this.getBoundingBox = function()
	{
		return bb;
	};
	
	this.draw = function( g )
	{
		g.beginPath();
		g.fillStyle = this.color;
		g.arc(this.x + this.r, this.y + this.r, this.r, 0, Math.PI*2, true);
		g.closePath();
		g.fill();
		
		if( drawBB )
		{
			g.strokeStyle = red;
			bb.draw( ctx );
		}
	};
	
	this.getX = function()
	{
		return x;
	};
	
	this.getY = function()
	{
		return this.y;
	};
	
	this.update = function()
	{	
		this.Vx += this.Ax;
		this.Vy += this.Ay - this.g;
	
		this.x += this.Vx;
		this.y += this.Vy;
		
		bb.moveTo( this.x, this.y );
	};
	
	this.isPointInCircle = function( Px, Py )
	{
		var dx = Px - this.x;
		var dy = Py - this.y;
		return ( (Math.pow( dx, 2) + Math.pow(dy,2)) <= Math.pow(r,2) );
	};
	
	this.touch = function()
	{
		this.color = green;
	};
}