const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let gameBoard = document.querySelector('.game-board');
let flippedCards = [];
let matchedPairs = 0;

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function renderCards() {
    shuffle(cardsArray);
    gameBoard.innerHTML = '';
    cardsArray.forEach((cardValue) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.value = cardValue;
      card.innerHTML = `<span>${cardValue}</span>`;
      gameBoard.appendChild(card);
    });
  }

  gameBoard.addEventListener('click', (e) => {
    const selectedCard = e.target.closest('.card');
  
    if (!selectedCard || selectedCard.classList.contains('flipped') || selectedCard.classList.contains('matched')) {
      return;
    }
  
    selectedCard.classList.add('flipped');
    flippedCards.push(selectedCard);
  
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  });
  
  function checkForMatch() {
    const [card1, card2] = flippedCards;
  
    if (card1.dataset.value === card2.dataset.value) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedPairs++;
  
      if (matchedPairs === cardsArray.length / 2) {
        setTimeout(() => alert('Congratulations, You Won!'), 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
      }, 1000);
    }
  
    flippedCards = [];
  }


  document.getElementById('restart').addEventListener('click', () => {
    flippedCards = [];
    matchedPairs = 0;
    renderCards();
  });
  
  // Start the game on page load
  renderCards();