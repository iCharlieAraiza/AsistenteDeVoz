const songSearch = document.getElementById("songInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.querySelector(".card-recomendations");

searchBtn.onclick = (e)=>{
    results.innerHTML = "";
    getSong(songSearch.value,(song)=>{
        if(song!==undefined){
            getSimilarSongs(song, (songsList)=>{

                appentResults(songsList, results)
                //console.log(result[0].name, result[0].artist.name)
                //console.log(result)
            })
        }else{
            alert("No se ha encontrado ningun resultado")
        }
    });

    //results.innerHTML = '<h3>'+songSearch.value+'</h3>';

}

function appentResults(song, parent){
    for(i= 0; i< song.length; i++){
        const numb = document.createElement("div")
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");
        const div = document.createElement("div");

        numb.innerText=(i+1)+".";
        h3.innerText = song[i].name;
        h4.innerText = song[i].artist.name;
        
        numb.classList.add("number-list");
        div.classList.add("card");

        div.appendChild(numb);
        div.appendChild(h3);
        div.appendChild(h4);

        parent.appendChild(div);
    }
}


function getSong(name, callBack){
    let song = "";
    const regex = /de/gi;
    song = name.replace(regex, '');

    song = encodeURIComponent(song.trim());

    let selectSong = {};
    fetch('https://ws.audioscrobbler.com/2.0/?method=track.search&track='+song+'&api_key=acb4fd5cb7e7a2d2fb948eaa7bfd873c&limit=1&format=json')
    .then(response => response.json())
    .then(data => {
            const result = data.results.trackmatches.track;
            
            selectSong = {
                name: result[0].name,
                artist: result[0].artist
            }
                
            callBack(selectSong)
        }   
    );
}


function getSimilarSongs(song, callback){

    fetch('http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist='+song.artist+'&track='+song.name+'&api_key=acb4fd5cb7e7a2d2fb948eaa7bfd873c&limit=5&format=json')
    .then(response => response.json())
    .then(data => {
            const track = data.similartracks.track;
                
            callback(track)
        }   
    );

}