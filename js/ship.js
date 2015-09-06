'use strict';

function Ship(){
	Entity.call(this, {
		pos: {
			x: WIDTH/2,
			y: HEIGHT/2
		},
		image: IMG_SHIP
	});
	
	this.inputs = [];
}

Ship.prototype = Object.create(Entity.prototype);

Ship.prototype.update = function(){
	var input;
	if(this.inputs[world.frame]){
		input = clone(this.inputs[world.frame]);
		this.image = IMG_SHIP_PAST;
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
	}

	Entity.prototype.update.call(this);
}
