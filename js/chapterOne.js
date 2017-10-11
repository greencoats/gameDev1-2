// JavaScript source code
let chapterOneState = function () {

}

chapterOneState.prototype.preload = function () {
    
}

chapterOneState.prototype.create = function () {
    let changeState = false;


}

chapterOneState.prototype.update = function () {
    if (changeState == true) {
        game.state.start("Menu");
    }
}