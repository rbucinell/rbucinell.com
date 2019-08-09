package source{

	import flash.display.*;
	import flash.events.*;
	import flash.ui.*;
	import flash.text.*;
	import fl.motion.*;

	public class SearchBar extends MovieClip {
		
		//Variables//
		//barhead:BarHead  - Arrow head on Barhead
		//helpU:HelpButton - help button, will pop up help screen when called
		//searchIn:InputText - input field for search textbox
		//goSearch:SimpleButton - searches for whatever is in the input box
		public var theTour:TourMe;
		private var searchResults:Array = new Array();
		var numberOfResults:int = 0;

		//Constructor
		public function SearchBar():void {
			searchIn.background = true;
			searchIn.backgroundColor = 0xCCCCCC;
			searchIn.border = true;
			searchIn.borderColor = 000000;
			theTour = TourMe(this.parent);
			this.addEventListener( MouseEvent.CLICK, openMe );
			helpU.addEventListener( MouseEvent.CLICK, getHelp );
			goSearch.addEventListener( MouseEvent.CLICK, goGetIt);
		}
		function openMe( event:MouseEvent ) {
			if ( event.target == this.barhead) {
				this.play();
			}
			if( event.target.parent.barhead.currentLabel == "close"){
				resultTab.gotoAndStop("down");
			}
		}
		public function getHelp(event:MouseEvent):void {
			theTour.helpIsOpen = true;
			var helper:HelpScreen = new HelpScreen();
			helper.x = 272;
			helper.y = 169;
			theTour.addChild(helper);
		}
		
		//Actions to respond to the go search button being pressed. Changes response
		//based on number of results
		public function goGetIt(event:MouseEvent):void {
			searchResults = theTour.searchFor( searchIn.text );
			numberOfResults = searchResults.length;
			resultTab.fillSearchResultBox(searchResults);
			//Zero Results
			if ( numberOfResults == 0 ) {
				searchIn.text="(No Reulsts Found)";
			}
			//One Result
			if ( numberOfResults == 1 ) {
				trace("You is a WINRAR:" + searchResults[0]);
				searchIn.text = "";
				theTour.gotoAndStop( isWhere(searchResults[0].Building,searchResults[0].Floor) );
				theTour.alert.alertThisRoom(searchResults[0]);
			}
			//One to five Results
			if ( numberOfResults > 1 && numberOfResults < 5) {
				searchIn.text = numberOfResults+" results, see tab";
				resultTab.gotoAndPlay("down");
			}
			// 5 or more results
			if ( numberOfResults >= 5 ) {
				searchIn.text = "(Too Many Results)";
				resultTab.gotoAndPlay("down");
			}
			
		}
		//Takes the input of a room, and translates it to the propper search label
		public function isWhere( building:String, floor:int):String{
			building = building.toLowerCase();
			
			switch( building ){
				case "potter":
					return "potter";
					break;
				case "engineering lab":
					return "engineer";
					break;
				case "science and engineering":
					return ("sciAndEng_"+floor);
					break;
				case "steinmetz":
					return "steinmetz";
					break;
				case "butterfield":
					return ("butter_"+floor);
					break;
				case "solar rooftop lab":
					return "solar";
					break;
			}
			return "";
		}
		
	}
}