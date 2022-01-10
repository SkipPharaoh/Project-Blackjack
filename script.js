// DOM Selectors
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
const cardSuits = ['H', 'D', 'S', 'C']
const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K']
const points = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '0': 10,
    'J': 10,
    'Q': 10,
    'K': 10
}
const dealersDeck = []
const playersDeck = []

// Construct Deck
function cardDeck() {
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

// The Deck Will Shuffle
function shuffleCard(deck) {
    for (let i = deck.length; i; i--) {
        let shuffle = Math.floor(Math.random() * i);
        // Code below came from stackoverflow (link will be pasted here)
        [deck[i - 1], deck[shuffle]] = [deck[shuffle], deck[i - 1]];
    }
    return deck
}

const cards = cardDeck();
const shuffleDeck = shuffleCard(cards)

// Draw Card for dealer Function
function drawDealerCard(){
    let card2 = shuffleDeck.pop()
    let img2 = document.createElement("img")
    img2.setAttribute("class", `${card2.suit}`)
    img2.src = `https://deckofcardsapi.com/static/img/${card2.value}${card2.suit}.png`
    dealersDeck.push(img2, card2)
    dealerCard.classList.add('classShowing')
    dealerCard.prepend(img2)
}

// HIDDEN Card
 function hiddenCard(){
    let img1 = document.createElement("img")
    img1.setAttribute("id", "back")
    img1.src = 'https://deckofcardsapi.com/static/img/back.png'
    dealersDeck[2] = img1
    dealerCard.classList.add('classShowing')
    dealerCard.prepend(img1)
 }

// Draw Card for player function
function drawPlayerCard(){
    let card1 = shuffleDeck.pop()
    let img1 = document.createElement("img")
    img1.setAttribute("class", `${card1.suit}`)
    img1.src = `https://deckofcardsapi.com/static/img/${card1.value}${card1.suit}.png`
    playersDeck.push(img1, card1)
    playerCard.classList.add('classShowing')
    playerCard.prepend(img1)
}

// Start Button will reveal the cards
function beginGame(){
    drawDealerCard()
    drawPlayerCard()
    drawPlayerCard()
    startGame.removeEventListener('click', beginGame)
    hiddenCard()
    return scoreCard()
}

// Reset Button to reset the table & hide hands
function rstGame(){
    return location.reload()
}

// Hit Button gives player an additional card
function hitCard(){
    if (playersDeck.length > 1) {
        drawPlayerCard()
        scoreCard()
    }
}

// Stand Button stops player from getting another card
function noCard(){
    playerStands = true
    let remove = document.getElementById('back')
    remove.remove()
    dealersDeck.splice(-1)
    drawDealerCard()
    if (dealersDeck.length === 4 ){
        stand.removeEventListener('click', noCard)
        hit.removeEventListener('click', hitCard)
        drawDealerCard()
        dealerScore()
        dealersMove()
    }
    return dealerScore()
}

// P1 & houseScore Variable
let p1Score = 0
let houseScore = 0

// Player's Score Tracker
function scoreCard(){
    let gameScore = []
    let playerScore = 0
    for (let i = 1; i < playersDeck.length; i+=2){
        let card1Score = playersDeck[i].points
        gameScore.push(card1Score)
    }
    for (let j = 0; j < gameScore.length; j++) {
        playerScore += gameScore[j]
    }
    score.innerHTML = playerScore
    p1Score = playerScore
    winnerCheck()
    return playerScore
}

// Dealer's Score tracker
function dealerScore(){
    let dealScore = []
    let dealsScore = 0
    for (let i = 1; i < dealersDeck.length; i+=2){
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
    else if (playerStands && houseScore === p1Score){
        stand.removeEventListener('click', noCard)
        hit.removeEventListener('click', hitCard)
        score.innerHTML = "Tied"
    }
}

// Dealer's Move
function dealersMove(){
    dealerScore()
    if ( houseScore > p1Score){
        dealerScore()
    }
    dealerScore()
    if ( p1Score >= 21){
        dealerScore()
    }
    dealerScore()
    if (houseScore >= 21){
        dealerScore()
    }
    dealerScore()
    if (houseScore < p1Score){
        dealerScore()
        drawDealerCard()
    }
    dealerScore()
    if (houseScore <= 17 && p1Score > houseScore){
        dealerScore()
        drawDealerCard()
    }
}