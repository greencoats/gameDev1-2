// ##############################
// #####      GAMEPLAY      #####
// ##############################
let gameplayState = function() {

};

// ##############################
// #####  PRE/CREATE/UPDATE #####
// ##############################

gameplayState.prototype.preload = function() {
	// There's nothing here!
};

gameplayState.prototype.create = function() {
	this.initializeUI();
};

gameplayState.prototype.update = function() {
	this.moveBubbles();
	this.moveClipboard();
};

// ##############################
// #####       SWIPING      #####
// ##############################

gameplayState.prototype.textSwipeBegin = function() {
	// Save initial coordinates
	this.startX = game.input.worldX;
	this.swipingText = true;
};

gameplayState.prototype.textSwipeEnd = function() {
	// Save ending coordinates
	this.endX = game.input.worldX;
	this.swipingText = false;

	// find x distance travelled from the swipe start to end
	let distX = this.startX - this.endX;
	if (distX > 0) {
		this.swipedLeft = true;
	}
	else if (distX < 0) {
		this.swipedRight = true;
	}
	this.returnBubbles();
};

gameplayState.prototype.boardSwipeBegin = function() {
	this.startY = game.input.worldY;
	this.swipingBoard = true;
};

gameplayState.prototype.boardSwipeEnd = function() {
	// Save ending coordinates
	this.endY = game.input.worldY;
	this.swipingBoard = false;
	this.boardStart = this.clipboard.y;

	// find y distance travelled from the swipe start to end
	let distY = this.startY - this.endY;
	if (distY < -100) {
		this.up = true;
		this.down = false;
	}
	else if (distY > 100) {
		this.down = true;
		this.up = false;
	}
	this.placeClipboard();
};

// ##############################
// #####       UI CODE      #####
// ##############################

gameplayState.prototype.initializeUI = function() {
	// Background
	this.suspect = game.add.sprite(0, 0, "poiPortrait_png");

	// Speech Bubble
	this.speech = game.add.group();
	this.speech.x = 0;
	this.speech.y = 295;

	this.speechBubble = this.speech.create(this.speech.x, this.speech.y + 50, "speechBubble_png");
	this.truthBubble = this.speech.create(this.speech.x + 25, this.speech.y + 125, "truth_png");
	this.lieBubble = this.speech.create(this.speech.x + 625, this.speech.y + 125, "lie_png");
	this.truthBubble.scale.setTo(0.5, 0.5);
	this.lieBubble.scale.setTo(0.5, 0.5);

	this.swipedRight = false;
	this.swipedLeft = false;

	this.speechBubble.inputEnabled = true;
	this.speechBubble.events.onInputDown.add(this.textSwipeBegin, this);
	this.speechBubble.events.onInputUp.add(this.textSwipeEnd, this);

	// Clipboard
	this.clipboard = game.add.group();
	this.clipboard.x = 0;
	this.clipboard.y = 425;
	this.up = false;
	this.down = true;

	this.board = this.clipboard.create(this.clipboard.x, this.clipboard.y + 50, "board_png");
	this.paper = this.clipboard.create(this.clipboard.x + 15, this.clipboard.y + 125, "paper_png");
	this.metalClip = this.clipboard.create(this.clipboard.x + 185, this.clipboard.y, "metalClipUp_png");

	this.metalClip.inputEnabled = true;
	this.boardStart = 425;
	this.metalClip.events.onInputDown.add(this.boardSwipeBegin, this);
	this.metalClip.events.onInputUp.add(this.boardSwipeEnd, this);
};

gameplayState.prototype.moveClipboard = function() {
	if (this.swipingBoard === true) {
		if ((this.boardStart - this.startY) + (game.input.worldY) > - 415) {
			if ((this.boardStart - this.startY) + (game.input.worldY) < 600) {
				this.clipboard.y = (this.boardStart - this.startY) + (game.input.worldY);
			}
		}
	}
};

gameplayState.prototype.placeClipboard = function() {
	if (this.up === true) {	// (this.clipboard.y === -215)
		game.add.tween(this.clipboard).to( { y: 425 }, 500, Phaser.Easing.Quadratic.Out, true);
		this.metalClip.loadTexture("metalClipUp_png");
		this.boardStart = 425;
		game.add.tween(this.speech).to( { y: 295 }, 500, Phaser.Easing.Quadratic.Out, true);
	}
	else if (this.down === true) {
		game.add.tween(this.clipboard).to( { y: -215 }, 500, Phaser.Easing.Quadratic.Out, true);
		this.metalClip.loadTexture("metalClipDown_png");
		this.boardStart = -215;
		game.add.tween(this.speech).to( { y: -345 }, 500, Phaser.Easing.Quadratic.Out, true);
	}
};

gameplayState.prototype.moveBubbles = function() {
	if (this.swipingText === true) {
		if (this.startX > 325) {
			if (game.input.worldX < 625) {
				this.lieBubble.x = game.input.worldX;
			}
		}
		else {
			if (game.input.worldX > 25) {
				this.truthBubble.x = game.input.worldX;
			}
		}
	}
};

gameplayState.prototype.returnBubbles = function () {
	if (this.swipedRight === true) {
		let tween = game.add.tween(this.truthBubble).to( { x: 25 }, 100, Phaser.Easing.Quadratic.Out, true);
		this.swipedRight = false;
	}
	else if (this.swipedLeft === true) {
		let tween = game.add.tween(this.lieBubble).to( { x: 625 }, 100, Phaser.Easing.Quadratic.Out, true);
		this.swipedLeft = false;
	}
};
