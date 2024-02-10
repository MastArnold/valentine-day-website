/***************************************************************************************/
/******************************* EASTER EGG DES OURSONS  *******************************/
/***************************************************************************************/

const ourson = document.getElementById('ourson'); // la div qui contiendra le code des oursons

/**
 * fait apparaitre des oursons animés sur l'écran
 */
function spawnOurson(){
    const bearcubs = []; // la liste des codes html des oursons à remplir
    
    //on génère 60 oursons. tu peux mettre le nombre d'ourson que tu veux. normalement ça ne devrait pas poser de problème
    for(let i = 0; i < 60; i++){
        // on génère des positions aléatoires pour les oursons en multipliant un chiffre random avec la largeur de la fenêtre pour la position left et la hauteur de la fenêtre pour la position top
        var posX = Math.floor(Math.random() * window.innerWidth);
        var posY = Math.floor(Math.random() * window.innerHeight);

        //on ajoute le code html des oursons
        //mais si la valeur i de la boucle est paire, l'animation de l'ourson n'aura pas de délai
        if(i % 2 === 0){
            bearcubs.push(`<div class="bearbox" style="left:${posX}px;top:${posY}px;"><i class="ico ico-bearcup-3" style="animation-delay: 0;"></i></div>`);
        }
        //si la valeur i de la boucle est divisible par 3, l'animation de l'ourson aura un délai de 0.2s
        else if (i % 3 === 0){
            bearcubs.push(`<div class="bearbox" style="left:${posX}px;top:${posY}px;"><i class="ico ico-bearcup-2" style="animation-delay: 0.2s;"></i></div>`);
        }else{
            bearcubs.push(`<div class="bearbox" style="left:${posX}px;top:${posY}px;"><i class="ico ico-bearcup-1" style="animation-delay: 0.4s;"></i></div>`);
        }
    } 
    ourson.innerHTML = bearcubs.join(''); //on convertit l'array en string et on le fait remplacer par le contenu html de la balise ourson
    
    //après 5s, on cache tous les oursons
    setTimeout(()=>{
        document.querySelectorAll(".bearbox").forEach((element)=>{
            element.style.animation = 'hide-ourson 0.5s ease-in-out forwards';
        });
        setTimeout(()=>{ourson.innerHTML = "";}, 500); // après 500ms on efface le contenu de la balise ourson
    }, 5000);
}

/**
 * lors d'un évènement mouseup (quand on lache le click de la souris) sur la balise howMuchLove, on vérifie si le texte sélectionné est "ourson"
 */
howMuchLove.addEventListener('mouseup', (e)=>{
    var selectedText = window.getSelection().toString(); //on récupère le texte sélectionné
    if (selectedText == "ourson") {
        window.getSelection().removeAllRanges(); // on retire la sélection
        spawnOurson(); //on spawn les oursons
    }
});

/****************************************************************************************/
/******************************* EASTER EGG DE LA FLECHE  *******************************/
/****************************************************************************************/
function initArrowAnimation(){
    if(arrow.children[0].children[1].classList.contains("animation-decocher-arrow")){
        arrow.children[0].children[1].classList.remove("animation-decocher-arrow");
    }
    arrow.children[0].children[0].classList.remove("animation-shake-arrow");
    arrow.children[0].children[1].classList.remove("animation-shake-arrow");
    arrow.children[0].children[0].classList.add("animation-move-cupidon-arrow");
    arrow.children[0].children[1].classList.add("animation-move-cupidon-arrow");
}

let handleDown = false;
arrow.addEventListener('mousedown', (e)=>{
    handleDown = false;
    if(arrow.style.transform == "translate(calc(-90vw + 15px), 0px) rotateY(0deg)"){
        if(arrow.children[0].children[1].classList.contains("animation-decocher-arrow")){
            arrow.children[0].children[1].classList.remove("animation-decocher-arrow");
        }
        arrow.children[0].children[0].classList.remove("animation-move-cupidon-arrow");
        arrow.children[0].children[1].classList.remove("animation-move-cupidon-arrow");
        arrow.children[0].children[0].classList.add("animation-shake-arrow");
        arrow.children[0].children[1].classList.add("animation-shake-arrow");
        setTimeout(()=>{
            handleDown = true;
        }, 2000);
    }
});
arrow.addEventListener('mouseup', (e)=>{
    if(handleDown){
        arrow.children[0].children[0].classList.remove("animation-shake-arrow");
        arrow.children[0].children[1].classList.remove("animation-shake-arrow");
        //arrow.children[0].children[1].classList.add("animation-move-cupidon-arrow");
        arrow.children[0].children[1].classList.add("animation-decocher-arrow");
    }else{
        initArrowAnimation();
    }
});
arrow.addEventListener('mouseleave', (e)=>{
    initArrowAnimation();
});