////
// Generic Enemy Class
////
function Enemy()
{
	this.x = 0;
	this.y = 0;
	this.width = 20;
	this.height = 20;
	this.Color = "white";
	this.Health = 10;
	this.Speed = 1;
	this.IsMoving = false;
	
	return this;
};

Enemy.prototype.setPath = function(path)
{
	this.Path = path.slice();
	var startingPoint = this.Path.shift();
	
	this.x = startingPoint.x;
	this.y = startingPoint.y;
}

Enemy.prototype.update = function()
{
	if( ! this.IsMoving )
	{
		return;
	}
	
	var nextPoint = this.Path[0];
	var atX = false, atY = false;
	
	var xdist = Math.abs( this.x-nextPoint.x);
	if( xdist < this.Speed )
	{
		this.x = nextPoint.x;
		atX = true;
	}
	else
	{
		if( this.x > nextPoint.x )
		{
			this.x = this.x - this.Speed;
		}else
		{
			this.x = this.x + this.Speed;
		}
	}
	
	var ydist = Math.abs( this.y - nextPoint.y);
	
	if( ydist < this.Speed )
	{
		this.y = nextPoint.y;
		atY = true;
	}
	else
	{
		if( this.y > nextPoint.y )
		{
			this.y = this.y - this.Speed;
		}
		else
		{
			this.y = this.y + this.Speed;
		}
	}
	if( atX && atY )
	{
		this.Path.shift();
	}
}

Enemy.prototype.draw = function( ctx )
{
	ctx.fillStyle = this.Color
	ctx.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
}

////
// Red Enemy Class, Inherits Enemy
////
function RedEnemy()
{
	this.Color = "red";
	this.Health = 1;
}
RedEnemy.prototype = new Enemy();

////
// Orange Enemy Class, Inherits Enemy
////
function OrangeEnemy()
{
	this.Color = "orange";
	this.Health = 2;
}
OrangeEnemy.prototype = new Enemy();


////
// Enemy Factory Class. Creates enemies based on input from JSON
////
function EnemyFactory(){}
EnemyFactory.prototype.createEnemy = function( type, path )
{
	var parentClass = null;
	
	if( type === "red")
	{
		parentClass = RedEnemy;
	}
	else if( type === "orange" )
	{
		parentClass = OrangeEnemy;
	}
	else
	{
		parentClass = Enemy;
	}
	
	//Return the class, if its not found return nothing
	if( parentClass !== null)
	{
		var obj = new parentClass();
		obj.setPath( path );
		return obj;
	}
	
	
}


