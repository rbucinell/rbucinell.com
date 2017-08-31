var canvas;
var canvasWidth = 640;
var canvasHeight = 480;
var gallifreyan_offset = 90; //Gallifreyan starts at (0,-1);
var center = {
    x: canvasWidth/2,
    y: canvasHeight/2
};
var bourndyCircle ={ x: center.x, y: center.y, r: canvasHeight/2 * 0.7 };
var innerCircle = JSON.parse(JSON.stringify(bourndyCircle));
innerCircle.r = bourndyCircle.r * .9;

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

vowels = {
    a: { height: -1, bar: 0},
    e: { height: 0, bar: 0},
    i: { height: 0, bar: 1},
    o: { height: 1, bar: 0},
    u: { height: 0, bar: -1}
}

var consonants = {};
function addLetter( letter, letterStyle, accentStyle, accentCount)
{
    consonants[letter] = { 
        accent : {
            type: accentStyle,
            count: accentCount
        },
        style: letterStyle
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

var colors = ['#A93226', '#2471A3', '#229954', '#F4D03F', '#E67E22', '#34495E' ];



var words = [];

/**
 * Builds an array of words that have been entered and translated from the input field
 * @returns {Array} an array of codded words to translate
 */
function getWords()
{
	if( document.getElementById("words").value === "")
		{
			document.getElementById("words").value = "one two three four five six seven eight";
		}
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
		words = [ 'error' ];
        return;
    }
}

/**
 * onclick event handler for for generate button
 * @event onclick 
 * @param {event} e the event object
 */
function generateClick( e )
{
	getWords();
    loop();
}


/**
 * The intial setup function of the p5js script. Will only execute once. 
 */
function setup()
{
    canvas = createCanvas( canvasWidth, canvasHeight );
    frameRate(60);
    textSize( 32 );
    background(0,0,0,0);
    noLoop();
	textSize( 20 );
    angleMode(DEGREES);
}

/**
 * Converts an angle in degrees to radians
 * @param {Number} deg The angle in degrees
 */
function DegToRad( deg )
{
    return (deg * Math.PI) / 180;
}

/**
 * Converts an angle in radians to degrees
 * @param {Number} rad The angle in radians
 */
function RadToDeg( rad )
{
    return (rad * 180) / Math.PI;
}

/**
 * Gets the chord length between to lines
 * @param {Number} angle The angle between the lines
 * @param {Number} r The radius of the circle
 */
function chord( angle, r)
{
    return 2*r*sin(angle/2);
}

/**
 * Gets the distrance between two cordinate points
 * @param {Object} p1 First cordinate point
 * @param {Object} p2 Second cordinate point
 */
function ptDist( p1, p2 )
{
	return dist( p1.x, p1.y, p2.x, p2.y); //p5js library
	//return Math.sqrt( Math.pow( p2.x-p1.x,2 ) + Math.pow(p2.y-p1.y,2));
}

/**
 * Gets the midpoint between two points
 * @param {Object} p1 First cordinate point
 * @param {Object} p2 Second cordinate point
 */
function midpoint( p1, p2 )
{
	return { x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2 };
}

/**
 * Find the (x,y) cordinates of a given circle's radius and at an angle of theta * 
 * @param {Object} c the Circle ({x,y,r} expected)
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
 * Finds the radius of an incircle of the trirangle ABC
 * @param {Object} A The First vertex of the triangle
 * @param {number} A.x The x componenent of the cordinate point
 * @param {number} A.y The y componenent of the cordinate point
 * @param {Object} B The Second vertex of the triangle
 * @param {number} B.x The x componenent of the cordinate point
 * @param {number} B.y The y componenent of the cordinate point
 * @param {Object} C The Third vertex of the triangle
 * @param {number} C.x The x componenent of the cordinate point
 * @param {number} C.y The y componenent of the cordinate point
 * @returns {number} the raidus of the incircle
 */
function inCircleRadius( A, B, C )
{
	var x = ptDist( A, B );
	var y = ptDist( B, C );
	var z = ptDist( C, A );
	
	return Math.sqrt( (x*y*z)/(x+y+z) );	
}

/**
 * Finds the intersection point of two line segments p1p2 and p3p4 
 * @param {Object} p1 The first Point of the first line segment
 * @param {number} p1.x The x componenent of the cordinate point
 * @param {number} p1.y The y componenent of the cordinate point
 * @param {Object} p2 The second point of the first line segment
 * @param {Object} p3 The first point of the second line  segment
 * @param {Object} p4 The second point of the second line segment
 * @returns {Object} Returns an object containg the location of where the lines would meet and if lies on either segment
 */
function intersectSegments( p1, p2, p3, p4)
{
	return line_intersect( p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y );
}

/**
 * Finds the intersection point of two line segments p1p2 and p3p4 
 * @param {number} x1 The first line segment's first point x component
 * @param {number} y1 The first line segment's first point y component
 * @param {number} x2 The first line segment's second point x component
 * @param {number} y2 The first line segment's second point y component
 * @param {number} x3 The second line segment's first point x component
 * @param {number} y3 The second line segment's first point y component
 * @param {number} x4 The second line segment's second point x component
 * @param {number} y4 The second line segment's second point y component
 * @returns {Object} Returns an object containg the location of where the lines would meet and if lies on either segment
 */
function line_intersect(x1, y1, x2, y2, x3, y3, x4, y4)
{
    var ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1);
    if (denom == 0) {
        return null;
    }
    ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/denom;
    ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/denom;
    return {
        x: x1 + ua*(x2 - x1),
        y: y1 + ua*(y2 - y1),
        seg1: ua >= 0 && ua <= 1,
        seg2: ub >= 0 && ub <= 1
    };
}


/**
 * Adds alpha to a color 
 * @param {any} aColor A given color value
 * @param {number} alpha Alpha 
 * @returns {Color} a RGBA converted color
 */
function colorAlpha(aColor, alpha) {
  var c = color(aColor);
  return color('rgba(' +  [red(c), green(c), blue(c), alpha].join(',') + ')');
}

/**
 * A helper function to draw a dot and label at a given point using p5js functions 
 * @param {Object} pt 
 * @param {number} pt.x The x component of the pt
 * @param {number} pt.y The y component of the pt
 * @param {string} lbl The text of the label
 */
function ptLbl( pt, lbl )
{
	text( lbl, pt.x, pt.y );
	ellipse( pt.x, pt.y, 5);
}

/**
 * Main loop of the p5js script
 */
function draw()
{
    clear();
    noFill();
    //draw outer ring
    stroke( 'black' );
    ellipse(bourndyCircle.x,bourndyCircle.y, bourndyCircle.r*2);
    //draw inner ring
    stroke( '#555' );
    ellipse(innerCircle.x, innerCircle.y, innerCircle.r*2);
    
	//Determine the Max theta, no larger than 180
	if( words.length === 0 )
		getWords();
    var theta = 360  / words.length;
	

	
	var A = { x: center.x, y: center.y },
		B =cordsOnCircle( innerCircle, 0 ),
		C = cordsOnCircle( innerCircle, theta);
	
	ptLbl( A, 'A');
	ptLbl( B, 'B');
	ptLbl( C, 'C');
	
	//Midpoints of the line opposite the vector given vector
	var mA = midpoint( B, C );
	var mB = midpoint( A, C );
	var mC = midpoint( A, B );
	
	ptLbl( mA, 'a' );
	ptLbl( mB, 'b' );
	ptLbl( mC, 'c' );
	
	var a = ptDist( B, C );
	var b = ptDist( A, C );
	var c = ptDist( A, B );
	
	//Draw ΔABC
	stroke('black');
	triangle( A.x, A.y, B.x, B.y, C.x, C.y );
			
	//Draw ΔTaTbTc
	stroke('red');
	triangle( mA.x, mA.y, mB.x, mB.y, mC.x, mC.y);
	
	//Draw bisect lines
	stroke('#00DD00');
	line( A.x, A.y, mA.x, mA.y );
	line( B.x, B.y, mB.x, mB.y );
	line( C.x, C.y, mC.x, mC.y );
		
	//Draw the inircle and the incenter	
	stroke('blue');
	fill(colorAlpha('blue', 0.15));
	
	var I = {
		x: (a*A.x+b*B.x+c*C.x)/ (a+b+c),
		y: (a*A.y+b*B.y+c*C.y)/ (a+b+c),
		r: inCircleRadius( A, B, C)	
	};
	ptLbl( I, 'I');
	
	//Goal
	ellipse( I.x, I.y, I.r );
	
    words.forEach(function(word,i) 
    {
        //Rotate the color
        var curColor = colors.shift();
        stroke(curColor);
        colors.push(curColor);
        noFill();
		
		
        var A = { x: center.x, y: center.y },
		B =cordsOnCircle( innerCircle, i*theta ),
		C = cordsOnCircle( innerCircle, (i+1)*theta);
	
		ptLbl( A, 'A');
		ptLbl( B, 'B');
		ptLbl( C, 'C');

		//Midpoints of the line opposite the vector given vector
		var mA = midpoint( B, C );
		var mB = midpoint( A, C );
		var mC = midpoint( A, B );

		ptLbl( mA, 'a' );
		ptLbl( mB, 'b' );
		ptLbl( mC, 'c' );

		var a = ptDist( B, C );
		var b = ptDist( A, C );
		var c = ptDist( A, B );

		//Draw ΔABC
		stroke('black');
		triangle( A.x, A.y, B.x, B.y, C.x, C.y );

		//Draw ΔTaTbTc
		stroke('red');
		triangle( mA.x, mA.y, mB.x, mB.y, mC.x, mC.y);

		//Draw bisect lines
		stroke('#00DD00');
		line( A.x, A.y, mA.x, mA.y );
		line( B.x, B.y, mB.x, mB.y );
		line( C.x, C.y, mC.x, mC.y );

		//Draw the inircle and the incenter	
		stroke('blue');
		fill(colorAlpha('blue', 0.15));

		var I = {
			x: (a*A.x+b*B.x+c*C.x)/ (a+b+c),
			y: (a*A.y+b*B.y+c*C.y)/ (a+b+c),
			r: inCircleRadius( A, B, C)	
		};
		ptLbl( I, 'I');

		//Goal
		ellipse( B.x, B.r, I.r );
    });
    noLoop();
}