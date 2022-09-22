var red   = "#FF0000";
var green = "#00FF00";
var blue  = "#0000FF";
var white = "#FFFFFF";
var black = "#000000";

function Triangle( p1, p2, p3)
{
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;
	this.color = green;
}

Triangle.prototype.setColor = function( color )
{
	this.color = color;
};

Triangle.prototype.draw = function( ctx )
{
	//draw fill
	ctx.fillStyle = this.color;
	ctx.lineWidth = 1;
	ctx.strokeStyle = black;	
	ctx.beginPath();
	ctx.moveTo( this.p1.x, this.p1.y );
	ctx.lineTo( this.p2.x, this.p2.y );
	ctx.lineTo( this.p3.x, this.p3.y );
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	
	
	
};

Triangle.prototype.update = function()
{
	//Currently unused
}