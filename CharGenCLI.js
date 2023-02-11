const Character = require('./Character');
const prompt = require('prompt-sync')({sigint:true});
const charDirectory = './CharacterDirectory/';
const fs = require('fs');

let currChar = new Character();

const createCharacter = () => {
    currChar = new Character();
    let continueRun = true;
    let chosenFName = prompt("Please enter the first name of your character, and press enter. Blank will randomly generate a first name: ","Random");
    if(chosenFName =="Random"){
        chosenFName = currChar.generateFirstName();
        console.log("Your random first name is: " + chosenFName);
    }else console.log("You entered: " + chosenFName);
    let chosenLName = prompt("Please enter the last name of your character, and press enter. Blank will randomly generate a last name: ","Random");
    if(chosenLName =="Random"){
        chosenLName = currChar.generateLastName();
        console.log("Your random last name is: " + chosenLName);
    }else console.log("You entered: " + chosenLName);
    currChar.setName(chosenFName,chosenLName);

    let promptMsg = "Please select from one of the following races: \n";
    for(let i = 0; i<currChar.validRaces.length;i++){
        promptMsg += i + ". " + currChar.validRaces[i] + "\n";
    }
    
    console.log(promptMsg);
    let chosenRace = parseInt(prompt("> "));

    if(isNaN(chosenRace) || chosenRace == null || chosenRace > currChar.validRaces.length-1 || chosenRace < 0) {
        console.log("You have entered an invalid response, please restart the process.");
        continueRun = false;
    }else{
        currChar.setRace(chosenRace);
        console.log("You have chosen: " + currChar.getRace());
    }

    let chosenClass;
    if(continueRun){
        promptMsg = "Please select from one of the following classes: \n";
        for(let i = 0; i<currChar.validClasses.length;i++){
            promptMsg += i + ". " + currChar.validClasses[i] + "\n";
        }
        
        console.log(promptMsg);
        chosenClass = parseInt(prompt("> "));
    
        if(isNaN(chosenClass) || chosenClass == null || chosenClass > currChar.validClasses.length-1 || chosenClass < 0) {
            console.log("You have entered an invalid response, please restart the process.");
            continueRun = false;
        }else{
            currChar.setClass(chosenClass);
            console.log("You have chosen: " + currChar.getClass());
        }
    }

    let chosenAlignment;
    if(continueRun){
        promptMsg = "Please select from one of the following alignments: \n";
        for(let i = 0; i<currChar.validAlignments.length;i++){
            promptMsg += i + ". " + currChar.validAlignments[i] + "\n";
        }
        
        console.log(promptMsg);
        chosenAlignment = parseInt(prompt("> "));
    
        if(isNaN(chosenAlignment) || chosenAlignment == null || chosenAlignment > currChar.validAlignments.length-1 || chosenAlignment < 0) {
            console.log("You have entered an invalid response, please restart the process.");
            continueRun = false;
        }else{
            currChar.setAlignment(chosenAlignment);
            console.log("You have chosen: " + currChar.getAlignment());
        }
    }
    
    let chosenBackground;
    if(continueRun){
        promptMsg = "Please select from one of the following backgrounds: \n";
        for(let i = 0; i<currChar.validBackgrounds.length;i++){
            promptMsg += i + ". " + currChar.validBackgrounds[i].name + "\n --> " + currChar.validBackgrounds[i].description + "\n";
        }
        
        console.log(promptMsg);
        chosenBackground = parseInt(prompt("> "));
    
        if(isNaN(chosenBackground) || chosenBackground == null || chosenBackground > currChar.validBackgrounds.length-1 || chosenBackground < 0) {
            console.log("You have entered an invalid response, please restart the process.");
            continueRun = false;
        }else{
            currChar.setBackground(chosenBackground);
            console.log("You have chosen: " + currChar.getBackground().name);
        }
    }

    if(continueRun){
        //Let's do some dice rolls. 
        let reroll = true;
        let currRoll;
        while(reroll && continueRun){
            console.log("Below is your unassigned attribute roll, please enter [1] if you are happy with the roll, or [2] to re-roll.");
            currRoll = currChar.generateAttributes();
            console.log(currRoll);
            let rollDecision = parseInt(prompt("> "));
        
            if(isNaN(rollDecision) || rollDecision == null || rollDecision >2 || rollDecision <1) {
                console.log("You have entered an invalid response, please restart the process.");
                continueRun = false;
            }else if(rollDecision == 1){
                reroll = false;
            }
        }
        if(continueRun){
            console.log("You have decided to keep your rolls. Please now assign each roll to an attribute.");
            let attrArray = ["STR","INT","WIS","DEX","CON","CHA"];
            let attrMap = new Map();
            currRoll.forEach(roll => {
                if(continueRun){
                    console.log("Please select the Trait you would like to assign the roll " + roll + " to. Available Traits: ");
                    let i = 1;
                    attrArray.forEach(attr => {
                       console.log(i + ". " + attr); 
                       i++;
                    });
                    let userRes = parseInt(prompt("> "));
                    if(isNaN(userRes) || userRes == null || userRes >attrArray.length || userRes <1){
                        console.log("You have entered an invalid response, please restart the process.");
                        continueRun = false;
                    }else{
                        let selectedTrait = attrArray.splice(userRes-1,1)[0];
                        attrMap.set(selectedTrait,roll);
                        console.log("You have assigned " + roll + " to " + selectedTrait);
                    }
                }
            });

            if(continueRun){
                currChar.setAttributes(attrMap.get("STR"),attrMap.get("INT"),attrMap.get("WIS"),attrMap.get("DEX"),attrMap.get("CON"),attrMap.get("CHA"));
                console.log("Your character is successfully created");
            }

        }
    }
}

const importCharacter = () =>{

    let fileList = new Map();
    let index = 1;
    fs.readdirSync(charDirectory).forEach(file => {
        fileList.set(index,file);
        index++;
    });

    let keys = Array.from(fileList.keys());
    console.log("Please enter the number representing the Character you would like to import. Please ensure that the character file exists under the CharacterDirectory folder.");
    keys.forEach(key => {
       console.log(key + ". " + fileList.get(key)); 
    });
    let userRes = prompt("> ");
    
    if(isNaN(userRes) || userRes == null || userRes >keys.length || userRes <1){
        console.log("Please retry and enter a valid option.");
    }else{
        let chosenFile = fileList.get(parseInt(userRes));
        console.log(chosenFile);
        console.log(charDirectory + chosenFile);
        currChar = new Character();
        currChar.importFromJSON(JSON.parse(fs.readFileSync(charDirectory + chosenFile)));
        
        console.log("Import success, below is your imported Character:");
        console.log(currChar.toString());
    }

}

const assignAttribute = (roll, availableAttrs, currAssignedAttrs) => {
    console.log("For the roll " + roll + ", which attribute would you like to assign it to?");
    for(let i = 1; i<=availableAttrs.length;i++){
        console.log(i+ ". " + availableAttrs[i-1]);
    }
    let userRes = praseInt(prompt("> "));
    if(isNaN(userRes) || userRes == null || userRes > currChar.availableAttrs.length-1 || chosenBackground < 0){
        console.log("Please provide a valid response");
        return currAssignedAttrs;
    }else{

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
                importCharacter();
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
