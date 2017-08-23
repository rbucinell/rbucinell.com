
function TrackInterface( track ) 
{
	this.StartWaveButton = new Button(480,80, 100, 30, "#55F", "Start Wave" );
	
}

TrackInterface.prototype.update = function()
{
	
}

TrackInterface.prototype.draw = function( ctx )
{
	this.StartWaveButton.draw( ctx );
}

TrackInterface.prototype.handleMouseUp = function( event )
{
	console.log( this.StartWaveButton.hitTest( event.x, event.y ) )
	if( this.StartWaveButton.hitTest( event.x, event.y ) )
	{
		
		this.StartWaveButton.handleMouseUp( event );
	}
}