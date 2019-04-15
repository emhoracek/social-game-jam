/* globals io */

// client-side js
// run by the browser each time your view template referencing it is loaded

console.log('hello world :o');

var socket = io.connect();

var playerName = ""

const nameForm = document.getElementById("name_form");
const nameInput = document.getElementById("name_input");

nameForm.onsubmit = function(event) {
  event.preventDefault();  
  
  playerName = nameInput.value;
  socket.emit('new player', playerName);
  nameInput.value="";
  
  characterForm.style.display = "block";
  nameForm.style.display = "none";
}

const chatForm = document.getElementById("chat_form");
const messageInput = document.getElementById("message_input");
const noMessages = document.getElementById("no_messages_message");
const noPlayers = document.getElementById("no_players_message");

chatForm.onsubmit = function(event) {
  event.preventDefault();  
  
  socket.emit('chat message', { message: messageInput.value, name: playerName });
  messageInput.value="";
}

socket.on('player added', function(msg){
  noPlayers.style.display = "none";
  noMessages.style.display = "none";
  var li=document.createElement("li");
  li.appendChild(document.createTextNode(msg + ' joined'));
  document.getElementById("messages").appendChild(li);
  
  
  var li=document.createElement("li");
  li.appendChild(document.createTextNode(msg));
  document.getElementById("players").appendChild(li);
});


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

socket.on('character added', function(player, character){
  noCharacters.style.display = "none";
  
  characters.push(character);
  
  var li=document.createElement("li");
  li.appendChild(document.createTextNode(character));
  document.getElementById("characters").appendChild(li);
  
  const message = updateCharacterFormAndMessage();
  
  characterMessage.innerText = message;
  
});

socket.on('chat message', function(name, msg){
  noMessages.style.display = "none";
  var li=document.createElement("li");
  li.appendChild(document.createTextNode(name + ': ' + msg));
  document.getElementById("messages").appendChild(li);
});


socket.on('game started', function(challenge){
  document.getElementById("game_state_message").innerText = 
    "Which of your characters would be better at: " + challenge;
});



// Original app
/*
let dreams = [];

// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];

// a helper function to call when our request for dreams is done
const getDreamsListener = function() {
  // parse our response to convert to JSON
  dreams = JSON.parse(this.responseText);

  // iterate through every dream and add it to our page
  dreams.forEach( function(row) {
    appendNewDream(row.dream);
  });
}

// request the dreams from our app's sqlite database
const dreamRequest = new XMLHttpRequest();
dreamRequest.onload = getDreamsListener;
dreamRequest.open('get', '/getDreams');
dreamRequest.send();

// a helper function that creates a list item for a given dream
const appendNewDream = function(dream) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = dream;
  dreamsList.appendChild(newListItem);
}

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  dreams.push(dreamInput.value);
  appendNewDream(dreamInput.value);

  // reset form 
  dreamInput.value = '';
  dreamInput.focus();
};
*/