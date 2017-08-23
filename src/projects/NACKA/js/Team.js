function Team( name, color, url )
{
	this.Name = name;
	this.ColorName = color;
	this.Color = Colors.GetColorByName(color);
	this.URL = url;
	this.matchups = [];
	Team.ALL_TEAMS.push( this );
}

Team.ALL_TEAMS = [];

Team.LoadTeams = function()
{
	if( Team.ALL_TEAMS.length === 0)
	{
		LoadTeamData( App.LoadData( 'ALL_TEAMS') );

		if(Team.ALL_TEAMS.length === 0)
		{
			var url = ROOT_URL + "aplsteamlist.htm";
			var yql = getYqlUrlForPage( url );
			$.getJSON( yql, function(data){
				var htmlbody = data.query.results.body;
				var listOfTeams = htmlbody.table[2].tbody.tr.td[1].ul.li;
				for( li in listOfTeams )
				{
					var anchor = listOfTeams[li].a;

					var tName 	= Team.ExtractNameFromRaw( anchor.content );
					var tColor	= Team.ExtractColorFromRaw( anchor.content );

					var team = new Team( tName, tColor, anchor.href );
				}
				App.SaveData( 'ALL_TEAMS', Team.ALL_TEAMS );
			});
		}
	}
	return Team.ALL_TEAMS;
}

Team.GetTeamByName = function( teamName )
{
	var allteams = Team.ALL_TEAMS;
	if( Team.ALL_TEAMS.length === 0)
	{
		Team.ALL_TEAMS = Team.LoadTeams();
	}
	for( t in allteams)
	{
		if( allteams[t].Name === teamName )
		{
			return allteams[t];
		}
	}
	return null;
}

function LoadTeamData( genericObjectArray )
{
	for( obj in genericObjectArray)
	{
		var t = genericObjectArray[obj];

		var teamT = null;
		for( var i = 0; i < Team.ALL_TEAMS.length; i++ )
		{
			if( Team.ALL_TEAMS[i].Name === t)
			{
				teamT == Team.ALL_TEAMS[i];
				break;
			}
		}
		if( teamT === null || teamT === 'undefied')
		{
			teamT = new Team( t.Name, t.ColorName, t.URL );
		}
		var team = teamT;

		if( t.matchups === null || t.matchups === 'undefied')
		{
			team.matchups = [];
		}
		else
		{
			team.matchups = [];
			for( i in t.machups )
			{
				var mu = new Matchup();
				mu.Location = t.matchups[i].Location;
				mu.MatchDateTime = new Date( t.matchups[i].MatchDateTime );
				mu.Field = t.machups[i].Field;
				mu.Result = t.matchups[i].Result;

				var opp = t.machups[i].Opponent;
				var teamOpp = Team.GetTeamByName( opp );
				if( teamOpp === null || teamOpp === 'undefied')
				{
					teamOpp = new Team( opp.Name, opp.ColorName, opp.URL );
				}
				mu.Opponent = teamOpp;
				team.matchups.push( mu );
			}
		}
	}
}

Team.prototype.ToString = function()
{
	return this.Name +  ', '+ this.Color + ', '+ this.URL;
}

Team.ExtractNameFromRaw = function( rawName )
{
	return rawName.substring( 0, rawName.indexOf( '(' ) -1 );
}

Team.ExtractColorFromRaw = function( rawName )
{
	return rawName.substring( rawName.indexOf( '(' )+1, rawName.indexOf(')') );
}

Team.SetElementBackground = function( element, team )
{
	if( team == null || team==='undefied')
	{
		$(element).css("background-color", Colors.DEFAULT);
	}
	else
	{
		var colorName = team.ColorName.toUpperCase();
		if( colorName === "RAINBOW")
		{
			$(element).addClass( "rainbowbg" );
		}
		else if( colorName === "UNKOWN")
		{
			$(element).css("background-color", Colors.DEFAULT);
		}
		else
		{
			$(element).css("background-color", team.Color);
		}
	}

}
