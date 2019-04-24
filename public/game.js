/* globals io, socket, playerName */

console.log("game.js");

function addCharacterFormItem2(character) {
  var sample=document.getElementById("character-sample");
  var li = sample.cloneNode(true);
  li.innerText = character;
  li.dataset.name = character;
  li.removeAttribute("id");
  document.getElementById("character-choice-list").appendChild(li); 
}


/* STARTING THE GAME */
socket.on('game started', function(gameState, challenge){
  console.log("playerName", playerName);
  var player = gameState.players.find(x => x.name == playerName);
  if (player) {
    console.log("adding charcters", player.characters);
    player.characters.forEach(x => addCharacterFormItem2(x.name));
  }
  
  document.getElementById("game_state_message").innerText = 
    "Which of your characters would be better at: " + challenge;
  // addChooseHandlers();
});


/* CHOOSING A CHARACTER */
const characterForm = document.getElementById("character_form");
const characterInput = document.getElementById("character_input");
const noCharacters = document.getElementById("no_characters_message");
const characterMessage = document.getElementById("characters_helper");

var characterChoice = undefined;

const charChoiceWrapper = document.getElementById('character-choice-message');
const charChoiceMessage = document.getElementById('character-choice');

function addChooseHandlers () {
  const choices = document.getElementsByClassName('character-choice');
  
  for (var i = 0; i < choices.length; i++) {
    console.log("add handler");
    choices[i].addEventListener("click",(e) => {
      console.log("clicked");
      if (characterChoice) {
      } else {
        characterChoice = e.target.dataset.name;
        socket.emit('character choice', playerName, characterChoice);
        charChoiceMessage.innerText = characterChoice;
      }
   });
  }
}

