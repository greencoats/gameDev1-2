// JavaScript source code
let menuState = function () {

};

menuState.prototype.preload = function () {
  game.load.spritesheet('button','assets/buttons/button.png',600,296);
};

menuState.prototype.create = function () {
  this.changeState = false;
  this.button = game.add.button(game.world.centerX - 300, 300, 'button', this.Press, this);
};

menuState.prototype.Press = function (){
  this.changeState = true;
};

menuState.prototype.update = function () {
  if(this.changeState == true){
    game.state.states['Gameplay'].currentLevel = 1;
    game.state.start("Gameplay");
  }
};
