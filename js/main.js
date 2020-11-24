
const form = document.getElementById("configForm");
const form2 = document.getElementById("recomendForm");

document.getElementById("closeBtn").onclick = ()=>{
    if(!form.classList.contains("hide-form")){
        form.classList.add("hide-form");
    }
}

document.getElementById("configBtn").onclick = ()=>{
    if(form.classList.contains("hide-form")){
        form.classList.remove("hide-form");
    }
}

document.getElementById("saveBtn").onclick = ()=>{
    
    document.getElementById("loader").style.display= "inline-block";
    document.getElementById("confirm-save-label").style.display= "none";

    setTimeout( ()=>{
        document.getElementById("loader").style.display= "none";
        document.getElementById("confirm-save-label").style.display= "inline-block";
        }, 3000);
    
}


document.getElementById("closeBtn2").onclick = ()=>{
    if(!form2.classList.contains("hide-form")){
        form2.classList.add("hide-form");
    }
}