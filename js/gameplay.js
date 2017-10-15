let gameplayState = function(){

};

gameplayState.prototype.preload = function() {
	game.load.json('character','exampleJSON.json');
	game.load.json('clipboard','clipboardJSON.json')
};

gameplayState.prototype.create = function() {

	this.charData = game.cache.getJSON('character');
	this.clipboardData = game.cache.getJSON('clipboard');
	//get character data from JSON file and create text object
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
	this.timeToCopmlete = this.charData.dialogues[this.currDialogues].timer[this.currSegment];
	console.log("Time to complete is " + this.timeToCopmlete);

	//After specified number of seconds, updateText is called
	timer.loop(this.timeToCopmlete, function (){ this.UpdateText()}, this);

	this.clipboard = game.add.group();
	this.clipboard.x = 0;
	this.clipboard.y = 400;

	this.board = this.clipboard.create(this.clipboard.x, this.clipboard.y + 50, "board_png");
	this.paper = this.clipboard.create(this.clipboard.x + 15, this.clipboard.y + 150, "paper_png");
	this.metalClip = this.clipboard.create(this.clipboard.x + 185, this.clipboard.y, "metalClipUp_png");

	this.metalClip.inputEnabled = true;
	this.metalClip.events.onInputDown.add(this.moveClipboard, this);

	//Add initial synopsis text to clipboard
	this.synopText = this.clipboardData.summaries[0][0];
	this.synopsis = game.add.text(this.clipboard.x + 40,this.clipboard.y + 200,this.synopText,{font:'24px Arial', fill: '#ff0202', align: 'center'},this.clipboard);

	//Setup abbreviation text into clipboard group
	this.abbrev = game.add.text(this.clipboard.x + 40,this.clipboard.y + 500,"",{font:'24px Arial', fill: '#ff0202', align: 'left'},this.clipboard);

	// STARS
	this.statements = game.add.group();
};

gameplayState.prototype.UpdateText = function(){
	console.log(this.currSegment);
	console.log(this.charData.dialogues[this.currDialogues].segments.length);
	if(this.isQuestion == true){ //Display question
		this.dia.text = this.charData.dialogues[this.currDialogues].question;
		this.isQuestion = false;
	}
	else if(this.currSegment < this.charData.dialogues[this.currDialogues].segments.length){
		this.updateClipboard();
		this.dia.text = this.charData.dialogues[this.currDialogues].segments[this.currSegment];
		this.currSegment++;
		this.updateCounter();
	}
	else if (this.currDialogues < this.charData.dialogues.length-1){
		this.updateClipboard();
		console.log("here");
		this.currSegment = 0;
		this.currDialogues++;
		this.isQuestion = true;
		this.UpdateText();
		this.updateCounter();
	}
	else{
		this.updateClipboard();
		this.currChar++;
		this.currSegment = 0;
		this.currDialogues = 0;
		this.isQuestion = true;
		this.updateCounter();
	}

	//Hardcoded segment for determining when to update clipboard synopsis
	if(this.currDialogues==1 && this.currSegment==1) {
		this.synopsis.text += this.clipboardData.summaries[0][1];
	}
	else if(this.currDialogues==2 && this.currSegment==1) {
		this.synopsis.text += this.clipboardData.summaries[0][2];
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
<<<<<<< HEAD
    this.right();
  }
  else if(this.cursors.right.downDuration(5)){
    this.right();
=======
	this.UpdateText();
  }
  else if(this.cursors.right.downDuration(5)){
	this.UpdateText();
>>>>>>> refs/remotes/origin/dev
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

gameplayState.prototype.updateCounter = function() {
	//Stop the timer
	timer.stop();

	if(this.charData.dialogues[this.currDialogues].timer[this.currSegment-1] != null) {
		//Switch timer variable to the next value it needs to be
		this.timeToCopmlete = this.charData.dialogues[this.currDialogues].timer[this.currSegment-1];
		console.log("Time to complete is " + this.timeToCopmlete);
		timer.loop(this.timeToCopmlete, function (){ this.UpdateText()}	, this);

		//start the timer again
		timer.start();
	}
}

gameplayState.prototype.updateClipboard = function() { //function adds abbreviated statement to clipboard
	if(this.charData.dialogues[this.currDialogues].abbr[this.currSegment-1] != null) { //Make sure the dialogue isn't currently reading a question
		this.abbrev.text += this.charData.dialogues[this.currDialogues].abbr[this.currSegment-1];
	}
}