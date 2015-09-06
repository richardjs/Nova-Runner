'use strict';

function World(){
	this.entities = [];
	this.frame = 0;

	this.entities.push(new Ship());
	this.entities.push(new Rock(ROCK_LARGE_RADIUS));

	this.initalEntities = [];
	for(var i = 0; i < this.entities.length; i++){
		this.initalEntities.push(this.entities[i]);
	}
}

World.prototype.update = function(){
	this.entities.update();
	this.frame++;

	if(this.frame === WORLD_FRAMES){
		this.rewind();
	}
}

World.prototype.render = function(){
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	this.entities.render();

	ctx.fillStyle = '#fff';
	ctx.fillText(Math.floor((WORLD_FRAMES - this.frame) / 60) + 1, 5, 10);
}

World.prototype.rewind = function(){
	this.initalEntities.push(new Ship());
	this.entities = [];
	for(var i = 0; i < this.initalEntities.length; i++){
		this.entities.push(this.initalEntities[i]);
	}
	for(var i = 0; i < this.entities.length; i++){
		this.entities[i].reset();
	}
	controller.buttons = {};

	this.frame = 0;
}

World.prototype.over = function(){
}
