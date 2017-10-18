// JavaScript source code
let introState = function () {

}

introState.prototype.preload = function () {

}

introState.prototype.create = function () {
    //if/when we want a brief menu crawl, turn this to false and add additional code
    this.changeState = true;


}

introState.prototype.update = function () {
    if (this.changeState == true) {
        game.state.start("Menu");
    }
}
