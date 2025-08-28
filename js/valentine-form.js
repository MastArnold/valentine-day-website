const body = document.querySelector('body');
const valentineForm = document.getElementById("valentine-form");//le formulaire
const topGif = document.getElementById("form-top-gif"); //le gif
const mid = document.querySelector(".mid"); //le texte
const btnYes = document.getElementById("btn-yes"); //le boutton oui
const btnNo = document.getElementById("btn-no"); //le boutton non
const errorSong = new Audio('assets/song/error.mp3');// on crée un objet audio pour le bruitage de boutton non
let noCount = 0; //le compteur de non

body.style.overflow = 'hidden'; //on bloque le scroll du body pour l'instant
valentineForm.style.display = "flex"; //on défini le style display à flex. il l'est déjà dans le css mais bon, js est très capricieux comme langage

// Préchargement des GIFs
const images = [
    "assets/GIF/f-1.gif",
    "assets/GIF/f-2.gif",
    "assets/GIF/f-3.gif",
    "assets/GIF/f-4.gif",
    "assets/GIF/f-5.gif",
    "assets/GIF/f-6.gif",
    "assets/GIF/f-7.gif"
];
const preloaded = [];
for (let i = 0; i < images.length; i++) {
    preloaded[i] = new Image();
    preloaded[i].src = images[i];
}

/**
 * permet de relancer l'animation des gif qui est censé s'arrêter au bout de 6s
 */
function reloadGIF(){
    // on stocke la valeur de l'attribut src dans une variable temporaire
    var srcTemporaire = topGif.src;

    // on efface l'attribut src
    topGif.removeAttribute("src");

    // on remet l'attribut src, ce qui rechargera le gif et relancera l'animation
    topGif.setAttribute("src", srcTemporaire);

    //on utilise la recursivité pour que la fonction se lance tant que le formulaire est affiché
    if(valentineForm.style.display === "flex"){
        setTimeout(() => {
            reloadGIF();
        }, 6000);
    }
}

/**
 * évnènement du clique sur le boutton oui
 */
btnYes.addEventListener("click", (e)=>{
    valentineForm.style.transform = "translateY(-100%)"; //on déplace le formulaire vers le haut
    
    //après 5s, on cache le formualire. tu peux aussi supprime le formulaire du DOM avec la syntaxe valentineForm.remove() mais bon, je préfère le cacher
    setTimeout(()=>{
        valentineForm.style.display = "none"; 
    }, 5000);

    body.style.overflow = 'auto'; //on réactive le scroll du body
    window.scrollTo(0, 0);; //on remonte tout en haut de la page (ça peut arriver que le scroll soit en bas lors du rechargement de la page)

    playPlasticLove(); //on joue la musique

    //on lance l'animation à ce moment précis car cet à cet instance que les paroles "plastic love" sont prononcé. oui je sais, je suis méticuleux
    setTimeout(()=>{
        headLettersAnimation();
    }, 5500);
});

/**
 * évnèmenet du clique sur le boutton non
 */
btnNo.addEventListener("click", (e)=>{
    noCount++; //on incrémente le compteur de non
    
    //si le compteur atteint 6 on cache le boutton non
    if(noCount >= 6){
        btnNo.style.display = "none";
    }else{
        errorSong.currentTime = 0.5;
        errorSong.volume = 1; 
        errorSong.play(); //on joue le bruitage de boutton non
    }

    //on change le texte du milieu en fonction du compteur
    switch(noCount){
        case 1:
            mid.innerHTML = "Allez ! Soit Sympa ! On vas bien s'amusez !!";
            break;
        case 2:
            mid.innerHTML = "Vraiment ?! J'ai pourant pleins de trucs à te dire...";
            break;
        case 3:
            mid.innerHTML = "Hm... Je commence à m'impatienter...";
            break;
        case 4:
            mid.innerHTML = "KEUUA ?? Je suis si moche que ça ?! 😭";
            break;
        case 5:
            mid.innerHTML = "Ah je sais ! tu es daltonienne, c'est ça ? c'est bon j'ai inversé les couleurs pour toi 😉 !";

            //on change le style des bouttons
            btnYes.style.background = "rgb(187, 0, 0)";
            btnYes.style.color = "#fff";
            btnNo.style.borderColor = "rgb(187, 0, 0)";
            btnNo.style.background = "rgb(53, 221, 53)";
            btnNo.style.borderColor = "transparent";
            btnNo.style.color = "#333";
            break;
        case 6:
            //on rétablit le style du boutton oui uniquement cars à ce stade le boutton non sera caché
            mid.innerHTML = "Tu l'auras voulu ! Eh Eh tu n'as plus le choix maintenant.";
            btnYes.style.borderColor = "rgb(187, 0, 0)";
            btnYes.style.background = "rgb(53, 221, 53)";
            btnYes.style.borderColor = "transparent";
            btnYes.style.color = "#333";
            break;
        default:break;
    }

    //à chaque clique, on augmente les paddings du boutton oui
    btnYes.style.paddingTop = "calc(0.65rem + "+(0.25*noCount)+"rem)";
    btnYes.style.paddingBottom = "calc(0.65rem + "+(0.25*noCount)+"rem)";
    btnYes.style.paddingLeft = "calc(0.9rem + "+(0.25*noCount)+"rem)";
    btnYes.style.paddingRight = "calc(0.9rem + "+(0.25*noCount)+"rem)";

    //on change le src du gif en fonction du compteur
    //dans assets/GIF il y a 7 gif dont le nom commence par f-
    topGif.setAttribute("src", images[noCount]);
});

//on lance le rafraichissement du gif
setTimeout(()=>{
    reloadGIF();
}, 6000);