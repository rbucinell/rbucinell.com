function Grid(x, y,width, height, xSize, ySize)
{	
	this.rows = xSize;
	this.cols = ySize;
	
	//private methods
	this.buildGrid = function( ) 
	{
		this.squares = new Array( this.cols );
		for( var i = 0; i < this.squares.length; i++ )
		{
			this.squares[ i ] = new Array ( this.rows );
		}
		
		var sqrW = ( width / this.cols );
		var sqrH = ( height / this.rows );
		
		for( var i = 0; i < this.cols; i++ )
		{
			for( var j = 0; j < this.rows; j++ )
			{
				var loc = {r: i, c: j};
				var sqr = new GridSquare( sqrW, sqrH, (x + i*sqrW), (y + j*sqrH), this.squares, loc );
				sqr.text = i + ', ' + j;				
				this.squares[ i ][ j ] = sqr;
			}
		}
		return this.squares;
	}
	this.squares = this.buildGrid();
	
	//public method
	
	this.hitTest = function( mX, mY)
	{
		for( var j = 0; j < this.rows; j++ )
		{
			for( var i = 0; i < this.cols; i++ )
			{
				this.squares[ i ][ j ].hitTest(mX, mY);
			}
		}
	}
	
	this.reconfig = function( r, c, data )
	{
		this.rows = r;
		this.cols = c;
		this.squares = this.buildGrid();
		for( var i = 0; i < data.length; i++ )
		{
			var arr = data[i].split(',');
			data[i] = arr;
		}
		for( var j = 0; j < this.rows; j++ )
		{
			var currentRow = j;
			for( var i = 0; i < this.cols; i++ )
			{
				var livingData = (data[ currentRow ][ i ] === "1" ? true : false);
				this.squares[ i ][ j ].living = livingData;
				
			}
		}
	}
	
	/**
	* Public update method. Any logic updates will take place here
	* If an update was made, return true, otherwise false
	**/
	this.update = function()
	{
		for( var j = 0; j < this.rows; j++ )
		{
			for( var i = 0; i < this.cols; i++ )
			{
				this.squares[ i ][ j ].update();
			}
		}
		for( var j = 0; j < this.rows; j++ )
		{
			for( var i = 0; i < this.cols; i++ )
			{
				this.squares[ i ][ j ].setNextGen();
			}
		}
	}
		
	/**
	*	Draws object onto the canvas
	**/
	this.draw = function( g )
	{	
		if( this.squares )
		{
			for( var j = 0; j < this.rows; j++ )
			{
				for( var i = 0; i < this.cols; i++ )
				{
					if( this.squares[i] )
						this.squares[ i ][ j ].draw( g );
				}
			}
		}
	}
}



