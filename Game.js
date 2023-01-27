var Character = require("./Character.js");
const rl = require ('readline');

let currChar;


const main = async () => {
    let userRes = "";
    let repeat = true;
    while(repeat){
        
        console.log("Welcome to the INF1005-118's D&D Character Generator, please select from one of the following menu options:");
        console.log("1 - Randomly Generate Character");
        console.log("2 - Customize New Character");
        console.log("3 - View Current Character");
        console.log("4 - Export Character data");
        console.log("5 - Import Character data");
        console.log("6 - Exit");
        
        let readline = rl.createInterface({
            input:process.stdin,
            output:process.stdout
        });
        
        let readLineAsync = msg => {
            return new Promise(resolve =>{
                readline.question(msg, userRes =>{
                    resolve(userRes);
                });
            });
        }
        userRes = await readLineAsync("Please provide your response below and hit enter:");
        readline.close();
        
        
        switch(userRes){
            case "1":
                currChar = new Character();
                console.log(currChar.toString());
                break;
            case "3":
                if(currChar != null){
                    console.log(currChar.toString());
                }else{
                    console.log("Please first generate a character");
                }
                break;
            case "4":
                if(currChar != null){
                    currChar.exportToFile();
                }else{
                    console.log("Please first generate a character");
                }
                break;
            case "5":
                console.log("TBD...");
                break;
            case "6":
                console.log("Thanks for using the Character Generator");
                repeat = false;
                break;
            default:
                console.log("Please select a correct option");
        }
    }
}

main();
