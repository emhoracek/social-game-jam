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
  
  
  chatForm.style.display = "block";
  nameForm.style.display = "none";
}

const chatForm = document.getElementById("chat_form");
const messageInput = document.getElementById("message_input");
const noMessages = document.getElementById("no_messages_message");

chatForm.onsubmit = function(event) {
  event.preventDefault();  
  
  socket.emit('chat message', { message: messageInput.value, name: playerName });
  messageInput.value="";
}

socket.on('player added', function(msg){
  if (noMessages.style.display !== "none") {
    noMessages.style = "none";
  }
  var li=document.createElement("li");
  li.appendChild(document.createTextNode(msg + ' joined'));
  document.getElementById("messages").appendChild(li);
});


const characterForm = document.getElementById("character_form");
const characterInput = document.getElementById("character_input");
const noCharacters = document.getElementById("no_characters_message");
const characterMessage = document.getElementById("character_helper");

var characters = [];

characterForm.onsubmit = function(event) {
  event.preventDefault();  
  
  socket.emit('character added', { message: characterInput.value, name: playerName });
  characterInput.value="";
  
  characterMessage.innerText(updateCharacterMessage());
}

function updateCharacterFormAndMessage(characters) {
  numCharacters = characters.length;
  
  if numCharacters > '5' {
    // hide form
    return ''
  }
  if numCharacters == '5' {
    return "You can add one more character";
  }
  if numCharacters > 1 && numCharacters < 5 {
    return "You can add " + 6 - numCharacters + " more characters.";
  }
  if numCharacters == '1'
  
}

socket.on('character added', function(msg){
  if (noCharacters.style.display !== "none") {
    noCharacters.style = "none";
  }
  var li=document.createElement("li");
  li.appendChild(document.createTextNode(msg + ' joined'));
  document.getElementById("characters").appendChild(li);
});

socket.on('chat message', function(name, msg){
  if (noMessages.style.display !== "none") {
    noMessages.style = "none";
  }
  var li=document.createElement("li");
  li.appendChild(document.createTextNode(name + ': ' + msg));
  document.getElementById("messages").appendChild(li);
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