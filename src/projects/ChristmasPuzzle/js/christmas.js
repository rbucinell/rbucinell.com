PUZZLE_SIZE = 25;
TILE_WIDTH = 24;
TILE_HEIGHT = 22;

function Point(x,y)
{
    this.X = x;
    this.Y = y;
}

function ChristmasPuzzle()
{
    this.width = 25;
    this.height = 25;
	this.mapBuilt = false;
	
    var gameDiv = document.getElementById("game");
	gameDiv.style.width = "605px"; 
	gameDiv.style.height ="565px";
	TILE_WIDTH = 604 / PUZZLE_SIZE;
	TILE_HEIGHT = 565 / PUZZLE_SIZE;
	
    var createMap = function(length) {
        var arr = new Array(length || 0),
            i = length;
        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while(i--) arr[length-1 - i] = createMap.apply(this, args);
        }
        return arr;
    }
    this.map = createMap( this.width, this.height);
	
	var createTile = function( text, x, y )
    {        
        var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        //display attributes
        rect.setAttributeNS(null,'x', x * TILE_WIDTH);
        rect.setAttributeNS(null,'y', y * TILE_HEIGHT);
        rect.setAttributeNS(null,'width',  TILE_WIDTH);
        rect.setAttributeNS(null,'height', TILE_HEIGHT);
		rect.setAttributeNS(null,'class', "tile");
		rect.locked = false;
		rect.setAs = "tile";
        //game attributes
        rect.pt = new Point( x, y);
        return rect;
    }
	this.prefill = function()
	{
		var data = [
		{ "x":3 ,"y":3 },
		{ "x":4 ,"y":3 },
		{ "x":12,"y":3 },
		{ "x":13,"y":3 },
		{ "x":21,"y":3 },
		{ "x":6 ,"y":8 },
		{ "x":7 ,"y":8 },
		{ "x":10,"y":8 },
		{ "x":14,"y":8 },
		{ "x":15,"y":8 },
		{ "x":18,"y":8 },
		{ "x":6 ,"y":16},
		{ "x":11,"y":16},
		{ "x":16,"y":16},
		{ "x":20,"y":16},
		{ "x":3 ,"y":21},
		{ "x":4 ,"y":21},
		{ "x":9 ,"y":21},
		{ "x":10,"y":21},
		{ "x":15,"y":21},
		{ "x":20,"y":21},
		{ "x":21,"y":21}];
		
		for( var i = 0; i < data.length;i++ )
		{
			this.map[ data[i].x][data[i].y].setAttributeNS(null,'class', "wall");
			this.map[ data[i].x][data[i].y].locked = true;
		}
	}
	
	this.highlight = function( tile, highlighter )
	{
		console.log( tile.pt.X, tile.pt.Y, tile.locked );
		if( highlighter)
		{
			if( !tile.locked )
			{
				tile.setAttributeNS(null,'class', "hover");
			}
		}
		else
		{
			if( tile.setAs === "tile")	
			{
				tile.setAttributeNS(null,'class', "tile");
			}
		}
	}
	
	var test = function()
	{
		console.log('test');
	}
	this.generateMap = function() 
    {
        //first create the map
        for( var y = 0; y < this.height; y++ )
        {
            for( var x = 0; x < this.width; x++)
            {
                this.map[x][y] = createTile( "wall", x, y);
                this.map[x][y].visited = false;
				this.map[x][y].addEventListener("onmouseenter", test );
				this.map[x][y].addEventListener("onmouseleave", function(){this.highlight( this.map[x][y], false );} );
				gameDiv.appendChild( this.map[x][y] );
			}
        }
		this.prefill();
    };
	this.generateMap();
	
	
}