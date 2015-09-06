'use strict';

window.addEventListener('load', function(){
	window.canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	canvas.style.height = window.innerHeight-20+'px';
	window.addEventListener('resize', function(){
		canvas.style.height = window.innerHeight-20+'px';
	});

	window.ctx = canvas.getContext('2d')

	window.controller = new Controller();

	window.world = new World();

	setTimer(function(){
		world.update();
	}, 1000/FPS);

	function frame(time){
		world.render();
		requestAnimationFrame(frame);
	}
	requestAnimationFrame(frame);
});
