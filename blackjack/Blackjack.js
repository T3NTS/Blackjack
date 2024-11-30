const sfx = {
  giveCard: new Howl({
    src: 'sound/draw-card.mp3'
  }),
  buttonClick: new Howl({
    src: 'sound/button-click.wav'
  }),
  chipSound: new Howl({
    src: 'sound/chip-sound.wav'
  }),
}
const playerScoreElement = document.querySelector('.js-player-score');
const dealerScoreElement = document.querySelector('.js-dealer-score');
const gameElement = document.querySelector('.js-game');
const resultText = document.querySelector('.js-result');

let balance = JSON.parse(localStorage.getItem('balance')) || 
  5000;
let shuffledDeck = JSON.parse(localStorage.getItem('shuffledDeck')) ||
  [];
console.log(shuffledDeck);
let bid = 0;

document.querySelector('.js-start-button').addEventListener('click', () => {
  document.querySelector('.js-start-button').style.display = 'none';
  sfx.buttonClick.play();
  addElements();
  addSizeBid();
  dealCards();
})

function addElements() {
  document.querySelector('.js-balance').innerHTML += `
    <p class="js-balance-text balance-text">Balance:</p>
    <p class="js-balance-number balance-number">$${balance}</p>`
  document.querySelector('.js-betting1').innerHTML += `
    <p class="place-your-bet">Place your bet:</p>
    <div class="buttons-grid">
    <button class="js-chip100 chip-design">100</button>
    <button class="js-chip500 chip-design">500</button>
    <button class="js-chip1000 chip-design">1K</button>
    <button class="js-chip10000 chip-design">10K</button>
    <button class="js-chip50000 chip-design">50K</button>
    </div>`
  document.querySelector('.js-betting2').innerHTML += `<span class="js-bet-amount bet-amount">$${bid}</span><button class="js-deal-button deal-button">Deal</button>`;
}

function addSizeBid() {
  document.querySelector('.js-chip100').addEventListener('click', () => {
    sfx.chipSound.play();
    check = checkBalance(100);
    if (!check) {
      return
    } else 
    bid += 100;
    balance -= 100;
    updateBalance();
    updateBid();
  })
  document.querySelector('.js-chip500').addEventListener('click', () => {
    sfx.chipSound.play();
    check = checkBalance(500);
    if (!check) {
      return
    } else 
    bid += 500;
    balance -= 500;
    updateBalance();
    updateBid();
  })
  document.querySelector('.js-chip1000').addEventListener('click', () => {
    sfx.chipSound.play();
    check = checkBalance(1000);
    if (!check) {
      return
    } else 
    bid += 1000;
    balance -= 1000;
    updateBalance();
    updateBid();
  })
  document.querySelector('.js-chip10000').addEventListener('click', () => {
    sfx.chipSound.play();
    check = checkBalance(10000);
    if (!check) {
      return
    } else 
    bid += 10000;
    balance -= 10000;
    updateBalance();
    updateBid();
  })
  document.querySelector('.js-chip50000').addEventListener('click', () => {
    sfx.chipSound.play();
    check = checkBalance(50000);
    if (!check) {
      return
    } else 
    bid += 50000;
    balance -= 50000;
    updateBalance();
    updateBid();
  })
}

function checkBalance(number) {
  if (balance < number) {
    return false;
  } else 
  return true;
}

function updateBalance() {
  document.querySelector('.js-balance-number').innerHTML = `$${balance}`;
}

function updateBid() {
  document.querySelector('.js-bet-amount').innerHTML = `$${bid}`;
}

function dealCards() {
  document.querySelector('.js-deal-button').addEventListener('click', () => {
    sfx.buttonClick.play();
    document.querySelector('.js-betting1').style.display = 'none';
    document.querySelector('.js-betting2').style.display = 'none';
    if (shuffledDeck[0] == null) {
      cardDeckUnshuffled = makeDeck(card);
      shuffledDeck = shuffleDeck(cardDeckUnshuffled);
    }
    setTimeout(() => {
      giveCardPlayer(1);
      sfx.giveCard.play();
      document.querySelector('.js-score-elements2').innerHTML += `
        <div class="score-element-player">
        </div>`;
      displayPlayerScore('player', playerCards);
    }, 1000);
    setTimeout(() => {
      giveCardDealer(1);
      sfx.giveCard.play();
      document.querySelector('.js-score-elements2').innerHTML += `
        <div class="score-element-dealer">
        </div>`
      displayDealerInitialScore();
    }, 1500);
    setTimeout(() => {
      playerCards = giveCardPlayer(2);
      sfx.giveCard.play();
      displayPlayerScore('player', playerCards);
    }, 2000);
    setTimeout(() => {
      dealerCards = giveCardDealer(2);
      sfx.giveCard.play();
      giveDealerBlank();
    }, 2500);  
    setTimeout(() => {
      startGame();
    }, 2700);
  })
  }

let card = {
  number: [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 
    6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 
    10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 
    14, 14, 14, 14],
  suit: [1000, 2000, 3000, 4000]
};

let cardDeckUnshuffled = [];

function makeDeck(array) {
  array.number.forEach((numberValue) => {
    array.suit.forEach((suitValue) => {
      realCard = numberValue + suitValue;
      cardDeckUnshuffled.push(realCard);
    })
  })
  return cardDeckUnshuffled;
}

function shuffleDeck(array) {
  for (let i = 0; i < 208; i++) {
    let randomNumber = Math.random();
    let position = Math.floor(array.length * randomNumber);
    shuffledDeck.push(array[position]);
    array.splice(position, 1);
  }
  console.log(shuffledDeck);
  return shuffledDeck;
}

function getRandomCard(array) {
  let givenCard = shuffledDeck[0];
  shuffledDeck.splice(0, 1);
  return givenCard;
}

let playerCards = [];
let dealerCards = [];

function giveCardDealer(number) {
  givenCard = getRandomCard();
  document.querySelector(`.js-dealer-card${number}`).innerHTML = 
    `<img src=cards/${givenCard}.png class="card">`;
    dealerCards.push(givenCard);
  return dealerCards;
}

function giveDealerBlank() {
  document.querySelector(`.blank-card-div`).innerHTML = 
    `<img src=cards/5000.png class="card-blank">`;
}

function giveCardPlayer(number) {
  givenCard = getRandomCard();
  document.querySelector(`.js-player-card${number}`).innerHTML = 
    `<img src=cards/${givenCard}.png class="card">`;
    playerCards.push(givenCard);
  return playerCards;
}

function getInitialScore(array) {
  convertedCards = convertValue(array);
  value = convertedCards[0];
  score = 0;
    if (value > 10 && value !== 14) {
      value = 10;
    }
    if (value === 14) {
      value = 11;
    }
    score += value;
    return score;
}

function displayPlayerScore(name, array) {
  score = getPersonsScore(array);
  document.querySelector(`.js-${name}-score`).innerHTML = 
    score;
}

function displayDealerInitialScore() {
  dealerScore = getInitialScore(dealerCards);
  document.querySelector('.js-dealer-score').innerHTML = 
    dealerScore;
}

function convertValue(array) {
  let convertedCards = [];
  array.forEach((value) => {
    if (value < 1015) { //Spades
      value -= 1000;
      convertedCards.push(value);
    } else if (value < 2015 && value > 1015) { //Hearts
      value -= 2000;
      convertedCards.push(value);
    } else if (value < 3015 && value > 2015) { //Clubs
      value -= 3000;
      convertedCards.push(value);
    } else if (value > 3015) { //Diamonds
      value -= 4000;
      convertedCards.push(value);
    }
  })
  return convertedCards;
}

function getPersonsScore(array) {
  score = 0;
  convertedThings = convertValue(array);
  convertedThings.forEach((value) => {
    if (value > 10 && value !== 14) {
      score += 10;
    } else if (value === 14 && score !== 11) {
      score += 11;
    } else if (value === 14) {
      score ++;
    } else {
      score += value;
    }
  })
  return score;
}

function addScore(array) {
  score = 0;
  convertedThings = convertValue(array);
    if (convertedThings[array.length - 1] > 10 && convertedThings[array.length - 1] !== 14) {
      score += 10;
    } else if (convertedThings[array.length - 1] === 14) {
      score ++;
    } else {
      score += convertedThings[array.length - 1];
    }
  return score;
}

let playerCardPos = 3;
let dealerCardPos = 3;

function startGame() {
  gameElement.innerHTML += `
    <button class="js-hit-button hit-button">Hit</button>
    <button class="js-stand-button stand-button">Stand</button>`;
    scoreElementP = playerScoreElement.innerHTML;
    scoreElementP = Number(scoreElementP);
  if (scoreElementP === 21) {
      document.querySelector('.js-blank-card-div').style.display = 'none';
      document.querySelector('.js-game').style.display = 'none';
      displayPlayerScore('dealer', dealerCards);
      scoreElementD = dealerScoreElement.innerHTML;
      scoreElementD = Number(scoreElementD);
      if (scoreElementP === scoreElementD) {
        console.log(scoreElementD)
        console.log(typeof scoreElementD)
        resultText.innerHTML = 'Push!'
        balance += bid;
      } else {
        resultText.innerHTML = 'You have Blackjack!';
        balance += (3*bid);
      }
      document.querySelector('.js-balance-number').innerHTML = `$${balance}`;
      setTimeout(() => {
        altGameEnding();
        clearCards();
        playAgain();
      }, 500);
  }
  document.querySelector('.js-hit-button').addEventListener('click', () => {
    sfx.buttonClick.play();
    scoreP = playerScoreElement.innerHTML;
    scoreP = Number(scoreP);
    if (scoreP === 21) {
      stand();
    } else
    hit();
  })
  
  document.querySelector('.js-stand-button').addEventListener('click', () => {
    sfx.buttonClick.play();
    stand();
  })
}

let hasFunction2Run = false;

function stand() {
  sfx.giveCard.play();
  document.querySelector('.js-blank-card-div').style.display = 'none';
  gameElement.style.display = 'none';
  displayPlayerScore('dealer', dealerCards);
  scoreElement = dealerScoreElement.innerHTML;
  scoreElement = Number(scoreElement);
  if (scoreElement === 21) {
    setTimeout(() => {
      resultText.innerHTML = 'Dealer has Blackjack!';
      altGameEnding();
      clearCards();
      playAgain();
    }, 500);
  } else {
    IntervalID = setInterval(() => {
      if (scoreElement <= 16) {
          if ((dealerCards[0] === (1014) || dealerCards[0] === (2014) || dealerCards[0] === (3014) ||
            dealerCards[0] === (4014) || dealerCards[1] === (1014) || dealerCards[1] === (2014) ||
            dealerCards[1] === (3014) || dealerCards[1] === (4014)) && !hasFunction2Run) {
              scoreElement -= 10;
              hasFunction2Run = true;
          }
          giveCardDealer(dealerCardPos);
          sfx.giveCard.play();
          dealerCardPos++;
          scoreElement += addScore(dealerCards);
          dealerScoreElement.innerHTML = scoreElement;
          scoreElement = Number(scoreElement);
      }
      if (scoreElement >= 17){
      setTimeout(() => {
        sayWinner();
        clearInterval(IntervalID);
      }, 500);
    }}, 1000);
  }
}


let hasFunctionRun = false;

function hit() {
  scoreElementP = playerScoreElement.innerHTML;
  if ((playerCards[0] === (1014) || playerCards[0] === (2014) || playerCards[0] === (3014) ||
    playerCards[0] === (4014) || playerCards[1] === (1014) || playerCards[1] === (2014) ||
    playerCards[1] === (3014) || playerCards[1] === (4014)) && !hasFunctionRun) {
      scoreElementP -= 10
      hasFunctionRun = true;
  }
  giveCardPlayer(playerCardPos);
  sfx.giveCard.play();
  playerCardPos++;
  score = Number(scoreElementP);
  score += addScore(playerCards);
  playerScoreElement.innerHTML = score;
  if (score > 21) {
    setTimeout(() => {
      resultText.innerHTML = 'You Busted!';
    }, 500);
      altGameEnding();
      clearCards();
      playAgain();
  }
}

function altGameEnding() {
  localStorage.setItem('balance', JSON.stringify(balance));
  gameElement.style.display = 'none';
    document.querySelector('.js-play-again').innerHTML += `
      <button class="js-play-again-button play-again-button">Play Again</button>`;
    document.querySelector('.js-reset').innerHTML += `
      <button class="js-reset-button reset-button">Reset Deck</button>`;
}

function sayWinner() {
  gameElement.style.display = 'none';
  if (dealerScoreElement.innerHTML === playerScoreElement.innerHTML) {
    resultText.innerHTML = 'Push!';
    balance += bid;
    document.querySelector('.js-balance-number').innerHTML = `$${balance}`;
   } else if (dealerScoreElement.innerHTML === 21) {
    resultText.innerHTML = 'Dealer has Blackjack!';
    document.querySelector('.js-balance-number').innerHTML = `$${balance}`;
  } else if (playerScoreElement.innerHTML === 21) {
    resultText.innerHTML = 'You have Blackjack!';
    balance += (3*bid);
    document.querySelector('.js-balance-number').innerHTML = `$${balance}`;
  } else if (((dealerScoreElement.innerHTML > 21) || dealerScoreElement.innerHTML < playerScoreElement.innerHTML) && playerScoreElement.innerHTML < 22) {
    resultText.innerHTML = 'You Won!';
    balance += (2*bid);
    document.querySelector('.js-balance-number').innerHTML = `$${balance}`;
  } else if (dealerScoreElement.innerHTML > playerScoreElement.innerHTML && dealerScoreElement.innerHTML < 22){
    resultText.innerHTML = 'You Lost!';
  }
  localStorage.setItem('balance', JSON.stringify(balance));
  document.querySelector('.js-play-again').innerHTML += `
    <button class="js-play-again-button play-again-button">Play Again</button>`;
  document.querySelector('.js-reset').innerHTML += `
    <button class="js-reset-button reset-button">Reset Deck</button>`;
  clearCards();
  playAgain();
}

function clearCards() {
  document.querySelector('.js-reset-button').addEventListener('click', () => {
    sfx.buttonClick.play();
    localStorage.removeItem('shuffledDeck');
  })
}

function playAgain() {
  localStorage.setItem('shuffledDeck', JSON.stringify(shuffledDeck));
  document.querySelector('.js-play-again-button').addEventListener('click', () => {
    sfx.buttonClick.play();
    setTimeout(() => {
    location.reload();
  }, 150);
  })
}