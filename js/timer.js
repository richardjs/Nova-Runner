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
		if(window.frozen){
			return;
		}

		lastTime = Date.now()
		drift = 0;
		timer = setTimeout(timeHit, Math.max(interval - drift, 0));
		paused = false;
	}

	function timeHit(){
		if(window.frozen){
			return;
		}

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
		window.manuallyPaused = false;
	});
	window.addEventListener('focus', function(){
		if(!firstFocus && !window.manuallyPaused){
			unpause();
		}else{
			firstFocus = false;
		}
	});

	return timer;
}
