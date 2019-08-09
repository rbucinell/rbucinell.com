package source{
	
	import flash.display.*;
	import flash.events.*;
	
	public class Room extends MovieClip{
		
		var theTour:TourMe;
		//Variable
		var roomName:String;
		var roomNum:String;
		var inBuilding:String;
		var myType:String;
		var myURLpath:String;
		var floorLevel:String;
		var myInfo:String;
		var myData:Array;
		
		public function Room( myName:String, 
							  myNum:String,
							  type:String ="lab",
							  lvel:String = "1",
							  building:String = "unknown",
							  nfo:String= ""){
			theTour = TourMe(this.parent);
			roomName = myName;
			roomNum = myNum;
			inBuilding = building;
			floorLevel = lvel;
			myType = type;
			myInfo = nfo;
			createLink();
			createData();
		}
		public function createLink():void{
			var mySpot:String ="";
			switch( this.Building ) {
				case "potter":
					mySpot="pot_"+this.Num;
					break;
				case "Engineering Lab":
					mySpot="eng_"+this.Num;
					break;
				case "Science and Engineering":
					mySpot="sae_"+this.Num;
					break;
				case "Steinmetz":
					mySpot="ste_"+this.Num;
					break;
				case "Butterfield":
					mySpot="but_"+this.Num;
					break;
				case "Solar Rooftop Lab":
					mySpot="sol_"+this.Num;
					break;
			}
			var myURL:String ="pictures/"+mySpot+".jpg";
			myURLpath = myURL;
		}
		
		//Creates the data that will be searched with
		public function createData():void{
			myData = new Array();
			myData.push(this.Name);
			myData.push(this.Num);
			myData.push(this.Building);
			myData.push(this.Type);
			myData.push(this.Path);
			
			myInfo = " " + myInfo;
			var dataPieces:Array = myInfo.split(" ");
			for( var i:int = 0; i < dataPieces.length; i++ ){
				if( dataPieces[i] != "" ){
					myData.push(dataPieces[i]);
				}
			}
		}

		//Searches all the data in the Room for a keyword, returning true if it finds one
		public function hasKeyword( keyword:String ):Boolean {
			keyword = keyword.toLowerCase();
			var foundMe:Boolean = false;
			createData();
			for( var i:int=0; i < myData.length; i++ ){
				if( myData[i].search(keyword) >= 0 ){
					foundMe = true;
				}
			}
			return foundMe;
		}
		
		//Accessors to roomName
		public function get Name():String{
			return roomName.toLowerCase();
		}
		public function set Name(value:String):void{
			roomName = value;
		}
		//Accessors to roomNum
		public function get Num():String{
			return roomNum.toLowerCase();
		}
		public function set Num(value:String):void{
			roomNum = value;
		}
		//Accessors to inBuilding
		public function get Building():String{
			return inBuilding.toLowerCase();
		}
		public function set Building(value:String):void{
			inBuilding = value;
		}
		
		//Accessors to myType
		public function get Type():String{
			return myType.toLowerCase();
		}
		public function set Type(value:String):void{
			myType = value;
		}
		
		//Accessors to myURLpath
		public function get Path():String{
			return myURLpath;
		}
		public function set Path(value:String):void{
			myURLpath = value;
		}
		//Accessors to floorLevel
		public function get Floor():String{
			return floorLevel.toLowerCase();
		}
		public function set FLoor( value:String ):void{
			floorLevel = value;
		}
		public function get Info():String{
			return myInfo;
		}
		public function set Info( value:String ):void{
			myInfo = value;
		}	
		public function resultString():String{
			return "(" + roomNum + ") "+ roomName + " in " + inBuilding;
		}
		public override function toString():String{
			return "Room: " + roomNum + " is called " + roomName + ". Its located in " + inBuilding + ".";
		}
	}
}