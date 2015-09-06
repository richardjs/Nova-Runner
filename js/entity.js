'use strict';

function Entity(options){
	this.pos = options.pos || {x: 0, y: 0};
	this.velocity = options.velocity || {x: 0, y:0};
	this.angle = options.angle || 0;
	this.image = options.image;
	this.radius = options.radius || 0;
	this.color = options.color || '#fff';

	this.initialPos = clone(this.pos);
	this.initialVelocity = clone(this.velocity);
	this.initialAngle = this.angle;
}

Entity.prototype.reset = function(){
	this.pos = clone(this.initialPos);
	this.velocity = clone(this.initialVelocity);
	this.angle = this.initialAngle;
}

Entity.prototype.accelerate = function(acceleration){
	this.velocity.x += Math.cos(this.angle)*acceleration;
	this.velocity.y += Math.sin(this.angle)*acceleration;
}

Entity.prototype.collides = function(other){
	var distance = Math.sqrt(Math.pow(this.pos.x - other.pos.x, 2) + Math.pow(this.pos.y - other.pos.y, 2));
	return distance < this.radius + other.radius;
}

Entity.prototype.update = function(){
	this.pos.x += this.velocity.x;
	this.pos.y += this.velocity.y;

	if(this.pos.x < -OFFSCREEN_SPACE){
		this.pos.x += WIDTH + 2*OFFSCREEN_SPACE;
	}else if(this.pos.x > WIDTH + OFFSCREEN_SPACE){
		this.pos.x -= WIDTH + 2*OFFSCREEN_SPACE;
	}
	if(this.pos.y < -OFFSCREEN_SPACE){
		this.pos.y += HEIGHT + 2*OFFSCREEN_SPACE;
	}else if(this.pos.y > HEIGHT + OFFSCREEN_SPACE){
		this.pos.y -= HEIGHT + 2*OFFSCREEN_SPACE;
	}
}

Entity.prototype.render = function(){
	if(this.image){
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.image,  -this.image.width/2, -this.image.height/2);
		ctx.restore();
	}else{
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
		ctx.fill();
	}
}
