'use strict';

function Shot(ship){
	Entity.call(this, {
		pos: {
			x: ship.pos.x,
			y: ship.pos.y
		},
		velocity: {
			x: ship.velocity.x + SHOT_SPEED*Math.cos(ship.angle),
			y: ship.velocity.y + SHOT_SPEED*Math.sin(ship.angle)
		},
		radius: SHOT_RADIUS,
		color: SHOT_COLOR
	});
	this.ttl = SHOT_TTL;
}

Shot.prototype = Object.create(Entity.prototype);

Shot.prototype.update = function(){
	Entity.prototype.update.call(this);

	for(var i = 0; i < world.entities.length; i++){
		var entity = world.entities[i];
		if(entity instanceof Rock){
			if(this.collides(entity)){
				entity.hit();
				stardust.add(this.pos.x, this.pos.y, FX_ROCK_HIT);
				world.entities.remove(this);
			}
		}
	}

	this.ttl--;
	if(this.ttl === 0){
		world.entities.remove(this);
	}
}
