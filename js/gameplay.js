// ##############################
// #####      GAMEPLAY      #####
// ##############################
let gameplayState = function(){
	this.currentLevel = 1;
};

// ##############################
// #####  PRE/CREATE/UPDATE #####
// ##############################
gameplayState.prototype.preload = function() {
	game.load.json('character1','characters_1.json');
	game.load.json('character2','characters_2.json');
	game.load.json('character3','characters_3.json');
	game.load.json('clipboard1','clipboard_1.json');
	game.load.json('clipboard2','clipboard_2.json');
	game.load.json('clipboard3','clipboard_3.json');
};

gameplayState.prototype.create = function() {
	// UI
	this.initializeUI();

	//JSON Data held in array
	this.charArr = game.cache.getJSON('character' + this.currentLevel);
	this.clipboardData = game.cache.getJSON('clipboard' + this.currentLevel);

	//variables to keep track of the character and statement we are on
	this.currChar = 0;
	this.currDialogues = 0;
	this.currSegment = 0;
	this.currIntro = 0;
	this.currChar = 0;
	this.maxChar = this.charArr.characters.length-1;
	this.isQuestion = true;

	this.currSummary = 0;

	//booleans to create modes of gameplayState
	this.textMode = true;
	this.questionMode = false;
	this.isIntro = true;
	this.isOutro = false;
	this.isTransition = false;


	//get character data from JSON file and create text object
	this.dia = game.add.text(this.clipboard.x+190,this.clipboard.y - 180,this.charArr.characters[this.currChar].introStart, {fontSize: '20pt', wordWrap: true,wordWrapWidth: 420, fill:"##0a0a0a"},this.clipboard);

	//SCORE
	//TODO make this value dynamic
	this.maxCont = 2;
	this.currCont = 0;

	//Add initial synopsis text to clipboard
	this.synopText = this.clipboardData.summaries[0];
	this.synopsis = game.add.text(this.clipboard.x + 40,this.clipboard.y + 200,this.synopText,{font:'24px Arial', fill: '#b2109f', align: 'center'},this.clipboard);
	this.currSummary++;

	//Setup abbreviation text into clipboard group
	this.abbrev = game.add.text(this.clipboard.x + 40,this.clipboard.y + 500,"Witness Statements:\n",{font:'24px Arial', fill: '#b2109f', align: 'left'},this.clipboard);

	// STARS
	this.statements = game.add.group();
};

gameplayState.prototype.update = function() {
	// Moving around UI elements
	this.moveBubbles();
	this.moveClipboard();

	if(this.textMode){
		if (this.swipedLeft === true) { // if(this.cursors.left.downDuration(5)) {
	    	this.UpdateIntro();
	    	this.swipedLeft = false;
	    }
		else if (this.swipedRight === true) { // if(this.cursors.right.downDuration(5)) {
	    	this.UpdateIntro();
	    	this.swipedRight = false;
	  	}
	}
	else if (this.questionMode) {
		if (this.swipedLeft === true) { // (this.cursors.left.downDuration(5)) {
	    	this.left();
	    	this.swipedLeft = false;
		}
		else if (this.swipedRight === true) { // (this.cursors.right.downDuration(5)){
	    	this.right();
	    	this.swipedRight = false;
	  	}
	}
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
	this.placeBubbles();
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
	this.truthBubble = this.speech.create(this.speech.x - 800, this.speech.y + 125, "truth_png");
	this.lieBubble = this.speech.create(this.speech.x + 750, this.speech.y + 125, "lie_png");
	this.truthBubble.scale.setTo(0.5, 0.5);
	this.lieBubble.scale.setTo(0.5, 0.5);

	this.swipeActive = false;
	this.swipedRight = false;
	this.swipedLeft = false;

	this.speechBubble.inputEnabled = true;
	this.speechBubble.events.onInputDown.add(this.UpdateIntro, this);

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

gameplayState.prototype.swipeSwitch = function() {
	if (this.swipeActive === false) {
		this.swipeActive = true;
		this.speechBubble.events.onInputDown.removeAll();
		this.speechBubble.events.onInputDown.add(this.textSwipeBegin, this);
		this.speechBubble.events.onInputUp.add(this.textSwipeEnd, this);
		this.bubbleSwitch();
	}
	else {
		this.swipeActive = false;
		this.speechBubble.events.onInputDown.removeAll();
		this.speechBubble.events.onInputUp.removeAll();
		this.speechBubble.events.onInputDown.add(this.UpdateIntro, this);
		this.bubbleSwitch();
	}
}

gameplayState.prototype.bubbleSwitch = function() {
	if (this.swipeActive === true) {
		this.truthBubble.x = -650;
		this.lieBubble.x = 600;
	}
	else {
		this.truthBubble.x = -800;
		this.lieBubble.x = 750;
	}
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
		game.add.tween(this.speech).to( { y: 295 }, 200, Phaser.Easing.Quadratic.Out, true);
	}
	else if (this.down === true) {
		game.add.tween(this.clipboard).to( { y: -215 }, 500, Phaser.Easing.Quadratic.Out, true);
		this.metalClip.loadTexture("metalClipDown_png");
		this.boardStart = -215;
		game.add.tween(this.speech).to( { y: -345 }, 200, Phaser.Easing.Quadratic.Out, true);
	}
};

gameplayState.prototype.moveBubbles = function() {
	if (this.swipingText === true) {
		if (this.startX > 325) {
			if (game.input.worldX < 600) {
				this.lieBubble.x = game.input.worldX;
			}
		}
		else {
			if (game.input.worldX > 25) {
				this.truthBubble.x = (-650 - this.startX) + (game.input.worldX);
			}
		}
	}
};

gameplayState.prototype.placeBubbles = function () {
	if (this.swipedRight === true) {
		let tween = game.add.tween(this.truthBubble).to( { x: 750 }, 800, Phaser.Easing.Quadratic.Out, true);
		tween.onComplete.add(this.bubbleSwitch, this);
	}
	else if (this.swipedLeft === true) {
		let tween = game.add.tween(this.lieBubble).to( { x: -750 }, 800, Phaser.Easing.Quadratic.Out, true);
		tween.onComplete.add(this.bubbleSwitch,this);
	}
};

// ##############################
// #####     BOARD TEXT     #####
// ##############################

gameplayState.prototype.Conclude = function(){
	console.log(this.currChar);
	game.state.states["Score"].score = this.currCont;
	game.state.states["Score"].maxScore = this.maxCont;
	game.state.states["Score"].level = this.currentLevel;

	game.state.start("Score");
};

gameplayState.prototype.UpdateIntro = function(){
	if(this.isQuestion){
		this.isQuestion = false;
	}
	else if(this.isIntro && this.currSegment < this.charArr.characters[this.currChar].intro[this.currIntro].segments.length-1){
		this.updateClipboard();
		this.updateSummary();
		this.currSegment++;
	}
	else if(this.isOutro && this.currSegment < this.charArr.characters[this.currChar].outro[this.currIntro].segments.length-1){
		this.updateClipboard();
		this.currSegment++;
	}
	else if (this.isIntro && this.currIntro < this.charArr.characters[this.currChar].intro.length-1){
		this.updateClipboard();
		this.currSegment = 0;
		this.currIntro++;
		this.isQuestion = true;
	}
	else if (this.isOutro && this.currIntro < this.charArr.characters[this.currChar].outro.length-1){
		this.updateClipboard();
		this.updateSummary();
		this.currSegment = 0;
		this.currIntro++;
		this.isQuestion = true;
	}
	else if(!this.isTransition){
		this.isTransition = true;
	}
	else{
		this.updateClipboard();
		this.updateSummary();
		if(this.isOutro){
			this.currChar++;
			this.isIntro = true;
			this.isOutro = false;
			console.log(this.currChar + " : " + this.maxChar);
			if(this.currChar > this.maxChar){
				this.Conclude();
				return;
			}
		}
		else if(this.isIntro){
			this.textMode = false;
			this.questionMode = true;
			this.isIntro = false;
			this.isOutro = true;
			this.swipeSwitch();
		}
		this.currSegment = 0;
		this.currIntro = 0;
		this.isQuestion = true;
		this.isTransition = false;
	}
	this.PrintText();
	return;
}

gameplayState.prototype.UpdateText = function(){
	if(this.isQuestion === true){ //Display question
		this.isQuestion = false;
	}
	else if(this.currSegment < this.charArr.characters[this.currChar].dialogues[this.currDialogues].segments.length-1){
		this.updateClipboard();
		this.updateSummary();
		this.currSegment++;
	}
	else if (this.currDialogues < this.charArr.characters[this.currChar].dialogues.length-1){
		this.updateClipboard();
		this.updateSummary();
		this.currSegment = 0;
		this.currDialogues++;
		this.isQuestion = true;
	}
	else if(!this.isTransition){
		this.isTransition = true;
	}
	else{
		this.updateClipboard();
		this.updateSummary();
		this.currSegment = 0;
		this.currDialogues = 0;
		this.isQuestion = true;
		this.isTransition = false;
		this.questionMode = false;
		this.textMode = true;
	}

	//Hardcoded segment for determining when to update clipboard synopsis
	if(this.currDialogues === 1 && this.currSegment === 1) {
		this.synopsis.text += this.clipboardData.summaries[0][1];
	}
	else if(this.currDialogues === 2 && this.currSegment === 1) {
		this.synopsis.text += this.clipboardData.summaries[0][2];
	}

	this.PrintText();

	return;
};

gameplayState.prototype.PrintText = function(){
	if(this.isTransition){
		//this.dia.style.font = 'Italic 28pt Arial';
		if(this.isIntro){
			this.dia.text = this.charArr.characters[this.currChar].introTransition;
		}
		else if(this.questionMode){
			this.dia.text = this.charArr.characters[this.currChar].questionsTransition;
		}
		else if(this.isOutro){
			this.dia.text = this.charArr.characters[this.currChar].outroTransition;
		}
		//this.dia.style.font = 'Bold 28pt Arial';
	}
	else if(this.textMode){
		if(this.isIntro){
			if(this.isQuestion === true){
				this.dia.text = this.charArr.characters[this.currChar].intro[this.currIntro].question;
			}
			else{
				this.dia.text = this.charArr.characters[this.currChar].intro[this.currIntro].segments[this.currSegment];
			}
		}
		else if(this.isOutro){
			if(this.isQuestion === true){
				this.dia.text = this.charArr.characters[this.currChar].outro[this.currIntro].question;
			}
			else{
				this.dia.text = this.charArr.characters[this.currChar].outro[this.currIntro].segments[this.currSegment];
			}
		}
	}
	else if(this.questionMode){
		if (this.isQuestion === true){
			this.dia.text = this.charArr.characters[this.currChar].dialogues[this.currDialogues].question;
		}
		else{
			this.dia.text = this.charArr.characters[this.currChar].dialogues[this.currDialogues].segments[this.currSegment];
		}
	}
};

gameplayState.prototype.right = function() {
	this.UpdateText();
};

gameplayState.prototype.left = function(){
	if(this.charArr.characters[this.currChar].dialogues[this.currDialogues].contradiction[this.currSegment] && !this.isQuestion && this.questionMode){
		this.currCont++;
	}
	else if (this.currCont > 0){
		this.currCont--;
	}
	this.UpdateText();
};

gameplayState.prototype.updateClipboard = function() { //function adds abbreviated statement to clipboard
	if(this.charArr.characters[this.currChar].dialogues[this.currDialogues].abbr[this.currSegment] != null) { //Make sure the dialogue isn't currently reading a question
		this.abbrev.text += this.charArr.characters[this.currChar].dialogues[this.currDialogues].abbr[this.currSegment];
	}
}

gameplayState.prototype.updateSummary = function() { //Function will update the clipboard synopsis if needed
	console.log("RUNNING SUMMARY CHECK");
	if(this.charArr.characters[this.currChar].dialogues[this.currDialogues].summary[this.currSegment] == true) {
		console.log("UPDATING CLIPBOARD");
		this.synopsis.text += this.clipboardData.summaries[this.currSummary];
		this.currSummary++;
	}
}
