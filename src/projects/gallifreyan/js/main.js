var canvas;
var canvasWidth = 640;
var canvasHeight = 480;
var gallifreyan_offset = 90; //Gallifreyan starts at (0,-1);
var center = {
    x: canvasWidth/2,
    y: canvasHeight/2
};

LetterStyle = Object.freeze({
    TOUCH: 'touch',
    HOVER: 'hover',
    ARC: 'arc',
    BISECT: 'bisect'
});

AccentStyle = Object.freeze({
    BLANK: 'blank',
    DOT: 'dot',
    BAR: 'bar'
});

var consonants = {};
function addLetter( letter, letterStyle, accentStyle, accentCount)
{
    consonants[letter] = { 
        accent : {
            type: accentStyle,
            count: accentCount
        },
        style: letterStyle  //touch, hover, arc, bisec
    }
}
addLetter( 'b', LetterStyle.TOUCH, AccentStyle.BLANK, 0 );
addLetter( '#', LetterStyle.TOUCH, AccentStyle.DOT, 2 );
addLetter( 'd', LetterStyle.TOUCH, AccentStyle.DOT, 3 );
addLetter( 'f', LetterStyle.TOUCH, AccentStyle.BAR, 3 );
addLetter( 'g', LetterStyle.TOUCH, AccentStyle.BAR, 3 );
addLetter( 'h', LetterStyle.TOUCH, AccentStyle.BAR, 3 );

addLetter( 'j', LetterStyle.HOVER, AccentStyle.BLANK, 0 );
addLetter( 'k', LetterStyle.HOVER, AccentStyle.DOT, 2 );
addLetter( 'l', LetterStyle.HOVER, AccentStyle.DOT, 3 );
addLetter( 'm', LetterStyle.HOVER, AccentStyle.BAR, 3 );
addLetter( 'n', LetterStyle.HOVER, AccentStyle.BAR, 3 );
addLetter( 'p', LetterStyle.HOVER, AccentStyle.BAR, 3 );

addLetter( 't', LetterStyle.ARC, AccentStyle.BLANK, 0 );
addLetter( '$', LetterStyle.ARC, AccentStyle.DOT, 2 );
addLetter( 'r', LetterStyle.ARC, AccentStyle.DOT, 3 );
addLetter( 's', LetterStyle.ARC, AccentStyle.BAR, 3 );
addLetter( 'v', LetterStyle.ARC, AccentStyle.BAR, 3 );
addLetter( 'w', LetterStyle.ARC, AccentStyle.BAR, 3 );

addLetter( '%', LetterStyle.BISECT, AccentStyle.BLANK, 0 );
addLetter( 'y', LetterStyle.BISECT, AccentStyle.DOT, 2 );
addLetter( 'z', LetterStyle.BISECT, AccentStyle.DOT, 3 );
addLetter( '&', LetterStyle.BISECT, AccentStyle.BAR, 3 );
addLetter( '*', LetterStyle.BISECT, AccentStyle.BAR, 3 );
addLetter( 'x', LetterStyle.BISECT, AccentStyle.BAR, 3 );

vowels = {
    a: { height: -1, bar: 0},
    e: { height: 0, bar: 0},
    i: { height: 0, bar: 1},
    o: { height: 1, bar: 0},
    u: { height: 0, bar: -1}
}



var colors = ['#A93226', '#2471A3', '#229954', '#F4D03F', '#E67E22', '#34495E' ]

var bourndyCircle ={
    x: center.x,
    y: center.y,
    r: canvasHeight/2
};
var innerCircle = JSON.parse(JSON.stringify(bourndyCircle));
innerCircle.r = bourndyCircle.r * .9;

var words = [];

function generateClick( e )
{
    var text = document.getElementById("words").value.toLowerCase()
            .replace(' -', '-')
            .replace('- ', '-')
            .replace('-', '- ')
            .replace('ch','#')
            .replace('sh','$')
            .replace('th', '%')
            .replace('ng','&')
            .replace('qu', '*');
    words = text.split(' ');

    if( text.indexOf('c') !== -1 )
    {
        console.log( 'Error: Replace every C with K or an S');
        return;
    }
    loop();
}


//single run function that kicks off draw() loop
function setup()
{
    canvas = createCanvas( canvasWidth, canvasHeight );
    frameRate(60);
    textSize( 32 );
    background(0,0,0,0);
    noLoop();
    angleMode(DEGREES);
}

//looping function.
function draw()
{
    clear();
    noFill();
    //draw outer ring
    stroke( 'black' );
    ellipse(bourndyCircle.x,bourndyCircle.y, bourndyCircle.r*2);

    //draw inner ring
    stroke( 'gray' );
    ellipse(innerCircle.x, innerCircle.y, innerCircle.r*2);
    //center point
    ellipse( center.x, center.y, 5);
    

    words = ['one', 'two', 'three'];//, 'four', 'five', 'six', 'seven', 'eight'];
    
    var theta = 360  / words.length;
    var wordRadius = 2*innerCircle.r*sin(theta/2);

    stroke( 'red' );
    ellipse( center.x, center.y, (innerCircle.r*2-wordRadius))

    stroke( 'gray' );
    words.forEach(function(word,i) 
    {
        //Set the 
        var curColor = colors.shift();
        stroke(curColor);
        colors.push(curColor);


        var newX = center.x + (innerCircle.r) * Math.cos(DegToRad(gallifreyan_offset + i*theta));
        var newY = center.y + (innerCircle.r) * Math.sin(DegToRad(gallifreyan_offset + i*theta));
        ellipse( newX, newY, 5);
        ellipse( newX, newY, wordRadius);
        text( word, newX, newY);
    
    });
    noLoop();
}

function DegToRad( deg )
{
    return (deg * Math.PI) / 180;
}

function RadToDeg( rad )
{
    return (rad * 180) / Math.PI;
}