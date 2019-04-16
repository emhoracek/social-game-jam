class Player {
  constructor (name) {
    this.name = name;
    this.characters = [];
  }
  
  addCharacter (character) {
    this.characters.push(character);
    return this;
  }
  
  
};


let blah = new Player("hi");

let yay = blah.addCharacter("Superman");