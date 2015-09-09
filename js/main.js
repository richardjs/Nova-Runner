'use strict';

window.addEventListener('load', function(){
	generateImages();

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

	var level = 1
	window.world = new World(level++);

	setTimer(function(){
		world.update();
		if(world.isOver && !world.rewinding && !world.finalPlay){
			window.world = new World(level++);
		}
	}, 1000/FPS);

	function frame(time){
		world.render();
		requestAnimationFrame(frame);
	}
	requestAnimationFrame(frame);
});
