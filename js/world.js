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

	if(this.frame % 4 === 0){
		var image = new Image();
		image.src = canvas.toDataURL();
		this.video.push(image);
	}

	if(this.shipHit){
		this.initalEntities.remove(world.currentShip);
		this.lostLife = true;
		this.rewind();
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
			ctx.fillText('Emergency system activated!', WIDTH/2, HEIGHT/2);
		}else if(this.isOver){
			ctx.fillStyle = '#3a3';
			ctx.font = '18pt courier';
			ctx.textAlign = 'center';
			ctx.fillText('Sector mined successfully!', WIDTH/2, HEIGHT/2);
		}
		return;
	}
	this.lostLife = false;

	var bgColorScale = Math.pow(this.frame, 5) / Math.pow(WORLD_FRAMES, 5);
	ctx.fillStyle = 'rgb('+Math.floor(150*bgColorScale)+','+Math.floor(150*bgColorScale)+','+Math.floor(120*bgColorScale)+')';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	this.entities.render();
}

World.prototype.rewind = function(){
	if(!this.isOver){
		this.currentShip = new Ship();
		this.initalEntities.push(this.currentShip);
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

	this.rewinding = true;
	this.videoCurrentFrame = this.video.pop();
}

World.prototype.over = function(){
	this.isOver = true;
}
