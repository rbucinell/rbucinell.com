var blue_400 = "#42A5F5";
var blue_300 = "#4FC3F7";
var blue_500 = "#2196F3";
var red   = "#F00";


/**
** class: Hex
** description: used to define a hexagon
**/
function Hex( center, size )
{
    this.center = center;
    this.size = size;
    this.prevSize = -1;
    this.prevCenter = -1;
    this.corners = [];

    this.height = function()
    {
        return this.size * 2;
    }

    this.width = function()
    {
        return this.height() * (Math.sqrt(3)/2);
    }

    this.vertDist = function()
    {
        return this.height() * 3/4;
    }

    this.horiDist = function()
    {
        return this.width();
    }

    this.hex_corner = function( i )
    {
        var angle_deg = 60 * i + 30;
        var angle_rad = Math.PI / 180 * angle_deg;
        return new Point( this.center.x + this.size * Math.cos(angle_rad), this.center.y + this.size * Math.sin(angle_rad));
    }

    //Game Client Functions

    this.dist = function( hex )
    {
        return this.center.dist( hex.center );
    }

    this.update = function()
    {
        if( this.prevSize !== this.size && this.prevCenter !== this.center)
        {
            this.prevSize = this.size;
            this.prevCenter = this.center;

            for( var i = 0; i < 6; i++ )
            {
                this.corners[i] = this.hex_corner(i);
            }
        }
    }

    this.draw = function( g )
    {
        drawFill( this, g );
        drawLines( this, g );
        //drawCenter( this, g );
    }

    function drawFill( hex, g )
    {
        g.beginPath();
        g.fillStyle = blue_300;
        g.moveTo( hex.corners[0].x, hex.corners[0].y );

        for( var i = 0; i < 6; i++ )
        {
            var next = hex.corners[ (i+1===6) ? 0 : i+1 ];
            g.lineTo( next.x, next.y );
        }
        g.lineTo( hex.corners[0].x, hex.corners[0].y );
        g.fill();
    }

    function drawCenter( hex, g )
    {
        g.beginPath();
		g.fillStyle = blue_400;
		g.arc(hex.center.x, hex.center.y, 3 , 0, Math.PI*2, true);
		g.closePath();
		g.fill();
    }

    function drawLines( h, g )
    {
        for( var i = 0; i < 6; i++ )
        {
            var cur = h.corners[i];
            var next = h.corners[ (i+1===6) ? 0 : i+1 ];
            g.moveTo( cur.x, cur.y );
            g.lineTo( next.x, next.y );
            g.stroke();
        }
    }
}

/**
** class: Point
** description: used to describe a 2d location in space
**/
function Point( x, y )
{
    this.x = x;
    this.y = y;

    this.dist = function( p )
    {
        return Math.sqrt( Math.pow( ( p.x - this.x ), 2 ) + Math.pow( ( p.y - this.y ), 2 ) );
    }
}
