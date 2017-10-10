// JavaScript source code
let preloadState = function(){

}

preloadState.prototype.preload = function(){
	game.load.image("platform", "assets/platform.png");
	game.load.image("sky", "assets/sky.png");
	game.load.image("star", "assets/star.png");
	game.load.spritesheet("onion", "assets/onion.png", 32, 48);
}

preloadState.prototype.create = function(){
	game.state.start("Intro");
}

preloadState.prototype.update = function(){

}