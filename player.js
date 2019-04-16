class Player {
  constructor (name) {
    this.name = name;
    this.characters = [];
    this.points = 0;
  }
  
  addCharacter (character) {
    this.characters.push(character);
    return this;
  }
  
  
};


console.log("hello from player");

let blah = new Player("hi");

let yay = blah.addCharacter("Superman");

function assert (desc, f) {
  console.log(f + "?");
  if (f)
  { 
    console.log(desc + ' is true');
  }else {
    console.log(desc + ' is false');
  }
}

assert ("works", yay.characters[0] === "Superman");

console.log(yay.characters);


