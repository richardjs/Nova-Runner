'use strict';

window.addEventListener('load', function(){
	generateImages();
	window.stardust = new Stardust();

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
	ctx.fillStyle = '#f22';
	ctx.fillText('n         r          ', 2*WIDTH/3, HEIGHT/2 - 20);
	ctx.fillStyle = '#a22';
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

	controller.enterFunction = instructions;
}

function instructions(){
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	ctx.fillStyle = '#a22';
	ctx.font = '10px courier';
	ctx.textAlign = 'left';
	var text;
	text = [
		'"Even now it is clear that the most significant scientific discovery',
		'of the century was the spontaneous generation of a previously-unknown',
		'element in the moments immediately before the explosion of a nova."',
		'                 - "Novide", Dictionary of Chemical History, 3rd ed.'
	];

	for(var i = 0; i < text.length; i++){
		ctx.fillText(text[i], 20, 25 + 11*i);
	}
	text = [
		'"The Northern Cluster Minerals pilot strike enters its third week',
		'today. The strikers demand stricter safety protocols, but an NCM',
		'spokeman emphasized that their spacecraft are all equipped with',
		'state-of-the-art prior-explosion time-reversal engines (PETREs). The',
		'spokesman did not address the concerns over the short usable lifetime',
		'of PETREs, nor the difficulty of preventing paradoxes."',
		'                                - Milky Way Broadcasting news report'
	];
	for(var i = 0; i < text.length; i++){
		ctx.fillText(text[i], 20, 80 + 11*i);
	}
	text = [
		'"It\'s quiet out in space, but them stars sure light up pretty."',
		'                                  - Pilot Johnny "Too Close" Willery'
	];
	for(var i = 0; i < text.length; i++){
		ctx.fillText(text[i], 20, 170 + 11*i);
	}

	ctx.fillStyle = '#aa4';
	ctx.textAlign = 'center';
	ctx.fillText('i n s t r u c t i o n s', WIDTH/2, 203);

	ctx.textAlign = 'left';
	ctx.fillText('- Maneuver with arrow keys, shoot with space, and pause with \'p\'.', 20, 220);
	ctx.fillText('- Destroy all the rocks in a sector to jump to the next one.', 20, 220+11);
	ctx.fillText('- You have ten seconds until the nova explodes.', 20, 220+11*2);
	ctx.fillText('- Time will rewind right before the nova explodes.', 20, 220+11*3);
	ctx.fillText('- Previous timelines will continue to exist after a rewind.', 20, 220+11*4);
	ctx.fillText('- If *any* timeline gets hit, your emergency system will activate.', 20, 220+11*5);
	ctx.fillText('- Your emergency system has a limited number of uses (slang "lives").', 20, 220+11*6);
	ctx.fillText('- If you are hit with no lives, you die. Hope you got a high score!', 20, 220+11*7);
	ctx.fillText('- Each rock hit is worth 10 points.', 20, 220+11*8);
	ctx.fillText('- Extra lives given every 500 points, awarded after clearing a sector.', 20, 220+11*9);
	ctx.fillStyle = '#a22';
	ctx.textAlign = 'center';
	ctx.fillText('press enter to begin', WIDTH/2, 337);

	controller.enterFunction = startGame;
}

function startGame(){
	window.frozen = false;

	window.level = 1;
	window.score = 0;
	window.lives = INITIAL_LIVES;
	window.world = new World(level++);

	stardust.emitters = [];
	controller.buttons = {};

	if(typeof(world.timer) === 'undefined'){
		window.timer = setTimer(function(){
			world.update();
			stardust.update(1000/FPS);
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
			stardust.render(canvas, ctx);
			requestAnimationFrame(frame);
		}
	}
	requestAnimationFrame(frame);
}

function highScores(){
	if(!localStorage.getItem('nr-scores')){
		localStorage.setItem('nr-scores', JSON.stringify([
			{name: 'Johnny', score: 5960},
			{name: 'Jacsn', score: 2980},
			{name: 'Nick', score: 2210},
			{name: 'Josh', score: 1650},
			{name: 'Richard', score: 1279},
			{name: 'Ed', score: 920},
			{name: 'Brock', score: 650},
			{name: 'Rick', score: 430},
			{name: 'Garrett', score: 200},
			{name: 'Fredrick', score: 150}
		]));
	}

	var scores = JSON.parse(localStorage.getItem('nr-scores'));

	if(typeof(window.lastScore) !== 'undefined'){
		var highScore = false;
		if(scores.length < 10){
			highScore = true;
		}else{
			for(var i = 0; i < scores.length; i++){
				if(lastScore > scores[i].score){
					highScore = true;
					break;
				}
			}
		}
		if(highScore){
			var name = prompt('High score! What is your name?');
			var added = false;
			for(var i = 0; i < scores.length; i++){
				if(lastScore > scores[i].score){
					scores.splice(i, 0, {name: name, score: lastScore});
					added = true;
					break;
				}
			}
			if(!added){
				scores.push({name: name, score: lastScore});
			}
			scores = scores.slice(0, 10);
			localStorage.setItem('nr-scores', JSON.stringify(scores));
		}
	}

	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	ctx.fillStyle = '#a22';
	ctx.font = '20px courier';
	ctx.textAlign = 'center';
	ctx.fillText('    h i g h   s c o r e s', WIDTH/2, 30);

	ctx.fillStyle = '#aa4';
	ctx.font = '15px courier';
	for(var i = 0; i < scores.length; i++){
		ctx.textAlign = 'right';
		ctx.fillText(scores[i].name + '  ', WIDTH/2, 60 + 20*i);
		ctx.textAlign = 'left';
		ctx.fillText('  ' + scores[i].score, WIDTH/2, 60 + 20*i);
	}
	if(typeof(window.lastScore) !== 'undefined'){
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
