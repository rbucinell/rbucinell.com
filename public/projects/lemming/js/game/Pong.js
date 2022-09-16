function Pong( w, h, canvas )
{
	var ctx = canvas.getContext("2d");
	
	var framerate = 60;
    var isRunning = false;
	
	var mouseX =  0;
	var mouseY =  0;
	var leftPlayerScore = 0;
	var rightPlayerScore = 0;
	var lastScored = 1;
	
	configureCanvas();
	
	//Game objects (initialized in newGame() )
	var pongBall 	= {};
	var leftPaddle 	= {};
	var rightPaddle = {};
	
	var clickEnabled = true;
	
	function configureCanvas()
	{
		canvas.style.backgroundColor = "#000";
		canvas.style.cursor = "none";
		canvas.addEventListener('mousemove', function(evt) 
		{
			var rect = canvas.getBoundingClientRect();
			var pt     =
			{
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
			};
			mouseX = pt.x;
			mouseY = pt.y;
		}, false);	

		canvas.addEventListener( 'mousedown', function(evt)
		{
			if( clickEnabled )
			{
				if( pongBall !== {} )
				{
					pongBall.Vx = 5 * lastScored;
				}
				clickEnabled = false;
			}
			
		}, false );
		
	};
	
	var newGame = function()
	{
		leftPlayerScore = 0;
		rightPlayerScore = 0;
		
		var radius = 10;
		pongBall = new Circle( w/2-radius, h/2, radius );
		pongBall.g = 0;
		pongBall.color = white;
		
		leftPaddle = new Rect( 10, 10, 10, 70 );
		leftPaddle.color = white;
		
		rightPaddle = new Rect( w-20, h/2-35, 10, 70 );
		rightPaddle.color = white;
		rightPaddle.g = 0;
		rightPaddle.Ay = 0;
	}
	
	var resetPongBall = function()
	{
		pongBall.x = w/2- pongBall.r;
		pongBall.y = h/2;
		pongBall.Vx = 0;
		pongBall.Vy = 0;
	}
	
	var drawBackground = function( g )
	{
		//Draw Scores
		ctx.fillStyle = "lightgray";
		ctx.font = "60pt Arial";
		ctx.fillText( leftPlayerScore, w/2-90, 70 );
		ctx.fillText( rightPlayerScore, w/2+40, 70 );
		
		//Draw CenterLine
		ctx.strokeStyle = "lightgray";
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo( w/2, 0 );
		ctx.lineTo( w/2, h );
		ctx.stroke();
		
	}
	var checkCollision = function()
	{
		var speed_increase = 0.3;
		var bb = pongBall.getBoundingBox();
		
		if( boxCollision(leftPaddle,bb))
		{
			pongBall.Vx = (pongBall.Vx - speed_increase )  * -1;
			(new Audio('audio/bounce.mp3')).play();
			pongBall.x++;
			alterAngle( leftPaddle, pongBall );
		}
		else if(boxCollision(rightPaddle, bb))
		{
			pongBall.Vx = (pongBall.Vx + speed_increase) * -1;
			(new Audio('audio/bounce.mp3')).play();
			pongBall.x--;
			alterAngle( rightPaddle, pongBall );
		}
		
		if( (bb.y <= 0 && bb.Vy < 0 ))
		{
			bb.Vy = Math.abs(bb.Vy);
			bb.y = 0;
		}
		if( bb.y+bb.h > h && bb.Vy > 0 )
		{
			bb.y = h - bb.h;
			bb.Vy = -1 * Math.abs(bb.Vy);
		}
	}
	
	/*
	* if the ball hits above center of paddle, the ball will richochet up,
	* and below center, down.
	*/
	var alterAngle = function( paddle, ball )
	{
		var MaxYChange = 1;
		
		var halfHeight = paddle.h / 2;
		var pYcenter   = paddle.y + halfHeight;
		var bYcenter   = ball.getBoundingBox().y + ball.getBoundingBox().h/2;

		ball.Vy = (bYcenter > pYcenter ) ? MaxYChange : -MaxYChange;
	}
	
	var boxCollision = function( p, b )
	{
		//ball is slightly above paddle
		if( (b.y <= p.y && b.y + b.h > p.y) || 
			(b.y >= p.y && b.y <= p.y + p.h) )
		{
			//ball checking against right paddle
			if( b.x < p.x)
			{
				if( b.x+b.w > p.x && b.x+b.w < p.x + p.w)
				{
					//inside right paddle
					return true;
				}
			}
			else
			{
				if( b.x > p.x && b.x < p.x + p.w)
				{
					//inside left paddle
					return true;
				}
			}
		}
		return false;
	}
	
	var AIMove = function( paddle, ball, speed )
	{
		rightY = paddle.y + paddle.h/2;
		var bb = ball.getBoundingBox();
		
		if( Math.abs( rightY - (bb.y + bb.h/2) ) < ball.r )
		{
			paddle.Vy = 0;
		}
		else
		{
			if( rightY <= (bb.y + bb.h/2) )
			{
				paddle.Vy = speed;
			}
			else
			{
				paddle.Vy = -speed;
			}
		}		
		paddle.update();
	}
	
	var update = function()
	{
		checkCollision();		
		pongBall.update();		
		AIMove( rightPaddle, pongBall, 1 );
		
		leftPaddle.y = (mouseY > h - leftPaddle.h) ? h - leftPaddle.h : mouseY;
		if( rightPaddle.y < 0 ) rightPaddle.y = 0;
		else if( rightPaddle.y + rightPaddle.h > h) rightPaddle.y = h - rightPaddle.h;
		
		if( pongBall.y < 0)
		{
			pongBall.Vy = Math.abs( pongBall.Vy );
		}
		console.log( pongBall.y, pongBall.getBoundingBox().h);
		if( (pongBall.y + pongBall.getBoundingBox().h) >= h)
		{
			console.log( "bottoming out");
			pongBall.Vy = Math.abs( pongBall.Vy ) * -1;
		}

		if( pongBall.x > w)
		{
			leftPlayerScore++;
			lastScored = -1;
			resetPongBall();
			clickEnabled = true;
		}
		if( pongBall.x < 0 )
		{
			rightPlayerScore++;
			lastScored = -1;
			resetPongBall();
			clickEnabled = true;
		}
	};
	
	var draw = function( )
	{
		//Clear for Redraw
		ctx.fillStyle = "#000";
        ctx.clearRect(0,0,w,h);
		
		drawBackground(ctx);
		leftPaddle.draw(ctx);
		rightPaddle.draw(ctx);
		pongBall.draw( ctx );
	};
	
	var gameloop = function()
	{
		if( isRunning )
		{
			update();
			draw();
		}
	}
	
	this.run = function()
    {
        newGame();
        isRunning = true;
        intervalID = setInterval( gameloop, 1000 / framerate );
    };
}