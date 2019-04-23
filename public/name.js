var name_form = document.getElementById("name_form");
var name_input = document.getElementById("name_input");

name_form.addEventListener('submit', function(e) {
  window.localStorage.setItem('playerName', name_input.value);
});