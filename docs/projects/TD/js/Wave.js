//Track.js

function Wave( path, jsonobj )
{
	this.Path = path;
	this.Name = jsonobj.name;
	this.Hint = jsonobj.hint;
	this.Enemies = new Array();
	
	var factory = new EnemyFactory();
	
	for( var e = 0; e < jsonobj.enemies.length; e++ )
	{
		var quantity = jsonobj.enemies[e].qty;
		var type = jsonobj.enemies[e].type;
		
		for( var i = 0; i < quantity; i++ )
		{
			this.Enemies.push( factory.createEnemy( type, this.Path ));
		}
		this.Enemies[0].IsMoving = true;
	}
}

Wave.prototype.update = function()
{
	for( e in this.Enemies)
	{
		this.Enemies[e].update();
	}
}

Wave.prototype.draw = function( ctx )
{
	
}