var blue  = "#00F";
var red   = "#F00";


function Game(w, h, canvas)
{
    var ctx = canvas.getContext("2d");

    //the map buffer
    var bufferCanvas = document.createElement( 'canvas' );
    bufferCanvas.width = canvas.width;
    bufferCanvas.height = canvas.height;
    var buffer = bufferCanvas.getContext('2d');

    //private vars
    var intervalID    = -1;
    var framerate     = 60;
    var isRunning     = false;
    var gameObjects = [];
    var message     = "";


    var lemming = new Lemming(100, 150 );

    //to be displayed in order
    var layers = { background: new Image(), map: new Image(), actors : [] };
    var imageData = [];

    //public vars
    this.score = 0;
    this.maxscore = 0;
    this.w    = w;
    this.h     = h;
    this.mouseX = 0;
    this.mouseY = 0;
    var mousePos = { x: 0, y: 0 };

    var update = function()
    {
        layers.map.data = imageData;
        for( var i = 0; i < layers.actors.length; i++ )
        {
            var obj = layers.actors[i];
            obj.update();
            if( obj instanceof Lemming )
                obj.checkCollision( imageData );

            if( obj instanceof Circle )
                checkScreenCollision( obj );
        }
        lemming.update();
        if( lemming.y >= 175 )
            lemming.setPos( lemming.x, 175);
        //lemming.setPos( mousePos.x, mousePos.y );
        lemming.checkCollision( imageData );
        //removePixels( { x: lemming.x + lemming.w, y: lemming.y } );


    };

    var draw = function()
    {
        ///////////////////////////////Reset the ctx////////////////////////////////////

        ctx.fillStyle = "#fff";
        ctx.clearRect(0,0,w,h);

        /////////////////////////////Draw the scene/////////////////////////////////////

        //Redraw each layer
        ctx.drawImage( layers.background, 0, 0 );
        ctx.drawImage( layers.map, 0, 0 );


        if( imageData === [] )
        {
            imageData = ctx.getImageData(0,0,w,h).data;
            console.log( 'imageData was empty');
        }


        //draw all the lemmings
        for( var i = 0; i < layers.actors.length; i++ )
        {
            layers.actors[i].draw(ctx);
        }
        lemming.draw(ctx);

        ////////////////////////////////////DEBUG DRAWING//////////////////////////////
        //Draw the collision points in blue
        ctx.fillStyle = blue;
        for( i = 0; i < imageData.collisionPts.length; i++ )
        {
            ctx.fillRect( imageData.collisionPts[i].x, imageData.collisionPts[i].y, 1, 1);
        }

        //Write where the mouse is
        writeMessage();
    };

    var checkCollissionPoint = function( imgData, pt )
    {
        var r = 0, g = 1, b = 2, a = 3; //index of the rgb and alpha value
        var index = parseInt( ( pt.x + imgData.width * pt.y ) * 4 ) ;
        if( imgData.data[ index + a ] === 255 )
            return true;
        return false;
    };

    var setCollisionPoints = function()
    {
        imageData.collisionPts = [];
        for( var x = 0; x < imageData.width; x++)
        {
            for( var y = 0; y < imageData.height; y++ )
            {
                var curpt = {x:x, y:y};
                if( checkCollissionPoint( imageData, curpt ))
                {
                    var above = checkCollissionPoint( imageData, { x:curpt.x,     y:curpt.y-1 } );
                    var right = checkCollissionPoint( imageData, { x:curpt.x+1, y:curpt.y   } );
                    var below = checkCollissionPoint( imageData, { x:curpt.x,     y:curpt.y+1 } );
                    var left  = checkCollissionPoint( imageData, { x:curpt.x-1, y:curpt.y   } );

                    //If the pixel is completely surrounded, then we don't need to check against it
                    if( !(above && right && below && left ) )
                    {
                        imageData.collisionPts.push( {x:x, y:y} );
                    }

                }
            }
        }
    };

    this.loadLevel = function( levelName, bgImgData, collisionMapImgData, initialActors )
    {
        layers.background = bgImgData;
        layers.map = collisionMapImgData;
        layers.actors = initialActors;

        ctx.drawImage( collisionMapImgData, 0, 0 );
        imageData = ctx.getImageData(0,0,w,h);
        setCollisionPoints();
    };

    this.data = function()
    {
        return imageData;
    };

    this.run = function()
    {
        startup();
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

    var checkScreenCollision = function( object )
    {
        if(    object.x > w || object.x < 0)
        {
            object.Vx = object.Vx * -1;
        }

        if(    object.y > h || object.y < 0)
        {
            object.Vy = object.Vy * -1;
        }
    };

    var checkMouseCollision = function( ball )
    {
        if( ball.isPointInCircle( this.mouseX, this.mouseY ) )
        {
            maxscore = score;
            score = 0;
            ball.touch();
        }
    };

    var writeMessage = function()
    {
        ctx.font = '18pt Calibri';
        ctx.fillStyle = 'black';
        ctx.fillText(message, 10, 25);
    };

    this.stop = function()
    {
        running = false;
        clearInterval( intervalID );
        shutdown();
    };

    var startup = function()
    {
        var score = 0;
        var maxscore = 0;
    };

    var shutdown = function()
    {
        console.log( "shutdown called" );
    };

    function getMousePos(canvas, evt)
    {
        var rect = canvas.getBoundingClientRect();
        var pt     =
        {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
        return pt;
    }

    canvas.addEventListener('mousedown', function(evt) {
        var mousePos = getMousePos(canvas, evt );
            // Handle different event models
        evt = evt || window.event;
        var btnCode;

        if ('object' === typeof evt) {
            btnCode = evt.button;
            switch (btnCode) {
                case 0:
                    console.log( 'Left Button Clicked' );
                    removePixels( mousePos );
                break;
                case 1:
                    console.log( 'Middle Button Clicked' );
                break;
                case 2:
                    console.log( 'Right Button Clicked' );
                    addPixels( mousePos );
                break;
                default:
                    alert('Unexpected code: ' + btnCode);
            }
        }

    }, false);

    canvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(canvas, evt);
        message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        this.mouseX = mousePos.x;
        this.mouseY = mousePos.y;
    }, false);

    function removePixels( pt )
    {
        //create a new buffer
        buffer.clearRect(0,0,w,h);

        //The circle we intend to cut out
        var c = { x: pt.x, y: pt.y, r:20 };

        //Put the current imageData onto the temporary buffer
        buffer.putImageData( imageData, 0,0 );

        //This will clip out the boundaries in a circle
        buffer.beginPath();
        buffer.arc(c.x, c.y, c.r, 0, 2 * Math.PI, false);
        buffer.closePath();
        buffer.globalCompositeOperation = 'destination-out';
        buffer.fill();
        buffer.globalCompositeOperation = 'source-over'; // reset composite mode to default

        //Put the modified buffer back into our image data
        imageData = buffer.getImageData(0,0,w,h);

        //update the collision points to use
        setCollisionPoints();

        layers.map.src = bufferCanvas.toDataURL("img/png");

        //buffer.clearRect(0,0,w,h);
        //buffer.drawImage( layers.map, 0, 0 );

        /*
        //First lets get the bounding square's image data
        buffer.clearRect(0,0,w,h);
        var c = new Circle( pt.x , pt.y, 20 );
        c.draw( buffer );
        var circBB = c.getBoundingBox();
        var circleImage = buffer.getImageData(circBB.x, circBB.y, circBB.X - circBB.x, circBB.Y - circBB.y );

        buffer.clearRect(0,0,w,h);
        buffer.drawImage( layers.map, 0, 0 );
        var mapImageData = buffer.getImageData(circBB.x, circBB.y, circBB.X - circBB.x, circBB.Y - circBB.y );

        //Manipulate the current section
        for( var i = 0; i < circleImage.data.length; i+= 4 )
        {
            //Index of RGBA
            var r = i + 0, g = i+ 1, b = i + 2, a = i + 3;
            //console.log( "["+i+"] R:" + circleImage.data[r] + " G:" + circleImage.data[g] + " B:" + circleImage.data[b] + " A:" + circleImage.data[a] );
            if( circleImage.data[a] === 0 || (mapImageData.data[r] === 255 && mapImageData.data[g] === 0 && mapImageData.data[b] === 0 ))
                continue; //Nothing to draw, or #F00 can't be overwritten

            //our destructable terrain is going to be great for the sake of simplicity
            mapImageData[r] = 0;
            mapImageData[g] = 255;
            mapImageData[b] = 0;
            mapImageData[a] = 255;
        }*/


    }

    function addPixels( pt )
    {

    }
 }
