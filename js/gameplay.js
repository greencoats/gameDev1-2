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
};

// ##############################
// #####       SWIPING      #####
// ##############################

gameplayState.prototype.beginSwipe = function() {
	// Save initial coordinates
	this.startX = game.input.worldX;
	this.startY = game.input.worldY;
	this.swiping = true;
};

gameplayState.prototype.endSwipe = function() {
	// Save ending coordinates
	this.endX = game.input.worldX;
	this.endY = game.input.worldY;
	this.swiping = false;

	// find x distance travelled from the swipe start to end
	let distX = this.startX - this.endX;
	if (distX > 0) {
		this.left = true;
	}
	else if (distX < 0) {
		this.right = true;
	}
	this.returnBubbles();
};

// ##############################
// #####       UI CODE      #####
// ##############################

gameplayState.prototype.initializeUI = function() {
	this.suspect = game.add.sprite(0, 0, "poiPortrait_png");

	this.speech = game.add.group();
	this.speech.x = 0;
	this.speech.y = 295;

	this.speechBubble = this.speech.create(this.speech.x, this.speech.y + 50, "speechBubble_png");
	this.truthBubble = this.speech.create(this.speech.x + 625, this.speech.y + 125, "truth_png");
	this.lieBubble = this.speech.create(this.speech.x + 25, this.speech.y + 125, "lie_png");
	this.truthBubble.scale.setTo(0.5, 0.5);
	this.lieBubble.scale.setTo(0.5, 0.5);

	this.right = false;
	this.left = false;

	this.speechBubble.inputEnabled = true;
	this.speechBubble.events.onInputDown.add(this.beginSwipe, this);
	this.speechBubble.events.onInputUp.add(this.endSwipe, this);

	this.clipboard = game.add.group();
	this.clipboard.x = 0;
	this.clipboard.y = 425;

	this.board = this.clipboard.create(this.clipboard.x, this.clipboard.y + 50, "board_png");
	this.paper = this.clipboard.create(this.clipboard.x + 15, this.clipboard.y + 125, "paper_png");
	this.metalClip = this.clipboard.create(this.clipboard.x + 185, this.clipboard.y, "metalClipUp_png");

	this.metalClip.inputEnabled = true;
	//this.metalClip.events.onInputDown.add(this.moveClipboard, this);
}

gameplayState.prototype.moveClipboard = function() {
	if (this.clipboard.y === -215) {
		game.add.tween(this.clipboard).to( { y: 425 }, 500, Phaser.Easing.Quadratic.Out, true);
		this.metalClip.loadTexture("metalClipUp_png");
		game.add.tween(this.speech).to( { y: 295 }, 500, Phaser.Easing.Quadratic.Out, true);
	}
	else {
		game.add.tween(this.clipboard).to( { y: -215 }, 500, Phaser.Easing.Quadratic.Out, true);
		this.metalClip.loadTexture("metalClipDown_png");
		game.add.tween(this.speech).to( { y: -345 }, 500, Phaser.Easing.Quadratic.Out, true);
	}
};

gameplayState.prototype.moveBubbles = function() {
	if (this.swiping === true) {
		if (this.startX > 325) {
			if (game.input.worldX < 625) {
				this.truthBubble.x = game.input.worldX;
			}
		}
		else {
			if (game.input.worldX > 25) {
				this.lieBubble.x = game.input.worldX;
			}
		}
	}
}

gameplayState.prototype.returnBubbles = function () {
	if (this.right === true) {
		let tween = game.add.tween(this.lieBubble).to( { x: 25 }, 100, Phaser.Easing.Quadratic.Out, true);
		this.right = false;
	}
	else if (this.left === true) {
		let tween = game.add.tween(this.truthBubble).to( { x: 625 }, 100, Phaser.Easing.Quadratic.Out, true);
		this.left = false;
	}
};
