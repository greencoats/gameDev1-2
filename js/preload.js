// JavaScript source code
let preloadState = function(){

}

preloadState.prototype.preload = function(){
	game.load.image("clipboard_png", "assets/clipboard.png");
	game.load.image("metalClipUp_png", "assets/metalClipUp.png");
	game.load.image("metalClipDown_png", "assets/metalClipDown.png");
	game.load.image("textBubble_png", "assets/bubble.png");
	game.load.image("paper_png", "assets/paper.png");
	game.load.image("board_png", "assets/board.png");
}

preloadState.prototype.create = function(){
	game.state.start("Gameplay");
}

preloadState.prototype.update = function(){

}