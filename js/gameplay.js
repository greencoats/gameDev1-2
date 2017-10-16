let gameplayState = function(){

};

gameplayState.prototype.preload = function() {

};

gameplayState.prototype.create = function() {
	this.suspect = game.add.sprite(0, 0, "poiPortrait_png");

	this.speech = game.add.group();
	this.speech.x = 0;
	this.speech.y = 295;

	this.speechBubble = this.speech.create(this.speech.x, this.speech.y + 50, "speechBubble_png");

	this.clipboard = game.add.group();
	this.clipboard.x = 0;
	this.clipboard.y = 425;

	this.board = this.clipboard.create(this.clipboard.x, this.clipboard.y + 50, "board_png");
	this.paper = this.clipboard.create(this.clipboard.x + 15, this.clipboard.y + 125, "paper_png");
	this.metalClip = this.clipboard.create(this.clipboard.x + 185, this.clipboard.y, "metalClipUp_png");

	this.metalClip.inputEnabled = true;
	this.metalClip.events.onInputDown.add(this.moveClipboard, this);

	// STARS
	this.statements = game.add.group();
};

gameplayState.prototype.update = function() {
	// Nothing yet
};

gameplayState.prototype.moveClipboard = function() {
	if (this.clipboard.y == -215) {
		game.add.tween(this.clipboard).to( { y: 425 }, 500, Phaser.Easing.Quadratic.Out, true);
		this.metalClip.loadTexture("metalClipUp_png");
		game.add.tween(this.speech).to( { y: 295 }, 500, Phaser.Easing.Quadratic.Out, true);
	}
	else {
		game.add.tween(this.clipboard).to( { y: -215 }, 500, Phaser.Easing.Quadratic.Out, true);
		this.metalClip.loadTexture("metalClipDown_png");
		game.add.tween(this.speech).to( { y: -345 }, 500, Phaser.Easing.Quadratic.Out, true);
	}
}