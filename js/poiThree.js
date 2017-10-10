// JavaScript source code
let poiThreeState = function () {

}

poiThreeState.prototype.preload = function () {
    
}

poiThreeState.prototype.create = function () {
    let changeState = false;


}

poiThreeState.prototype.update = function () {
    if (changeState == true) {
        game.state.start("Menu");
    }
}