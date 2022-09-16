State =
{
    STAND: 0,
    WALKL: 1,
    WALKR: 2,
    STOPPER: 3/*,
    CLIMB-L: 4,
    CLIMB-R: 5,
    FALL: 6,
    DIGGER-L: 7,
    DIGGER-R: 8,
    BURROW-L: 9,
    BURROW-R: 10,
    BRIDGE-L: 11,
    BRIDGE-R: 12s*/
};

var red   = "#F00";
var blue  = "#00F";

function Lemming(x,y)
{
    //This is the data we are using
    //Generated from this: http://www.tomzweb.co.uk/wp-content/uploads/2013/10/lemming_sprites.png
    var spriteSheet = new Image();
    spriteSheet.src = "js/game/lemming.png";
    
    //Registration Point on Lemming
    this.x = x;
    this.y = y;

    //Physics Initialize
    this.Vx = 1;
    this.Vy = 0;
    this.Ax = 0;
    this.Ay = 0;
    this.g = -0.2;
    
    //Animation locations
    this.width      = 0;
    this.height     = 0;
    this.xOffset    = 0;
    this.yOffset    = 0;
    this.frames     = 0;
    this.state      = State.WALKL;
    
    //Animation Speed
    var ticks = 0;
    var ticksPerFrame = 2;
    var frame = 0;    
    var offset = 0;
    
    //collision
    var bb = new BoundingBox( this.x, this.y, this.x + this.width, this.y + this.height );
    var scanner = {
        x : bb.x,
        y : bb.y
    };
        
    
    var drawBB = true;    
    var iscolliding = false;
    
    this.getBoundingBox = function()
    {
        return bb;
    };
        
    this.updateAnimation = function( )
    {
        //We don't need to move the Sprite as often as our FPS
        ticks += 1;
        if( ticks > ticksPerFrame)
        {
            ticks = 0;
            
            //Because we just flipped the sprite layout, we need to count up for L and countdown for R
            if( this.state === State.WALKL )
            {                        
                frame += 1;
                if( frame >= this.frames )
                    frame = 0;                
            }    
            else if( this.state === State.WALKR )
            {
                frame -= 1;
                if( frame <= 0 )
                    frame = this.frames -1;
            }        

            offset = (this.xOffset +  frame * this.width);
        }
    };
    
    this.setPos = function( x, y )
    {
        this.x = x;
        this.y = y;
    };
    
    this.update = function()
    {
        this.Vx += this.Ax;
        this.Vy += this.Ay - this.g;
        
        var maxVy = 5;
        if( this.Vy > maxVy )
            this.Vy = maxVy;
        else if( this.Vy < -maxVy )
            this.Vy = -maxVy;
    
        this.x = this.x + this.Vx;
        this.y += this.Vy;
        
        bb.setSize( this.width, this.height );
        bb.moveTo( this.x, this.y );
        
        this.updateAnimation();        
    };
    
    this.bounds = [];
    
    this.checkCollissionPoint = function( imageData, pt )
    {
        var index = parseInt( ( pt.x + imageData.width * pt.y ) * 4 ) ;
        var a = 3;//index of the rgb and alpha value    
        if( imageData.data[ index + a ] === 255 )
        {
            //found something opaque
            return true;
        }
        return false;
    };
    
    this.checkCollision = function( imageData )
    {    
        var pts = [];
        iscolliding = false;
        var i = 0;
		
        //Check northern border
        for( i = 0 ; i < bb.w; i++)
            pts.push( { x: bb.x + i, y: bb.y } );
        
        //Check eastern border
        for( i = 0 ; i < bb.h; i++ )
            pts.push( { x: bb.X, y: bb.y + i } );
        
        //Check southern border
        for( i = 0 ; i < bb.w; i++ )
            pts.push( { x: bb.x + i, y: bb.Y } );
            
        //Check western border
        for( i = 0 ; i < bb.h; i++ )
            pts.push(  { x: bb.x, y: bb.y + i } );
            
        
		var ptsLen = pts.length, colPtsLen = imageData.collisionPts.length;
        for( i = 0; i < ptsLen; i++ )
        {           
            for(var j = 0; j < colPtsLen; j++ )
            {
                if( pts[i].x === imageData.collisionPts[j].x && pts[i].y === imageData.collisionPts[j].y )
                {
                    iscolliding = true;
                }
            }
        }    
    };
    
    this.draw = function( ctx )
    {
        //anchor point
        drawPoint( ctx, this.x, this.y, red );
        
        //draw sprite
        ctx.drawImage( spriteSheet, offset, this.yOffset, this.width-2, this.height, this.x, this.y, this.width-2, this.height);
        
        //draw bounding box
        if( drawBB === true)
        {
            ctx.strokeStyle = iscolliding ? red : blue;
            bb.draw( ctx );        
        }
        ctx.strokeStyle = red;
        ctx.beginPath();
		
		var boundsLen = this.bounds.length - 1;
        for( var i = 0; i < boundsLen; i++ )
        {
            ctx.moveTo( this.bounds[i].x, this.bounds[i].y );
            ctx.lineTo( this.bounds[i+1].x, this.bounds[i+1].y );
        }
        ctx.stroke();

    };
    
    function drawPoint( ctx, x, y, color )
    {
        //anchor point
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 0;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    
    
    
    this.setState = function( newState )
    {
        this.state = newState;
        switch( newState )
        {
            case State.WALKL:
                this.width      = 34;
                this.height     = 44;
                this.xOffset    = 2;
                this.yOffset    = 0;
                this.frames     = 14;
                break;
                
            case State.WALKR:
                this.width      = 34;
                this.height     = 44;
                this.xOffset    = 2;
                this.yOffset    = 46;
                this.frames     = 14;
                break;        
        }
    };
    
    this.init = function()
    {
        this.setState( State.WALKR );
        
    };
	
    this.init();
}

