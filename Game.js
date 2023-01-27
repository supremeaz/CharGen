var Character = require("./Character.js");
const rl = require ('readline');

const readline = rl.createInterface({
    input:process.stdin,
    output:process.stdout
});

const readLineAsync = msg => {
    return new Promise(resolve =>{
        readline.question(msg, userRes =>{
            resolve(userRes);
        });
    });
}

const main = async () => {
    let userRes = "";
    console.log("Welcome to the INF1005-118's D&D Character Generator, please select from one of the following menu options:");
    console.log("1 - Randomly Generate Character");
    console.log("2 - Customize New Character");
    console.log("3 - View Current Character");
    console.log("4 - Export Character data");
    console.log("5 - Import Character data");
    
    userRes = await readLineAsync("Please provide your response below and hit enter:");
    readline.close();
    
    if(userRes == 1){
        var char1 = new Character();
        console.log(char1.toString());
        console.log("Here's the JSON representation: " + char1.exportToJSON());
    }
}

main();