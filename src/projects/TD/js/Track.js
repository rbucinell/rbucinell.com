//Track.js

var drawPath = true;

function Track( json )
{
	//Public Variables
	this.Name = json.name;
	this.Difficulty = json.difficulty;
	this.Map = new TrackMap( json.map );
	this.Path = new Array();
	this.Waves = new Array();
	
	waveEnemies = [];
	
	//Private Variables
	var currentWave = 0;
	
	//Constructor Initialization	
	for( p in json.path)
	{
		this.Path.push( json.path[p] );
	}
		
	for( w in json.waves )
	{
		this.Waves.push( new Wave( this.Path, json.waves[w] ) );
	}
	var waveEnemies = createWaveEnemies.apply(this);
	
	//////////Public functions ////////////
	
	//Accessors	
	this.getCurrentWave = function()
	{
		return currentWave;
	}
	
	this.getEnemies = function()
	{
		return waveEnemies;
	}
	
	this.nextWave = function()
	{
		currentWave++;
		waveEnemies = createWaveEnemies.apply(this);
	}
	
	//////////Private functions ////////////
	
	function createWaveEnemies()
	{		
		waveEnemies = this.Waves[ currentWave ].Enemies;
		
	}
	
}

Track.prototype.update = function()
{
	this.Waves[this.getCurrentWave()].update();
}

Track.prototype.draw = function( ctx )
{
	//Draw the track's background Image
	//ctx.drawImage( this.MapImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
	
	this.Map.draw( ctx );
	
	
	//Draw the Title
	ctx.font = "30px Arial";
	ctx.fillStyle = "#0000FF";
	ctx.fillText( this.Name,475,40);
	
	//Draw the Wave information
	var waveNum = this.getCurrentWave();
	var wave = this.Waves[ waveNum ];
	ctx.font = "12px Arial";
	ctx.fillStyle = "#000000";
	ctx.fillText( "["+(waveNum+1)+"] - " + wave.Name,475,60);
		
	//Draw the Path
	if( drawPath )
	{
		
		ctx.strokeStyle = "#000";
		ctx.beginPath();
		ctx.moveTo( this.Path[0].x, this.Path[0].y );
		for( p in this.Path)
		{
			ctx.lineTo(this.Path[p].x, this.Path[p].y );
		}	
		ctx.stroke();
	}
	
	var enemies = this.Waves[ waveNum ].Enemies;
	
	//Draw the wave Enemies
	for( e in enemies )
	{
		enemies[e].draw( ctx );
	}
	
}