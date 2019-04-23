/* globals io, socket, playerName */


/* STARTING THE GAME */
socket.on('game started', function(challenge){
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

