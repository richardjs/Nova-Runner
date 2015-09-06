'use strict';

Array.prototype.update = function(delta){
	for(var i = 0; i < this.length; i++){
		this[i].update(delta);
	}
}

Array.prototype.render = function(delta){
	for(var i = 0; i < this.length; i++){
		this[i].render();
	}
}

Array.prototype.remove = function(x){
	this.splice(this.indexOf(x), 1);
}

function clone(object){
	var c = {};
	for(var attribute in object){
		c[attribute] = object[attribute];
	}
	return c;
}

function randomSign(){
	if(Math.random() < .5){
		return -1;
	}
	return 1;
}
