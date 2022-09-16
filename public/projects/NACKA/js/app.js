var ROOT_URL = "http://www.nackakickball.com/scheduler/";

function App() {}

App.SaveData = function( key, obj)
{
    localStorage.setItem( key, JSON.stringify(obj));
}

App.LoadData = function( key )
{
    return JSON.parse(localStorage.getItem(key));
}

App.RemoveData = function( key )
{
    localStorage.removeItem( key );
}

function getYqlUrlForPage( url )
{
    return 'https://query.yahooapis.com/v1/public/yql?q=' +
            encodeURIComponent('select * from html where url="' +
            url + '"') + '&format=json';
}

//- Gets the querystring values from the URL
//- http://stackoverflow.com/questions/4656843/jquery-get-querystring-from-url
function getUrlQueryStringValues()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

Date.prototype.WeekDay = function(){
    var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    return weekday[this.getDay()];
};
