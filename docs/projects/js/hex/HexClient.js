
function HexClient(w, h, canvas)
{
    var ctx = canvas.getContext("2d");
    //the map buffer
    var bufferCanvas = document.createElement( 'canvas' );
    bufferCanvas.width = canvas.width;
    bufferCanvas.height = canvas.height;
    var buffer = bufferCanvas.getContext('2d');
    // private vars
    var intervalID    = -1;
    var framerate     = 60;
    var isRunning     = false;
    var gameObjects = [];
    var message     = "";

    function init()
    {
        //Initialize Some data
        gameObjects.push( new Hex( new Point( 10, 10), 10 ) );
        var isOdd = false;
        for( var i = 0; i < 1451; i++ )
        {
            var prev = gameObjects[gameObjects.length-1];
            var next = new Hex( new Point( prev.center.x + prev.horiDist(), prev.center.y), prev.size );

            if( next.hex_corner(1).x >= canvas.width )
            {
                isOdd = isOdd ? false : true;
                next.center.x = isOdd ? prev.width() : prev.size;
                next.center.y = prev.center.y + prev.vertDist();

            }
            gameObjects.push( next );
        }
    }
    init();

    var update = function()
    {
        for( var i = 0; i < gameObjects.length; i++ )
        {
            gameObjects[i].update();
        }
    }

    var draw = function()
    {
        for( var i = 0; i < gameObjects.length; i++ )
        {
            gameObjects[i].draw( ctx );
        }
    }

    this.run = function()
    {
        isRunning = true;
        intervalID = setInterval( running, 1000 / framerate );
    };

    var running = function()
    {
        if( isRunning )
        {
            update();
            draw();
        }
    };

    this.stop = function()
    {
        running = false;
        clearInterval( intervalID );
    };
}
