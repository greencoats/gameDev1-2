let scoreState = function () {
  this.level = 0;
  this.score = 0;
  this.maxScore = 0;
  this.passingScore = 0;
}

scoreState.prototype.preload = function () {
  game.load.spritesheet('button','assets/buttons/button.png',600,296);
}

scoreState.prototype.create = function () {
  this.changeState = false;

  this.scoretext = game.add.text(game.world.centerX,300,this.score + " / " + this.maxScore, {fontSize: '32pt', fill:"#ffffff"});
  this.condition = game.add.text(game.world.centerX,600,"", {fontSize: '32pt', fill:"#ffffff"});
  this.level = game.add.text(game.world.centerX,100,"Level: " + this.level, {fontSize: '32pt', fill:"#ffffff"});
  this.scoretext.anchor.setTo(0.5);
  this.condition.anchor.setTo(0.5);
  this.level.anchor.setTo(0.5);

  this.button = game.add.button(game.world.centerX - 300, 800, 'button', this.Press, this);

  if(this.score > this.passingScore){
    this.condition.text = "I've got it!";
    game.state.states['Gameplay'].currentLevel = this.level + 1;
  }
  else{
    this.condition.text = "Wait did I miss something?";
  }


}

scoreState.prototype.Press = function(){
  this.changeState = true;
}

scoreState.prototype.update = function () {
    if (this.changeState == true) {
        game.state.start("Gameplay");
    }
}
