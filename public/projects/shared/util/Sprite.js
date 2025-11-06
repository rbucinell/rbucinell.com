function Sprite( x, y, srcImg, options )
{
	var spriteSheet = new Image();
	console.log( 'sprite src=' + srcImg );
	spriteSheet.src = srcImg;
	
	this.context 	= options.context;
    this.width 		= options.width;
    this.height 	= options.height;
	this.initalOffset = options.offset;
	this.frames     = options.frames;

	
	this.x = x;
	this.y = y;

	var ticks = 0;
	var ticksPerFrame = 2;
	var frame = 0;
	
	var offset = 0;
	
	this.update = function()
	{
		//We don't need to move the Sprite as often as our FPS
		ticks += 1;
		if( ticks > ticksPerFrame)
		{		
			ticks = 0;
			frame += 1;
			if( frame >= this.frames )
				frame = 0;
			offset = (this.initalOffset +  frame * this.width);
		}		
	}
	
	this.draw = function( ctx )
	{
		//anchor point
		ctx.beginPath();
		ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'black';
		ctx.fill();
		ctx.lineWidth = 0;
		ctx.strokeStyle = '#000';
		ctx.stroke();
		
		
		ctx.drawImage( spriteSheet, offset, 0, this.width-2, this.height, this.x, this.y, this.width-2, this.height);

	}
}



