//Game Functions
const diceRoll =  (multiplier,diceType,modifier) =>{
    return multiplier * (Math.floor(Math.random() * diceType+1)) + modifier;
}

module.exports = {diceRoll};