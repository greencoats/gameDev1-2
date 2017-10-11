// JavaScript source code
let chapterTwoState = function () {

}

chapterTwoState.prototype.preload = function () {
    
}

chapterTwoState.prototype.create = function () {
    let changeState = false;


}

chapterTwoState.prototype.update = function () {
    if (changeState == true) {
        game.state.start("Menu");
    }
}