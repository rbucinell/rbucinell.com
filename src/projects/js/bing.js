var googletrendsAPI = "http://hawttrends.appspot.com/api/terms/?callback=?";
var bingRewardsURL = "https://www.bing.com/rewards/dashboard";
var bingSearch = "https://www.bing.com/search?q=";
const SECONDS = 500, MINS = 30 * SECONDS; //normally 500=>1000, and 30=>60, but I wanted to artificially speed things up
const MAX_QUERIES = 120;
var nonascii = /[^\x00-\x7F]+/;
var interval;

//Variables to maintain if user is logged into Bing before begining the query
var userLoggedIn = true;
var NOT_SIGNED_IN = "You are not signed in to Bing Rewards.";

const CREDIT_MAX_DESKTOP = 15;
var currentCreditDesktop = 0;

const CREDIT_MAX_MOBILE = 10;
var currentCreditMobile = 0;


var questions = [
    "what is",
    "what is trending",
    "why is trending",
    "who is",
    "info about",
    "information about",
    "details on",
    "more about",
    "explain",
    "news about",
    "more news on",
    "describe",
    "summarise",
    ""
];

var clipboard = new Clipboard('.searchbtn');
clipboard.on('success', function(e) {
    DisplayAlert( ALERT_TYPE.INFO, "Copied: " + e.text);
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});
clipboard.on('error', function(e) {
    DisplayAlert( ALERT_TYPE.DANGER, "Failed to copy: ");
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

//On doc ready get the data
$(function()
{
    DisplayAlert( ALERT_TYPE.WARNING, "Remember to Sign into Bing and allow popups!");
    //CheckBingLogin(); - Doesn't work, always returns not logged in
    BuildGoogleTrendingList();
    $("#buttonStart").click(startBing);
    $("#buttonStop").click(stopBing);
});

var CheckBingLogin = function()
{
    $.ajax({
        url: "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20data.html.cssselect%20WHERE%20url%3D'https%3A%2F%2Fwww.bing.com%2Frewards%2Fdashboard'%20AND%20css%3D'div.simpleSignIn%20div.header'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",//"http://query.yahooapis.com/v1/public/yql",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            q: "",//"SELECT * FROM data.html.cssselect WHERE url='https://www.bing.com/rewards/dashboard' AND css='div.simpleSignIn div.header'",
            format: "json"
        },
        success: BingLoginCheckYQLSucess,
        error: BingLoginCheckYQLFail
    });
    return true;
}

var BingLoginCheckYQLSucess = function( yqlResponse )
{
    var content = yqlResponse.query.results.results.div.content;
    userLoggedIn = content !== NOT_SIGNED_IN;
}

var BingLoginCheckYQLFail = function( yqlResponse )
{
    console.log( yqlResponse);
}

var BuildGoogleTrendingList = function()
{
    $.ajax({
        url: "http://query.yahooapis.com/v1/public/yql",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            q: "select * from json where url='"+googletrendsAPI+"' ",
            format: "json"
        },
        success: QueryGoogleTrendsYQLSuccess
    });
}

var QueryGoogleTrendsYQLSuccess = function( yqlResponse )
{
    var json = yqlResponse.query.results.json;

    //get the first two arrays, should be enough
    var topics = shuffle(json["_"].concat(json["_1"]));

    var count = 0;
    $.each( topics, function (index, value )
    {
        if( !nonascii.test( value ) && count < MAX_QUERIES )
        {
            var salt = getRandomQuestionSalt();
            var str = value;//.replace(new RegExp(' ', 'g'), ' ');//var str = value.replace(new RegExp(' ', 'g'), '+');
            var query = salt + str;

            var uaClass = count <= 20 ? "list-group-item-success" : "list-group-item-info" ;


            $("#searches").append("<li class=\"list-group-item "+ uaClass + "\"><button class=\"btn searchbtn\" data-clipboard-text=\""+query+"\">"+query+"</button></li>");
            $('.searchbtn').click( function()
            {
                $(this).parent().fadeOut("slow");
                $(this).parent().remove();
            });
        }
        count++;
    });
}

/// Start button click event handler - begins the automatic process
var startBing = function( event )
{
    $("#buttonStop").removeClass( "active");
    $("#buttonStart").addClass( "active");

    interval = setInterval( bingIt, 10 * SECONDS );

    DisplayAlert( ALERT_TYPE.SUCCESS, "Bing-ing has begun!");
}

// Stop button click event handler - stops the automatic process
var stopBing = function( event )
{
    clearInterval( interval);

    $("#buttonStart").removeClass( "active");
    $("#buttonStop").addClass( "active");
    DisplayAlert( ALERT_TYPE.SUCCESS, "Bing-ing has stopped!");
}


//Salt the question with some bullshit filler
var getRandomQuestionSalt = function()
{
    var item = questions[Math.floor(Math.random()*questions.length)];
    if( item === "" )
        return item;
    else
        return item + " ";
}

//Open a new tab using the search queries from the list and bing it
var bingIt = function()
{
    clearInterval( interval );

    //if there are no more, we will be done
    if( $("#searches").children().size() > 0 )
    {
        var searchText = $("#searches li button").first().text();
        console.log(searchText);

        $("#searches li").first().remove();

        var win = window.open( bingSearch + searchText , '_blank');
        setTimeout( function(){ win.close();}, 2 * MINS);
        var rand = (Math.random() * 2) + 1;

        var message = "Last Search[ " + searchText + " ] " + toStringValueAsMinAndSeconds(rand) + " until next search";
        DisplayAlert( ALERT_TYPE.INFO, message );

        //Set the new interval
        interval = setInterval( bingIt, rand * MINS );
    }
    else {
        DisplayAlert( ALERT_TYPE.SUCCESS, "Binging is Complete" );
    }
}

var toStringValueAsMinAndSeconds = function( dec )
{
    var min = Math.floor( dec );
    var sec = Math.floor((dec-Math.floor(dec))*60);
    return ((min<10)?"0"+min:min) + ":" + ((sec<10)?"0"+sec:sec);
}

//shuffle dat array
var shuffle = function(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


//Enum to display available alerts
const ALERT_TYPE = {
    SUCCESS : "alert-success",
    INFO : "alert-info",
    WARNING : "alert-warning",
    DANGER : "alert-danger"
}

//clears the alert screen
var clearAlert = function()
{
    $("#bingalert").removeClass(ALERT_TYPE.SUCCESS)
                   .removeClass(ALERT_TYPE.INFO)
                   .removeClass(ALERT_TYPE.WARNING)
                   .removeClass(ALERT_TYPE.DANGER);
    $("#bingalert").hide();
}

//Displays an alert to the user
var DisplayAlert = function( alertType, message )
{
    clearAlert();
    $("#bingalert").addClass( alertType ).html( message );
    $("#bingalert").fadeIn();
}
