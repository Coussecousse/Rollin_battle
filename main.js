// Variables 
// -> Classes : 
class Player {
    constructor(container, name, tour, score, globalScoreElement, isHePlaying){
        this.container          = container;
        this.name               = name;
        this.tour               = tour;
        this.score              = score;
        this.globalScoreElement = globalScoreElement
        this.globalScore        = 0;
        this.isHePlaying        = isHePlaying
    }
    
    changeName(setName){
        this.name.textContent   = setName;
    }
}

// -> HEADER :
const header       = document.querySelector('header')
const playButton   = document.querySelector('#play-button');
const inputPlayer1 = document.querySelector('#player1');
const inputPlayer2 = document.querySelector('#player2');

// -> GAME HTML/ CLASSES :
const Player1      = new Player(
    document.querySelector('#player1-container'), 
    document.querySelector('#player-name1'), 
    document.querySelector('#tour-p1'),
    document.querySelector('#p1-score'), 
    document.querySelector('#p1-global'), 
    true
);
const Player2      = new Player(
    document.querySelector('#player2-container'),
    document.querySelector('#player-name2'),
    document.querySelector('#tour-p2'),
    document.querySelector('#p2-score'),
    document.querySelector('#p2-global'),
    false
)

// Fonctions : 
playButton.addEventListener('click', () => {

    player1Name = inputPlayer1.value;
    player2Name = inputPlayer2.value;
    
    if (player1Name == '' ){
        player1Name = 'Joueur 1';
    }
    if (player2Name == ''){
        player2Name = 'Joueur 2';
    }
    header.classList.add('header-up');

    Player1.changeName(player1Name);
    Player2.changeName(player2Name);

    gameBeginning();
})

function gameBeginning(){
    
}