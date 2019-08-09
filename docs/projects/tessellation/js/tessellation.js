function Tesselation( canvas )
{
	var ctx = canvas.getContext("2d");
	var framerate     = 60;
	var intervalID    = -1;
	var isRunning     = false;
	
	var t1 = new Triangle( 
		{ x:10,  y:10 },
		{ x:100, y:30 },
		{ x:10,  y:50 } );
		
	var button = new Button();
	button.initialize( canvas.width-150, 20, 50, 20, 'test' );
	
	var update = function()
	{
		//Nothing to update yet
	}
	
	var draw = function()
	{
		/////Reset the canvas///////
        ctx.fillStyle = "#fff";
        ctx.clearRect(0,0,canvas.width,canvas.height);
		
		/////Draw objects///////////
		t1.draw( ctx );
		button.draw( ctx );
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
}