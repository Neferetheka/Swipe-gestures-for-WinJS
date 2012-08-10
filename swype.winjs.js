/*
Copyright 2012 Aerilys

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*
*Add an event handler to an element to detect pointer down
*Ensure that is a touch event
*MSPointerDown and MSPointerUp are Windows 8/IE10 events. You should look at another code to handle gestures on other browsers
*/
this._element.addEventListener("MSPointerDown", function (e) {
	//Touch event
	if (e.pointerType == 2) {
		context._gestureInfos = new Object();
		context._gestureInfos.started = true;
		context._gestureInfos.position = new Object();
		context._gestureInfos.position.x = e.x;
		context._gestureInfos.position.y = e.y;
		context._gestureInfos.startTime = Math.round(new Date().getTime() / 1000); //Unix Timestamp
	}
});

/*
*Add event handler to detect finger up on the element, and maybe raise the gesture event
*/
this._element.addEventListener("MSPointerUp", function (e) {
	if (e.pointerType == 2 && context._gestureInfos
		&& context._gestureInfos.started) {

		var ts = Math.round(new Date().getTime() / 1000);
		if (Math.abs(e.y - context._gestureInfos.position.y) < 50
			&& ts - context._gestureInfos.startTime <= 1 &&
			Math.abs(e.x - context._gestureInfos.position.x) > window.screen.availWidth * 0.4) {
			//Gesture done !
			if (e.x > context._gestureInfos.position.x)
				swypeRight();
			else
				swypeLeft();
		}

		context._gestureInfos.started = false;
	}
});