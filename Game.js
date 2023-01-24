var Character = require("./Character.js");

var char1 = new Character("Tom", "Brennen");

console.log(char1.toString());
console.log("Here's the JSON representation: " + char1.exportToJSON());
