/* globals io, socket, playerName */

/* ADDING CHARACTERS */
const characterForm = document.getElementById("character_form");
const characterInput = document.getElementById("character_input");
const noCharacters = document.getElementById("no_characters_message");
const characterMessage = document.getElementById("characters_helper");

var characters = [];

characterForm.onsubmit = function(event) {
  event.preventDefault();  
  
  socket.emit('new character', playerName, characterInput.value );
  characterInput.value="";
}

function updateCharacterFormAndMessage() {
  const numCharacters = characters.length;
  
  if (numCharacters > '5') {
    characterForm.style.display = "none";
    chatForm.style.display = "block";
    return ''
  }
  if (numCharacters == '5') {
    return "Please add one more character";
  }
  
  return "Please add " + (6 - numCharacters) + " more characters.";
}

function addCharacterFormItem(character) {
  var sample=document.getElementById("character-sample");
  var li = sample.cloneNode(true);
  li.innerText = character;
  li.dataset.name = character;
  li.removeAttribute("id");
  document.getElementById("character-choice-list").appendChild(li); 
}

socket.on('character added', function(player, character){
  if (player == playerName) {
    noCharacters.style.display = "none";
  
    characters.push(character);

    addCharacterFormItem(character);

    const message = updateCharacterFormAndMessage();

    characterMessage.innerText = message;
  }
});

/* CHOOSING CHARACTERS */

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