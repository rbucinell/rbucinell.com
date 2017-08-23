function Button()
{
	this.x = 0; 
	this.y = 0;
	this.width = 100;
	this.height = 20;
	this.text = "button";
	this.foreground = "#000000";
	this.background = "#FFFFFF";
	this.border     = "#000000";
}

Button.prototype.initialize = function( x, y, w, h, text )
{
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.text = text;
}

Button.prototype.setWidth = function( w )
{
	this.width = w;
}

Button.prototype.setHeight = function( h )
{
	this.width = h;
}

Button.prototype.setFillColor = function( color )
{
	this.background = color;
}

Button.prototype.setTextColor = function( color )
{
	this.foreground = color;
}

Button.prototype.update = function()
{
	//Currently unused
}

Button.prototype.draw = function( ctx )
{
	ctx.beginPath();
	ctx.strokeStyle = this.foreground;
	ctx.fillStyle = this.background;
	
	ctx.rect( this.x, this.y, this.width, this.height );
	ctx.fill();
	ctx.stroke();
	
	ctx.fillStyle = this.foreground;
	ctx.fillText(this.text, this.x+(this.width/4), this.y+(this.height* 3/4 ) );
}