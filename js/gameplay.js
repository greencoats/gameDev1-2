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
	this.isIntro = true;
	this.isOutro = false;
	this.isTransition = false;
	this.isIntroTrans = true;

	// UI
	this.initializeUI();

	this.currSummary = 0;

	//booleans to create modes of gameplayState
	this.textMode = true;
	this.questionMode = false;

	//get character data from JSON file and create text object
	this.dia = game.add.text(this.clipboard.x+190,this.clipboard.y - 180,this.charArr.characters[this.currChar].introStart, {fontSize: '20pt', wordWrap: true,wordWrapWidth: 420, fill:"##0a0a0a"},this.clipboard);

	//SCORE
	this.maxCont = this.charArr.contradictions;
	this.currCont = 0;
	this.currFalsePos = 0;
	if(this.currentLevel === 1){
		this.threshold = 3;
	}
	else if(this.currentLevel === 2){
		this.threshold = 6;
	}
	else if(this.currentLevel === 3){
		this.threshold = 4;
	}

	//Add initial synopsis text to clipboard
	this.synopText = this.clipboardData.summaries[0];
	this.synopsis = game.add.text(this.clipboard.x + 40,this.clipboard.y + 200,this.synopText,{font:'24px Arial', fill: '#b2109f', align: 'left'},this.clipboard);
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

	if (this.questionMode) {
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
	this.suspect = game.add.sprite(0, 0, "char" + this.currentLevel + "-" + this.currChar);

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
	this.speechBubble.events.onInputDown.add(this.right, this);

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
		this.speechBubble.events.onInputDown.add(this.right, this);
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
	game.state.states["Score"].passingScore = this.threshold;
	game.state.states["Score"].falsePos = this.currFalsePos;

	game.state.start("Score");
};

gameplayState.prototype.UpdateIntro = function(){
	if(this.isIntroTrans){
		this.isIntroTrans = false;
	}
	else if(this.isQuestion){
		this.isQuestion = false;
	}
	else if(this.isIntro && this.currSegment < this.charArr.characters[this.currChar].intro[this.currIntro].segments.length-1){
		this.updateSummary();
		this.currSegment++;
		this.updateClipboard();
	}
	else if(this.isOutro && this.currSegment < this.charArr.characters[this.currChar].outro[this.currIntro].segments.length-1){
		this.updateSummary();
		this.currSegment++;
		this.updateClipboard();
	}
	else if (this.isIntro && this.currIntro < this.charArr.characters[this.currChar].intro.length-1){
		this.updateSummary();
		this.currSegment = 0;
		this.currIntro++;
		this.isQuestion = true;
		this.updateClipboard();
	}
	else if (this.isOutro && this.currIntro < this.charArr.characters[this.currChar].outro.length-1){
		this.updateSummary();
		this.currSegment = 0;
		this.currIntro++;
		this.isQuestion = true;
		this.updateClipboard();
	}
	else if(!this.isTransition){
		this.isTransition = true;
	}
	else{
		this.updateSummary();
		if(this.isOutro){
			this.currChar++;
			this.suspect.loadTexture("char" + this.currentLevel + "-" + this.currChar);
			this.isIntro = true;
			this.isOutro = false;
			this.isIntroTrans = true;
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
		}
		this.updateClipboard();
		this.currSegment = 0;
		this.currIntro = 0;
		this.isQuestion = true;
		this.isTransition = false;
	}
	this.PrintText();
	return;
}

gameplayState.prototype.UpdateText = function(){
	console.log("UT");
	if(this.isQuestion == true){ //Display question
		this.isQuestion = false;
		this.swipeSwitch();
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
		this.swipeSwitch();
	}
	else if(!this.isTransition){
		this.isTransition = true;
		this.swipeSwitch();
	}
	else{
		//this.updateClipboard();
		//this.updateSummary();
		this.currSegment = 0;
		this.currDialogues = 0;
		this.isQuestion = true;
		this.isTransition = false;
		this.questionMode = false;
		this.textMode = true;
	}

	this.PrintText();

	return;
};

gameplayState.prototype.PrintText = function(){
	console.log("INTRO MODE " + this.isIntro);
	console.log("TRANSITION MODE " + this.isTransition);
	console.log("QUESTION MODE " + this.questionMode);
	console.log("OUTRO MODE " + this.isOutro + "\n");
	if(this.isTransition){
		//this.dia.style.font = 'Italic 28pt Arial';
		this.dia.addColor("#27d110",0);

		if(this.isIntro){
			this.dia.text = this.charArr.characters[this.currChar].introTransition;
		}
		else if(this.questionMode){
			this.dia.text = this.charArr.characters[this.currChar].questionsTransition;
		}
		else if(this.isOutro == true){
			this.dia.text = this.charArr.characters[this.currChar].outroTransition;
		}
		//this.dia.style.font = 'Bold 28pt Arial';
	}
	else if(this.textMode){
		this.dia.addColor("#000000",0);
		if(this.isIntro){
			if(this.isQuestion === true){
				this.dia.addColor("#c60d0d",0);
				this.dia.text = this.charArr.characters[this.currChar].intro[this.currIntro].question;
			}
			else{
				this.dia.addColor("#0d14c6",0);
				this.dia.text = this.charArr.characters[this.currChar].intro[this.currIntro].segments[this.currSegment];
			}
		}
		else if(this.isOutro){
			if(this.isQuestion === true){
				this.dia.addColor("#c60d0d",0);
				this.dia.text = this.charArr.characters[this.currChar].outro[this.currIntro].question;
			}
			else{
				this.dia.addColor("#0d14c6",0);
				this.dia.text = this.charArr.characters[this.currChar].outro[this.currIntro].segments[this.currSegment];
			}
		}
	}
	else if(this.questionMode){
		this.dia.addColor("#0d14c6",0);
		if (this.isQuestion === true){
			this.dia.addColor("#c60d0d",0);
			this.dia.text = this.charArr.characters[this.currChar].dialogues[this.currDialogues].question;
		}
		else{
			this.dia.text = this.charArr.characters[this.currChar].dialogues[this.currDialogues].segments[this.currSegment];
		}
	}
};

gameplayState.prototype.right = function() {
	if(this.questionMode){
		this.UpdateText();
	}
	else{
		this.UpdateIntro();
	}

};

gameplayState.prototype.left = function(){
	if(this.charArr.characters[this.currChar].dialogues[this.currDialogues].contradiction[this.currSegment] && !this.isQuestion && this.questionMode){
		this.currCont++;
	}
	else{
		this.currFalsePos++;
	}
	if(this.questionMode){
		this.UpdateText();
	}
	else{
		this.UpdateIntro();
	}
};

gameplayState.prototype.updateClipboard = function() { //function adds abbreviated statement to clipboard
	if(this.questionMode) {	
		if(this.charArr.characters[this.currChar].dialogues[this.currDialogues].abbr[this.currSegment] != null) { //Make sure the dialogue isn't currently reading a question
			this.abbrev.text += this.charArr.characters[this.currChar].dialogues[this.currDialogues].abbr[this.currSegment];
		}
	}
}

gameplayState.prototype.updateSummary = function() { //Function will update the clipboard synopsis if needed
	if(this.questionMode) {
		if(this.charArr.characters[this.currChar].dialogues[this.currDialogues].summary[this.currSegment] != null && this.charArr.characters[this.currChar].dialogues[this.currDialogues].summary[this.currSegment] == true) {
			console.log("UPDATING CLIPBOARD");
			this.synopsis.text += this.clipboardData.summaries[this.currSummary];
			this.currSummary++;
		}
	}
	else if(this.isIntro) {
		if(this.charArr.characters[this.currChar].intro[this.currDialogues].summary[this.currSegment] == true) {
			console.log("UPDATING CLIPBOARD");
			this.synopsis.text += this.clipboardData.summaries[this.currSummary];
			this.currSummary++;
		}
	}
	else if(!this.questionMode && this.isOutro) {
		if(this.charArr.characters[this.currChar].outro[this.currDialogues].summary[this.currSegment] == true) {
			console.log("UPDATING CLIPBOARD");
			this.synopsis.text += this.clipboardData.summaries[this.currSummary];
			this.currSummary++;
		}
	}
}
