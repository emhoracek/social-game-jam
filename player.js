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
  constructor (name, source) {
    this.name = name;
    this.source = source;
    this.image = "/loading.gif";
    this.points = 0;
  }

  addPoint() {
    this.points = this.points + 1;
    return this;
  }
  
  giphySearch() {
    var giphy = require('giphy-api')(process.env.GIPHY_API_KEY);
    giphy.search('dean supernatural').then(function (res) {
      console.log(res.data[0].images.fixed_height_still.url);
    }).catch(e => console.log(e));
    
  }

}
  
module.exports = {
  Character : Character,
  Player: Player
};
