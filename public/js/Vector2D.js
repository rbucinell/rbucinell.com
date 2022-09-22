
function Vector2D( x, y )
{
	this.X = x;
	this.Y = y;
}
/*
Vector2D.prototype.magnitude = function()
{
	return Math.sqrt( this.X * this.X + this.Y + this.Y );
}*/

Vector2D.prototype.dot = function( vector )
{
	return this.X * vector.X + this.Y * vector.Y;
}

Vector2D.prototype.magnitude = function()
{
	return Math.sqrt( Math.pow( this.X, 2) + Math.pow( this.Y, 2));
}

Vector2D.prototype.normalize = function()
{
	return new Vector2D( this.X / this.magnitude(), this.Y / this.magnitude() );
}

Vector2D.prototype.rotation = function()
{
	var rads = Math.acos( this.X / this.magnitude() );
	return Math.degrees( rads );
	
	/*
	var B = new Vector2D(1,0);
	var thetaRads = Math.acos( this.dot(B) / (this.magnitude() * B.magnitude()));
	var thetaDeg = Math.degrees( thetaRads );
	
	if( this.X >= 0 && this.Y < 0)
	{
		thetaDeg = thetaDeg + 270;
	}
	else
	{
		thetaDeg = thetaDeg + ( this.Y >= 0 ? 90 : 180 );
	}
	return thetaDeg;*/
}

Vector2D.CreateFromRadialCord = function( radius, degrees )
{
	var xComponent = function( degrees )
	{
		var values = 0;
		if( degrees <= 90 )
			value = Math.cos( Math.radians( degrees));
		else if( degrees > 90 && degrees <= 180 )
			value = -1 * Math.cos( Math.radians(180-degrees));
		else if( degrees > 180 && degrees <= 270)
			value = -1 * Math.sin( Math.radians( 270-degrees));
		else
			value = Math.cos( Math.radians(360-degrees));
		return value;
	}
	
	var yComponent = function( degrees )
	{
		var values = 0;
		if( degrees <= 90 )
			value = Math.sin( Math.radians( degrees));
		else if( degrees > 90 && degrees <= 180 )
			value = Math.sin( Math.radians(180-degrees));
		else if( degrees > 180 && degrees <= 270)
			value = Math.cos( Math.radians( 270-degrees));
		else
			value = -1 * Math.sin( Math.radians(360-degrees));
		return value;
	}
	
	var xComp = radius * xComponent( degrees );
	var yComp = radius * yComponent( degrees );
	return new Vector2D( xComp, yComp );
}

Math.radians = function( degree )
{
	return degree * ( Math.PI / 180 );
}

Math.degrees = function( radian )
{
	return radian * ( 180/ Math.PI );
}
