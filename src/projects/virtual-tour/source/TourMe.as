package source{

	import flash.display.*;
	import flash.utils.*;
	import flash.events.*;
	import flash.xml.*;
	import flash.net.*;
	import flash.ui.*;
	import flash.text.TextField;

	public class TourMe extends MovieClip {

		/** In-fla variables **/
		/** var searchU:MovieClip = new Active_Bar();
		 ** var searchIn:TextField  - Input field for bar
		 ** var dispTexxt:TextField - Displays text put into input field
		 ** var barhead:barhead; - Slider head
		 ** var button:open_close_button; - arrow that flips when open or closed
		 ** var helpU:HelpButton - pulls up a help screen
		 **/

		public var myRooms:Array = new Array();

		private var xmlData:XML;
		private var buildingName:Array = new Array();
		private var roomName:Array = new Array();
		private var profName:Array = new Array();
		private var descriptionName:Array = new Array();

		var myXML:XML = new XML();
		var XML_URL:String = "source/BuildingData.xml";
		var myXMLURL:URLRequest = new URLRequest(XML_URL);
		var myLoader:URLLoader = new URLLoader(myXMLURL);
		
		var profXML:XML = new XML();
		var PROF_XML_URL:String = "source/ProfData.xml";
		var profrequest:URLRequest = new URLRequest(PROF_XML_URL);
		var profLoader:URLLoader = new URLLoader(profrequest);

		//Boolean to ensure that only one help screen will open
		public var helpIsOpen:Boolean = false;


		public function TourMe() {
			myLoader.addEventListener("complete", xmlLoaded);
			profLoader.addEventListener("complete", profxmlLoaded);
		}
		
		public function profxmlLoaded(event:Event):void {
			profXML = XML(profLoader.data);
		}
		//Function that reads in XML data, and stores it into 'Room' Objects
		function xmlLoaded(event:Event):void {
			//Trys to read the loaded data
			try {
				myXML = XML(myLoader.data);
			} catch (e:*) {
				trace("Couldn't Load: " + e.message);
			}
			var list:XMLList = myXML.children();
			var newRoom:Room;

			/** Nested loops to go through entire XML Doc **/
			for (var i:int=0; i< list.length(); i++) {
				//We are at buildings depth in the XML doc
				buildingName.push(list[i]);
				var floorList:XMLList = list[i].children();
				for (var j:int=0; j < floorList.length(); j++) {
					//We are at floor depth in the XML doc
					var roomList:XMLList = floorList[j].children();
					for (var k:int=0; k < roomList.length(); k++) {
						//We are at room depth in the XML doc
						newRoom = new Room(roomList[k].@name, roomList[k].@num, roomList[k].@type, floorList[j].@level, buildingName[i].@name, roomList.info[0] );
						if ( roomList[k].@type == "prof") {
							profName.push(roomList[k]);
						} else {
							roomName.push(roomList[k]);
						}
						myRooms.push(newRoom);
					}
				}
			}
		}

		//Takes all the keywords and searches for rooms with the corresponding keywords
		//@returns all rooms found
		public function searchFor( input:String ):Array {
			input = " "+input;
			var curRoom:Room;
			var keywords:Array = input.split(" ");
			var roomsFound:Array = new Array();
			//Searching each keyword
			for (var i:int = 0; i < keywords.length; i++) {
				if ( keywords[i] != "" ) {
					
					//Searching each room
					for (var j:int = 0; j < myRooms.length; j++) {
						curRoom = Room(myRooms[j]);
						if (Room(curRoom).hasKeyword( keywords[i] )) {
							roomsFound.push(curRoom);
						}
					}
				}
			}
			return roomsFound;
		}
		//Function to continually update system and screen
		public function sysUpdate( event:Event ):void {

			//Turns the search bar on and off depending if on main screen
			if ( this.currentLabel != "satilite" ) {
				//Block of code collapses and clears search and results info
				searchU.gotoAndStop("closed");
				searchU.searchIn.text = "";
				searchU.resultTab.gotoAndStop("down");
				searchU.numberOfResults = 0;
				searchU.visible = false;
				searchU.barhead.play();
			} else {
				//Brings it back
				searchU.visible = true;
			}
		}
	}
}