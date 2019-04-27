/* globals io, socket, playerName */

/* ADDING CHARACTERS */
const allCharactersForm = document.getElementById("all_characters_form");
const allCharactersInput = document.getElementById("all_characters_input");
const playerNameInput = document.getElementById("player_name_input");

playerNameInput.value = window.localStorage.getItem("playerName");

const characterForm = document.getElementById("character_form");
const characterInput = document.getElementById("character_input");
const sourceInput = document.getElementById("source_input");
const imageInput = document.getElementById("image_input");
const noCharacters = document.getElementById("no_characters_message");
const characterMessage = document.getElementById("characters_helper");

const characterName = document.getElementById("character_name");
const characterSource = document.getElementById("character_source");

var characters = [];

class Character {
  constructor (name, source, image_id) {
    this.name = name;
    this.source = source;
    this.image_id = image_id;
  }
}


characterForm.onsubmit = function(event) {
  event.preventDefault();
  
  const name = characterInput.value;
  const source = sourceInput.value;
  const image = imageInput.value;
  
  const character = new Character(name, source, image);
  
  characters.push(character);
  allCharactersInput.value = characters;

  addCharacterFormItem(character);

  const message = updateCharacterFormAndMessage();

  characterMessage.innerText = message;
  
  characterInput.value="";
}

function searchGiphy() {
 characterName.innerText = characterInput.value;
 characterSource.innerText = sourceInput.value;
 socket.emit('character update', characterInput.value, sourceInput.value);
}

characterInput.addEventListener('input', searchGiphy);
sourceInput.addEventListener('input', searchGiphy);

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
  li.dataset.name = character.name;
  li.dataset.source = character.name;
  li.dataset.image = character.image;
  li.removeAttribute("id");
  document.getElementById("character-choice-list").appendChild(li); 
}

function selectImage(e) {
  imageInput.value = e.target.dataset.imageid;
  var imagesrc = e.target.getAttribute("src");
  
  var card_image = document.getElementById("card_image");
  
  card_image.setAttribute("src", imagesrc);
}

var giphy = document.getElementById("giphy");

socket.on('image search', function (images) {
  console.log(images);
  if (giphy.children[0]) {
    console.log(giphy.children[0]);
  giphy.removeChild(giphy.children[0]);
  };
  var container = document.createElement("div");
  images.forEach(x => {
      var img = document.createElement("img");
      img.setAttribute("src", x.gif);
      img.dataset.imageid("src", x.id);
      img.addEventListener("click", selectImage);
      container.appendChild(img);
  });
  giphy.appendChild(container);
});