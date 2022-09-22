function Triangle(v1,v2,v3)
{
	var geom = new THREE.Geometry();
	geom.verticies.push( v1 );
	geom.verticies.push( v2 );
	geom.verticies.push( v3 );
	
	this.color = '#'+ Math.floor(Math.random()*16777215).toString(16);
}