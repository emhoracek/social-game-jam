var giphy = require('giphy-api')(process.env.GIPHY_API_KEY);
  

function giphySearch(character, source) {
  var search = character + ' ' + source;
  console.log(search);
  giphy.search(search).then(function (res) {
    //console.log(res);
    console.log(res.data[0].images.downsized.url);
  }).catch(e => console.log(e));
}

giphySearch('Dean', 'Supernatural');