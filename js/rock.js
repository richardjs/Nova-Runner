'use strict';

function Rock(radius){
	Entity.call(this, {
		pos: {
			x: Math.floor(Math.random() * WIDTH),
			y: Math.floor(Math.random() * HEIGHT)
		},
		velocity: {
			x: Math.random() * ROCK_MAX_SPEED * randomSign() / (radius*2),
			y: Math.random() * ROCK_MAX_SPEED * randomSign() / (radius*2),
		},
		radius: radius,
		color: '#444'
	});

	this.debris = [];
	var debrisRadius = 0;
	if(this.radius === ROCK_LARGE_RADIUS){
		debrisRadius = ROCK_MEDIUM_RADIUS;
	}else if(this.radius === ROCK_MEDIUM_RADIUS){
		debrisRadius = ROCK_SMALL_RADIUS;
	}
	if(debrisRadius){
		for(var i = 0; i < 2; i++){
			this.debris.push(new Rock(debrisRadius));
		}
	}
}

Rock.prototype = Object.create(Entity.prototype);

Rock.prototype.hit = function(){
	world.entities.remove(this);
	for(var i = 0; i < this.debris.length; i++){
		var debris = this.debris[i];
		debris.pos.x = this.pos.x;
		debris.pos.y = this.pos.y;
		world.entities.push(debris);
	}
}
