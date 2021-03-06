/* globals io, characters, startGame */

// client-side js
// run by the browser each time your view template referencing it is loaded

console.log('hello world :o');

var socket = io.connect();

/* NEW PLAYERS */
var playerName = "";

const noPlayers = document.getElementById("no_players_message");

function addPlayer(player){
  noPlayers.style.display = "none";
  noMessages.style.display = "none";
  
  // Add "player joined" message to chat
  var li=document.createElement("li")
  var span = document.createElement("span");
  span.appendChild(document.createTextNode(player.name + ' joined'));
  span.style['font-style']="italic";
  li.appendChild(span);
  document.getElementById("chat_messages").appendChild(li);
  
  // Add player name to list of players
  var li=document.createElement("li");
  li.appendChild(document.createTextNode(player.name + ' (' + player.points + ' pts)'));
  document.getElementById("players").appendChild(li);
};

/* CHATTING */
const chatForm = document.getElementById("chat_form");
const messageInput = document.getElementById("message_input");
const noMessages = document.getElementById("no_messages_message");
const chatMessages = document.getElementById("chat_messages");

chatForm.onsubmit = function(event) {
  event.preventDefault();  
  
  socket.emit('chat message', playerName, messageInput.value);
  messageInput.value="";
}

socket.on('chat message', function(name, msg){
  noMessages.style.display = "none";
  var li=document.createElement("li");
  li.appendChild(document.createTextNode(name + ': ' + msg));
  chatMessages.appendChild(li);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

/* UPDATING GAME STATE */

function updateGameState() {
  var gameRequest = new XMLHttpRequest();
  gameRequest.onload = getGameListener;
  gameRequest.open('get', '/game');
  gameRequest.send();
  
  playerName = window.localStorage.getItem('playerName');
  if (playerName) {
    chatForm.style.display = "flex"; 
  }
};

function getGameListener() {
  var gameState = JSON.parse(this.responseText);

  gameState.players.forEach( function(player) {
    addPlayer(player);
    
    if (player.name == playerName) {
      console.log("characters", player.characters); 
    }
  });
  
  if (gameState.started && startGame) {
    startGame(gameState); 
  }
};

window.addEventListener('load', updateGameState);

/* AFTER CHOICE */

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