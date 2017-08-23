package source{

	import flash.display.*;
	import flash.events.*;
	import flash.net.*;

	public class RoomButton extends SimpleButton {

		private var roomData:Room;
		public var roomName:String;
		public var imgURL:String;
		public var quickImgURL:String;
		var imgLoader:Loader;
		public var myRoomPix:Object = new Object();
		var theTour:TourMe;
		var build:String;

		public function RoomButton( myRoom:Room = null ):void {
			theTour = TourMe( this.parent);
			imgLoader = new Loader();
			roomData = myRoom;
			myRoomPix.visible = false;
			setImgURL();
			loadImageofMyRoom();
			this.addEventListener(MouseEvent.MOUSE_OVER, rollOverHandler );
			this.addEventListener(MouseEvent.MOUSE_OUT, rollOutHandler );
			this.addEventListener(MouseEvent.CLICK, clickHandler );
		}
		
		//Shows a mini display of room, just name and picture;
		public function rollOverHandler(event:MouseEvent):void {
			myRoomPix = theTour.addChild(imgLoader);
			myRoomPix.mouseEnabled = false;
			switch ( build ) {
				case "b":
					myRoomPix.height = 100;
					myRoomPix.width = 150;
					myRoomPix.x = 250;
					myRoomPix.y = 10;
					break;
				case "e":
					myRoomPix.height = 125;
					myRoomPix.width = 166;
					myRoomPix.x = 200;
					myRoomPix.y = 0;
					break;
				case "p":
					myRoomPix.height = 150;
					myRoomPix.width = 200;
					myRoomPix.x = 350;
					myRoomPix.y = 250;
					break;
				case "n":
					myRoomPix.height = 150;
					myRoomPix.width = 200;
					myRoomPix.x = 200;
					myRoomPix.y = 50;
					break;
				default:
					myRoomPix.height = 150;
					myRoomPix.width = 200;
					myRoomPix.x = 600;
					myRoomPix.y = 600;
					break;
			}
		}
		public function rollOutHandler(event:MouseEvent):void {
			theTour.removeChild(imgLoader);
		}
		public function clickHandler(event:MouseEvent):void {
			//Opens a full screen window with details about room
		}
		public function get Data():Room {
			return roomData;
		}
		public function set Data( value:Room ) {
			roomData = value;
		}
		public function loadImageofMyRoom(){
			trace("start load");
				imgLoader.load( new URLRequest(quickImgURL) );
				imgLoader.addEventListener( IOErrorEvent.IO_ERROR, tryBlank);
				imgLoader.addEventListener(Event.COMPLETE, loadComp );			
		}
		public function tryBlank (event:Event ):void{
			trace("catch");
			event.target.unload();
			imgURL = "pictures/nopix.jpg";
			quickImgURL = "pictures/small/nopix.JPG";
			event.target.load( new URLRequest( quickImgURL ) );
		}
		public function loadComp( event:Event ):void{
				trace("load:");
		}
		//Sets the url for both quickLoad Image and large image
		public function setImgURL():void {
			trace("-----------"+ this.name + "-------------");
			build = this.name.slice(0,1);
			trace( build );
			var num:String = this.name.slice(1, 4);
			trace( num );
			var altRoom:String;
			try {
				altRoom = this.name.slice (4,5);
			} catch (e:Error) {
				altRoom = "";
			}
			if ( altRoom == "_"){
				altRoom = "";
			}
			if ( whichBuilding( build ) != "nopix" ) {
				imgURL = "pictures/"+whichBuilding(build)+"_"+num+altRoom+".jpg";
				quickImgURL = "pictures/small/"+whichBuilding(build)+"_"+num+altRoom+".jpg";
				if( whichBuilding( build ) == "sae" ){
					imgURL = "pictures/"+whichBuilding(build)+"_n"+num+altRoom+".jpg";
					quickImgURL = "pictures/small/"+whichBuilding(build)+"_n"+num+altRoom+".jpg";
				}
			} else {
				imgURL = "pictures/nopix.jpg";
				quickImgURL = "pictures/small/nopix.jpg";
			}
			trace("imgURL = " + imgURL );
			trace("quickImgURL = " + quickImgURL );
		}
		//takes the character at the begining of the name and decides which building
		public function whichBuilding(letter:String):String {
			switch ( letter ) {
				case "b":
					return "but";
					break;
				case "e":
					return "eng";
					break;
				case "p":
					return "pot";
					break;
				case "n":
					return "sae";
					break;
				case "s":
					return "ste";
					break;
				default:
					return "nopix";
					break;
			}
		}
	}// End Class
}// End Pacakge