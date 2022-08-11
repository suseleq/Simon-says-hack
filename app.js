const colors = ['red', 'green', 'blue', 'yellow']; 
let simonSays; 
let guesses;
let round;
let interval;
let disableButtons = false;

const guessButtons = document.querySelectorAll('.guess-button ');
const saysTiles = document.querySelectorAll('.says');
const popup = document.querySelector('.popup-part');
const startButton = document.querySelector('.start-button');

startButton.addEventListener('click', () => {
    popup.classList.remove('show');
    restartGame();
});
guessButtons.forEach(button => {
    button.addEventListener('click', checkColor);
});

function checkColor(e){
    if(!disableButtons){
        button = e.target.classList[2];
        if (button == simonSays[guesses]){
            saysTiles[guesses].classList.add(simonSays[guesses]);
            guesses++;
            if (guesses == simonSays.length) {
                disableButtons = true;
                if (guesses == 8) {
                    let headerPopup = popup.querySelector('h2');
                    headerPopup.innerText = 'Gratulacje! Wygrałeś, zacznij gre od nowa';
                    popup.classList.add('show');
                } else {
                    setTimeout(() => {
                        for (let i = 0; i < simonSays.length; i++) {
                            saysTiles[i].classList.remove(saysTiles[i].classList[2]);
                        }
                        guesses = 0;
                        round++;
                        startRound();
                    }, 800);
                }
            }
        } else{
            let headerPopup = popup.querySelector('h2');
            headerPopup.innerText = 'Przegrałeś, zacznij gre od nowa';
            popup.classList.add('show');
        }
    }
}

function startRound(){
    simonSays.push(colors[Math.round(Math.random() * 3)]);
    showSays();
}

function showSays() {
    let i = 0;
    interval = setInterval(() => {
        if(i > round){
            clearInterval(interval);
            disableButtons = false;
        }else{
            saysTiles[i].classList.add(simonSays[i]);
            setTimeout(() => {
                saysTiles[i].classList.remove(simonSays[i]);
                i++;
            }, 500);
        }
    }, 1000);
}

function restartGame() {
    saysTiles.forEach(tile => {
        tile.classList.remove(tile.classList[2]);
    });
    simonSays = [];
    guesses = 0;
    round = 1;
    simonSays.push(colors[Math.round(Math.random() * 3)]);
    startRound();
}
