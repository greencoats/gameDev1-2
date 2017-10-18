let preloadState = function(){
	// There's nothing here!
}

preloadState.prototype.preload = function() {
	// Clipboard assets
	game.load.image("clipboard_png", "assets/clipboard.png");
	game.load.image("metalClipUp_png", "assets/metalClipUp.png");
	game.load.image("metalClipDown_png", "assets/metalClipDown.png");
	game.load.image("paper_png", "assets/paper.png");
	game.load.image("board_png", "assets/board.png");

	// Person of Interest assets
	game.load.image("poiPortrait_png", "assets/customer.png");

	game.load.image("char1-0", "/assets/bartender.png");
	game.load.image("char1-1", "/assets/images/custodian.png");
	game.load.image("char1-2", "/assets/images/customer.png");

	game.load.image("char2-0", "/assets/images/officer.png");
	game.load.image("char2-1", "/assets/images/witness.png");

	game.load.image("char3-0", "/assets/images/martha.png");
	game.load.image("char3-1", "/assets/images/gang.png");

	game.load.image("speechBubble_png", "assets/speechBubble.png");
	game.load.image("truth_png", "assets/truth.png");
	game.load.image("lie_png", "assets/lie.png");
}

preloadState.prototype.create = function() {
	game.state.start("Intro");
}

preloadState.prototype.update = function() {
	// There's nothing here!
}
