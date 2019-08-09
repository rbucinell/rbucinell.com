// Main TD Game Application File

function TDGame( canvas )
{
	var ctx = canvas.getContext("2d");
	//factory pattern: https://carldanley.com/js-factory-pattern/
	//inheritance: http://stackoverflow.com/questions/2064731/good-example-of-javascripts-prototype-based-inheritance
	//inheritance: http://javascript.crockford.com/inheritance.html
	//docs: https://developer.mozilla.org/en-US/
	
	var framerate     = 60;
	var intervalID    = -1;
	var isRunning     = false;
	
	var trackInterface;
	var currentTrack;
	
	
	
	var handleMouseUp = function( event )
	{
		console.log( 'game click' );
		trackInterface.handleMouseUp( event );
	}
	
	var update = function()
	{
		//Nothing to update yet
		currentTrack.update();
	}
	
	var draw = function()
	{
		/////Reset the canvas///////
        ctx.fillStyle = "#fff";
        ctx.clearRect(0,0,canvas.width,canvas.height);
		
		/////Draw objects///////////
		currentTrack.draw( ctx );
		
		/////Draw interface///////////
		trackInterface.draw( ctx );
		
	}
	
    var running = function()
    {
        if( isRunning )
        {
            update();
            draw();
        }
    }
	
	var startup = function()
	{
		console.log( 'Starting simulation' );
		currentTrack = loadTrack( track1 );
		trackInterface = new TrackInterface( currentTrack );
		currentTrack.nextWave();
	}
	
	var shutdown = function()
    {
        console.log( "Shutting down simulation" );
    }
	
	this.run = function()
    {
		startup();
        isRunning = true;
        intervalID = setInterval( running, 1000 / framerate );
    };

	
	this.stop = function()
    {
        running = false;
        clearInterval( intervalID );
        shutdown();
    };
	
	var loadTrack = function( trackJSON )
	{
		return new Track( trackJSON );
	}
	
	
	canvas.addEventListener( 'mouseup', handleMouseUp, false);
	
}



//Track 1 JSON data
var track1 = {
	"name" : "Intro Track",
	"difficulty" : "1",
	"map": {
		"atlas_map": 'js/spritesheet.png',
		"atlas_data": 'js/spritesheet.xml',
		"tile_width" : "64",
		"tile_height" : "64",
		"map_tile_width" : "12",
		"map_tile_height": "12",
		
		"base_color" : "#1A1A1A",
		"background_img" : "img/track1.png",
		"terrain" : [
			{"texture_name" : "mapTile_006.png", "x": 0, "y": 0 },
			{"texture_name" : "mapTile_007.png", "x": 0, "y": 1 },
			{"texture_name" : "mapTile_007.png", "x": 0, "y": 2 },
			{"texture_name" : "mapTile_007.png", "x": 0, "y": 3 },
			{"texture_name" : "mapTile_007.png", "x": 0, "y": 4 },
			{"texture_name" : "mapTile_007.png", "x": 0, "y": 5 },
			{"texture_name" : "mapTile_007.png", "x": 0, "y": 6 },
			{"texture_name" : "mapTile_007.png", "x": 0, "y": 7 },
			{"texture_name" : "mapTile_007.png", "x": 0, "y": 8 },
			{"texture_name" : "mapTile_007.png", "x": 0, "y": 9 },
			{"texture_name" : "mapTile_007.png", "x": 0, "y": 10 },
			{"texture_name" : "mapTile_008.png", "x": 0, "y": 11 },
			
			{"texture_name" : "mapTile_021.png", "x": 1, "y": 0 },
			{"texture_name" : "mapTile_022.png", "x": 1, "y": 1 },
			{"texture_name" : "mapTile_022.png", "x": 1, "y": 2 },
			{"texture_name" : "mapTile_022.png", "x": 1, "y": 3 },
			{"texture_name" : "mapTile_022.png", "x": 1, "y": 4 },
			{"texture_name" : "mapTile_022.png", "x": 1, "y": 5 },
			{"texture_name" : "mapTile_022.png", "x": 1, "y": 6 },
			{"texture_name" : "mapTile_022.png", "x": 1, "y": 7 },
			{"texture_name" : "mapTile_022.png", "x": 1, "y": 8 },
			{"texture_name" : "mapTile_022.png", "x": 1, "y": 9 },
			{"texture_name" : "mapTile_022.png", "x": 1, "y": 10 },
			{"texture_name" : "mapTile_023.png", "x": 1, "y": 11 },
			
			{"texture_name" : "mapTile_021.png", "x": 2, "y": 0 },
			{"texture_name" : "mapTile_022.png", "x": 2, "y": 1 },
			{"texture_name" : "mapTile_022.png", "x": 2, "y": 2 },
			{"texture_name" : "mapTile_022.png", "x": 2, "y": 3 },
			{"texture_name" : "mapTile_022.png", "x": 2, "y": 4 },
			{"texture_name" : "mapTile_022.png", "x": 2, "y": 5 },
			{"texture_name" : "mapTile_022.png", "x": 2, "y": 6 },
			{"texture_name" : "mapTile_022.png", "x": 2, "y": 7 },
			{"texture_name" : "mapTile_022.png", "x": 2, "y": 8 },
			{"texture_name" : "mapTile_022.png", "x": 2, "y": 9 },
			{"texture_name" : "mapTile_022.png", "x": 2, "y": 10 },
			{"texture_name" : "mapTile_023.png", "x": 2, "y": 11 },
			
			{"texture_name" : "mapTile_021.png", "x": 3, "y": 0 },
			{"texture_name" : "mapTile_022.png", "x": 3, "y": 1 },
			{"texture_name" : "mapTile_022.png", "x": 3, "y": 2 },
			{"texture_name" : "mapTile_022.png", "x": 3, "y": 3 },
			{"texture_name" : "mapTile_022.png", "x": 3, "y": 4 },
			{"texture_name" : "mapTile_022.png", "x": 3, "y": 5 },
			{"texture_name" : "mapTile_022.png", "x": 3, "y": 6 },
			{"texture_name" : "mapTile_022.png", "x": 3, "y": 7 },
			{"texture_name" : "mapTile_022.png", "x": 3, "y": 8 },
			{"texture_name" : "mapTile_022.png", "x": 3, "y": 9 },
			{"texture_name" : "mapTile_022.png", "x": 3, "y": 10 },
			{"texture_name" : "mapTile_023.png", "x": 3, "y": 11 },
			
			{"texture_name" : "mapTile_021.png", "x": 4, "y": 0 },
			{"texture_name" : "mapTile_022.png", "x": 4, "y": 1 },
			{"texture_name" : "mapTile_022.png", "x": 4, "y": 2 },
			{"texture_name" : "mapTile_022.png", "x": 4, "y": 3 },
			{"texture_name" : "mapTile_022.png", "x": 4, "y": 4 },
			{"texture_name" : "mapTile_022.png", "x": 4, "y": 5 },
			{"texture_name" : "mapTile_022.png", "x": 4, "y": 6 },
			{"texture_name" : "mapTile_022.png", "x": 4, "y": 7 },
			{"texture_name" : "mapTile_022.png", "x": 4, "y": 8 },
			{"texture_name" : "mapTile_022.png", "x": 4, "y": 9 },
			{"texture_name" : "mapTile_022.png", "x": 4, "y": 10 },
			{"texture_name" : "mapTile_023.png", "x": 4, "y": 11 },
			
			{"texture_name" : "mapTile_021.png", "x": 5, "y": 0 },
			{"texture_name" : "mapTile_022.png", "x": 5, "y": 1 },
			{"texture_name" : "mapTile_022.png", "x": 5, "y": 2 },
			{"texture_name" : "mapTile_022.png", "x": 5, "y": 3 },
			{"texture_name" : "mapTile_022.png", "x": 5, "y": 4 },
			{"texture_name" : "mapTile_022.png", "x": 5, "y": 5 },
			{"texture_name" : "mapTile_022.png", "x": 5, "y": 6 },
			{"texture_name" : "mapTile_022.png", "x": 5, "y": 7 },
			{"texture_name" : "mapTile_022.png", "x": 5, "y": 8 },
			{"texture_name" : "mapTile_022.png", "x": 5, "y": 9 },
			{"texture_name" : "mapTile_022.png", "x": 5, "y": 10 },
			{"texture_name" : "mapTile_023.png", "x": 5, "y": 11 },
			
			{"texture_name" : "mapTile_021.png", "x": 6, "y": 0 },
			{"texture_name" : "mapTile_022.png", "x": 6, "y": 1 },
			{"texture_name" : "mapTile_022.png", "x": 6, "y": 2 },
			{"texture_name" : "mapTile_022.png", "x": 6, "y": 3 },
			{"texture_name" : "mapTile_022.png", "x": 6, "y": 4 },
			{"texture_name" : "mapTile_022.png", "x": 6, "y": 5 },
			{"texture_name" : "mapTile_022.png", "x": 6, "y": 6 },
			{"texture_name" : "mapTile_022.png", "x": 6, "y": 7 },
			{"texture_name" : "mapTile_022.png", "x": 6, "y": 8 },
			{"texture_name" : "mapTile_022.png", "x": 6, "y": 9 },
			{"texture_name" : "mapTile_022.png", "x": 6, "y": 10 },
			{"texture_name" : "mapTile_023.png", "x": 6, "y": 11 },
			
			{"texture_name" : "mapTile_021.png", "x": 7, "y": 0 },
			{"texture_name" : "mapTile_022.png", "x": 7, "y": 1 },
			{"texture_name" : "mapTile_022.png", "x": 7, "y": 2 },
			{"texture_name" : "mapTile_022.png", "x": 7, "y": 3 },
			{"texture_name" : "mapTile_022.png", "x": 7, "y": 4 },
			{"texture_name" : "mapTile_022.png", "x": 7, "y": 5 },
			{"texture_name" : "mapTile_022.png", "x": 7, "y": 6 },
			{"texture_name" : "mapTile_022.png", "x": 7, "y": 7 },
			{"texture_name" : "mapTile_022.png", "x": 7, "y": 8 },
			{"texture_name" : "mapTile_022.png", "x": 7, "y": 9 },
			{"texture_name" : "mapTile_022.png", "x": 7, "y": 10 },
			{"texture_name" : "mapTile_023.png", "x": 7, "y": 11 },
			
			{"texture_name" : "mapTile_021.png", "x": 8, "y": 0 },
			{"texture_name" : "mapTile_022.png", "x": 8, "y": 1 },
			{"texture_name" : "mapTile_022.png", "x": 8, "y": 2 },
			{"texture_name" : "mapTile_022.png", "x": 8, "y": 3 },
			{"texture_name" : "mapTile_022.png", "x": 8, "y": 4 },
			{"texture_name" : "mapTile_022.png", "x": 8, "y": 5 },
			{"texture_name" : "mapTile_022.png", "x": 8, "y": 6 },
			{"texture_name" : "mapTile_022.png", "x": 8, "y": 7 },
			{"texture_name" : "mapTile_022.png", "x": 8, "y": 8 },
			{"texture_name" : "mapTile_022.png", "x": 8, "y": 9 },
			{"texture_name" : "mapTile_022.png", "x": 8, "y": 10 },
			{"texture_name" : "mapTile_023.png", "x": 8, "y": 11 },
			
			{"texture_name" : "mapTile_021.png", "x": 9, "y": 0 },
			{"texture_name" : "mapTile_022.png", "x": 9, "y": 1 },
			{"texture_name" : "mapTile_022.png", "x": 9, "y": 2 },
			{"texture_name" : "mapTile_022.png", "x": 9, "y": 3 },
			{"texture_name" : "mapTile_022.png", "x": 9, "y": 4 },
			{"texture_name" : "mapTile_022.png", "x": 9, "y": 5 },
			{"texture_name" : "mapTile_022.png", "x": 9, "y": 6 },
			{"texture_name" : "mapTile_022.png", "x": 9, "y": 7 },
			{"texture_name" : "mapTile_022.png", "x": 9, "y": 8 },
			{"texture_name" : "mapTile_022.png", "x": 9, "y": 9 },
			{"texture_name" : "mapTile_022.png", "x": 9, "y": 10 },
			{"texture_name" : "mapTile_023.png", "x": 9, "y": 11 },
			
			{"texture_name" : "mapTile_021.png", "x": 10, "y": 0 },
			{"texture_name" : "mapTile_022.png", "x": 10, "y": 1 },
			{"texture_name" : "mapTile_022.png", "x": 10, "y": 2 },
			{"texture_name" : "mapTile_022.png", "x": 10, "y": 3 },
			{"texture_name" : "mapTile_022.png", "x": 10, "y": 4 },
			{"texture_name" : "mapTile_022.png", "x": 10, "y": 5 },
			{"texture_name" : "mapTile_022.png", "x": 10, "y": 6 },
			{"texture_name" : "mapTile_022.png", "x": 10, "y": 7 },
			{"texture_name" : "mapTile_022.png", "x": 10, "y": 8 },
			{"texture_name" : "mapTile_022.png", "x": 10, "y": 9 },
			{"texture_name" : "mapTile_022.png", "x": 10, "y": 10 },
			{"texture_name" : "mapTile_023.png", "x": 10, "y": 11 },
			
			{"texture_name" : "mapTile_036.png", "x": 11, "y": 0 },
			{"texture_name" : "mapTile_037.png", "x": 11, "y": 1 },
			{"texture_name" : "mapTile_037.png", "x": 11, "y": 2 },
			{"texture_name" : "mapTile_037.png", "x": 11, "y": 3 },
			{"texture_name" : "mapTile_037.png", "x": 11, "y": 4 },
			{"texture_name" : "mapTile_037.png", "x": 11, "y": 5 },
			{"texture_name" : "mapTile_037.png", "x": 11, "y": 6 },
			{"texture_name" : "mapTile_037.png", "x": 11, "y": 7 },
			{"texture_name" : "mapTile_037.png", "x": 11, "y": 8 },
			{"texture_name" : "mapTile_037.png", "x": 11, "y": 9 },
			{"texture_name" : "mapTile_037.png", "x": 11, "y": 10 },
			{"texture_name" : "mapTile_038.png", "x": 11, "y": 11 },
		],
		"objects" : [
		
		],
		"path":[
			{"texture_name" : "mapTile_036.png", "x": 8, "y": 0 },
			{"texture_name" : "mapTile_036.png", "x": 8, "y": 1 },
			{"texture_name" : "mapTile_036.png", "x": 9, "y": 1 },
			{"texture_name" : "mapTile_036.png", "x": 10, "y": 1 },
			{"texture_name" : "mapTile_036.png", "x": 10, "y": 2 },
			{"texture_name" : "mapTile_036.png", "x": 10, "y": 3 },
			{"texture_name" : "mapTile_036.png", "x": 10, "y": 4 },
			{"texture_name" : "mapTile_036.png", "x": 9, "y": 4 },
			{"texture_name" : "mapTile_036.png", "x": 8, "y": 5 },
			{"texture_name" : "mapTile_036.png", "x": 8, "y": 6 },
			{"texture_name" : "mapTile_036.png", "x": 8, "y": 7 },
			{"texture_name" : "mapTile_036.png", "x": 9, "y": 7 },
			{"texture_name" : "mapTile_036.png", "x": 10, "y": 7 },
			{"texture_name" : "mapTile_036.png", "x": 10, "y": 8 },
			{"texture_name" : "mapTile_036.png", "x": 10, "y": 9 },
			{"texture_name" : "mapTile_036.png", "x": 10, "y": 10 },
			{"texture_name" : "mapTile_036.png", "x": 9, "y": 10 },
			{"texture_name" : "mapTile_036.png", "x": 8, "y": 10 },
			{"texture_name" : "mapTile_036.png", "x": 7, "y": 10 },
			{"texture_name" : "mapTile_036.png", "x": 6, "y": 10 },
			{"texture_name" : "mapTile_036.png", "x": 5, "y": 10 },
			{"texture_name" : "mapTile_036.png", "x": 4, "y": 10 },
			{"texture_name" : "mapTile_036.png", "x": 3, "y": 10 },
			{"texture_name" : "mapTile_036.png", "x": 2, "y": 10 },
			{"texture_name" : "mapTile_036.png", "x": 1, "y": 10 },
			{"texture_name" : "mapTile_036.png", "x": 1, "y": 9 },
			{"texture_name" : "mapTile_036.png", "x": 1, "y": 8 },
			{"texture_name" : "mapTile_036.png", "x": 1, "y": 7 },
			{"texture_name" : "mapTile_036.png", "x": 2, "y": 7 },
			{"texture_name" : "mapTile_036.png", "x": 3, "y": 7 },
			{"texture_name" : "mapTile_036.png", "x": 4, "y": 7 },
			{"texture_name" : "mapTile_036.png", "x": 4, "y": 6 },
			{"texture_name" : "mapTile_036.png", "x": 4, "y": 5 },
			{"texture_name" : "mapTile_036.png", "x": 4, "y": 4 },
			{"texture_name" : "mapTile_036.png", "x": 4, "y": 3 },
			{"texture_name" : "mapTile_036.png", "x": 4, "y": 2 },
			{"texture_name" : "mapTile_036.png", "x": 3, "y": 2 },
			{"texture_name" : "mapTile_036.png", "x": 2, "y": 2 },
			{"texture_name" : "mapTile_036.png", "x": 1, "y": 2 },
			{"texture_name" : "mapTile_036.png", "x": 1, "y": 3 },
			{"texture_name" : "mapTile_036.png", "x": 1, "y": 4 },
			{"texture_name" : "mapTile_036.png", "x": 0, "y": 4 },
			
			
		],
		"foregournd":[
		
		],
	},
	"path": [
		{"x": 260, "y": -30 },
		{"x": 260, "y": 60 },
		{"x": 425, "y": 60 },
		{"x": 425, "y": 182 },
		{"x": 305, "y": 182 },
		{"x": 305, "y": 300 },
		{"x": 415, "y": 300 },
		{"x": 415, "y": 430 },
		{"x": 55,  "y": 425 },
		{"x": 55,  "y": 345 },
		{"x": 210, "y": 345 },
		{"x": 210, "y": 100 },
		{"x": 95,  "y": 100 },
		{"x": 95,  "y": 225 },
		{"x": 0,   "y": 225 }
		],
	"waves":[
		{"name": "Wave 1",
		 "hint": "Stop all enemies from reaching your base!",
		 "enemies": [
				{"type": "red", "qty":  "10" }
			]
		},
		{"name": "Second Wave",
		 "hint": "Now with some variety",
		 "enemies": [
				{"type": "red", "qty":  "10" },
				{"type": "orange", "qty":  "5" }
			]
		}
	]		
}