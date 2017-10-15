let timeToCopmlete = 5000; //Time in milliseconds to complete the dialogue

let gameplayState = function(){

};

gameplayState.prototype.preload = function() {
	game.load.json('character','exampleJSON.json');
};

gameplayState.prototype.create = function() {

	//get character data from JSON file and create text object
	this.charData = game.cache.getJSON('character');
	this.dia = game.add.text(20,300,this.charData.dialogues[0].question, {fontSize: '32pt', fill:"#ffffff"});


	//variables to keep track of the character and statement we are on
	this.currChar = 0;
	this.currDialogues = 0;
	this.currSegment = 0;
	this.isQuestion = true;

	//CONTROLS
	this.cursors = game.input.keyboard.createCursorKeys();

	//Create the timer
	timer = game.time.create(false);

	//After 2 seconds, updateCounter is called
	timer.loop(timeToCopmlete, updateCounter, this);

	//Timer start
	timer.start();

	this.clipboard = game.add.group();
	this.clipboard.x = 0;
	this.clipboard.y = 400;

	this.board = this.clipboard.create(this.clipboard.x, this.clipboard.y + 50, "board_png");
	this.paper = this.clipboard.create(this.clipboard.x + 15, this.clipboard.y + 150, "paper_png");
	this.metalClip = this.clipboard.create(this.clipboard.x + 185, this.clipboard.y, "metalClipUp_png");

	this.metalClip.inputEnabled = true;
	this.metalClip.events.onInputDown.add(this.moveClipboard, this);

	// STARS
	this.statements = game.add.group();
};

gameplayState.prototype.UpdateText = function(){
	console.log(this.currSegment);
	console.log(this.charData.dialogues[this.currDialogues].segments.length);
	if(this.isQuestion == true){
		this.dia.text = this.charData.dialogues[this.currDialogues].question;
		this.isQuestion = false;
	}
	else if(this.currSegment < this.charData.dialogues[this.currDialogues].segments.length){
		this.dia.text = this.charData.dialogues[this.currDialogues].segments[this.currSegment];
		this.currSegment++;
	}
	else if (this.currDialogues < this.charData.dialogues.length-1){
		console.log("here");
		this.currSegment = 0;
		this.currDialogues++;
		this.isQuestion = true;
		this.UpdateText();
	}
	else{
		this.currChar++;
		this.currSegment = 0;
		this.currDialogues = 0;
		this.isQuestion = true;
	}
	return;
};

gameplayState.prototype.right = function(){
	this.UpdateText();
};

gameplayState.prototype.left = function(){
	this.UpdateText();
};

gameplayState.prototype.update = function() {
	if(this.cursors.left.downDuration(5)){
    this.right();
  }
  else if(this.cursors.right.downDuration(5)){
    this.right();
  }
	game.debug.text('Time to complete dialogue: ' + (timer.duration/1000).toFixed(0), 32, 32);


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

function updateCounter() {
	//Switch timer variable to the next value it needs to be

	//Call timeup state here (most likely just going to force next dialogue line)
}
