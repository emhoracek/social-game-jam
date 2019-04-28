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
socket.on('game started', function(gameState){
  startGame(gameState);
});


function startGame(gameState) {
  console.log("playerName", playerName);
  var player = gameState.players.find(x => x.name == playerName);
  if (player) {
    console.log("adding charcters", player.characters);
    player.characters.forEach(x => addCharacterFormItem2(x.name));
  }
  
  document.getElementById("game_state_message").innerText = 
    "Which of your characters would be better at: " + gameState.challenge;
  addChooseHandlers();
}

/* CHOOSING A CHARACTER */
const characterForm = document.getElementById("character_form");
const characterInput = document.getElementById("character_input");
const characterMessage = document.getElementById("characters_helper");

var characterChoice = undefined;

const charChoiceWrapper = document.getElementById('character-choice-message');
const charChoiceMessage = document.getElementById('character-choice');


const charChoiceButtonWrapper = document.getElementById('character-choice-button-wrapper');
const charChoiceButton = document.getElementById('character-choice-button');

function addChooseHandlers () {
  const choices = document.getElementsByClassName('character-choice');
  
  for (var i = 0; i < choices.length; i++) {
    choices[i].addEventListener("click",(e) => {
      unselectChoices(choices);
      selectChoice(e.target);
      characterChoice = e.target.dataset.name;
   });
  }
  charChoiceButtonWrapper.style.display = "block";
  charChoiceButton.addEventListener("click", (e) => {
    chooseChallenger();
  });
}

function chooseChallenger () {
  socket.emit('character choice', playerName, characterChoice);
}


function unselectChoices (choices) {
  for (var i = 0; i < choices.length; i++) {
    choices[i].style.border = "1px solid black";
    choices[i].style.background = "lightgrey";
  }
}


function selectChoice (choice) {
  choice.style.border = "1px solid magenta";
  choice.style.background = "pink";
}

socket.on('challengers ready')