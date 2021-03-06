var giphy = require('giphy-api')(process.env.GIPHY_API_KEY);
  

function giphySearch(character, source) {
  var search = character + ' ' + source;
  console.log(search);
  var images = []
  
  return giphy.search(search).then(function (res) {
    //console.log(res);
    res.data.forEach (x => {
      const image = {
        'still': x.images.downsized_still.url,
        'gif': x.images.downsized.url,
        'id': x.id
      }
      images.push(image);
    });
    
    return images;
  }).catch(e => {
    console.log(e)
    return images;
  });
}

module.exports = { giphySearch: giphySearch };