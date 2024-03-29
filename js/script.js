const thehead = document.querySelector("#thehead"); //le header
const titrehead = document.querySelector("#titre-thehead"); //le text du header
const arrow = document.querySelector("#arrow"); //l'icone animé inutile là, sous la forme de la flèche de cupidon
const whyPlasticLove = document.querySelector("#why-plastic-love"); //la section "pourquoi plastic love"
const howMuchLove = document.querySelector("#how-much-love"); //la section "pourquoi plastic love"
const advantages = document.querySelector("#advantages"); //la section "pourquoi plastic love"
const disquette = document.querySelector("#disquette"); //la section "pourquoi plastic love"
const listBtnLanguage = document.querySelectorAll(".btn-language"); //les bouttons du carousel 
const listLanguageCard = document.querySelectorAll(".card-language"); //les items du carousel

/**
 * déjà, commence à t'habituer au fait que je code en franglais, c'est la vie.
 * ensuite, cette fonction permet de wrapper, c'est à dire encapsuler, toutes les lettres contenu dans la balise #titre-thhead avec des balises span
 * le but étant de ne pas se faire chier à entourer ces lettres moi-même dans le html
 */
function wrapperLetters(){
    const text = titrehead.innerText; //on récupère le text dans la balise
    const lettres = text.split('').map(letter => `<span>${letter}</span>`); //on crée un array qui contiendra chaque lettre du text avec split, et ensuite on remplace toute les lettres de l'array par la version wrapper
    lettres[9] = `<span><i class="ico ico-heart"></i></span>`; //l'élément numéro 9 de l'array à besoin d'inclure une classe dans son code. donc euh... voilà
    titrehead.innerHTML = lettres.join(''); //on concatène tous les éléments de l'array et on le fait remplacer par le contenu html de la balise #titre-head
    /**/
    titrehead.children[9].appendChild(document.createElement('div')).classList.add("bloc-piece-heart");
    for(let i=0; i<20;i++){
        const element = document.createElement('div');
        element.classList.add("piece-heart");
        titrehead.children[9].children[1].appendChild(element);
    }
    
}

/**
 * cette fonction sert à ajouter des styles animation à chacune des balises span généré dans dans wrapperLetters
 * tu me diras "ouais mais jonathan tu aurais pu le faire dans le css"
 * alors de 1 je fais ce que je veux 
 * de 2 il semble que la propriété animation ne se charge uniquement pour les éléments qui se trouve dans le dom au moment du chargement de celui-ci. hors mon code js se charge à la fin du chargement. tu me diras encore "ouais mais charge ton code au début". non, je ne le ferai pas.
 * et enfin de 3 en procédant ainsi je pourrai repéter l'animation autant de fois que je veux. donc, pour rester polie, je m'en tartine les noisettes !
 */
function headLettersAnimation(){
    //on récupère la liste des spans et on ajoute l'animation turn-letter pour les lettres
    //et turn-heart pour le 10ème span qui ne contient pas une lettre mais plustôt un référence d'un svg
    //chaque lettre devant agir à des périodes différentes leur delay sont forcément différent
    document.querySelectorAll("#titre-thehead span").forEach((element, key)=>{
        switch(key){
            case 0:
                element.style.animation = `turn-letter 0.4s 0.1s ease-in-out`;
                break;
            case 1:
                element.style.animation = `turn-letter 0.4s 0.15s ease-in-out`;
                break;
            case 2:
                element.style.animation = `turn-letter 0.4s 0.2s ease-in-out`;
                break;
            case 3:
                element.style.animation = `turn-letter 0.4s 0.25s ease-in-out`;
                break;
            case 4:
                element.style.animation = `turn-letter 0.4s 0.5s ease-in-out`;
                break;
            case 5:
                element.style.animation = `turn-letter 0.4s 0.55s ease-in-out`;
                break;
            case 6:
                element.style.animation = `turn-letter 0.4s 0.6s ease-in-out`;
                break;
            case 8:
                element.style.animation = `turn-letter 0.4s 0.7s ease-in-out`;
                break;
            case 9:
                element.style.animation = `turn-heart 5s 0.8s ease-in-out forwards`;
                break;
            case 10:
                element.style.animation = `turn-letter 1s 2.8s ease-in-out`;
                break;
            case 11:
                element.style.animation = `turn-letter 1s 3.2s ease-in-out`;
                break;
            default:break;
        }
        
    });
}

/**
 * cette fonction sert à translater les éléments du carousel .carouselDevLanguageCard (oui c'est long) jusqu'à l'élément à l'index @index
 * si t'as pas compris, franchement, tu te débrouille, virginie
 * @param {*} index 
 */
function navigToDevLanguageCard(index){
    //on update la même translation à tous les éléments du carousel à l'index
    listLanguageCard.forEach((element)=>{
        if(index > 0)
            element.style.transform="translateX(calc(-"+(index * 100)+"% - "+(0.4*index)+"rem))";
        else
            element.style.transform="translateX(0)";
    });
}

/**
 * cette fonction sert à initialiser les bouttons .devLanguageBtn en leur ajoutant à tous un évènement de click
 * le click doit ajouter ua boutton la classe "active" et naviguer le carousel de card jusqu'à la cible index
 */
function initBtnLanguage(){
    listBtnLanguage.forEach((btn, index)=>{
        btn.addEventListener('click', (e)=>{
            listBtnLanguage.forEach((v)=>{if(v.classList.contains("active"))v.classList.remove("active");}); //ici on retire la classe active au boutton qui l'as. 
            btn.classList.add("active"); //on ajoute la classe "active"
            navigToDevLanguageCard(index); //on déplace les éléments du carousel jusqu'à la cible
        });
    });
}

/**
 * la fonction la moins utile de tous les temps
 * elle sert à changer la flèche de cupidon de place à chaque nouvelle section
 * ça ne sert à rien mais je manquais d'inspiration aussi
 */
function initMoveArrow(){
    window.addEventListener('scroll', (e)=>{
        //on change la position de la flèche à chaque fois que la section cible est atteinte
        //le getBoundingClientRect().top est positif quand l'élément n'as pas encore été atteint et négatif quand on le dépasse
        //on sait qu'on à dépasser la section actuelle quand le getBoundingClientRect().top est inférieur à la hauteur négative de la section
        if(thehead.getBoundingClientRect().top >= 0){
            arrow.style.transform = "translate(0, 0) rotateY(180deg)"; //place a
        }else if(whyPlasticLove.getBoundingClientRect().top >= 0 || whyPlasticLove.getBoundingClientRect().top >= (whyPlasticLove.clientHeight*(-1))){
            arrow.style.transform = "translate(calc(-90vw + 15px), 0) rotateY(0deg)"; //place b
        }else if(howMuchLove.getBoundingClientRect().top >= 0 || howMuchLove.getBoundingClientRect().top >= (howMuchLove.clientHeight*(-1))){
            arrow.style.transform = "translate(calc(-90vw + 15px), 80vh) rotateY(0deg)"; //place c
        }else if(advantages.getBoundingClientRect().top >= 0 || advantages.getBoundingClientRect().top >= (advantages.clientHeight*(-1))){
            arrow.style.transform = "translate(0, 80vh) rotateY(180deg)"; //place d
        }else if(disquette.getBoundingClientRect().top >= 0 || disquette.getBoundingClientRect().top >= (disquette.clientHeight*(-1))){
            arrow.style.transform = "translate(0, 0) rotateY(180deg)"; //place e
        }
    });
}
    
//on lance le wrap
wrapperLetters();
//on lance la fonction inutile. sérieusement je sais pas pourquoi j'ai fait ça
initMoveArrow();
//on initialise les bouttons du carousel
initBtnLanguage(); 