const dino = document.querySelector("#dino");
const background = document.querySelector(".background");

const jumpSound = new Audio("jump.wav");
const gameOverSound = new Audio("game-over.wav");

let position = 0;
let isJumping = false;

function handleKeyDown(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
            jumpSound.play();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            // desce
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + "px";
                }
            }, 20);
        } else {
            // sobe
            position += 20;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = window.innerWidth;
    let randomTime = Math.random() * (3000 - 500) + 500;
    
    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + "px";
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //game over
            gameOverSound.play();
            clearInterval(leftInterval);
            document.body.innerHTML = "<h1 class='game-over'>Fim de jogo</h1>";
        } else {
            cactusPosition -= 2;
            cactus.style.left = cactusPosition + "px";
        }
    }, 3);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', handleKeyDown);
