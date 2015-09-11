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

	mainMenu();
});

function mainMenu(){
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	ctx.fillStyle = '#a22';
	ctx.font = '20px courier';
	ctx.textAlign = 'center';
	ctx.fillText('n o v a   r u n n e r', 2*WIDTH/3, HEIGHT/2 - 20);
	ctx.font = '15px courier';
	ctx.fillText('press enter to start', 2*WIDTH/3, HEIGHT/2 + 25);

	ctx.fillStyle = '#522';
	ctx.font = '10px courier';
	ctx.textAlign = 'right';
	ctx.fillText('Richard Schneider', WIDTH - 5, HEIGHT - 5);

	ctx.fillStyle = '#855';
	ctx.fillRect(0, HEIGHT/2 - 1, WIDTH, 2);

	ctx.fillStyle = '#aa4';
	ctx.beginPath();
	ctx.arc(-2* HEIGHT/3, HEIGHT/2, HEIGHT, 0, Math.PI*2);
	ctx.fill();

	controller.enterFunction = startGame;
}

function startGame(){
	window.frozen = false;

	window.level = 1;
	window.score = 0;
	window.lives = INITIAL_LIVES;
	window.world = new World(level++);

	if(typeof(world.timer) === 'undefined'){
		window.timer = setTimer(function(){
			world.update();
			if(world.isOver && !world.rewinding && !world.finalPlay){
				lives += Math.floor((score + world.score) / NEW_LIFE_POINTS) - Math.floor(score / NEW_LIFE_POINTS);
				score += world.score;
				window.world = new World(level++);
			}
		}, 1000/FPS);
	}else{
		unpause();
	}

	function frame(time){
		if(!window.frozen){
			world.render();
			requestAnimationFrame(frame);
		}
	}
	requestAnimationFrame(frame);
};

function highScores(){
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	ctx.fillStyle = '#a22';
	ctx.font = '20px courier';
	ctx.textAlign = 'center';
	ctx.fillText('    h i g h   s c o r e s', WIDTH/2, 30);

	ctx.fillStyle = '#aa4';
	ctx.font = '15px courier';
	for(var i = 0; i < 10; i++){
		ctx.textAlign = 'right';
		ctx.fillText('richard' + '  ', WIDTH/2, 60 + 20*i);
		ctx.textAlign = 'left';
		ctx.fillText('  ' + 1000, WIDTH/2, 60 + 20*i);
	}
	if(window.lastScore){
		ctx.fillStyle = '#ddd';
		ctx.textAlign = 'right';
		ctx.fillText('last score' + '  ', WIDTH/2, 60 + 20*i);
		ctx.textAlign = 'left';
		ctx.fillText('  ' + window.lastScore, WIDTH/2, 60 + 20*i);
	}

	ctx.fillStyle = '#855';
	ctx.textAlign = 'center';
	ctx.fillText('press enter to play again', WIDTH/2, 60 + 20*i + 35);

	controller.enterFunction = startGame;
}
