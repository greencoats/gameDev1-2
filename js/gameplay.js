let gameplayState = function(){

};

gameplayState.prototype.preload = function() {
	game.load.json('character','exampleJSON.json');
	game.load.json('clipboard','clipboardJSON.json')
};

gameplayState.prototype.create = function() {

	this.clipboard = game.add.group();
	this.clipboard.x = 0;
	this.clipboard.y = 400;

	this.board = this.clipboard.create(this.clipboard.x, this.clipboard.y + 50, "board_png");
	this.paper = this.clipboard.create(this.clipboard.x + 15, this.clipboard.y + 150, "paper_png");
	this.metalClip = this.clipboard.create(this.clipboard.x + 185, this.clipboard.y, "metalClipUp_png");

	this.metalClip.inputEnabled = true;
	//this.metalClip.events.onInputDown.add(this.moveClipboard, this);

	// variables used to detect and manage swipes
	// let this.startX;
	// let this.startY;
	// let this.endX;
	// let this.endY;
	this.right = false;
	this.left = false;

	// beginSwipe function
	game.input.onDown.add(this.beginSwipe, this);
};

//////////////////////////////////////
// function to move the player
gameplayState.prototype.moveBubble = function () {
	//this.textBubble.worldX = this.textBubble.worldX + deltaX;
	//this.bubble.y += deltaY;
	if (this.right == true) {
		this.textBubble.x = 1000;
	} else if (this.left == true) {
		this.textBubble.x = -1000;
	}
};

gameplayState.prototype.update = function() {

	/////////////////////////////////
	gameplayState.prototype.moveBubble();
	///////////////////////////////////

};

gameplayState.prototype.moveClipboard = function() {
	if (this.clipboard.y == -250) {
		game.add.tween(this.clipboard).to( { y: 400 }, 500, Phaser.Easing.Quadratic.Out, true);
		this.metalClip.loadTexture("metalClipUp_png");
	}
	else {
		game.add.tween(this.clipboard).to( { y: -250 }, 500, Phaser.Easing.Quadratic.Out, true);
		this.metalClip.loadTexture("metalClipDown_png");
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

	// stop listening for the player to release finger/mouse, let's start listening for the player to click/touch
	game.input.onDown.add(this.beginSwipe, this);
	game.input.onUp.remove(this.endSwipe, this);

};