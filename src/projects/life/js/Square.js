
const SQUARE_SIZE = 20;
const SquareColors = {
    ALIVE: "#000000",
    DEAD: "#FFFFFF"
}

class Square
{
    constructor( x, y, living=false )
    {
        this.x = x;
        this.y = y;
        this.isLiving = living;
    }

    fillColor()
    {
        return this.isLiving ? SquareColors.ALIVE : SquareColors.DEAD;
    }

    hitTest( point )
    {
        return point.x >= this.x && point.x < this.x + SQUARE_SIZE && point.y >= this.y && point.y < this.y + SQUARE_SIZE;
    }

    toggleState()
    {
        this.isLiving = !this.isLiving;
    }

    draw()
    {
        fill( this.fillColor() );
        rect( this.x, this.y, SQUARE_SIZE, SQUARE_SIZE );
    }


}