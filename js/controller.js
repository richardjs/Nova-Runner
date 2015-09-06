'use strict';

function Controller(){
	this.buttons = {};

	window.addEventListener('keydown', function(event){
		switch(event.which){
			case 37:
			case 65:
			case 81:
				this.buttons.left = true;
				break;
			case 39:
			case 68:
				this.buttons.right = true;
				break;
			case 38:
			case 87:
				this.buttons.accelerate = true;
			case 80:
				this.buttons.paused = !this.buttons.paused;
				break;
			case 32:
				this.buttons.shooting = true;
		}
	}.bind(this));

	window.addEventListener('keyup', function(event){
		switch(event.which){
			case 37:
			case 65:
			case 81:
				this.buttons.left = false;
				break;
			case 39:
			case 68:
				this.buttons.right = false;
				break;
			case 38:
			case 87:
				this.buttons.accelerate = false;
			case 32:
				this.buttons.shooting = false;
		}
	}.bind(this));
}
