'use strict';

function setTimer(func, interval){
	var lastTime = Date.now()
	var drift = 0;
	var timer;

	function timeHit(){
		var now = Date.now()
		var delta = now - lastTime;
		lastTime = now;
		drift += delta - interval;

		func();
		
		timer = setTimeout(timeHit, Math.max(interval - drift, 0));
	}

	timer = setTimeout(timeHit, interval);

	window.addEventListener('blur', function(){
		clearInterval(timer);
	});
	window.addEventListener('focus', function(){
		lastTime = Date.now()
		drift = 0;
		timer = setTimeout(timeHit, Math.max(interval - drift, 0));
	});
}
