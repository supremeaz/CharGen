const validClasses = ["Random","Fighter","Mage","Cleric"];
const validRaces = ["Random","Human","Elf","Orc"];
const validAlignments = ["Random","Law","Neutral","Chaos"];

class Character {
  constructor(fname, lname) {
    this.fname = fname;
    this.lname = lname;

    //Generate Randomized attributes
    this.generateAttributes();

    //Assign to a random class
    this.setClass(0);

    //Assign to a random race
    this.setRace(0);

    //Assign to a random alignment
    this.setAlignment(0);

    this.setLevel(1);

    this.setXp(0);
  }
  
  generateAttributes() {
    this.ability_score = {};
    this.ability_score.str = Math.floor(Math.random() * 16 + 3);
    this.ability_score.int = Math.floor(Math.random() * 16 + 3);
    this.ability_score.wis = Math.floor(Math.random() * 16 + 3);
    this.ability_score.dex = Math.floor(Math.random() * 16 + 3);
    this.ability_score.con = Math.floor(Math.random() * 16 + 3);
    this.ability_score.cha = Math.floor(Math.random() * 16 + 3);
  };
  
  setClass(assignedClass){
    let chosenClass = 0;
    
    //If "Random" is chosen, randomly choose from one of the classes available through the array
    if(assignedClass == 0){
      chosenClass = Math.floor(Math.random()*(validClasses.length-1)+1);
    } else chosenClass = assignedClass;
    
    this.assigned_class = validClasses[chosenClass];
  }
  
  setRace(assignedRace){
    let chosenRace = 0;
    
    //If "Random" is chosen, randomly choose from one of the races available through the array
    if(assignedRace == 0){
      chosenRace = Math.floor(Math.random()*(validRaces.length-1)+1);
    } else chosenRace = assignedRace;
    
    this.assigned_race = validRaces[chosenRace];
  }
  setAlignment(assignedAlignment){
    let chosenAlignment = 0;
    
    //If "Random" is chosen, randomly choose from one of the races available through the array
    if(assignedAlignment == 0){
      chosenAlignment = Math.floor(Math.random()*(validAlignments.length-1)+1);
    } else chosenAlignment = assignedAlignment;
    
    this.assigned_alignment = validAlignments[chosenAlignment];
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
      "assigned_class": this.assigned_class,
      "assigned_race": this.assigned_race,
      "level":this.level,
      "xp": this.xp,
      "alignment": this.assigned_alignment
    });
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
      ""
        
        ;
  
    return formattedInfo;
  };
}
module.exports = Character;
