/* globals io, socket, playerName */


/* STARTING THE GAME */

socket.on('game started', function(challenge){
  document.getElementById("game_state_message").innerText = 
    "Which of your characters would be better at: " + challenge;
  // addChooseHandlers();
});