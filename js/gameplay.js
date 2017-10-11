let timeToCopmlete = 2000; //Time in milliseconds to complete the dialogue

let gameplayState = function(){

};

gameplayState.prototype.preload = function() {

};

gameplayState.prototype.create = function() {

	//Create the timer
	timer = game.time.create(false);

	//After 2 seconds, updateCounter is called
	timer.loop(timeToCopmlete, updateCounter, this);
	
	//Timer start
	timer.start();

	this.clipboard = game.add.group();
	this.clipboard.x = 0;
	this.clipboard.y = 400;

	this.board = this.clipboard.create(this.clipboard.x, this.clipboard.y, "clipboard_png");
	this.metalClip = this.clipboard.create(this.clipboard.x + 185, this.clipboard.y + 55, "metalClipUp_png");

	this.metalClip.inputEnabled = true;
	this.metalClip.events.onInputDown.add(this.moveClipboard, this);

	// STARS
	this.statements = game.add.group();
};

gameplayState.prototype.update = function() {
	// Nothing yet

	game.debug.text('Time to complete dialogue: ' + timer.duration.toFixed(0), 32, 32);
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

function updateCounter() {
	//Switch timer variable to the next value it needs to be 

	//Call timeup state here (most likely just going to the next dialogue line)
}