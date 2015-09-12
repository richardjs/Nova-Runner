'use strict';

function World(rocks){
	this.entities = [];
	this.frame = 0;

	this.currentShip = new Ship();
	this.entities.push(this.currentShip);
	for(var i = 0; i < rocks; i++){
		this.entities.push(new Rock(ROCK_LARGE_RADIUS));
	}

	this.initalEntities = [];
	for(var i = 0; i < this.entities.length; i++){
		this.initalEntities.push(this.entities[i]);
	}

	this.video = [];
	this.videoCurrentFrame;

	this.score = 0;
	this.timelines = 1;
}

World.prototype.update = function(){
	if(this.rewinding){
		if(this.video.length){
			this.videoCurrentFrame = this.video.pop();
		}else{
			this.rewinding = false;
			if(this.isOver){
				this.finalPlay = true;
			}
		}
		return;
	}

	this.entities.update();
	this.frame++;

	if(this.frame % 4 === 0 && !this.finalPlay){
		var image = new Image();
		image.src = canvas.toDataURL();
		this.video.push(image);
	}

	if(this.shipHit){
		this.initalEntities.remove(world.currentShip);
		this.lostLife = true;
		lives--;
		if(lives >= 0){
			this.rewind();
		}else{
			window.frozen = true;
			window.lastScore = score + world.score;
			highScores();
		}
	}else if(this.frame === WORLD_FRAMES){
		if(!this.finalPlay){
			this.rewind();
		}else{
			this.finalPlay = false;
		}
	}else if(this.isOver){
		if(!this.finalPlay){
			world.rewind();
		}
	}
}

World.prototype.render = function(){
	if(this.rewinding){
		ctx.drawImage(this.videoCurrentFrame, 0, 0);
		if(this.lostLife){
			ctx.fillStyle = '#a33';
			ctx.font = '18pt courier';
			ctx.textAlign = 'center';
			ctx.fillText('emergency system activated', WIDTH/2, HEIGHT/2);
		}else if(this.isOver){
			ctx.fillStyle = '#3a3';
			ctx.font = '18pt courier';
			ctx.textAlign = 'center';
			ctx.fillText('sector mined successfully', WIDTH/2, HEIGHT/2);
		}
		return;
	}
	this.lostLife = false;

	var bgColorScale = Math.pow(this.frame, 5) / Math.pow(WORLD_FRAMES, 5);
	ctx.fillStyle = 'rgb('+Math.floor(150*bgColorScale)+','+Math.floor(150*bgColorScale)+','+Math.floor(120*bgColorScale)+')';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	this.entities.render();

	ctx.fillStyle = '#ccc';
	ctx.font = '10px courier';
	ctx.textAlign = 'right';
	ctx.fillText('Score: ' + (score + world.score), WIDTH - 5, 10);
	ctx.fillText('Lives: ' + lives, WIDTH - 5, 20);
	ctx.textAlign = 'left';
	ctx.fillText('Sector: ' + (level - 1), 5, 10);
	ctx.fillText('Timelines: ' + this.timelines, 5, 20);
}

World.prototype.rewind = function(){
	if(!this.isOver){
		this.currentShip = new Ship();
		this.initalEntities.push(this.currentShip);
		if(!this.shipHit){
			this.timelines++;
		}
	}
	this.shipHit = false;

	this.entities = [];
	for(var i = 0; i < this.initalEntities.length; i++){
		this.entities.push(this.initalEntities[i]);
	}
	for(var i = 0; i < this.entities.length; i++){
		this.entities[i].reset();
	}

	controller.buttons = {};

	this.frame = 0;

	this.score = 0;

	this.rewinding = true;
	this.videoCurrentFrame = this.video.pop();
}

World.prototype.over = function(){
	this.isOver = true;
}
