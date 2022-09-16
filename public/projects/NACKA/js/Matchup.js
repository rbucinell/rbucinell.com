function Matchup()
{
    this.location = Matchup.Location.HOME;
    this.MatchDateTime = new Date();
    this.Opponent = null;
    this.Field = 0;
    this.Result = null;
}

Matchup.Location = Object.freeze(
{
    HOME: "vs",
    AWAY: "at"
});

//Indexes of tr/td tables
var INDEX_DATE   = 0;
var INDEX_TIME   = 1;
var INDEX_FIELD  = 2;
var INDEX_LOC    = 3;
var INDEX_TEAM   = 4;
var INDEX_RESULT = 5;

Matchup.prototype.buildMatchFromRawTR = function( rawTR )
{
    //Set DateTime Object
   var d = new Date(rawTR.td[INDEX_DATE]);
   var time = rawTR.td[INDEX_TIME].match(/(\d+)(?::(\d\d))?\s*(p?)/);
   d.setHours( parseInt(time[1]) + (time[3] ? 12 : 0) );
   d.setMinutes( parseInt(time[2]) || 0 );
   this.MatchDateTime = new Date(d);

   var i = rawTR.td[INDEX_FIELD].indexOf( "#" ) + 1;
   this.Field = rawTR.td[INDEX_FIELD].substring( i, i+1 );

   var loc = rawTR.td[INDEX_LOC];
   this.Location = loc === null ? Matchup.Location.HOME : Matchup.Location.AWAY


   var name = Team.ExtractNameFromRaw( rawTR.td[INDEX_TEAM] );
   var opponent = Team.GetTeamByName( name );
   this.Opponent = opponent;

   this.Result = rawTR.td[INDEX_RESULT];
}

Matchup.prototype.toString = function()
{
    return this.MatchDateTime.WeekDay() + ", " + this.MatchDateTime.getMonth() + "/" + this.MatchDateTime.getDate() +
     " ["+ this.Location +"] " + this.Opponent.Name + " (" + this.Opponent.ColorName + ") on Field #" + this.Field;
}
