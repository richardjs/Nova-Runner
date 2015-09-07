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
		world.initalEntities.remove(world.currentShip);
		world.rewind();
	}else if(this.frame === WORLD_FRAMES){
		this.rewind();
	}
}

World.prototype.render = function(){
	if(this.rewinding){
		ctx.drawImage(this.videoCurrentFrame, 0, 0);
		return;
	}

	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	this.entities.render();

	ctx.fillStyle = '#fff';
	ctx.fillText(Math.floor((WORLD_FRAMES - this.frame) / 60) + 1, 5, 10);
}

World.prototype.rewind = function(){
	this.currentShip = new Ship();
	this.initalEntities.push(this.currentShip);
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
