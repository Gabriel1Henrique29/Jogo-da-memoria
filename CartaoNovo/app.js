// script.js
const board = document.querySelector('.board');
const resetButton = document.getElementById('resetButton');
const cardsArray = ["🍎", "🍌", "🍇", "🍉", "🍎", "🍌", "🍇", "🍉", "🍑", "🍆", "🥝", "🥥", "🍑", "🍆", "🥝", "🥥", "🍈", "🥭", "🍈",  "🥭"];
 //  10  pares de cartas
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function shuffleCards() {
    board.innerHTML = ''; // Limpa o tabuleiro
    const shuffledCards = cardsArray.sort(() => 0.5 - Math.random());
    shuffledCards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="front"></div>
            <div class="back">${symbol}</div>
        `;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

resetButton.addEventListener('click', shuffleCards);

// Inicializa o jogo
shuffleCards();