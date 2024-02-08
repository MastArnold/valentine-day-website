// on crée un objet audio pour la musique plastic love
const audio = new Audio('assets/song/PlasticLove.mp3');

// on joue l'audio après 2 secondes le temps de permettre à l'utilisateur d'interagir avec le DOM
function playPlasticLove(){
    try{
        audio.currentTime = 230.5;
        audio.volume = 0.1; 
        audio.play();
    }catch(error) {console.log(error)};
}