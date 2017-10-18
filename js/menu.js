// JavaScript source code
let menuState = function () {

};

menuState.prototype.preload = function () {
  game.load.spritesheet('title_png','assets/title.png',750, 1335);
};

menuState.prototype.create = function () {
  this.changeState = false;
  this.title = game.add.button(0, 0, 'title_png', this.Press, this);
};

menuState.prototype.Press = function (){
  this.changeState = true;
};

menuState.prototype.update = function () {
  if(this.changeState == true){
    game.state.states['Gameplay'].currentLevel = 0;
    game.state.start("Gameplay");
  }
};
