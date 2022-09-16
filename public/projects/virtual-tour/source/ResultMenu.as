package source{
	
	import flash.display.*;
	import flash.events.*;
	import flash.text.*;
	
	public class ResultMenu extends MovieClip{
		
		var roomResults:Array= new Array();
		var numRoom:int = 0;
		var isClosed:Boolean;
		var isMaxUp:Boolean = false;
		var roomNumPattern:RegExp = /\d{1}[_out]/i;
		
		var theTour:TourMe;
		var searchBar:SearchBar;
		
		/* Var in MC
		resultTab		- the instance name of this
		controlBox		- invisible hit box that will control the movement of this
		
		textButton_1	- top text box
		textButton_2	- second text box down
		textButton_3	- third text box down
		textButton_4	- fourth text box down
		textButton_5	- bottom text box
		*/
		
		public function ResultMenu():void{
			theTour = TourMe(this.parent.parent);
			searchBar = SearchBar(this.parent);
			
			this.addEventListener( Event.ENTER_FRAME, updateBox );
			controlBox.addEventListener( MouseEvent.CLICK, moveBox );
			
			textButton_1.addEventListener( MouseEvent.MOUSE_OVER, highlightMe );
			textButton_2.addEventListener( MouseEvent.MOUSE_OVER, highlightMe );
			textButton_3.addEventListener( MouseEvent.MOUSE_OVER, highlightMe );
			textButton_4.addEventListener( MouseEvent.MOUSE_OVER, highlightMe );
			textButton_5.addEventListener( MouseEvent.MOUSE_OVER, highlightMe );
			
			textButton_1.addEventListener( MouseEvent.MOUSE_OUT, unHighightMe );
			textButton_2.addEventListener( MouseEvent.MOUSE_OUT, unHighightMe );
			textButton_3.addEventListener( MouseEvent.MOUSE_OUT, unHighightMe );
			textButton_4.addEventListener( MouseEvent.MOUSE_OUT, unHighightMe );
			textButton_5.addEventListener( MouseEvent.MOUSE_OUT, unHighightMe );
			
			textButton_1.addEventListener( MouseEvent.CLICK, searchThat );
			textButton_2.addEventListener( MouseEvent.CLICK, searchThat );
			textButton_3.addEventListener( MouseEvent.CLICK, searchThat );
			textButton_4.addEventListener( MouseEvent.CLICK, searchThat );
			textButton_5.addEventListener( MouseEvent.CLICK, searchThat );
		}
		
		//Method to constantly update variables for Result tab
		public function updateBox ( event:Event ):void {
			numRoom = roomResults.length;
			if( roomResults.length == 0 || roomResults== null ){
				this.gotoAndStop("down");
			}
		}
		
		//Function that controls the movement 
		public function moveBox (event:MouseEvent):void {
			if( isClosed ){
				this.addEventListener(Event.ENTER_FRAME, keepGoing);
				isClosed = false;
				if( !isMaxUp ) {this.play()};	
			}else{
				isMaxUp = false;
				this.gotoAndPlay(numRoom+"_close");	
			}
		}
		public function keepGoing (event:Event):void{
			//var int curNumRoomHeight = String(Object(roomNumPattern.exec( this.currentLabel ))[0]);
			//gets Current number out of currentLabel
			var curLabelNum:int = int(String(this.currentLabel.match( roomNumPattern )[0]).match(/\d{1}/i)[0]);
			
			if( curLabelNum != numRoom-1 ){
				this.stop();
				this.gotoAndStop(this.currentFrame+1);
				this.removeEventListener(Event.ENTER_FRAME, keepGoing );
				isMaxUp = true;
			}
		}
		public function highlightMe (event:MouseEvent):void{
			TextField(event.target).backgroundColor = 0xCCCCCC;
		}
		public function unHighightMe (event:MouseEvent):void{
			TextField(event.target).backgroundColor = 0xFFFFFF;
		}
		public function searchThat (event:MouseEvent):void{
			var num:int = -1;
			switch(event.target.name){
				case "textButton_1":
					num = 0;
					break;
				case "textButton_2":
					num = 1;
					break;
				case "textButton_3":
					num = 2;
					break;
				case "textButton_4":
					num = 3;
					break;
				case "textButton_5":
					num = 4;
					break;				
			}
			
			SearchBar(this.parent).searchIn.text = "";
			theTour.gotoAndStop( searchBar.isWhere(roomResults[num].Building, roomResults[num].Floor) );
			theTour.alert.alertThisRoom(roomResults[num]);
			this.gotoAndStop("down");
			for( var i:int = 0; i < num ; i++ ){
				roomResults.pop();
			}
		}
		
		//Fills the text boxes in the result tab with up to the first 5 results found
		public function fillSearchResultBox( list:Array ):void{
			if( list.length > 5 ){
				var tempArray:Array = new Array();
				for( var i:int=0; i < 5; i++ ){
					tempArray.push(list[i]);
				}
				list = tempArray;
				tempArray = null;
			}else{
				roomResults = list;
			}
			switch( list.length ){
				case 5:
					textButton_5.text = roomResults[4].resultString();
				case 4:
					textButton_4.text = roomResults[3].resultString();
				case 3:
					textButton_3.text = roomResults[2].resultString();
				case 2:
					textButton_2.text = roomResults[1].resultString();
				case 1:
					textButton_1.text = roomResults[0].resultString();
					break;
			}
		}
	}
}