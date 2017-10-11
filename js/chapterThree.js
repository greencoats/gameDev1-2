// JavaScript source code
let chapterThreeState = function () {

}

chapterThreeState.prototype.preload = function () {
    
}

chapterThreeState.prototype.create = function () {
    let changeState = false;


}

chapterThreeState.prototype.update = function () {
    if (changeState == true) {
        game.state.start("Menu");
    }
}