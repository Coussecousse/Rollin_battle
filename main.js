// Variables 
// -> Classes : 
class Player {
    constructor(container, name, tour, score, scoreContainer, globalScoreElement, arrow, isHePlaying){
        this.container          = container;
        this.name               = name;
        this.tour               = tour;
        this.score              = score;
        this.scoreContainer     = scoreContainer
        this.globalScoreElement = globalScoreElement
        this.globalScore        = 0;
        this.arrow              = arrow;
        this.isHePlaying        = isHePlaying
    }
    changeName(setName){
        this.name.textContent   = setName;
    }
    setDesignTour(Opponent){
        this.score.textContent  = '0'; 
        opponent.scoreContainer.style.backgroundColor = 'var(--color-500)';
        opponent.score.textContent = '0';

        this.opacity(Opponent);
        this.hiddenTour(Opponent);
    }
    roll(diceContainer, dice, Opponent){
        canIRoll = false;
        diceContainer.classList.add('dice-animate');
        
        let newScore = Math.floor(Math.random() * (7 - 1) + 1);
        currentScore += newScore
        this.score.textContent = currentScore;

        setTimeout(animeDice, 300, newScore, dice);

        setTimeout(() => {
            diceContainer.classList.remove('dice-animate');
            currentDice        = newDice;
            if (newScore == 1){
                this.scoreContainer.style.backgroundColor = '#C21010';
                dice.classList.add('dice-one');
                setTimeout(() => {
                    dice.classList.remove('dice-one');
                    this.nextRound(Opponent);
                    canIRoll       = true;
                }, 300);
            } else {
                canIRoll           = true;
            }
        }, 600)

    }
    opacity(Opponent){
        Opponent.container.style.opacity = '1';
        this.container.style.opacity     = '.2';
    }
    hiddenTour(Opponent){
        Opponent.tour.style.visibility = 'visible';
        this.tour.style.visibility     = 'hidden';
    }
    hold(Opponent){
        this.globalScore                   += currentScore;

        this.arrow.classList.add('arrow-animate');

        setTimeout(() => {
            if (this.globalScore >= winnerScore){
                this.globalScoreElement.textContent = 100;
                this.weHaveAWinner();
            } else {
                this.globalScoreElement.textContent = this.globalScore;
                this.nextRound(Opponent);
                this.arrow.classList.remove('arrow-animate');
            }
        }, 520)
    }
    nextRound(Opponent){
        this.isHePlaying     = false;
        Opponent.isHePlaying = true;
        currentScore         = 0;

        this.setDesignTour(Opponent);

        currentPlayer = (Player1.isHePlaying ? Player1 : Player2);
        opponent      = (!Player1.isHePlaying ? Player1 : Player2);
    }
    weHaveAWinner(){
        canIRoll = false;
        footer.style.visibility = 'visible';
        winnerScreen.classList.add('active-winner-screen');

        confetti();
    };
}

// -> HEADER :
const header       = document.querySelector('header'),
      playButton   = document.querySelector('#play-button'),
      inputPlayer1 = document.querySelector('#player1'),
      inputPlayer2 = document.querySelector('#player2');

// -> GAME HTML/ CLASSES :
const Player1      = new Player(
    document.querySelector('#player1-container'), 
    document.querySelector('#player-name1'), 
    document.querySelector('#tour-p1'),
    document.querySelector('#p1-score'), 
    document.querySelector('#score-container-p1'),
    document.querySelector('#p1-global'), 
    document.querySelector('#arrow-p1'),
    true
);
const Player2      = new Player(
    document.querySelector('#player2-container'),
    document.querySelector('#player-name2'),
    document.querySelector('#tour-p2'),
    document.querySelector('#p2-score'),
    document.querySelector('#score-container-p2'),
    document.querySelector('#p2-global'),
    document.querySelector('#arrow-p2'),
    false
)

const gameContainer = document.querySelector('#game-container');

// -> GAME JS : 
let player1Name, player2Name;
const winnerScore   = 100;
let currentScore    = 0;
let currentDice     = 'fa-dice-five', newDice;
let canIRoll        = true;
let currentPlayer   = Player1, opponent = Player2;

// -> FOOTER : 
const footer = document.querySelector('footer');
const winnerScreen = document.querySelector('.winner-screen');


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
    
    gameContainer.addEventListener('click', e => {
        console.log('click');

        const playAgainButton       = gameContainer.querySelector('.play-again'),
              rollButton            = gameContainer.querySelector('#roll'),
              holdButton            = gameContainer.querySelector('#hold'),
              diceContainer         = gameContainer.querySelector('#dice-container'),
              dice                  = diceContainer.querySelector('i');
      
        if (!canIRoll){
            return;
        } else if (e.target == playAgainButton || e.target == playAgainButton.children[0]) {
            playAgain();
        } else if (e.target == rollButton || e.target == rollButton.children[0]){
            currentPlayer.roll(diceContainer, dice, opponent);
        } else if (e.target == holdButton || e.target == holdButton.children[0]){
            if (currentPlayer.score.textContent == '0'){
                return;
            }
            currentPlayer.hold(opponent)
        } else {
            return;
        }
    })   
}
footer.addEventListener('click', e => {

    const playAgainButton = footer.querySelector('.play-again');

    if (e.target == playAgainButton || e.target == playAgainButton.children[0]){
        playAgain();
    }
})

function animeDice(score, dice){
    switch (score){
        case 1: 
            newDice = 'fa-dice-one';
            break;
        case 2:
            newDice = 'fa-dice-two';
            break;
        case 3:
            newDice = 'fa-dice-three';
            break;
        case 4:
            newDice = 'fa-dice-four';                
            break;
        case 5:
            newDice = 'fa-dice-five';
            break;
        case 6:
            newDice = 'fa-dice-six';
            break;
        default :
            score = Math.floor(Math.random() * (7 - 1) + 1);
    }
    if (newDice == 'fa-dice-one'){
        dice.style.color = '#C21010';
    } else {
        dice.style.color = 'var(--color-500)';
    }
    dice.classList.replace(currentDice, newDice);
}
function playAgain(){
    const resetScore = player => {
        player.score.textContent = '0'
        player.globalScore       = 0;
        player.globalScoreElement.textContent = player.globalScore;
        player.scoreContainer.style.backgroundColor = 'var(--color-500)';
    }
    resetScore(Player1);
    resetScore(Player2);
    
    if (footer.style.visibility == 'visible'){
        footer.style.visibility = "hidden";
        winnerScreen.classList.remove('active-winner-screen')
    }
    
    currentPlayer = Player1;
    opponent      = Player2;
    
    Player1.isHePlaying = true;
    Player2.isHePlaying = false;

    canIRoll     = true;
    currentScore = 0;
    
    // On inverse pour remettre la bonne opacity à tout le monde
    opponent.setDesignTour(currentPlayer);
    
}

function confetti(){
    let confettis = 150;
    
    function random(min,max){
        return Math.floor(Math.random() * (max - min) + min);   
    }

    for (let x = 0; x < confettis; x++){
        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        console.log(windowHeight)
        let top = -(windowHeight/2);
        let i = document.createElement('i');

        i.classList.add('particle'+random(1,3));
        i.style.top = top + 'px';
        i.style.left = random(-(windowWidth/2), windowWidth)+'px';
        i.style.width = random(15,18)+'px';
        i.style.height = random(7,8)+'px';
        i.style.animationDelay = random(0, 800) +'ms';

        footer.appendChild(i);
        setTimeout(() => {
            footer.removeChild(i);
        }, 3000)
    }

}
