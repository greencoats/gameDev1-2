let gameplayState = function(){

};

gameplayState.prototype.preload = function() {

};

gameplayState.prototype.create = function() {
	this.clipboard = game.add.group();
	this.clipboard.x = 0;
	this.clipboard.y = 400;

	this.board = this.clipboard.create(this.clipboard.x, this.clipboard.y, "clipboard_png");
	this.metalClip = this.clipboard.create(this.clipboard.x + 185, this.clipboard.y + 55, "metalClipUp_png");

	this.metalClip.inputEnabled = true;
	this.metalClip.events.onInputDown.add(this.moveClipboard, this);

	//Text bubble defines
	let textAppear = true;
	this.textBubble = game.add.group();
	//Set Location
	this.textBubble.x = 50;
	this.textBubble.y = 200;
	//Create objects
	this.bubble = this.textBubble.create(this.textBubble.x, this.textBubble.y, "textBubble_jpg");
	////////////create text vairable
	// variables used to detect and manage swipes
	let startX;
	let startY;
	let endX;
	let endY;
	let right = false;
	let left = false;

	// beginSwipe function
	game.input.onDown.add(beginSwipe, this);

	// STARS
	this.statements = game.add.group();
};

gameplayState.prototype.update = function() {
	// Nothing yet

	//if (textAppear == true){
		game.add.tween(this.textBubble).to(0, 0, Phaser.Easing.Quadratic.Out, true);
		this.bubble.loadTexture("textBubble_png");
	//}
};

gameplayState.prototype.moveClipboard = function() {
	if (this.clipboard.y == -100) {
		game.add.tween(this.clipboard).to( { y: 400 }, 500, Phaser.Easing.Quadratic.Out, true);
		this.metalClip.loadTexture("metalClipUp_png");
	}
	else {
		game.add.tween(this.clipboard).to( { y: -100 }, 500, Phaser.Easing.Quadratic.Out, true);
		this.metalClip.loadTexture("metalClipDown_png");
	}
}

gameplayState.prototype.textBubbleFunction = function(){
	if (textAppear == true){
		game.add.tween(this.textBubble).to(100, 100, Phaser.Easing.Quadratic.Out, true);
		this.bubble.loadTexture("textBubble_png");
		
	}

}



//////////////////////////////////////////////////////////////////////////////////////////
//////http://www.emanueleferonato.com/2014/11/13/html5-swipe-controlled-sokoban-game-made-with-phaser/
	
	// when the player begins to swipe we only save mouse/finger coordinates, remove the touch/click
	// input listener and add a new listener to be fired when the mouse/finger has been released,
	// then we call endSwipe function
	function beginSwipe(){
		startX = game.input.worldX;
		startY = game.input.worldY;
		game.input.onDown.remove(beginSwipe);
     	game.input.onUp.add(endSwipe);
	}
	
	// function to be called when the player releases the mouse/finger
	function endSwipe(){
		// saving mouse/finger coordinates
		endX = game.input.worldX;
		endY = game.input.worldY;
		// determining x and y distance travelled by mouse/finger from the start
		// of the swipe until the end
		var distX = startX-endX;
		if(distX > 0){
			left = true;
		} else if (distX < 0){
			right = true;
		}
		
		// stop listening for the player to release finger/mouse, let's start listening for the player to click/touch
		game.input.onDown.add(beginSwipe);
     	game.input.onUp.remove(endSwipe);
	}

	
	// function to move the player
	function moveBubble(deltaX,deltaY){
		//this.textBubble.worldX = this.textBubble.worldX + deltaX;
		//this.bubble.y += deltaY;
		if (right == true){
			this.textBubble.x = 1000;
		}else if (left == true){
			this.textBubble.x = -1000;
		}
	}




