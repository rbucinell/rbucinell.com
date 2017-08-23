package source{
	
	import flash.display.*;
	import flash.utils.Timer;
	import flash.events.*;
	import flash.text.*;
	
	public class RoomAlert extends MovieClip{
		
		//Textfield, dynamic text box that display's message
		// alertText:DynamicTextbox
		var theRoom:Room;
		var myAlert:String;
		var timer:Timer;
		
		public function RoomAlert(){
			timer = new Timer(15000,1); //15 second timer
			this.visible = false;
			myAlert = "Your search result is: Room xxx of Xyz. The room is called Xxxx Yyyy Zzzz";
		}
		
		public function alertThisRoom( room:Room ){
			myAlert = "Your search result is: Room "+room.Num+" of " + room.Building + ". The room is called "+room.Name+".";
			alertText.text = myAlert;
			this.visible = true;
			timer.addEventListener( TimerEvent.TIMER_COMPLETE, finishWait);
			timer.start();
			
		}
		public function finishWait( event:TimerEvent ){
			timer.reset();
			//event.target.parent().play();
			this.play();
		}
	}
}