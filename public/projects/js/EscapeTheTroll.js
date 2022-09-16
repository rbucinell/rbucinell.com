function Point(x,y)
{
    this.X = x;
    this.Y = y;
}

TileType = {
    START: 0,
    TILE: 1, 
    EXIT: 2,
    WALL: 3,
    DEFAULT: 4
}

TILE_SIZE = 20;

function EscapeTheTroll(w,h)
{
    this.width = w;
    this.height = h;
	this.mapBuilt = false;
	
    var gameDiv = document.getElementById("game");

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
    
	
	var tileClick = function( element )
	{
		if( element.TileType === TileType.TILE )
		{
			element.TileType = TileType.WALL;
		}else if( element.TileType === TileType.WALL )
		{
			element.TileType = TileType.TILE;
		}
		this.solveMze();		
	}
	
	
    var createTile = function( text, x, y )
    {        
        var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        //display attributes
        rect.setAttributeNS(null,'x', x * TILE_SIZE);
        rect.setAttributeNS(null,'y', y * TILE_SIZE);
        rect.setAttributeNS(null,'width',  TILE_SIZE);
        rect.setAttributeNS(null,'height', TILE_SIZE);
        //game attributes
        rect.TileType = TileType.DEFAULT;
        rect.pt = new Point( x, y);
        return rect;
    }

    var hasNeighborTile = function( map, cell, dirComingFrom )
    {        
        //northern
        if( cell.pt.Y - 1 > 0 && dirComingFrom !== "S") 
            if( map[cell.pt.X][cell.pt.Y-1].TileType === TileType.TILE ||
                map[cell.pt.X][cell.pt.Y-1].TileType === TileType.START )
                return true;
        //eastern
        if( cell.pt.X+1 < map.length&& dirComingFrom !== "W")
            if( map[cell.pt.X][cell.pt.Y-1].TileType === TileType.TILE ||
                map[cell.pt.X][cell.pt.Y-1].TileType === TileType.START )
                return true;
        //southern
        if( cell.pt.Y + 1 < map[0].length&& dirComingFrom !== "N")
            if( map[cell.pt.X][cell.pt.Y-1].TileType === TileType.TILE ||
                map[cell.pt.X][cell.pt.Y-1].TileType === TileType.START )
                return true;            
        //western
        if( cell.pt.X > 0 && dirComingFrom !== "E")
            if( map[cell.pt.X][cell.pt.Y-1].TileType === TileType.TILE ||
                map[cell.pt.X][cell.pt.Y-1].TileType === TileType.START )
                return true;
        return false;
            
    }
    var getNeighbors = function (map, cell) 
    {
        var neighbors = [];
        var next =  {};

        if( cell.pt.Y - 1 >= 0 )
        {
			neighbors.push( map[cell.pt.X][cell.pt.Y-1]);
        }

        if( cell.pt.X+1 < map.length)
        {
			neighbors.push(map[cell.pt.X+1][cell.pt.Y]);
        }

        if( cell.pt.Y + 1 < map[0].length)
        {
			neighbors.push(map[cell.pt.X][cell.pt.Y+1]);
        }

        if( cell.pt.X > 0)
        {
			neighbors.push(map[cell.pt.X-1][cell.pt.Y]);
        }
        shuffle( neighbors );
        for( var i = 0; i < neighbors.length; i++ )
        {
            neighbors[i].prev = cell;
        }

        return neighbors;
    }

    function shuffle(array) 
    {
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

	
    var buildMaze = function( game )
    {
        //we only want one entrance to the exit so we wall off all but one neighbour
        var exitNeighbors = getNeighbors(game.map, game.map[game.exit.X][game.exit.Y]).slice(1);
        for( var i = 0; i < exitNeighbors.length; i++)
        {
            var n = exitNeighbors[i];

            n.TileType = TileType.WALL;
            n.setAttributeNS( null, "class", "wall");
            n.visited = true; 
        }

        //DFS stack, start with the starting point
        var stack = [];
        game.map[game.start.X][game.start.Y].visited = true;
        stack.push( game.map[game.start.X][game.start.Y] );

        while( stack.length > 0 )
        {
			var curCell = stack.pop();
            var neighbors = getNeighbors( game.map, curCell);
			
            if( curCell.visited )
            {
                for( var i = 0; i < neighbors.length; i++)
                    if( !neighbors[i].visited)
                        stack.push( neighbors[i] );
            }
            else
            {
                curCell.visited = true;
				
				//stop processing if exit found
                if( curCell.TileType === TileType.EXIT )
				{
					continue;
				}

                var c = 0;
                for( var i = 0; i < neighbors.length; i++)
                    if( neighbors[i].TileType === TileType.START || 
                        neighbors[i].TileType === TileType.TILE )
                        c++;          
                if( c <= 2) //c <= 1, will only make one path, by setting it to 2, more options for A* solve later
                {
                    curCell.TileType = TileType.TILE;
                    curCell.setAttributeNS(null, 'class', 'tile');
                    
                    for( var i = 0; i < neighbors.length; i++)
                        if( !neighbors[i].visited)
                            stack.push( neighbors[i] );
                }
                else
                {
                    curCell.TileType = TileType.WALL;
                    curCell.setAttributeNS(null, 'class', 'wall');
                }
            }
        }
    }

	
	var toggleWall = function( game, tile )
	{
		if( tile.TileType === TileType.WALL )
			tile.TileType = TileType.TILE;
		else if( tile.TileType === TileType.TILE )
			tile.TileType = TileType.WALL;
		if( game.mapBuilt)
			game.solveMze();
	}
	
    this.generateMap = function( start, exit) 
    {
        //first create the map
        for( var y = 0; y < this.height; y++ )
        {
            for( var x = 0; x < this.width; x++)
            {
                this.map[x][y] = createTile( "wall", x, y);
                this.map[x][y].visited = false;
				this.map[x][y].addEventListener("click", toggleWall( this, this.map[x][y] ) );
                
				var group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
				group.appendChild(this.map[x][y]);
				gameDiv.appendChild( group );
				/*TODO: I want this
				<g>
				<rect x="160" y="240" width="20" height="20" class="closed"></rect>
				<text x="160" y="250" style="font-size:10px;">8,12</text>
				</g>
				*/
				//gameDiv.appendChild( this.map[x][y]  );
            }
        }

        this.map[start.X][start.Y].setAttributeNS(null,'class', 'start');
        this.map[start.X][start.Y].TileType = TileType.START;

        this.map[exit.X][exit.Y].setAttributeNS(null,'class', 'exit');
        this.map[exit.X][exit.Y].TileType = TileType.EXIT;

        this.start = start;
        this.exit = exit;

		this.mapBuilt = true;
        //second, create the maze
        buildMaze( this );
		
		//third, slove it (A*)
        this.solveMze();
    };

	
	var costF = function( tile, game )
	{
		var G = tile.gCost;
		var H = tile.hCost;
		
		return G + H;
	}
	
	
	//Gets the list of tiles, removes and returns the tile with the lowest F cost
	var getLowesetFCost = function( tileList, game )
	{	
		var lowestFindex = 0;
		var lowestF = costF(tileList[0],game);
		
		for( var i = 1; i < tileList.length; i++)
		{
			var tile = tileList[i];
			var cost = costF( tile, game );
			if( cost < lowestF )
			{
				lowestFindex = i;
				lowestF = cost;
			}
		}		
		return tileList.splice( lowestFindex, 1)[0];		
	}
	
	var getWakableNeighbors = function( game, tile )
	{
		var curNeighbors = getNeighbors( game.map, tile );
		var retArr = [];
		
		for( var i = 0; i < curNeighbors.length;i++)
		{
			if( curNeighbors[i].TileType !== TileType.WALL )
			{
				retArr.push( curNeighbors[i] );
			}
		}
		return retArr;
	}
	
    this.solveMze = function()
    {
		for(var i = 0; i < this.height; i++)
        {
            for( var j = 0; j< this.width; j++)
            {
                this.map[j][i].visited = false;
                this.map[j][i].prev = null;
				if( this.map[j][i].TileType !== TileType.WALL )
				{
					this.map[j][i].hCost = 10*Math.abs( this.exit.X - j ) + 10*Math.abs( this.exit.Y - i );
				}
            }   
        }
		
		
		//https://www.youtube.com/embed/KNXfSOx4eEE
		
		var openList = [];
		var closedList = [];		
		
		game.map[game.start.X][game.start.Y].gCost = 0;
		openList.push(  game.map[game.start.X][game.start.Y] );	
		
		//enter loop
		
		while( openList.length != 0 && closedList.indexOf(game.map[game.exit.X][game.exit.Y]) == -1)
		{
			var curTile = getLowesetFCost( openList, game );
			
			//don't visualy close the start and exit
			if( curTile.TileType !== TileType.START && curTile.TileType !== TileType.EXIT )
			{
				curTile.setAttributeNS( null, 'class', 'closed');
			}
			closedList.push( curTile )  ;
			
			var curNeighbors = getWakableNeighbors( game, curTile );
			
			for( var i = 0; i < curNeighbors.length;i++)
			{
				//if its in neither open nor closed list
				if( openList.indexOf(curNeighbors[i]) == -1 && closedList.indexOf( curNeighbors[i] ) == -1 )
				{
					//Calculate G-cost
					curNeighbors[i].gCost = curTile.gCost + 10; //if we supported diagonals we would determine if it is, and use 14
					curNeighbors[i].prev = curTile;
					if( curNeighbors[i].TileType !== TileType.EXIT )
						curNeighbors[i].setAttributeNS( null, 'class', 'open');
					openList.push( curNeighbors[i] );
				}
				//if this neighbor is in the open list already
				if( openList.indexOf(curNeighbors[i]) != -1 )
				{
					if( curTile.gCost + 10 <= curNeighbors[i].gCost )
					{
						curNeighbors[i].prev = curTile;
						curNeighbors[i].gCost = curTile.gCost + 10;
					}
				}
				//if in closed we ignore
			}
			var breakpoint = {};
		}
		
		/*
		for(var i = 0; i < this.height; i++)
        {
            for( var j = 0; j< this.width; j++)
            {
                if( this.map[j][i].prev !== null )
				{
					this.map[j][i].setAttributeNS( null, 'class', 'path');
				}
            }   
        }*/
			
		var counter = 100;
		var mapBack = game.map[game.exit.X][game.exit.Y];
		while( mapBack.prev !== null && mapBack.TileType !== TileType.START)
		{
			if( mapBack.TileType !== TileType.EXIT )
				mapBack.setAttributeNS( null, 'class', 'path');
			mapBack = mapBack.prev;
			if( counter-- == 0 )
				break;
		}
		return;
		/*
        //make sure map is reset on visitation
        for(var i = 0; i < this.height; i++)
        {
            for( var j = 0; j< this.width; j++)
            {
                this.map[j][i].visited = false;
                this.map[j][i].prev = null;
            }   
        }
        var exitLoc = {};
        var stack = [];
        game.map[game.start.X][game.start.Y].visited = true;
        stack.push( game.map[game.start.X][game.start.Y] );

        while( stack.length > 0 )
        {
            var cur = stack.pop();
            var neighbors = getNeighbors( this.map, cur );
            for( var i = 0; i < neighbors.length;i++)
            {
                if( neighbors.TileType !== TileType.WALL )
                {
                    neighbors[i].prev = cur;
                    if( neighbors[i].TileType === TileType.EXIT )
                    {
                        exitLoc = neighbors[i];                    
                    }
                    else
                    {
                        stack.push( neighbors[i] );
                    }
                }
            }
        }
        var prev = exitLoc.prev;
        while( prev !== null && prev.TileType !== TileType.START )
        {
            prev.setAttributeNS( null, 'class', 'path');
            prev = prev.prev;
        }
		*/
    };
	
	
}