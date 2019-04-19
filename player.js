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
  
module.exports = {
  Character : Character,
  Player: Player
};
