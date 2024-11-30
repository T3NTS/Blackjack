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
if (shuffledDeck.length < 12) {
  shuffledDeck = [];
}
console.log(shuffledDeck);
let bid = 0;
let fakeBalance;
let fakeBid;

document.querySelector('.js-start-button').addEventListener('click', () => {
  document.querySelector('.js-start-button').style.display = 'none';
  sfx.buttonClick.play();
  addElements();
  updateBalance();
  addSizeBid();
  dealCards();
})

function addElements() {
  document.querySelector('.js-dealer').innerHTML += `
    <img src=images/dealer.png class = dealer-image>
    <p class = dealer-text>Dealer</p>`
  document.querySelector('.js-title').style.display = 'none';
  document.querySelector('.board').innerHTML += `
    <img src=images/board.png class = board-image>
    <div class="side-bar"></div>`;
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
  document.querySelector('.js-betting2').innerHTML += `<p class = bet-amount-text>Bet amount:</p>
    <button class="js-deal-button deal-button disabled">Deal</button>`;
  document.querySelector('.js-bet-amount-box').innerHTML += `
    <p class="js-bet-amount bet-amount">$${bid}</p>`;
  dealButton = document.querySelector('.js-deal-button');
  dealButton.disabled = true;
}

function addSizeBid() {
  checkBalance();
  document.querySelector('.js-chip100').addEventListener('click', () => {
    declareBidSize(100);
    checkBalance();
  })
  document.querySelector('.js-chip500').addEventListener('click', () => {
    declareBidSize(500);
    checkBalance();
  })
  document.querySelector('.js-chip1000').addEventListener('click', () => {
    declareBidSize(1000);
    checkBalance();
  })
  document.querySelector('.js-chip10000').addEventListener('click', () => {
    declareBidSize(10000);
    checkBalance();
  })
  document.querySelector('.js-chip50000').addEventListener('click', () => {
    declareBidSize(50000);
    checkBalance();
  })
}

function declareBidSize(number) {
  sfx.chipSound.play();
  bid += number;
  balance -= number;
  updateBalance();
  updateBid();
  dealButton.classList.remove("disabled");
  dealButton.disabled = false;
}

function checkBalance() {
  if (balance < 50000) {
    document.querySelector(`.js-chip50000`).classList.add("disabled");
    document.querySelector(`.js-chip50000`).disabled = true;
  }
  if (balance < 10000) {
    document.querySelector(`.js-chip10000`).classList.add("disabled");
    document.querySelector(`.js-chip10000`).disabled = true;
  }
  if (balance < 1000) {
    document.querySelector(`.js-chip1000`).classList.add("disabled");
    document.querySelector(`.js-chip1000`).disabled = true;
  }
  if (balance < 500) {
    document.querySelector(`.js-chip500`).classList.add("disabled");
    document.querySelector(`.js-chip500`).disabled = true;
  }
  if (balance < 100) {
    document.querySelector(`.js-chip100`).classList.add("disabled");
    document.querySelector(`.js-chip100`).disabled = true;
  }
}

function updateBalance() {
  fakeBalance = balance;
  if (balance >= 1000) {
    fakeBalance /= 1000;
    document.querySelector('.js-balance-number').innerHTML = `$${fakeBalance}K`;
  } else
    document.querySelector('.js-balance-number').innerHTML = `$${fakeBalance}`;
}

function updateBid() {
  fakeBid = bid;
  if (bid >= 1000) {
    fakeBid /= 1000;
    document.querySelector('.js-bet-amount').innerHTML = `$${fakeBid}K`;
  } else
    document.querySelector('.js-bet-amount').innerHTML = `$${fakeBid}`;
}

function dealCards() {
  document.querySelector('.js-deal-button').addEventListener('click', () => {
    sfx.buttonClick.play();
    document.querySelector('.js-betting1').style.display = 'none';
    dealButton.style.display = 'none';
    if (shuffledDeck[0] == null) {
      cardDeckUnshuffled = makeDeck(card);
      shuffledDeck = shuffleDeck(cardDeckUnshuffled);
    }
    setTimeout(() => {
      giveCardPlayer(1);
      sfx.giveCard.play();
      document.querySelector('.js-score-elements').innerHTML += `
        <div class="score-element-player">
        </div>`;
      displayPlayerScore('player', playerCards);
    }, 1000);
    setTimeout(() => {
      giveCardDealer(1);
      sfx.giveCard.play();
      document.querySelector('.js-score-elements').innerHTML += `
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

function getCard() {
  let givenCard = shuffledDeck[0];
  shuffledDeck.splice(0, 1);
  return givenCard;
}

let playerCards = [];
let dealerCards = [];

function giveCardDealer(number) {
  givenCard = getCard();
  document.querySelector(`.js-dealer-card${number}`).innerHTML = 
    `<img src=cards/${givenCard}.png class="card">`;
    dealerCards.push(givenCard);
  return dealerCards;
}

function giveDealerBlank() {
  document.querySelector(`.blank-card-div`).innerHTML = 
    `<img src=cards/5000_1.png class="card-blank">`;
}

function giveCardPlayer(number) {
  givenCard = getCard();
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

function displayDealerInitialScore() {
  dealerScore = getInitialScore(dealerCards);
  document.querySelector('.js-dealer-score').innerHTML = 
    dealerScore;
}

function displayPlayerScore(name, array) {
  score = getPersonsScore(array);
  document.querySelector(`.js-${name}-score`).innerHTML = 
    score;
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
  console.log(shuffledDeck);
  gameElement.innerHTML += `
    <button class="js-hit-button hit-button">Hit</button>
    <button class="js-stand-button stand-button">Stand</button>`;
    scoreElementP = playerScoreElement.innerHTML;
    scoreElementP = Number(scoreElementP);
  if (scoreElementP === 21) {
    gameElement.style.display = 'none';
    setTimeout(() => {
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
      localStorage.setItem('balance', JSON.stringify(balance));
      document.querySelector('.js-balance-number').innerHTML = `$${balance}`;
      document.querySelector('.js-play-again').innerHTML += `
        <button class="js-play-again-button play-again-button">Play Again</button>`;
      document.querySelector('.js-reset').innerHTML += `
        <button class="js-reset-button reset-button">Reset Deck</button>`;
      clearCards();
      playAgain();
    }, 500);
  }
  document.querySelector('.js-hit-button').addEventListener('click', () => {
    sfx.buttonClick.play();
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
    localStorage.setItem('balance', JSON.stringify(balance));
    gameElement.style.display = 'none';
    setTimeout(() => {
      resultText.innerHTML = 'You Busted!';
      document.querySelector('.js-play-again').innerHTML += `
        <button class="js-play-again-button play-again-button">Play Again</button>`;
      document.querySelector('.js-reset').innerHTML += `
        <button class="js-reset-button reset-button">Reset Deck</button>`;
      clearCards();
      playAgain();
    }, 500);
  } else if (score === 21) {
      document.querySelector('.js-hit-button').classList.add("disabled");
      document.querySelector('.js-hit-button').disabled = true;
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
    updateBalance();
   } else if (dealerScoreElement.innerHTML === 21) {
    resultText.innerHTML = 'Dealer has Blackjack!';
    updateBalance();
  }
    else if (((dealerScoreElement.innerHTML > 21) || dealerScoreElement.innerHTML < playerScoreElement.innerHTML) 
  && playerScoreElement.innerHTML < 22) {
    resultText.innerHTML = 'You Won!';
    balance += (2*bid);
    updateBalance();
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