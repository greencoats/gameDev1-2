let gameplayState = function(){

};

gameplayState.prototype.preload = function() {
	// There's nothing here!
};

gameplayState.prototype.create = function() {
	this.suspect = game.add.sprite(0, 0, "poiPortrait_png");

	this.speech = game.add.group();
	this.speech.x = 0;
	this.speech.y = 295;

	this.speechBubble = this.speech.create(this.speech.x, this.speech.y + 50, "speechBubble_png");
	this.right = false;
	this.left = false;

	this.speechBubble.inputEnabled = true;
	this.speechBubble.events.onInputDown.add(this.beginSwipe, this);

	this.clipboard = game.add.group();
	this.clipboard.x = 0;
	this.clipboard.y = 425;

	this.board = this.clipboard.create(this.clipboard.x, this.clipboard.y + 50, "board_png");
	this.paper = this.clipboard.create(this.clipboard.x + 15, this.clipboard.y + 125, "paper_png");
	this.metalClip = this.clipboard.create(this.clipboard.x + 185, this.clipboard.y, "metalClipUp_png");

	this.metalClip.inputEnabled = true;
	//this.metalClip.events.onInputDown.add(this.moveClipboard, this);
};

gameplayState.prototype.update = function() {
	//gameplayState.prototype.moveBubble();
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

gameplayState.prototype.moveBubble = function () {
	//this.textBubble.worldX = this.textBubble.worldX + deltaX;
	//this.bubble.y += deltaY;
	if (this.right == true) {
		let tween = game.add.tween(this.speechBubble).to( { x: 200 }, 100, Phaser.Easing.Quadratic.Out, true);
		tween.yoyo(true, 1);
		this.right = false;
		//this.speechBubble.x = 1000;
	} else if (this.left == true) {
		let tween = game.add.tween(this.speechBubble).to( { x: -200 }, 100, Phaser.Easing.Quadratic.Out, true);
		tween.yoyo(true, 1);
		this.left = false;
		//this.speechBubble.x = -1000;
	}
};

//////////////////////////////////////////////////////////////////////////////////////////
//////http://www.emanueleferonato.com/2014/11/13/html5-swipe-controlled-sokoban-game-made-with-phaser/
	
// when the player begins to swipe we only save mouse/finger coordinates, remove the touch/click
// input listener and add a new listener to be fired when the mouse/finger has been released,
// then we call endSwipe function
gameplayState.prototype.beginSwipe = function() {
	this.startX = game.input.worldX;
	this.startY = game.input.worldY;
	game.input.onDown.remove(this.beginSwipe, this);
	game.input.onUp.add(this.endSwipe, this);
};

// function to be called when the player releases the mouse/finger
gameplayState.prototype.endSwipe = function() {
	// saving mouse/finger coordinates
	this.endX = game.input.worldX;
	this.endY = game.input.worldY;
	// determining x and y distance travelled by mouse/finger from the start
	// of the swipe until the end
	var distX = this.startX - this.endX;
	if (distX > 0) {
		this.left = true;
	} else if (distX < 0) {
		this.right = true;
	}
	this.moveBubble();

	// stop listening for the player to release finger/mouse, let's start listening for the player to click/touch
	game.input.onDown.add(this.beginSwipe, this);
	game.input.onUp.remove(this.endSwipe, this);

};
