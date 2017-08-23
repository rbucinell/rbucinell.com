function BoundingBox( x,y,X,Y )
{
	this.x = x;
	this.y = y;
	this.X = X;
	this.Y = Y;
	this.w = this.X - this.x;
	this.h = this.Y - this.y;
	
	this.setSize = function( w, h )
	{
		this.w = w;
		this.h = h;
		this.X = this.x + w;
		this.Y = this.y + h;
	}
	
	this.moveTo = function( x, y )
	{
		this.x = x;
		this.y = y;
		this.X = x + this.w;
		this.Y = y + this.h;
	}
	
	this.cotains = function( pt )
	{
		if( pt.x >= this.x && pt.x <= this.X && pt.y >= this.y && pt.y <= this.Y)
			return true;
		return false;
	}
	
	this.aabb = function( b )
	{
		if( this.x < b.x + b.w && this.x + this.w > b.w && this.y < b.y + b.h && this.y + this.h > b.y)
			return true;
		return false;
	}
	
	this.draw = function( ctx )
	{
		ctx.beginPath();
		ctx.rect( this.x, this.y, this.w, this.h);
		ctx.stroke();	
	}
}