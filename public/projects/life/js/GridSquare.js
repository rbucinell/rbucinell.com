var black  = "#000000";
var red	   = "#FF0000";
var white  = "#FFFFFF";
var green  = "#00A300";
var yellow = "#FFFF66";
var blue   = "#0066FF";

function GridSquare( w, h, x, y, container, loc)
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = green;
	this.living = false;
	this.newColorSet = false;
	this.neighbors = [];
	this.text = "";
	this.container = container; //the grid [][] its in
	this.loc = loc; // { r, c } row & col
	this.nextGen = false;
	
	GridSquare.prototype.hitTest = function( x, y )
	{
		if( x >= this.x && x <= (this.x + this.w) && y >= this.y && y <= (this.y + this.h) )
		{
			this.living = !this.living;
			this.draw( game.g );
			return true;
		}
		return false;
		
	}
	
	this.findNeighbors = function()
	{
		return neighbors = [
				this.getNeighbor( this.loc.r, 		this.loc.c - 1 ),
				this.getNeighbor( this.loc.r + 1, 	this.loc.c - 1 ),
				this.getNeighbor( this.loc.r + 1, 	this.loc.c ),
				this.getNeighbor( this.loc.r + 1, 	this.loc.c + 1 ),
				this.getNeighbor( this.loc.r, 		this.loc.c + 1 ),
				this.getNeighbor( this.loc.r - 1, 	this.loc.c + 1 ),
				this.getNeighbor( this.loc.r - 1, 	this.loc.c),
				this.getNeighbor( this.loc.r - 1, 	this.loc.c - 1 )				
		].compact();
	}
	
	this.getNeighbor = function( row, col )
	{
		if( row < 0 || row >= this.container.length )
			return null;
		else if( col < 0 || col >= this.container[ row ].length )
			return null;
		else
			return this.container[ row ][ col ];
	}
	
	
	/**
	* Public update method. Any logic updates will take place here
	* If an update was made, return true, otherwise false
	**/
	GridSquare.prototype.update = function()
	{
		var neighbors = this.findNeighbors();
		var count = 0;
			
		if( this.living )
		{
			for( var i = 0; i < neighbors.length; i ++ )
			{
				if( neighbors[i].living )
					count++;
			}
			
			if( count === 0 || count === 1 )
			{
				this.nextGen = false;
			}
			else if( count >= 4 )
			{
				this.nextGen = false;
			}
			else
			{
				this.nextGen = true;
			}
		}
		else
		{
			for( var i = 0; i < neighbors.length; i ++ )
			{
				if( neighbors[i].living )
					count++;
			}
			if( count === 3 )
			{
				this.nextGen = true;
			}
		}
		
		//Do nothing right now
		//if updated, touch()/set needsRedraw= true;
		return this.newColorSet;
		
		
	}
	
	GridSquare.prototype.setNextGen = function()
	{
		this.living = this.nextGen;
	}
	/**
	*	Draws object onto the canvas
	**/
	GridSquare.prototype.draw = function( g )
	{
		this.color = this.living ? black : white;

	
		g.beginPath();
		g.strokeStyle = black;
		g.fillStyle = this.color;
		
		g.rect(this.x,this.y,this.w,this.h);
		g.fill();
		g.stroke();
		
		/*
		g.fillStyle = this.color === black ? white : black;
		g.fillText("("+this.text+")",this.x,this.y+10);*/
	}
};