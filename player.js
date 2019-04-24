class Player {
  constructor (name) {
    this.name = name;
    this.characters = [];
    this.points = 0;
    this.vote;
    this.challenger;
  }
  
  addCharacter (character, source) {
    this.characters.push(new Character(character, source));
    return this;
  }
  
  points () {
    return this.characters.reduce((acc, c) => acc + c.points);
  }
  
  choose(character) {
    this.challenger = character; 
  }
  
  vote_for(character) {
   this.vote = character; 
  }
};


class Character {
  constructor (name, source) {
    this.name = name;
    this.source = source;
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
