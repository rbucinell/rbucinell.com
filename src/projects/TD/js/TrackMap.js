function TrackMap( json )
{
	this.Atlas = new Atlas();
	this.Atlas.Load( json.atlas_map, json.atlas_data );
	
	this.TileWidth = json.tile_width;
	this.TileHeight = json.tile_height;
	
	this.MapTileWidth = json.map_tile_width;
	this.MapTileHeight = json.map_tile_height;
	
	this.width = this.TileWidth * this.MapTileWidth;
	this.height = this.TileHeight * this.MapTileHeight;
	
	this.BaseColor = json.base_color;
	this.BackgroundImage = json.background_img;
	
	this.TerrainTiles = [];
	
	var t;
	for( t in json.terrain)
	{
		var tile = json.terrain[t];
		//convert the X and Y into real cords
		tile.x = tile.x * this.TileWidth;
		tile.y = tile.y * this.TileHeight;
		
		//todo: add lookup for atlas data here
		//and add that to tile data
		this.TerrainTiles.push( json.terrain[t] );
	}
	
}

TrackMap.prototype.draw = function( ctx )
{
	var tileCount = this.TerrainTiles.length;
	for( var i = 0; i < tileCount; i++)
	{
		ctx.drawImage( this.Atlas.SpriteSheet, 
			this.TerrainTiles[i].x, this.TerrainTiles[i].y, this.TileWidth, this.TileHeight, 
			this.Atlas.Textures[i].x, this.Atlas.Textures[i].y, this.Atlas.Textures[i].w, this.Atlas.Textures[i].h	);
	}
};