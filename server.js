// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));


let player = require('./player');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Dreams (dream TEXT)');
    console.log('New table Dreams created!');
    
    // insert default dreams
    db.serialize(function() {
      db.run('INSERT INTO Dreams (dream) VALUES ("Find and count some sheep"), ("Climb a really tall mountain"), ("Wash the dishes")');
    });
  }
  else {
    console.log('Database "Dreams" ready to go!');
    db.each('SELECT * from Dreams', function(err, row) {
      if ( row ) {
        console.log('record:', row);
      }
    });
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
app.get('/getDreams', function(request, response) {
  db.all('SELECT * from Dreams', function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});

// CHAT APP STUFF 

var http = require('http').Server(app);
var io = require('socket.io')(http);

var players = [];
var gameState = {players : []};
gameState.started = false;

function addUser() {
  
}

function addPlayer(name){
  players.push(name);
  gameState.players.push({"name" : name, characters: [] });
};

function addCharacter(player, character) {
  const players = gameState.players.filter(x => x.name == player)
    
  if (players) {
    const player = players[0];
    player.characters.push({ "name": character});
    
    if (!gameState.started) {
      if (gameCanStart()){
        startGame();
      }
    }
  }

}

function gameCanStart() {
  console.log("can game start");
  return gameState.players.every(x => x.characters.length > 5);
}

function startGame() { 
  console.log("starting game");
  const element = Math.round(Math.random() * (challenges.length - 1))
  const challenge = challenges[element];
  
  io.emit('game started', challenge);
}

io.on('connection', function(socket){
  console.log('user connected');
  io.emit('user added', players);
  socket.on('chat message', function(player, message){
    console.log("message recieved", player, message);
    io.emit('chat message', player, message);
  });
  socket.on('new player', function(msg){
    console.log("player added", msg);
    addPlayer(msg);
    io.emit('player added', msg);
  });
  socket.on('new character', function(player, character){
    console.log("character added", player, character);
    addCharacter(player, character);
    io.emit('character added', player, character);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});


const challenges = [
  "babysitting",
  "fist-fighting",
  "law",
  "crime",
  "visual art",
  "housekeeping",
  "architecture",
  "no-holds-barred combat",
  "piloting",
  "triathalon",
  "marathon",
  "crime-fighting",
  "animal-handling",
  "sewing",
  "well-dressed",
  "slacking",
  "video games",
  "music",
  "theater",
  "tennis",
  "philosophy",
  "spelling bee"
  ];