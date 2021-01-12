//GLOBAL VARIABLES


//Class public vars
const ERROR_RATE = 0.5;
const DEBUG_MODE = false;

class Quadrants
{
	constructor( canvas )
	{
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.bufferCanvas = document.createElement('canvas');
		this.buffer = this.bufferCanvas.getContext('2d');

		// Member variables
		this.intervalID	= -1;
		this.framerate 	= 20; //60
		this.isRunning 	= false;
		this.boxes = [];
		this.root;
		this.drawNode;
		this.hist;
		this.previousError = -1;
		this.error = 0;
		this.errorSum;

		this.ITERATIONS = 1024;
		this.MAX_DEPTH = 8;
	}

	initialize( img )
	{
		//Draw original image to get image data
		this.ctx.drawImage( img, 0, 0, img.naturalWidth, img.natualHeight, 0, 0, this.canvas.width, this.canvas.height);
		//g_imageData = this.ctx.getImageData(0,0, this.canvas.width, this.canvas.height);
		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height);

		//Create the starting root node
		this.root = new Box( img, {},  0, 0, this.canvas.width, this.canvas.height, 0, this.MAX_DEPTH );
		this.errorSum = this.root.error * this.root.area();

		//Initial Draw
		this.drawNode = this.root;
		this.boxes.push( this.root );
		this.draw();
	}

	get IsRunning()
	{
		return this.isRunning;
	}

	set IsRunning( val )
	{
		this.isRunning = val;
	}

	play()
	{
		this.isRunning = true;
		this.intervalID = setInterval( this.running.bind(this), 1000/ this.framerate );
	}

	step()
	{
		this.isRunning = true;
		if ( this.ITERATIONS <= 0  )
		{
			this.ITERATIONS = 1;
		}
		this.running();
	}

	stop()
	{
		clearInterval(this.intervalID);
		this.isRunning = false;
	}

	running()
	{
		if( this.IsRunning && this.ITERATIONS > 0 )
		{
			this.update();
			this.draw();
		}
	}

	/**
	*	A compareTo function to sort Box's by their error
	**/
	errorCompareTo( a, b )
	{
		if( a.score < b.score )
		{
			return -1;
		}
		if( a.score > b.score)
		{
			return 1;
		}
		return 0;
	}

	/**
	*	Game loop update function
	**/
	update()
	{
		let index =  -1;
		let largestError = 0;

		this.error = this.averageErrorOfQuad( this.drawNode, this.errorSum );

		if( this.previousError == -1 || this.previousError - this.error > ERROR_RATE )
			this.previousError = this.error;

		let leaves = this.root.getAllLeafNodes( [], this.MAX_DEPTH );
		leaves.sort( this.errorCompareTo );
		let last = leaves[0];// leaves[leaves.length-1];
		if( last.error > 0 )
		{
			last.divide();
			this.errorSum -= last.error * last.area();
			let kids = last.getLeafNodes();
			for( let child = 0; child < kids.length; child++ )
			{
				this.errorSum += kids[child].error + kids[child].area();
			}
		}

		this.drawNode = last;
		this.boxes = leaves;
		this.ITERATIONS -= 1;
	}

	averageErrorOfQuad( quad, errorsum )
	{
		return errorsum / quad.area();
	}

	/**
	*
	**/
	getBoxWithLargestError( box )
	{
		if( box.isLeaf() || box.depth >= this.MAX_DEPTH )
		{
			return box;
		}
		else
		{
			let children = box.getLeafNodes();
			children.sort( Box.errorCompareT );
			let largestChild = children[children.length-1];
			return this.getBoxWithLargestError( largestChild );
		}
	}

	/**
	*	Game loop draw function
	**/
	draw()
	{
		this.drawNode.draw( this.ctx);
		for( let i = 0; i < this.drawNode.children.length; i++ )
		{
			this.drawNode.children[i].draw(this.ctx);
		}
		return;
	}

	/**
	*	Gets the average color of a area
	**/
	averageColorOfRegion( x, y, w, h )
	{
		let imgData = this.buffer.getImageData( x, y, w, h );
		let total = imgData.data.length;
		let R = 0, G = 0, B = 0;

		//Manipulate the current section
		for( var i = 0; i < total; i+= 4 )
		{
			//Index of RGBA
			var r = i + 0,
				g = i + 1,
				b = i + 2,
				a = i + 3;

			R = R + imgData.data[r];
			G = G + imgData.data[g];
			B = B + imgData.data[b];
		}
		return {
			r:Math.floor(R/total),
			g:Math.floor(G/total),
			b:Math.floor(B/total)
		};
	}
}
