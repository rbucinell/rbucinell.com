/*
var canvas = document.getElementById("canvas");
var graphics = canvas.getContext("2d");
var game = new Game(canvas.width, canvas.height, graphics);

if (document.loaded) {
    DoStuffFunction();
} else {
    if (window.addEventListener) {
        window.addEventListener('load', DoStuffFunction, false);
    } else {
        window.attachEvent('onload', DoStuffFunction);
    }
}

function DoStuffFunction() {
    // add our events. Up and down are for dragging,
    // double click is for making new boxes
    canvas.onmousedown = gameMouseDown;
    canvas.onmouseup = gameMouseUp;
    canvas.ondblclick = gameMouseDoubleClick;
}
*/
let grid;

function setup()
{
    grid = new Grid(0,0, 800, 400, 40, 20, 'config/stills.json' );
    cnvs = createCanvas( 800, 400 );
}

function mouseClicked()
{
    const pt = { x: mouseX, y: mouseY };
    if( grid.hitTest( pt ) )
    {
        const apprxSqX = parseInt((pt.x- grid.x) / SQUARE_SIZE);
        const apprxSqY = parseInt((pt.y- grid.y) / SQUARE_SIZE );
        const sqr = grid.squares[apprxSqY][apprxSqX];
        if( sqr.hitTest( pt ) )
            sqr.isLiving = !sqr.isLiving;
    }
    //try to 
}

function draw()
{
    background( 'grey' );
    grid.draw()
}