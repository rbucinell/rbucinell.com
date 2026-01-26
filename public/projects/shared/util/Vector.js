function Vector( x, y ){
	
	var _x = x;
	var _y = y;
	var _magnitude = Math.sqrt( _x * _x + _y * _y );
        
	//Get the X value for the current Vector.
	this.getX = function () { return _x; }
	
	//Get the Y value for the current Vector.
	this.getY = function () { return _y; }
			
	//Gets the distance between this Vector and an input Vector.
	this.distance = function (vec) 
	{
		var x2 = vec.getX() - _x;
		var y2 = vec.getY() - _y;
		
		x2 = x2 * x2;
		y2 = y2 * y2;
		
		return Math.sqrt(x2 + y2 );
	}
	
	//Returns the average of this vector and 
	this.avg = function( vec )
	{
		return new Vector( ( _x + vec.getX() ) / 2, (_y + vec.getY() )/2  );
	}
	
	this.manyAvg = function( vecList )
	{
		var total = vecList.length + 1;
		
		var countX = _x;
		var countY = _y;
		for( var i = 0; i < vecList.length; i++ )
		{
			countX += vecList[i].getX();
			countY += vecList[i].getY();
		}
		return new Vector( countX / total, countY / total );
	
	}
	
	
	
	/** @function
	 *  @description Gets the dot product against the give vector
	 *  @param {Vector} the vector to perform the dot product on
	 *  @returns {Number} the scalar product
	 *  @author Ryan Bucinell */
	this.dot = function( vec ) {
			return _x * vec.getX() + _y * vec.getY() ;
	}
	
	/** @function
	 *  @description gets the normalized vector
	 *  @returns {Vector} the normalized vector
	 *  @author Ryan Bucinell */
	this.getNormalized = function() {
			var magnitude = Math.sqrt( Math.pow( _x , 2 ) + Math.pow( _y , 2 ) );
			return new Vector( _x / magnitude, _y / magnitude );                    
	}

	this.toString = function () {
			return "\nx: " + _x + "\ny: " + _y;
	}
	
	return true;
}