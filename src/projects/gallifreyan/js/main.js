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
    r: canvasHeight/2*.7
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

function chord( angle, r)
{
    return 2*r*sin(angle/2);
}

function sagitta( radius, theta )
{
    return radius * ( 1 - Math.cos( DegToRad( theta / 2 ) ) )
}

/**
 * Find the (x,y) cordinates of a given circle's radius and at an angle of theta
 * 
 * @param {Object} c the Circle
 * @param {Number} theta angle of which to find the cords on
 */
function cordsOnCircle( c, theta )
{
    if( !c )
    {
        c= { x: 0,y:0};
    }
    return {
        x: c.x + c.r * Math.cos( DegToRad(theta) ),
        y: c.y + c.r * Math.sin( DegToRad(theta) )
    }
}

/**
 * 
 * @param {Object} center Center Point (x,y)
 * @param {Number} radius Radius distance
 * @param {Number} theta the angle
 */
function cordsFromAngle( center, radius, theta)
{
    return cordsOnCircle({ x: center.x, y:center.y, r:radius }, theta);
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
    

    words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

    
    
    var theta = 360  / words.length;
    var wordRadius = chord( innerCircle.r, theta)/2;
    var inscribeRadius = (innerCircle.r*2-wordRadius*2)/2;

    var p1 = cordsOnCircle( innerCircle, 0);
    var p2 = cordsOnCircle( innerCircle, theta);
    var mdpt ={ x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2 };
    ellipse( mdpt.x, mdpt.y, 5);
    line( center.x, center.y, mdpt.x, mdpt.y );
    var chordRadius = Math.sqrt( Math.pow( mdpt.x-p1.x,2 ) + Math.pow( mdpt.y-p1.y,2 ) );
    var wordCircle = JSON.parse(JSON.stringify(innerCircle));
    wordCircle.r = chordRadius;
    //stroke( 'red' );
    //ellipse( center.x, center.y, inscribeRadius*2);

    function getRadiusDistanceOfIntersectOfBiscectofTwoWedges(r, t1, t2 )
    {
        var p1 = cordsFromAngle( center.x, center.y, r, t1);
        var p2 = cordsFromAngle( center.x, center.y, r, t2);
        var dist = Math.sqrt( Math.pow( mdpt.x-p1.x,2 ) + Math.pow( mdpt.y-p1.y,2 ) );
        return { x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2, d: dist };
    }

    stroke( 'gray' );
    words.forEach(function(word,i) 
    {
        var wordPt = getRadiusDistanceOfIntersectOfBiscectofTwoWedges( innerCircle.r, i*theta, (i+1)*theta );

        var pt = cordsOnCircle( wordCircle, i*theta);
        ellipse( pt.x, pt.y, wordCircle.r*2); //doesn't work


        //var s = sagitta( innerCircle.r, i*theta);
        //var dist = innerCircle.r - s;
        //var Sx = dist * Math.cos( DegToRad(i*theta));
        //var Sy = dist * Math.sin( DegToRad(i*theta));

                //Set the 
        var curColor = colors.shift();
        stroke(curColor);
        colors.push(curColor);
        
        
        var p1 = cordsOnCircle( innerCircle, gallifreyan_offset+ i*theta);
        ellipse( p1.x, p1.y, chordRadius* 2);
        ellipse( p1.x, p1.y, 5);

        //if( i == 0)
        //triangle( p1.x, p1.y, p2.x, p2.y, center.x, center.y);




        

        /*
        var tempCords = cordsOnCircle( innerCircle, gallifreyan_offset+i*theta);
        circleAnchor = {
            index: i,
            x: center.x + tempCords.x,
            y: center.y + tempCords.y
        };       


        var inscribeCords = cordsOnCircle( inscribeRadius, gallifreyan_offset + i * theta );
        inscribeAnchor = {
            index: i+1,
            x: center.x + inscribeCords.x,
            y: center.y + inscribeCords.y
        };
        ellipse( inscribeAnchor.x, inscribeAnchor.y, 5);//inscribe point
        text( 'i'+inscribeAnchor.index, inscribeAnchor.x, inscribeAnchor.y);//inscribe point text

        ellipse( circleAnchor.x, circleAnchor.y, 5); //anchor on the innerCircle
        text( word, circleAnchor.x, circleAnchor.y); //anchor on the innerCircle text

        function d(r, theta )
        {
            return Math.sqrt( r*r - Math.pow( r * Math.sin( theta/2) ,2) );
        }

        ellipse( circleAnchor.x, circleAnchor.y, wordRadius*2); //draw the word ring*/
    
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