const start = document.getElementById("start");
const texts = document.querySelector(".texts");

window.SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

start.onclick = ()=>{
    if(start.classList.contains("active-record")){
        start.classList.remove("active-record");
        location.reload()
    }else{
        start.classList.add("active-record");
    }
    
    recognition.interimResults = true;

    let p = document.createElement("p");

recognition.addEventListener("result", (e) => {
texts.appendChild(p);
const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

p.innerText = text;
if (e.results[0].isFinal) {
    if (text.includes("Hola")) {
        p.classList.add("replay");
        p.innerText = "Hola, tú";
        texts.appendChild(p);
    }
    if (text.includes("Cómo estás")) {
    p = document.createElement("p");
    p.classList.add("replay");
    p.innerText = "Bien y tú?";
    texts.appendChild(p);
    }
    if(text.includes("Dame la hora")){
        const d = new Date();
        p.classList.add("replay");
        p.innerText = d.getHours() + ":" + d.getMinutes();
        texts.appendChild(p);
    }
    if(text.includes("Adiós")){
        const d = new Date();
        p.classList.add("replay");
        p.innerText = "Adiós";
        texts.appendChild(p);
    }
    if(text.includes("Apagar")|| text.includes("apagar")){
        p.classList.add("replay");
        p.innerText = "Apagando...";
        texts.appendChild(p);
        document.getElementById("main").classList.add("off");
    }


    /*
        Recomendación de música
    */

    if(text.toLowerCase().includes("recomienda música similar")){
        const p = document.createElement("p");
        p.classList.add("replay");
        let response = text.toLowerCase();
        let result = "";
        const regex = /recomienda música similar a/gi;

        responses = response.replace(regex, '');

        result=encodeURIComponent(responses.trim());

        getSimilarArtist(result, (song)=>{
            p.innerText = song;
            texts.appendChild(p);
        })

    }

    if(text.toLowerCase().includes("recomienda grupos similares")){
        const p = document.createElement("p");
        p.classList.add("replay");
        let response = text.toLowerCase();
        let result = "";
        const regex = /recomienda grupos similares a/gi;

        responses = response.replace(regex, '');

        result=encodeURIComponent(responses.trim());

        getSimilarArtist(result, (song)=>{
            p.innerText = song;
            texts.appendChild(p);
        })
    }
    
    if(text.toLowerCase().includes("recomienda artistas similares")){
        const p = document.createElement("p");
        p.classList.add("replay");
        let response = text.toLowerCase();
        let result = "";
        const regex = /recomienda artistas similares a/gi;

        responses = response.replace(regex, '');

        result=encodeURIComponent(responses.trim());

        getSimilarArtist(result, (song)=>{
            p.innerText = song;
            texts.appendChild(p);
        })
    }

    if(text.toLowerCase().includes("recomienda canciones")){
        const form2 = document.getElementById("recomendForm");
        if(form2.classList.contains("hide-form")){
            form2.classList.remove("hide-form");
        }
    }


    if(text.toLowerCase().includes("prender") || text.toLowerCase().includes("prende")){
        p.classList.add("replay");
        p.innerText = "Prendiendo...";
        texts.appendChild(p);
        document.getElementById("main").classList.remove("off");
    }

    if (text.toLowerCase().includes("abre youtube")) {
        p = document.createElement("p");
        p.classList.add("replay");
        p.innerText = "Abriendo YouTube";
        texts.appendChild(p);
        console.log("Abriendo YouTube");
        window.open("https://www.youtube.com/");
    }
    p = document.createElement("p");
}
});

recognition.addEventListener("end", () => {
recognition.start();
});

recognition.start();

}


function getSimilarArtist(name, callBack){
    let artista = "";
    fetch('https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist='+name+'&api_key=acb4fd5cb7e7a2d2fb948eaa7bfd873c&limit=5&format=json')
    .then(response => response.json())
    .then(data => {
            for(i = 0; i< data.similarartists.artist.length; i++){
                artista = artista + data.similarartists.artist[i].name + "\n";
            }
                    console.log(artista);
            callBack(artista);
        }   
    );
}


//http://ws.audioscrobbler.com/2.0/?method=track.search&track=In+my+memory+tiesto&api_key=acb4fd5cb7e7a2d2fb948eaa7bfd873c&format=json

//http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=acb4fd5cb7e7a2d2fb948eaa7bfd873c&format=json