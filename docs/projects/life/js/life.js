var config =
{
    rows: 40,
    cols: 40
}

var grid = [];

function setup()
{
    frameRate( 30 );
    var canvas = createCanvas( 800, 600 );
    canvas.parent('canvas-container');

    stroke(0);
    background( 51 );

    for( let r = 0; r < config.rows; r++ )
    {
        grid.push( [] );
        for( let c = 0; c < config.cols; c++ )
            grid[r].push( {live: 0, next: -1});
    }

    grid[5][20] = 1;
}

function draw()
{
    for( let r = 0; r < config.rows; r++ )
        for( let c = 0; c < config.cols; c++ )
        {
            //update the
            if( grid[r][c].next !== -1 )
            {
                grid[r][c].live = grid[r][c].next;
                grid[r][c].next = -1;
            }

            fill( grid[r][c].live === 0 ? color(255) : color(51) )
            rect( c * canvas.width/config.cols, r * canvas.height/config.rows, canvas.width/config.cols-1, canvas.height/config.rows-1 )

        }
}