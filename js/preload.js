let preloadState = function(){
	// There's nothing here!
}

preloadState.prototype.preload = function() {
	game.load.image("clipboard_png", "assets/clipboard.png");
	game.load.image("metalClipUp_png", "assets/metalClipUp.png");
	game.load.image("metalClipDown_png", "assets/metalClipDown.png");
}

preloadState.prototype.create = function() {
	game.state.start("Gameplay");
}

preloadState.prototype.update = function() {
	// There's nothing here!
}