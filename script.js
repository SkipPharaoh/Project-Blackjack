console.log('JS Linked')

const startGame = document.querySelector('.startGame')
const resetGame = document.querySelector('.resetGame')
const score = document.querySelector('.score')
const hit = document.querySelector('.hit')
const stand = document.querySelector('.stand')
const dealerCard = document.querySelector('.dealerCard1')
const playerCard = document.querySelector('.playerCard2')
let playerStands = false
// Event Listeners
startGame.addEventListener('click', beginGame);
resetGame.addEventListener('click', rstGame);
hit.addEventListener('click', hitCard);
stand.addEventListener('click', noCard);
score.addEventListener('load', scoreCard);


// Card values, Card suits, && Points
// const cardSuits = ['H', 'D', 'S', 'C']
const cardSuits = ['♥', '♦', '♠', '♣']
const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const points = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 10,
    'Q': 10,
    'K': 10
}
const dealersDeck = []
const playersDeck = []

// Ace points
// let count = 0;
// const aces = []
// for (let card of hand) {
//     let value = card;
//     if ( value === 'A') {
//         count++
//         aces.add(card)
//     }
//     else {
//         count += points.get(value)
//     }
// }
// for (let card of aces){
//     if (count !<= 11) {
//         count += 10
//     }
// }

// Construct Deck
function cardDeck() {
    // const cardSuits = ['H', 'D', 'S', 'C']
    // const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    const deck = [];
    const img = `https://deckofcardsapi.com/static/img/2A.png`
    for (let i=0; i < cardSuits.length; i++) {
        for (let j=0; j < cardValues.length; j++){
            const values = cardValues[j];
            const suits = cardSuits[i];
            if (j >= 10){
                deck.push({value:values, suit:suits, points: 10})
            }
            else 
            {deck.push({value:values, suit:suits, points: j+1})}
        }
    }
    return deck
}
console.log(cardDeck())

// The Deck Will Shuffle
function shuffleCard(deck) {
    for (let i = deck.length; i; i--) {
        let shuffle = Math.floor(Math.random() * i);
        // Code below came from stackoverflow (link will be pasted here)
        [deck[i - 1], deck[shuffle]] = [deck[shuffle], deck[i - 1]];
    }
    return deck
    // return 'https://deckofcardsapi.com/static/img/AS.png'
    // return 'https://deckofcardsapi.com/static/img/back.png'
}

const cards = cardDeck();
const shuffleDeck = shuffleCard(cards)
console.log(shuffleDeck);

// Start Button will reveal the cards
function beginGame(){
    while (dealersDeck.length < 2) {
        let card1 = shuffleDeck.pop()
        let card2 = shuffleDeck.pop()
        playersDeck.push(card1)
        dealersDeck.push(card2)
        playerCard.classList.add('classShowing')
        playerCard.append(`${card1.value}${card1.suit}`)
        dealerCard.classList.add('classShowing')
        dealerCard.innerHTML = `${card2.value}${card2.suit}`
    }
    console.log(dealerCard.classList)
    console.log('This Starts The Game!')
    return scoreCard()
}


// Reset Button to reset the table & hide hands
function rstGame(){
    return location.reload()
}

// Hit Button gives player an additional card
function hitCard(){
    if (playersDeck.length > 1) {
        let card1 = shuffleDeck.pop()
        playersDeck.push(card1)
        playerCard.classList.add('classShowing')
        playerCard.prepend(`${card1.value}${card1.suit}`)
        return scoreCard()
    }
}


// Stand Button stops player from getting another card
function noCard(){
    if (dealersDeck.length === 2 ){
        stand.removeEventListener('click', noCard)
        hit.removeEventListener('click', hitCard)
        let card2 = dealersDeck[0]
        dealerCard.prepend(`${card2.value}${card2.suit}`)
        console.log('I dare say, No More Cards')
        console.log(dealersDeck[0])
        playerStands = true
    }
    dealersMove()
    setTimeout(winnerCheck(), 10000)
    return dealerScore()
}

// P1 & houseScore Variable
let p1Score = 0
let houseScore = 0

// Player's Score Tracker
function scoreCard(){
    let gameScore = []
    let playerScore = 0
    for (let i = 0; i < playersDeck.length; i++){
        let card1Score = playersDeck[i].points
        gameScore.push(card1Score)
    }
    for (let j = 0; j < gameScore.length; j++) {
        playerScore += gameScore[j]
    }
    score.innerHTML = playerScore
    console.log('This is how we keep score')
    p1Score = playerScore
    setTimeout(winnerCheck(), 5000)
    return playerScore
}


// Dealer's Score tracker
function dealerScore(){
    let dealScore = []
    let dealsScore = 0
    for (let i = 0; i < dealersDeck.length; i++){
        let card2Score = dealersDeck[i].points
        dealScore.push(card2Score)
    }
    for (let j = 0; j < dealScore.length; j++){
        dealsScore += dealScore[j]
    }
    houseScore = dealsScore
    winnerCheck()
    return houseScore
}


// Winning Condition
function winnerCheck(){
    if (p1Score === 21){
        stand.removeEventListener('click', noCard)
        hit.removeEventListener('click', hitCard)
        score.innerHTML = "BlackJack!"
    }
    else if (playerStands && houseScore > 21){
        stand.removeEventListener('click', noCard)
        hit.removeEventListener('click', hitCard)
        score.innerHTML = "Player Wins!"
    }
    else if (playerStands && p1Score > houseScore){
        stand.removeEventListener('click', noCard)
        hit.removeEventListener('click', hitCard)
        score.innerHTML = "Player Wins"
    }
    else if (playerStands && houseScore === 21){
        stand.removeEventListener('click', noCard)
        hit.removeEventListener('click', hitCard)
        score.innerHTML = "Dealer Has Blackjack!"
    }
    else if (playerStands && houseScore > p1Score){
        stand.removeEventListener('click', noCard)
        hit.removeEventListener('click', hitCard)
        score.innerHTML = "Dealer Wins"
    }
    else if (p1Score > 21){
        stand.removeEventListener('click', noCard)
        hit.removeEventListener('click', hitCard)
        score.innerHTML = "Player Bust"
    }
}

// Dealer's Move
function dealersMove(){
    if (houseScore < 17){
        let card2 = shuffleDeck.pop()
        dealersDeck.push(card2)
        let nextCard = dealersDeck[dealersDeck.length - 1]
        dealerCard.prepend(`${card2.value}${card2.suit}`)
        console.log(nextCard)
        // console.log(houseScore)
    }
    else if (houseScore < p1Score){
        let card2 = shuffleDeck.pop()
        dealersDeck.push(card2)
        let nextCard = dealersDeck[dealersDeck.length - 1]
        dealerCard.prepend(`${card2.value}${card2.suit}`)
        console.log(nextCard)
        // console.log(houseScore)
    }
    console.log(`Dealer's points:${dealerScore()} is over their hit limit!`)
    setTimeout(winnerCheck, 3000)
    console.log(`Dealer has ${dealerScore()} points!`)
}



// setTimeout() for score
// variable with default score of 0
// every time a card is add, add score to total

// I could use the append in stay function to grab hidden item in dealersDeck
// grabbed item can be append to the dealersDeck to make it visible