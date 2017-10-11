let preloadState = function(){
	// There's nothing here!
}

preloadState.prototype.preload = function() {
	game.load.image("metalClipUp_png", "assets/metalClipUp.png");
	game.load.image("metalClipDown_png", "assets/metalClipDown.png");
	game.load.image("paper_png", "assets/paper.png");
	game.load.image("board_png", "assets/board.png");
}

<<<<<<< HEAD
preloadState.prototype.create = function(){
	game.state.start("gameplay");
}

preloadState.prototype.update = function(){

}
=======
preloadState.prototype.create = function() {
	game.state.start("Gameplay");
}

preloadState.prototype.update = function() {
	// There's nothing here!
}
>>>>>>> refs/remotes/origin/dev
