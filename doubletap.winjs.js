var _gestureManager = new Object();
element.addEventListener("MSPointerUp", function (e) {
	//Ensure it's touch and not on flipview control
	if (e.pointerType == 2 && e.srcElement.className.indexOf("win-navbutton") == -1) {
		var ts = Math.round(new Date().getTime() / 100);
		if (_gestureManager.lastTap &&
		   ts - _gestureManager.lastTap < 11) {

			//Double tap is here !
			
			_gestureManager.lastTap = null;
			return;
		}
		else
			_gestureManager.lastTap = ts;
	}
});