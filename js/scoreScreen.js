let scoreState = function () {
  this.level = 0;
  this.score = 0;
  this.maxScore = 0;
  this.falsePos = 0;
  this.passingScore = 0;
}

scoreState.prototype.preload = function () {
  game.load.spritesheet("backdrop_png", "assets/blankClip.png");
  game.load.spritesheet('button','assets/buttons/button.png',600,296);
}

scoreState.prototype.create = function () {
  game.add.sprite(0,0,"backdrop_png");
  this.changeState = false;

  this.scoretext = game.add.text(game.world.centerX,400,"Correct Contradictions: " + this.score + " / " + this.maxScore, {fontSize: '32pt', fill:"#171717"});
  this.scoretext2 = game.add.text(game.world.centerX,500,"False Negatives: " + this.falsePos + " / " + this.passingScore, {fontSize: '32pt', fill:"#171717"});
  this.condition = game.add.text(game.world.centerX,700,"", {fontSize: '32pt', fill:"#171717"});
  this.leveltext = game.add.text(game.world.centerX,300,"Level: " + this.level, {fontSize: '32pt', fill:"#171717"});
  this.scoretext.anchor.setTo(0.5);
  this.scoretext2.anchor.setTo(0.5);
  this.condition.anchor.setTo(0.5);
  this.leveltext.anchor.setTo(0.5);

  this.button = game.add.button(game.world.centerX - 300, 800, 'button', this.Press, this);

  if(this.score === this.maxScore && this.falsePos < this.passingScore){
    this.condition.text = "I've got it!";
    game.state.states['Gameplay'].currentLevel = this.level + 1;
  }
  else{
    this.condition.text = "Wait did I miss something?";
  }


}

scoreState.prototype.Press = function(){
  if(this.level === 3){
    game.state.start("End");
  }
  this.changeState = true;
}

scoreState.prototype.update = function () {
    if (this.changeState == true) {
        game.state.start("Gameplay");
    }
}
