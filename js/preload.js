let preloadState = function(){
	// There's nothing here!
}

preloadState.prototype.preload = function() {
	// Clipboard assets
	game.load.image("metalClipUp_png", "assets/metalClipUp.png");
	game.load.image("metalClipDown_png", "assets/metalClipDown.png");
	game.load.image("paper_png", "assets/paper.png");
	game.load.image("board_png", "assets/board.png");

	// Person of Interest assets
	game.load.image("poiPortrait_png", "assets/poiPortrait.png");
	game.load.image("speechBubble_png", "assets/speechBubble.png");
}

preloadState.prototype.create = function() {
	game.state.start("Gameplay");
}

preloadState.prototype.update = function() {
	// There's nothing here!
}