// JavaScript source code
let menuState = function () {

}

menuState.prototype.preload = function () {
    
}

menuState.prototype.create = function () {
    let changeState = false;


}

menuState.prototype.update = function () {
    if (changeState == true) {
        game.state.start("Intro");
    }
}