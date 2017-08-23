function Button( game,  x, y, w, h, fill, text, config )
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.fill = fill;
	this.text = text;
	this.game = game;
	this.configFile = (config ? config : "");
	
	this.isHit = function()
	{
		//purposely blank
	}	
	this.update = function( )
	{
		//todo
	}
	
	this.draw = function( g ) 
	{
		g.beginPath();
		g.strokeStyle = black;
		g.fillStyle = this.fill;
		
		g.rect(this.x,this.y,this.w,this.h);
		g.fill();
		g.stroke();
		
		g.fillStyle = black;
		g.fillText(this.text, this.x+(this.w/4), this.y+(this.h* 3/4 ) );
	}
	
	this.hitTest = function( x, y )
	{
		if( x >= this.x && x <= (this.x + this.w) && y >= this.y && y <= (this.y + this.h) )
		{
			this.isHit();
		}
	}
	
	this.loadFile = function( callback )
	{
		console.log( 'this.configFile: ' + this.configFile );
		console.log( 'config: ' + config );
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.onload = function( )
		{
			callback( xhr.responseText );
		}
		xhr.open("GET", config);
		xhr.send();
	}
}