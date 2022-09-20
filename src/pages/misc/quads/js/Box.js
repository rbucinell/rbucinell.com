 //GLOBAL VARIABLES
var AREA_POWER = 0.25;
var MAX_DIVISIONS = 10;
var MAX_LINE_WIDTH = 4;

const DrawMode = {
	BOX:		"Box",
	BOXBORDER: 	"BoxBorder",
	HATCH:		"Hatch",
	HATCHSHADE:	"HatchShaded"
};

class Box {

	/**
	 * Default constructor
	 * 
	 * @param {Image} image The html image element to copy data from
	 * @param {*} parent 
	 * @param {*} x 
	 * @param {*} y 
	 * @param {*} w 
	 * @param {*} h 
	 * @param {*} depth 
	 * @param {*} MAX_DEPTH 
	 */
	constructor(image,parent,x,y,w,h,depth,MAX_DEPTH)
	{
		this.parent = parent;
		this.image = image;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.depth = depth;
		this.MAX_DEPTH = MAX_DEPTH;
		this.hatchWidth =  Math.tan( Math.atan( MAX_LINE_WIDTH / MAX_DEPTH ) )* ( MAX_DEPTH - this.depth);
		this.children = [];
		this.hist = new Histogram( this.image, x, y, w, h );
		this.setColor( this.hist.averageColor() );
		this.score = -this.error * Math.pow( this.area(), AREA_POWER );
		this.mode = DrawMode.BOX;
	}

	/**
	* Determines if there are no children to this node
	**/
	isLeaf()
	{
		return this.children.length === 0;
	};

	getLeafNodes()
	{
		return this.children === [] ? [this] : this.children;
	};
	
	getAllLeafNodes( currentlist, maxdepth )
	{

		if( this.depth >= maxdepth )
		{

		}
		else if( this.isLeaf() )
		{
			currentlist.push( this );
		}
		else
		{
			for( let i = 0; i < this.children.length; i++ )
			{
				currentlist = this.children[i].getAllLeafNodes( currentlist, maxdepth );
			}
		}
		return currentlist;
	}
	
	getLeafNodes( depth )
	{
		if( this.depth >= depth )
		{
			return [ this ];
		}
		else if( this.children === [])
		{
			return [ this ];
		}
		else
		{
			return this.children;
		}
	};
	
	divide()
	{
		let w2 = this.w / 2;
		let h2 = this.h / 2;

		let q1 = new Box(this.image, this, this.x,		this.y,		 w2, h2, this.depth+1, this.MAX_DEPTH );
		let q2 = new Box(this.image, this, this.x + w2,	this.y, 	 w2, h2, this.depth+1, this.MAX_DEPTH );
		let q3 = new Box(this.image, this, this.x, 		this.y + h2, w2, h2, this.depth+1, this.MAX_DEPTH );
		let q4 = new Box(this.image, this, this.x + w2,	this.y + h2, w2, h2, this.depth+1, this.MAX_DEPTH );

		this.children = [ q1, q2, q3, q4 ];
	};
	
	draw( ctx )
	{
		ctx.fillStyle = this.color;

		switch( this.mode )
		{
			case DrawMode.BOXBORDER:
				ctx.beginPath();
				ctx.lineWidth="0.1";
				ctx.strokeStyle= "black";//this.color;
				ctx.rect( this.x, this.y, this.w, this.h );
				ctx.stroke();
			/* falls through */
			case DrawMode.BOX:
				ctx.fillRect( this.x, this.y, this.w, this.h );
				break;
			case DrawMode.HATCHSHADE:
				ctx.globalAlpha = 0.2;
				ctx.fillRect( this.x, this.y, this.w, this.h );
				ctx.globalAlpha = 1;
			/* falls through */
			case DrawMode.HATCH:
				//determine the number of hatches in a square
				let divisions = MAX_DIVISIONS / (this.depth + 1);
				let vHatches = this.w / divisions;
				let hHatches = this.h / divisions;

				//The deeper we go, the finer our hatches become
				ctx.lineWidth = this.hatchWidth;
				ctx.strokeStyle = this.color;

				ctx.beginPath();

				for( let i = 0; i < divisions; i++ )
				{
					//Verticle hatches
					ctx.moveTo(this.x+ i*vHatches, this.y);
					ctx.lineTo(this.x+ i*vHatches, this.y+ this.h);

					//Horizontal hatches
					ctx.moveTo(this.x, this.y+ i*hHatches);
					ctx.lineTo(this.x + this.w, this.y+ i*hHatches);
				}
				ctx.stroke();

				for( let i = 0; i < divisions; i++ )
				{
					ctx.beginPath();
					ctx.stroke();
				}
				break;
		}
	};
	
	setColor( c )
	{
		this.color = `rgb(${Math.floor(c.r)},${Math.floor(c.g)},${Math.floor(c.b)})`;
		this.error = c.e;
	};
	
	area()
	{
		return this.w * this.h;
	};
}
