
let grid;

function setup()
{
    grid = new Grid(0,0, 800, 400, 40, 20, 'config/clear.json' );
    cnvs = createCanvas( 800, 400 );
}

let previousSqDragged;
function mouseDragged()
{
    const pt = { x: mouseX, y: mouseY };
    if( grid.hitTest( pt ) )
    {
        previousSqDragged = grid.click( pt,previousSqDragged );
    }
    //try to 
}

function draw()
{
    background( 'grey' );
    grid.draw()
}