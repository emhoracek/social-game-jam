class Player {
  constructor (name) {
    this.name = name;
    this.characters = [];
    this.points = 0;
    this.vote;
    this.challenger;
  }
  
  addCharacter (character) {
    this.characters.push(new Character(character.name, character.source, character.image_id));
    return this;
  }
  
  points () {
    return this.characters.reduce((acc, c) => acc + c.points);
  }
  
  choose(characterName) {
    const character = this.characters.find(x => x.name == characterName); 
    this.challenger = character; 
    return this;
  }
  
  vote_for(character) {
    this.vote = character;
    return this;
  }
};


// GIPHY
console.log("hello?");

class Character {
  constructor (name, source, image_id) {
    this.name = name;
    this.source = source;
    this.image = "https://media0.giphy.com/media/" + image_id + "/giphy-downsized.gif";
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