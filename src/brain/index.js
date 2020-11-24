const brain = require('brain.js');
const cache = new LastFMCache();
const lastfm = new LastFM({})

const network = new brain.recurrent.LSTM();

const trainingData = data.map(item => ({
  input: item.text,
  output: item.category
}));

cache.array.forEach(element => {
    element.add(trainingData);
});

const executeNetwork = (song, callBack)=>{
    network.train(trainingData, {
        iterations: 2000
      });
      
      network.run(lastfm.track.getInfo({name: song.name, artist: song.artist}, {success: function(data){
            callBack(data);
        }, error: function(code, message){
            console.log(code,message.error)
        }}));
}

export default executeNetwork;
