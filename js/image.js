'use strict';

function generateImages(){
	var canvas = document.createElement('canvas');
	canvas.width = IMG_SHIP.width;
	canvas.height = IMG_SHIP.height;
	var ctx = canvas.getContext('2d');

	ctx.globalAlpha = SHIP_PAST_ALPHA;
	ctx.drawImage(IMG_SHIP, 0, 0);
	window.IMG_SHIP_PAST = new Image();
	IMG_SHIP_PAST.src = canvas.toDataURL();
}
