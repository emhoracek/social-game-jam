// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

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
    db.run('CREATE TABLE Players (id INT, name TEXT, points INT)');
    console.log('New table Players created!');
    
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

// nunjucks views
var nunjucks = require('nunjucks');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.render('index.html');
});
// Player routes
app.get('/name', function(request, response) {
  response.render('name.html');
});
app.post('/name', function(request, response) {
  const name = request.body.name;
  if (name) {
    console.log("player added", name);
    addPlayer(name);
    io.emit('player added', name);
    response.redirect('/add');
  } else {
    const msg = "Please enter your name."
    response.render('name.html', { message: msg });
  }
});
// Adding characters routes
app.get('/add', function(request, response) {
  response.render('adding_characters.html');
});
app.post('/add', function(request, response) {
  const player = request.body.player;
  const characters = request.body.characters.split(',');
  console.log("Adding characters", player, characters);
  if (player && characters) {
    characters.forEach(x => addCharacter(player, characters));
    
    if (!gameState.started) {
      if (gameCanStart()){
        startGame();
      }
    }
    
    response.redirect('/game');
  } else {
    console.log("Something went wrong");
    const msg = "Oops"
    response.render('add.html');
  }
});
app.get('/start', function(request, response) {
  response.render('choosing_challenger.html');
});
app.get('/results', function(request, response) {
  response.render('viewing_results.html');
});

// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
app.get('/getDreams', function(request, response) {
  db.all('SELECT * from Dreams', function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});

// PLAYERS

let { Player } = require('./player');
let { Character } = require('./player');

var http = require('http').Server(app);
var io = require('socket.io')(http);

var players = [];
var gameState = {players : []};
gameState.started = false;

// game state
app.get('/game', function(request, response) {
    response.send(JSON.stringify(gameState));
});


function addUser() {
  
}

function addPlayer(name){
  gameState.players.push(new Player(name));
};

function addCharacter(playerName, character) {
  const player = gameState.players.find(x => x.name == playerName);
    
  if (player) {
    player.addCharacter(character);
  }
}

function gameCanStart() {
  console.log("can game start");
  console.log(gameState.players);
  var result= gameState.players.every(x => x.characters.length > 5);
  return result;
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
  socket.on('new character', function(player, character){
    console.log("character added", player, character);
    addCharacter(player, character);
    io.emit('character added', player, character);
  });
  socket.on('character choice', function(player, character) {
    console.log('character chosen', player ,character);
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