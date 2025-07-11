class Grid
{
	constructor( x, y, width, height, rows, cols, config="")
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.rows = rows;
		this.cols = cols;
		this.squares = [];
		if( config !== "" )
			this.load( config )
	}

	load( file )
	{
		fetch(file)
		.then( response => response.json() )
		.then( json =>{
			this.rows = json.rows;
			this.cols = json.cols;
			this.width = SQUARE_SIZE * this.cols;
			this.height = SQUARE_SIZE * this.rows;

			this.squares = [];
			for( let r = 0; r < this.rows; r++ )
			{
				let row = [];
				for( let c = 0; c < this.cols; c++ )
				{
					let alive = json.values[r][c] === 1;
					row.push( new Square(  this.x + SQUARE_SIZE * c, this.y + SQUARE_SIZE * r, alive ));
				}
				this.squares.push( row );
			}
			this.isloaded = true;
		});
	}

	hitTest( point )
	{
		return point.x >= this.x && point.x < this.x + this.width && point.y >= this.y && point.y < this.y + this.height;
	}

	click( point, previousSqDragged = null )
	{		
		//This is a quick and dirty way to grab what square was clicked on. May need to consider checking more squares if this fails
        const   apprxSqX = parseInt((point.x- this.x) / SQUARE_SIZE), 
                apprxSqY = parseInt((point.y- this.y) / SQUARE_SIZE );
		const sqr = grid.squares[apprxSqY][apprxSqX];
		
		if( previousSqDragged === null || previousSqDragged !== sqr )
			if( sqr.hitTest( point ) )
				sqr.toggleState();
		return sqr;
	}

	draw( context )
	{
		context.strokeStyle ='#000000';		
		this.squares.forEach( r => r.forEach( s =>  s.draw()));
		//context.noFill();
		context.rect( this.x, this.y, this.width, this.height);
	}
}