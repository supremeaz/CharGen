const fs = require('fs');
const gamefunctions = require('./game-functions');


class Character {
  constructor() {
    this.validClasses = ["Random","Fighter","Barbarian","Warlock","Paladin","Ranger","Monk","Rogue","Cleric","Sorcerer","Bard","Druid","Wizard"];
    this.validRaces = ["Random","Human","Elf","Dwarf","Halfing","Gnome","Dragonborn","Half-elf","Half-orc","Thiefling"];
    this.validAlignments = ["Random","Lawful Good","Neutral Good","Chaotic Good","Lawful Neutral","True Neutral","Chaotic Neutral","Lawful Evil","Neutral Evil","Chaotic Evil","Unaligned"];
    //Read defauls from files
    this.validBackgrounds = JSON.parse(fs.readFileSync('./backgrounds.json')).backgrounds;
    // this.id = 1;
  }
  
  randomizeAll(){
    //Generate a random name
    this.setName('','');

    //Generate Randomized attributes
    this.randomizeAttributes();

    //Assign to a random class
    this.setClass(0);

    //Assign to a random race
    this.setRace(0);

    //Assign to a random alignment
    this.setAlignment(0);

    this.setLevel(1);

    this.setXp(0);

    //Assign to a random background
    this.setBackground(0);
  }

  generateFirstName(){
    let randomNames = JSON.parse(fs.readFileSync('./random-names.json'));
    return randomNames.first_names[Math.floor(Math.random() * randomNames.first_names.length)];
  }

  generateLastName(){
    let randomNames = JSON.parse(fs.readFileSync('./random-names.json'));
    return randomNames.last_names[Math.floor(Math.random() * randomNames.last_names.length)];
  }
  
  setName(firstname,lastname){
    if(firstname == ''){
      this.fname = this.generateFirstName();
    }else this.fname = firstname;

    if(lastname ==''){
      this.lname = this.generateLastName();
    }else this.lname = lastname;
  }

  generateAttributes() {
    let ability_scores = [];
    for(let i = 0; i < 6; i++){
      ability_scores.push(this.rollAttribute());
    }
    return ability_scores;
  };

  setAttributes(str,int,wis,dex,con,cha){
    //Code to assign ability score rolls with user input.
    this.ability_score = {};
    this.ability_score.str = str;
    this.ability_score.int = int;
    this.ability_score.wis = wis;
    this.ability_score.dex = dex;
    this.ability_score.con = con;
    this.ability_score.cha = cha;
  }

  randomizeAttributes() {
    let ability_scores = this.generateAttributes();
    this.ability_score = {};
    this.ability_score.str = ability_scores[0];
    this.ability_score.int = ability_scores[1];
    this.ability_score.wis = ability_scores[2];
    this.ability_score.dex = ability_scores[3];
    this.ability_score.con = ability_scores[4];
    this.ability_score.cha = ability_scores[5];

  };

  rollAttribute(){
    let tempRolls = [];
    for(let i = 0; i <4; i++){
      tempRolls[i] = gamefunctions.diceRoll(1,6,0);
    }
    return tempRolls.reduce((a,b)=> a+b,0) - Math.min(...tempRolls);
  }

  getClass(){
    return this.assigned_class;
  }

  setClass(assignedClass){
    let chosenClass = 0;
    
    //If "Random" is chosen, randomly choose from one of the classes available through the array
    if(assignedClass == 0){
      chosenClass = Math.floor(Math.random()*(this.validClasses.length-1)+1);
    } else chosenClass = assignedClass;
    
    this.assigned_class = this.validClasses[chosenClass];
  }
  
  getRace(){
    return this.assigned_race;
  }

  setRace(assignedRace){
    let chosenRace = 0;
    
    //If "Random" is chosen, randomly choose from one of the races available through the array
    if(assignedRace == 0){
      chosenRace = Math.floor(Math.random()*(this.validRaces.length-1)+1);
    } else chosenRace = assignedRace;
    
    this.assigned_race = this.validRaces[chosenRace];
  }

  getAlignment(){
    return this.assigned_alignment;
  }

  setAlignment(assignedAlignment){
    let chosenAlignment = 0;
    
    //If "Random" is chosen, randomly choose from one of the races available through the array
    if(assignedAlignment == 0){
      chosenAlignment = Math.floor(Math.random()*(this.validAlignments.length-1)+1);
    } else chosenAlignment = assignedAlignment;
    
    this.assigned_alignment = this.validAlignments[chosenAlignment];
  }

  getBackground(){
    return this.assigned_background;
  }

  setBackground(assignedBackground){
    let chosenBackground = 0;
    let backgroundFound = false;
    this.assigned_background = {};
    
    //If "Random" is chosen, randomly choose from one of the races available through the array
    if(assignedBackground == 0){
      chosenBackground = this.validBackgrounds[Math.floor(Math.random()*(this.validBackgrounds.length-1)+1)].name;
    } else{
      chosenBackground = this.validBackgrounds[assignedBackground].name;
    }
    this.validBackgrounds.forEach(element => {
      if(element.name == chosenBackground){
        backgroundFound = true;
        this.assigned_background.name = element.name;
        this.assigned_background.description = element.description;
        this.assigned_background.skill_proficiencies = element.skill_proficiencies;
        this.assigned_background.tool_proficiencies = element.tool_proficiencies;
        this.assigned_background.equipments = element.equipment;
      }
    }); 
    if(!backgroundFound){
      console.log("Invalid Background - not found");
    }
  }

  setLevel(level){
    this.level = level;
  }

  setXp(exp){
    this.xp = exp;
  }
  
  exportToJSON = function(){
    return JSON.stringify({
      "fname":this.fname,
      "lname":this.lname,
      "ability_score":this.ability_score,
      "class": this.assigned_class,
      "race": this.assigned_race,
      "level":this.level,
      "xp": this.xp,
      "alignment": this.assigned_alignment,
      "background": this.assigned_background
    });
  }

  exportToFile = function(){
    fs.writeFile('./CharacterDirectory/'+this.fname+this.lname+'.json', this.exportToJSON(), err=>{
      if (err){
        console.log(err);
      }
    });
    console.log("Successfully exported character to file: " + this.fname + this.lname + '.json');
  }

  importFromJSON = function(jsonChar){
    this.fname = jsonChar.fname;
    this.lname = jsonChar.lname;
    this.ability_score = jsonChar.ability_score;
    this.assigned_class = jsonChar.class;
    this.assigned_race = jsonChar.race;
    this.level = jsonChar.level;
    this.xp = jsonChar.xp;
    this.assigned_alignment = jsonChar.alignment;
    this.assigned_background = jsonChar.background;
  }

  toString = function characterToString() {
    let formattedInfo = 
      "Here are your Character Details: \n" +
      "Character Name: " + this.fname + " " + this.lname + "\n" + 
      "Ability Scores: \n" + 
        "\t STR: " + this.ability_score.str + "\n" +
        "\t INT: " + this.ability_score.int + "\n" +
        "\t WIS: " + this.ability_score.wis + "\n" +
        "\t DEX: " + this.ability_score.dex + "\n" +
        "\t CON: " + this.ability_score.con + "\n" +
        "\t CHA: " + this.ability_score.cha + "\n" + 
      "Class: " + this.assigned_class + "\n" + 
      "Race: " + this.assigned_race + "\n" +
      "Level: " + this.level + "\n" +
      "XP: " + this.xp + "\n" +
      "Alignment: " + this.assigned_alignment + "\n" +
      "Background: " + this.assigned_background.name + "\n" + 
        "\t Description: " + this.assigned_background.description + "\n" +
        "Skill Proficiencies: " + "\n";
    this.assigned_background.skill_proficiencies.forEach(element => {
      formattedInfo += "\t - " + element + "\n"
    });

    formattedInfo += "Tool Proficiencies: " + "\n";
    this.assigned_background.tool_proficiencies.forEach(element=>{
      formattedInfo += "\t - " + element + "\n"
    });

    formattedInfo += "Equipments: " + "\n";
    this.assigned_background.equipments.forEach(element =>{
      formattedInfo += "\t - " + element.name + ", Quantity: " + element.quantity + "\n";
    });

    formattedInfo += "\n ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n";
    
    return formattedInfo;
  };
}
module.exports = Character;
