var Character = require('./Character.js');
const prompt = require('prompt-sync')({sigint:true});

let currChar;

const createCharacter = () => {
    let continueRun = true;
    let chosenFName = prompt("Please enter the first name of your character, and press enter. Blank will randomly generate a first name: ");
    console.log("You entered: " + chosenFName);
    let chosenLName = prompt("Please enter the last name of your character, and press enter. Blank will randomly generate a last name: ");
    console.log("You entered: " + chosenLName);

    let promptMsg = "Please select from one of the following races: \n";
    for(let i = 1; i<Character.validRaces.length;i++){
        promptMsg += i + ". " + Character.validRaces[i] + "\n";
    }
    
    console.log(promptMsg);
    let chosenRace = parseInt(prompt("> "));

    if(isNaN(chosenRace) || chosenRace == null || chosenRace > Character.validRaces.length-1 || chosenRace < 1) {
        console.log("You have entered an invalid response, please restart the process.");
        continueRun = false;
    }else{
        console.log(chosenRace);
        chosenRace = Character.validRaces[chosenRace];
    }

    if(continueRun){
        console.log(chosenRace);
    }

    
    
}

const main = () => {
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
        
        userRes = prompt("Please choose one of the menu options, provide your response and hit enter: ");
        
        switch(userRes){
            case "1":
                currChar = new Character();
                currChar.randomizeAll();
                console.log(currChar.toString());
                break;
            case "2":
                createCharacter();
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