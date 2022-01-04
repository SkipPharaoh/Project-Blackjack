console.log('JS Linked')

const startGame = document.querySelector('.startGame')
const resetGame = document.querySelector('.resetGame')
const score = document.querySelector('.score')
const hit = document.querySelector('.hit')
const stand = document.querySelector('.stand')


// Construct Deck
function cardDeck() {
    const cardSuits = ['H', 'D', 'S', 'C']
    const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    const deck = [];
    const img = `https://deckofcardsapi.com/static/img/2A.png`
    for (let i=0; i < cardSuits.length; i++) {
        for (let j=0; j < cardValues.length; j++){
            const values = cardValues[j];
            const suits = cardSuits[i];
            deck.push(values + suits)
        }
    }
    return deck
}
console.log(cardDeck())

// The Deck Will Shuffle
function shuffleCard(deck) {
    for (let i = deck.length; i; i--) {
        let shuffle = Math.floor(Math.random() * i);
        // Code 
        [deck[i - 1], deck[shuffle]] = [deck[shuffle], deck[i - 1]];
    }
    // let shuffle = Math.floor(Math.random() * 51)
    // const card1 = deck[shuffle]
    return deck
    // return 'https://deckofcardsapi.com/static/img/AS.png'
}
const cards = cardDeck();
console.log(shuffleCard(cards));

// Start Button will reveal the cards
function beginGame(){
    // shuffledeck
    // give player && dealer two cards
    // reveal hands
    console.log('This Starts The Game!')
}

// Reset Button to reset the table & hide hands
function rstGame(){
    // refresh page location.reload()
    // Removes visibility of the cards
    return location.reload()
}

// Hit Button gives player an additional card
function hitCard(){
    // gives player one extra card
    console.log('This Hits!')
}

// Stand Button stops player from getting another card
function noCard(){
    // This stops player moves
    // Reveals dealer's facedown card
    // starts dealer moves function
    console.log('I dare say, No More Cards')
}

// Score will keep track of total value of player's cards
function scoreCard(){
    // Adds the players card values together
    // Calculates if player reaches 21
    // Checks if player's score is more than dealer's score, if dealer stands
    // Checks if player's score exceeds 21 (bust)
    console.log('This is how we keep score')
}

startGame.addEventListener('click', beginGame);
resetGame.addEventListener('click', rstGame);
hit.addEventListener('click', hitCard);
stand.addEventListener('click', noCard);
score.addEventListener('change', scoreCard);