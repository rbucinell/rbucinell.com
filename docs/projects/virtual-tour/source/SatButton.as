package source{
	
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	
	public class SatButton extends MovieClip{
		
		public function SatButton(){
			this.addEventListener(MouseEvent.CLICK, goHome);
		}
		public function goHome( event:MouseEvent ):void{
			TourMe(this.parent).gotoAndStop("satilite");
			TourMe(this.parent).alert.visible = false;
		}

	}
}