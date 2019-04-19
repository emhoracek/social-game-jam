class Player {
  constructor (name) {
    this.name = name;
    this.characters = [];
    this.points = 0;
  }
  
  addCharacter (character) {
    this.characters.push(new Character(character));
    return this;
  }
  
  points () {
    return this.characters.reduce((acc, c) => acc + c.points);
  }
  
};


class Character {
  constructor (name) {
    this.name = name;
    this.points = 0;
  }

  addPoint() {
    this.points = this.points + 1;
    return this;
  }

}
  
  
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


