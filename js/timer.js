'use strict';

function setTimer(func, interval){
	var lastTime = Date.now()
	var drift = 0;
	var timer;

	window.paused = false;
	window.pause = function(){
		clearInterval(timer);
		paused = true;
	}
	window.unpause = function(){
		lastTime = Date.now()
		drift = 0;
		timer = setTimeout(timeHit, Math.max(interval - drift, 0));
		paused = false;
	}

	function timeHit(){
		var now = Date.now()
		var delta = now - lastTime;
		lastTime = now;
		drift += delta - interval;

		func();
		
		timer = setTimeout(timeHit, Math.max(interval - drift, 0));
	}

	timer = setTimeout(timeHit, interval);

	var firstFocus = true;
	window.addEventListener('blur', function(){
		pause();
	});
	window.addEventListener('focus', function(){
		if(!firstFocus){
			unpause();
		}else{
			firstFocus = false;
		}
	});
}
