let preloadState = function(){
	// There's nothing here!
}

preloadState.prototype.preload = function() {
	game.load.image("clipboard_png", "assets/clipboard.png");
}

preloadState.prototype.create = function() {
	game.state.start("Gameplay");
}

preloadState.prototype.update = function() {
	// There's nothing here!
}