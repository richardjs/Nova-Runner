'use strict';

var HEIGHT = 350;
var WIDTH = 450;
var OFFSCREEN_SPACE = 10;

var FPS = 60;

var WORLD_FRAMES = 10 * FPS;

var SHIP_ROTATE_SPEED = Math.PI*2 / FPS;
var SHIP_ACCELERATION = 3 / FPS;

var SHOT_RADIUS = 1;
var SHOT_SPEED = 3;
var SHOT_TTL = 1 * FPS;
var SHOT_COLOR = '#474';

var ROCK_LARGE_RADIUS = 10;
var ROCK_MEDIUM_RADIUS = 7;
var ROCK_SMALL_RADIUS = 3;
var ROCK_RADIUS_SPEED_SCALE = 2;
var ROCK_MAX_SPEED = 15; // This will divided by the radius*ROCK_RADIUS_SPEED_SCALE

var IMG_SHIP = document.getElementById('IMG_SHIP');
