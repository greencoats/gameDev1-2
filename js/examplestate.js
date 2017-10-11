let exampleState = function () {

}

exampleState.prototype.preload = function () {
    let jData = $.getJSON("exampleJSON.json");
    console.log(jData);
    let charData = $.parseJSON(jData);
    console.log(charData);
}

exampleState.prototype.create = function () {



}

exampleState.prototype.update = function () {
}
