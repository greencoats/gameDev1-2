let exampleState = function () {

}

exampleState.prototype.preload = function () {
    let jData = $.getJSON("exampleJSON.json");
    let charData = JSON.parse(jData);
}

exampleState.prototype.create = function () {
    let changeState = false;


}

exampleState.prototype.update = function () {
    if (changeState == true) {
        game.state.start("Menu");
    }
}
