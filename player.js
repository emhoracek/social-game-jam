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


// GIPHY
console.log("hello?");

class Character {
  constructor (name, source, image_id) {
    this.name = name;
    this.source = source;
    this.image = "/loading.gif";
    this.challenges = [];
    this.points = 0;
  }
  
  addChallenge(challenge) {
    this.challenges.push(challenge);
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