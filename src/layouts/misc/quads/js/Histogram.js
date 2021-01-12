
class Histogram
{
	constructor( image, x, y, w, h)
	{
		this.image = image;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		this.r_offset = 0;
		this.g_offset = 1;
		this.b_offset = 2;
		this.a_offset = 3;

		this.bufferCanvas = document.createElement('canvas');
		this.buffer = this.bufferCanvas.getContext('2d');

		this.imageDAta;

		//Histogram Channels
		this.r = [];
		this.g = [];
		this.b = [];

		this.buildHist();
	}

	/**
	* Builds the Histogram from the given image data
	**/
	buildHist()
	{
		//first initialize r, g, and b
		this.r = this.newFilledArray( Histogram.COLOR_RANGE, 0 );
		this.g = this.newFilledArray( Histogram.COLOR_RANGE, 0 );
		this.b = this.newFilledArray( Histogram.COLOR_RANGE, 0 );

		////Fill buffer, and get image data from it
		this.buffer.drawImage( this.image, this.x, this.y, this.w, this.h, this.x, this.y, this.w, this.h);
		this.imgData = this.buffer.getImageData( this.x, this.y, this.w, this.h );

		//fill them with data
		for( let i = 0, l = this.imgData.data.length; i < l; i+=4 )
		{
			//add a red color
			let rVal = this.imgData.data[ i + this.r_offset ];
			this.r[rVal] = this.r[rVal] + 1;

			//add a green color
			let gVal = this.imgData.data[ i + this.g_offset ];
			this.g[gVal] = this.g[gVal] + 1;

			//add a blue color
			let bVal = this.imgData.data[ i + this.b_offset ];
			this.b[bVal] = this.b[bVal] + 1;
		}
	}

	newFilledArray(length, val)
	{
		let array = [];
		let i = 0;

		while (i < length)
		{
			array[i++] = val;
		}
		return array;
	}

	/**
	* Returns the weighted average of a set of data of a color channel histogram
	*/
	weightedAverage( data )
	{
		let total = 0, 
			value = 0, 
			error = 0, 
			i = 0,
			l = data.length;

		for( i = 0, l = data.length; i < l; i++ )
		{
			total += data[i];
			value += data[i] * i;
		}
		value = value / total;

		for( i = 0, l = data.length; i < l; i++ )
		{
			error += ( data[i] * Math.pow(( value - i ),2));
		}
		error = Math.sqrt( error / total );

		return { value: value, error: error };
	}

	/**
	* The weighted average of colors
	**/
	averageColor()
	{
		let rColor = this.weightedAverage( this.r );
		let gColor = this.weightedAverage( this.g );
		let bColor = this.weightedAverage( this.b );

		//standard NTSC conversion formula
		let error = rColor.error * Histogram.RED_ERROR_WEIGHT +
					gColor.error * Histogram.GREEN_ERROR_WEIGHT +
					bColor.error * Histogram.BLUE_ERROR_WEIGHT;
					
		return {
			r: rColor.value,
			g: gColor.value,
			b: bColor.value,
			e: error
		};
	}
}

Histogram.COLOR_RANGE = 256;
Histogram.RED_ERROR_WEIGHT   = 0.2989;
Histogram.GREEN_ERROR_WEIGHT = 0.5870;
Histogram.BLUE_ERROR_WEIGHT  = 0.1140;