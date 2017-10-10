// JavaScript source code
let poiTwoState = function () {

}

poiTwoState.prototype.preload = function () {
    
}

poiTwoState.prototype.create = function () {
    let changeState = false;


}

poiTwoState.prototype.update = function () {
    if (changeState == true) {
        game.state.start("Menu");
    }
}