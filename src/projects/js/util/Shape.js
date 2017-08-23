function Shape()
{
	this.x = 0;
	this.y = 0;
}

function Shape( x, y )
{
	this.x = x;
	this.y = y;
}
Shape.prototype.getX = function()
{
	return this.x;
}
Shape.prototype.getY = function()
{
	return this.y;
}

Shape.prototype.update = function()
{	
	this.Vx += this.Ax;
	this.Vy += this.Ay - this.g;


	this.x += this.Vx;
	this.y += this.Vy;
}
	