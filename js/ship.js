'use strict';

function Ship(){
	Entity.call(this, {
		pos: {
			x: WIDTH/2,
			y: HEIGHT/2
		},
		radius: 4,
		image: IMG_SHIP
	});
	
	this.inputs = [];
	this.autoTimer = 0;
}

Ship.prototype = Object.create(Entity.prototype);

Ship.prototype.update = function(){
	var input;
	if(this.inputs[world.frame]){
		input = clone(this.inputs[world.frame]);
		if(!world.finalPlay){
			this.image = IMG_SHIP_PAST;
		}else{
			this.image = IMG_SHIP;
		}
	}else{
		input = controller.buttons;
		this.inputs[world.frame] = clone(controller.buttons);
	}
	if(input.left){
		this.angle -= SHIP_ROTATE_SPEED;
	}
	if(input.right){
		this.angle += SHIP_ROTATE_SPEED;
	}
	if(input.accelerate){
		this.accelerate(SHIP_ACCELERATION);
	}
	if(input.shooting){
		world.entities.push(new Shot(this));
		input.shooting = false;
		this.autoTimer = SHIP_AUTO_INTERVAL;
	}else if(input.spaceDown && this.autoTimer <= 0){
		world.entities.push(new Shot(this));
		this.autoTimer += SHIP_AUTO_INTERVAL;
	}
	if(this.autoTimer > 0){
		this.autoTimer--;
	}

	Entity.prototype.update.call(this);

	for(var i = 0; i < world.entities.length; i++){
		var entity = world.entities[i];
		if(entity instanceof Rock){
			if(this.collides(entity)){
				world.shipHit = true;
				break;
			}
		}
	}

	if(input.accelerate){
		var fx = FX_SHIP_THRUST;
		var player = this;
		fx.particleVelocity = function(){
			var angle = player.angle + Math.PI + (Math.PI/4*Math.random() - Math.PI/8);
			var speed = 75*Math.random();
			return function(t){
				return {
					x: player.velocity.x*60 + Math.cos(angle) * speed,
					y: player.velocity.y*60 + Math.sin(angle) * speed
				}
			}
		}

		stardust.add(
			player.pos.x + Math.cos(player.angle + Math.PI) * 10,
			player.pos.y + Math.sin(player.angle + Math.PI) * 10,
			fx
		);
	}
}
