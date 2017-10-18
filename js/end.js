// JavaScript source code
let endState = function () {

};

endState.prototype.preload = function () {

};

endState.prototype.create = function () {
  this.scoretext = game.add.text(game.world.centerX,500,"Randy, with the help of all the evidence he gathered, tracked down and arrested Thomas Albertson. Although he wore police attire, he was identified as an ordinary citizen. Randy was able to deduce that Albertson was posing as a police officer to lessen the suspicion around him. With him behind bars, the gay bars in the neighborhood are safe again. Randy turns his eyes to other casework..." , {fontSize: '32pt',wordWrap: true,wordWrapWidth: 600,  fill:"#ffffff"});
  this.scoretext.anchor.setTo(0.5);


}

endState.prototype.update = function () {
};
