'use strict';

var HEIGHT = 350;
var WIDTH = 450;
var OFFSCREEN_SPACE = 10;

var FPS = 60;

var WORLD_FRAMES = 10 * FPS;

var INITIAL_LIVES = 3;
var NEW_LIFE_POINTS = 500;

var SHIP_ROTATE_SPEED = Math.PI*2 / FPS;
var SHIP_ACCELERATION = 3 / FPS;
var SHIP_AUTO_INTERVAL = Math.floor(FPS / 4);

var IMG_SHIP = document.getElementById('IMG_SHIP');
var SHIP_PAST_ALPHA = .5;

var SHOT_RADIUS = 1.5;
var SHOT_SPEED = 3;
var SHOT_TTL = 1 * FPS;
var SHOT_COLOR = '#474';

var ROCK_LARGE_RADIUS = 10;
var ROCK_MEDIUM_RADIUS = 7;
var ROCK_SMALL_RADIUS = 3;
var ROCK_RADIUS_SPEED_SCALE = 1.5;
var ROCK_MAX_SPEED = 8; // This will divided by the radius*ROCK_RADIUS_SPEED_SCALE
var ROCK_SPAWN_MARGIN_X = WIDTH/2.5;
var ROCK_SPAWN_MARGIN_Y = HEIGHT/2.5;
var ROCK_POINTS = 10;

var GAME_OVER_TIME = 5;

var IMG_RED_PARTICLE;
var IMG_YELLOW_PARTICLE;
(function(){
	var canvas = document.createElement('canvas');
	canvas.width = 1;
	canvas.height = 1;
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = '#a22'
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	IMG_RED_PARTICLE = new Image();
	IMG_RED_PARTICLE.src = canvas.toDataURL();
	ctx.fillStyle = '#aa4'
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	IMG_YELLOW_PARTICLE = new Image();
	IMG_YELLOW_PARTICLE.src = canvas.toDataURL();
})();

var FX_SHIP_THRUST = {
	width: 0,
	height: 0,
	image: function(){
		return function(){
			if(Math.random() < .8){
				return IMG_RED_PARTICLE;
			}
			return IMG_YELLOW_PARTICLE;
		}
	},
	emitCount: 1,
	ttl: 0,
	particleTTL: 500,
}

var FX_ROCK_HIT = {
	width: 0,
	height: 0,
	image: function(){
		return function(){
			var r = Math.random();
			if(r < .80){
				return IMG_YELLOW_PARTICLE;
			}
			return IMG_RED_PARTICLE;
		}
	},
	ttl: 0,
	emitCount: 40,
	particleTTL: 750,
	particleVelocity: function(){
		var angle = Math.PI*2*Math.random();
		var speed = 275*Math.random();
		return function(t){
			return {
				x: Math.cos(angle) * speed,
				y: Math.sin(angle) * speed
			}
		}
	},
	opacity: function(){
		return function(t){
			return (Math.max(750-t, 0))/750
		}
	}
}

var FX_SHIP_EXPLODE = {
	width: 0,
	height: 0,
	image: function(){
		return function(){
			var r = Math.random();
			if(r < .80){
				return IMG_RED_PARTICLE;
			}
			return IMG_YELLOW_PARTICLE;
		}
	},
	ttl: 0,
	emitCount: 100,
	particleTTL: 1500,
	particleVelocity: function(){
		var angle = Math.PI*2*Math.random();
		var speed = 350*Math.random();
		return function(t){
			return {
				x: Math.cos(angle) * speed,
				y: Math.sin(angle) * speed
			}
		}
	},
	opacity: function(){
		return function(t){
			return (Math.max(1500-t, 0))/1500
		}
	}
}
