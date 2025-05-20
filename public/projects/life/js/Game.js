var intervalID	= -1;
var framerate 	= 4;
var isRunning 	= false;
var canvas = document.getElementById('canvas');

function Game(w,h,g)
{	
	//public variables
	this.w	= w;
	this.h 	= h;
	this.g  = g;
	this.rows = 20;
	this.columns = 40;
	
	//private variables
	var gridOffset = 50;
	
	var grid = new Grid(0,gridOffset,this.w, this.h-gridOffset, this.rows, this.columns);//xLoc, yLoc, width, height, rows, columns
	var gameObjects = [];
	
	g.clearRect( 0, 0, w, h);
	addButtons();
	draw();	
	
	
	Game.prototype.checkMouseDown = function( mX, mY )
	{
		for( var i = 0; i < gameObjects.length; i++ )
		{
			gameObjects[ i ].hitTest( mX, mY );
		}
		grid.hitTest( mX, mY );
	}
	
	//public methods
	Game.prototype.run = function()
	{
		console.log( "starting game" );
		startup();
	}

	Game.prototype.stop = function()
	{
		console.log( "stopping game" );
		shutdown();
	}
	
	
	//private methods
	function addButtons()
	{	
		var padding = 3;
		var buttonHeight = (gridOffset - padding) / 2 - 1;
	
		var startButton = new Button( this, 0, 0, 50 , buttonHeight, '#FFFFFF', "Start" );
		startButton.isHit = function( )
		{
			game.run();
		}
		gameObjects.push( startButton );
		
		
		var stopButton = new Button( this, (startButton.x + startButton.w + padding ), 0, 50, buttonHeight, '#FFFFFF', "Stop" );
		stopButton.isHit = function( )
		{
			game.stop();
		}
		gameObjects.push( stopButton );
		
		addConfigButtons( 0, (startButton.y + buttonHeight + padding),
			[
				{ name:"Clear",   file: 'config/clear.txt',  width: 50 },
				{ name:"Stills",  file: 'config/stills.txt', width: 50 },
				{ name:"Gosper", file: 'config/gosper.txt',  width: 70 }			
			]
		);		
	}
	
	function addConfigButtons( startX, startY, buttons )
	{
		var padding = 3;
		var buttonHeight = (gridOffset - padding) / 2 - 1;
	
		for( var i = 0; i < buttons.length; i++ )
		{
			var b = new Button( this, startX, startY, buttons[i].width, buttonHeight, '#CCFFCC', buttons[i].name, buttons[i].file );
			b.isHit = function()
			{
				game.stop();
				b.loadFile(reconfigureGameBoard);
			}
			gameObjects.push( b );	
			startX = startX + buttons[i].width + padding;
		}	
	}
	
	
	function running()
	{
		if( isRunning )
		{
			update();
			draw();	
		}	
	}

	function update()
	{
		grid.update();
		for( var i = 0; i < gameObjects.length; i++ )
		{
			gameObjects[i].update();
		}
	}

	function draw()
	{
		clearScreen();
		grid.draw( g );
		for( var i = 0; i < gameObjects.length; i++ )
		{
			gameObjects[i].draw( g );
		}
	}
	
	function clearScreen()
	{
		g.fillStyle = "#fff";
		g.beginPath();
		g.clearRect(0,0,w,h);
	}

	function startup()
	{
		if( !isRunning )
		{
			isRunning = true;
			redraw = true;
			intervalID = setInterval( running, 1000/ framerate );
		}
	}

	function shutdown()
	{
		if( isRunning )
		{
			isRunning = false;
			clearInterval( intervalID );
		}
	}
	
	function reconfigureGameBoard( text )
	{
		var lines = text.split('\n');
		var dimens = lines[0].split(',');
		this.cols = parseInt(dimens[0]);
		this.rows = parseInt(dimens[1]);
		//grid = new Grid(0,gridOffset,this.w, this.h-gridOffset, this.rows, this.columns);
		grid.reconfig( this.rows, this.cols, lines.slice( 1, -1 ) );
		draw();
		
	}
	
}

function gameMouseDown( e )
{
	var mouseX, mouseY;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
	
	var rect = canvas.getBoundingClientRect();
	mouseX = e.clientX - rect.left;
	mouseY = e.clientY - rect.top;
	
	game.checkMouseDown( mouseX, mouseY );
}

function gameMouseUp ( e )
{
	var mouseX, mouseY;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
	//checkMouseUp( mouseX, mouseY );
}

function gameMouseDoubleClick ( e )
{
	console.log( 'double click');
}

Array.prototype.compact = function() {
  return this.filter(function(x) {
    return x !== null && x !== undefined;
  });
};