// JavaScript source code
let poiOneState = function () {

}

poiOneState.prototype.preload = function () {
    
}

poiOneState.prototype.create = function () {
    let changeState = false;


}

poiOneState.prototype.update = function () {
    if (changeState == true) {
        game.state.start("Menu");
    }
}