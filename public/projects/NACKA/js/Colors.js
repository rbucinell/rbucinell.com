function Colors(){}

Colors.NACKAWEB_BACKGROUND    = "#FFFFFF";
Colors.NACKAWEB_OFFBACKGROUND = "#777777";
Colors.NACKAWEB_HIGHLIGHT     = "#EF1C2B";
Colors.COLOR_PRIMARY          = "#3F51B5";
Colors.COLOR_PRIMARYDARK      = "#303F9F";
Colors.COLOR_ACCENT           = "#FF4081";
Colors.BLACK_OVERLAY          = "#66000000";
Colors.WHITE_BG               = "#F2F2F2";
Colors.NACKA_GRAY_BG          = "#393748";
Colors.NACKA_GRAY_BG_LIGHT    = "#6E7386";
Colors.OVERLAY_GRAY           = "#803D3D3D";

Colors.DEFAULT 			   = "#FFFFFF";

Colors.ANTIQUE_CHERRY_RED  = "#BD103D";
Colors.ANTIQUE_IRISH_GREEN = "#39854d";
Colors.ANTIQUE_JADE_DOME   = "#3aa5ab";
Colors.ANTIQUE_ORANGE      = "#db4f2c";
Colors.ANTIQUE_ROYAL       = "#01347a";
Colors.ANTIQUE_SAPPHIRE    = "#1884AB";
Colors.ASH                 = "#cbccc2";
Colors.AZALEA              = "#db7ba0";
Colors.BERRY               = "#73003b";
Colors.BLACK               = "#080808";
Colors.BLACKBERRY          = "#2b1159";
Colors.BLUE_DUSK           = "#142e33";
Colors.BROWN_SAVANA        = "#695d4f";
Colors.CAMO_GREEN          = "#556B2F";
Colors.CARDINAL            = "#78111f";
Colors.CARDINAL_RED        = "#78111f";
Colors.CAROLINA_BLUE       = "#5D93C1";
Colors.CHARCOAL            = "#404544";
Colors.CHERRY_RED          = "#ba0000";
Colors.CHESTNUT            = "#362626";
Colors.CORAL_SILK          = "#e3645d";
Colors.DAISY               = "#ebae2a";
Colors.DARK_CHOCOLATE      = "#362626";
Colors.DARK_HEATHER        = "#434544";
Colors.ELECTRIC_GREEN      = "#5db350";
Colors.FOREST_GREEN        = "#1c2e02";
Colors.GALAPAGOS_BLUE      = "#005d5e";
Colors.GARNET              = "#5c0615";
Colors.GOLD                = "#EE9B12";
Colors.GRAVEL              = "#939296";
Colors.HEATHER_CARDINAL    = "#733938";
Colors.HEATHER_INDIGO      = "#425361";
Colors.HEATHER_NAVY        = "#333947";
Colors.HELICONIA           = "#FF1493";
Colors.HONEY               = "#f2b450";
Colors.ICE_GRAY            = "#c1c6c9";
Colors.INDIGO_BLUE         = "#425F71";
Colors.IRIS                = "#465982";
Colors.IRISH_GREEN         = "#3CB371";
Colors.JADE                = "#067a7a";
Colors.KELLY_GREEN         = "#0d823e";
Colors.KIWI                = "#9ACD32";
Colors.LIGHT_BLUE          = "#AFEEEE";
Colors.LIGHT_PINK          = "#FFB6C1";
Colors.LILAC               = "#440c78";
Colors.LIME                = "#7bcc2b";
Colors.MAROON              = "#53120B";
Colors.METRO_BLUE          = "#2d384d";
Colors.MIDNIGHT            = "#00252b";
Colors.MILITARY_GREEN      = "#556B2F";
Colors.NATURAL             = "#ede5d5";
Colors.NAVY                = "#152D3D";
Colors.OLD_GOLD            = "#b8924d";
Colors.OLIVE               = "#4d4336";
Colors.ORANGE              = "#FF4500";
Colors.ORCHID              = "#c99fcf";
Colors.PISTACHIO           = "#b3bf80";
Colors.PRAIRIE_DUST        = "#69614c";
Colors.PURPLE              = "#4B0082";
Colors.RED                 = "#FF0000";
Colors.ROYAL_BLUE          = "#00008B";
Colors.RUSTY_BRONZE        = "#944732";
Colors.SAFETY_GREEN        = "#e4f500";
Colors.SAFETY_ORANGE       = "#fa6400";
Colors.SAFETY_PINK         = "#fc6592";
Colors.SAND                = "#DEB887";
Colors.SAPPHIRE            = "#1983b0";
Colors.SERENE_GREEN        = "#afbfa3";
Colors.SKY                 = "#7fc1db";
Colors.SPORT_GREY          = "#808080";
Colors.STONE_BLUE          = "#769ead";
Colors.SUNSET              = "#e65632";
Colors.TAN                 = "#b89358";
Colors.TANGERINE           = "#db611a";
Colors.TENNESSEE_ORANGE    = "#ed6700";
Colors.TEXAS_ORANGE        = "#ad4315";
Colors.TROPICAL_BLUE       = "#00949e";
Colors.TURF_GREEN          = "#27690c";
Colors.VEGAS_GOLD          = "#e3c38d";
Colors.VIOLET              = "#9370DB";
Colors.WHITE               = "#FFFFFF";
Colors.YELLOW_HAZE         = "#ebc56e";

Colors.GetColorByName = function( name )
{
	if( name === null || name === 'undefined')
	{
		return "name";
	}
	else if( name === "RAINBOW" )
	{
		return name;
	}
	var color = name.toUpperCase().replaceAll(' ', '_' );

	if( Colors[color] === null || Colors[color] === 'undefined' )
	{
		return "UNKOWN";
	}
	return Colors[color];
};
