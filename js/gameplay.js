let gameplayState = function(){

};

gameplayState.prototype.preload = function() {

};

gameplayState.prototype.create = function() {
	this.clipboard = game.add.sprite(0, 150, "clipboard_png");
	this.clipboard.inputEnabled = true;
	this.clipboard.events.onInputDown.add(this.moveClipboard, this);

	// STARS
	this.statements = game.add.group();
};

gameplayState.prototype.update = function() {
	// Nothing yet
};

gameplayState.prototype.moveClipboard = function() {
	if (this.clipboard.y == 150) {
		this.clipboard.y = 850;
	}
	else {
		this.clipboard.y = 150;
	}
}