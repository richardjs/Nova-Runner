'use strict';

function Controller(){
	this.buttons = {};
	this.shootingUp = true;

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
				break;
			case 80:
				if(paused){
					window.unpause();
				}else{
					window.pause();
					window.manuallyPaused = true;
				}
				break;
			case 32:
				this.buttons.shooting = (true && this.shootingUp);
				this.shootingUp = false;
				this.buttons.spaceDown = true;
				break;
			case 13:
				if(this.enterFunction){
					var func = this.enterFunction;
					this.enterFunction = null;
					func();
				}
				break;
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
				break;
			case 32:
				this.buttons.shooting = false;
				this.shootingUp = true;
				this.buttons.spaceDown = false;
				break;
		}
	}.bind(this));
}
