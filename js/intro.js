// JavaScript source code
let introState = function () {

}

introState.prototype.preload = function () {
    
}

introState.prototype.create = function () {
    let changeState = false;


}

introState.prototype.update = function () {
    if (changeState == true) {
        game.state.start("Menu");
    }
}