const cards = document.querySelectorAll(".memory-card");

let cardHasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard){
    return;
  }
  if (this === firstCard) {
    return;
  }
  this.classList.add("flip");

  if(!cardHasFlipped) {
//first click
    cardHasFlipped = true;
    firstCard = this;

    return;
  }
// second click
    secondCard = this;
    
    checkForMatch();
  }

// cards match?
function checkForMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? disableCards() : unFlipCards(); 
}

//matched cards can't be clicked again
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

// unflip not matching cards
function unFlipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [cardHasFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// add clicks to cards
cards.forEach(card => card.addEventListener("click",flipCard));