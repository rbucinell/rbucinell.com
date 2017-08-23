ButtonState = 
{
	DEFAULT: "default",
	HOVER: "hover",
	DOWN: "DOWN"
};

function Button(x, y, w, h, fill, text )
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.fill = fill;
	this.text = text;
	this.State = ButtonState.DEFAULT;
	
	this.update = function( )
	{
		//todo
	}
	
	this.draw = function( g ) 
	{
		g.beginPath();
		g.strokeStyle = "#000000";
		g.fillStyle = this.fill;
		
		g.rect(this.x,this.y,this.w,this.h);
		g.fill();
		g.stroke();
		
		g.fillStyle = "#000000";
		g.fillText(this.text, this.x+(this.w/4), this.y+(this.h* 3/4 ) );
	}
	
	this.hitTest = function( x, y )
	{
		return x >= this.x && x <= (this.x + this.w) && y >= this.y && y <= (this.y + this.h);
	}
	
	function mousedown( event )
	{
		
	}
	function mouseover( event )
	{
		
	}
	
	function mouseout( event )
	{
		
	}
	
}

Button.prototype.handleMouseUp = function( event )
{
	if( this.hitTest(event.x, event.y) )
	{
		this.State = ButtonState.HOVER;
	}
	else
	{
		this.State = ButtonState.DEFAULT;
	}
	console.log( "button clicked" );
}

