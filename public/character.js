/* globals io, socket, playerName */

/* ADDING CHARACTERS */
const allCharactersForm = document.getElementById("all_characters_form");
const allCharactersInput = document.getElementById("all_characters_input");
const playerNameInput = document.getElementById("player_name_input");

playerNameInput.value = window.localStorage.getItem("playerName");

const characterForm = document.getElementById("character_form");
const characterInput = document.getElementById("character_input");
const noCharacters = document.getElementById("no_characters_message");
const characterMessage = document.getElementById("characters_helper");

var characters = [];

characterForm.onsubmit = function(event) {
  event.preventDefault();
  
  const character = characterInput.value;
  
  characters.push(character);
  allCharactersInput.value = characters;

  addCharacterFormItem(character);

  const message = updateCharacterFormAndMessage();

  characterMessage.innerText = message;
  
  characterInput.value="";
}

function updateCharacterFormAndMessage() {
  noCharacters.style.display = "none";
  const numCharacters = characters.length;
  
  if (numCharacters > '5') {
    characterForm.style.display = "none";
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