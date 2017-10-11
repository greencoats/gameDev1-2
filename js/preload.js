// JavaScript source code
let preloadState = function(){

}

preloadState.prototype.preload = function(){
	game.load.image("clipboard_png", "assets/clipboard.png");
	game.load.image("metalClipUp_png", "assets/metalClipUp.png");
	game.load.image("metalClipDown_png", "assets/metalClipDown.png");
}

preloadState.prototype.create = function(){
	game.state.start("Example");
}

preloadState.prototype.update = function(){

}
