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
    setDesignTour(Opponent){
        this.score.textContent  = '0';
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
                this.nextRound(Opponent);
            }
            canIRoll           = true;
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
        this.globalScoreElement.textContent = this.globalScore;

        if (this.globalScore >= winnerScore){
            this.weHaveAWinner();
        }

        this.nextRound(Opponent);
    }
    nextRound(Opponent){
        this.isHePlaying     = false;
        Opponent.isHePlaying = true;
        currentScore = 0;

        this.setDesignTour(Opponent);

        currentPlayer = (Player1.isHePlaying ? Player1 : Player2);
        opponent      = (!Player1.isHePlaying ? Player1 : Player2);
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
    gameContainer.addEventListener('click', e => {

        const playAgainButton = gameContainer.querySelector('.play-again');
        const rollButton      = gameContainer.querySelector('#roll');
        const holdButton      = gameContainer.querySelector('#hold');
        const diceContainer   = gameContainer.querySelector('#dice-container');
        const dice            = diceContainer.querySelector('i');
        
        if (!canIRoll){
            return;
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
    dice.classList.replace(currentDice, newDice);
}