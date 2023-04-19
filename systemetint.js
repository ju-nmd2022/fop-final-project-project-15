// DOM consts
const gameContainer = document.getElementById('gameContainer');
const systemetBag = document.getElementById('systemetBag');
const lifeContainer = document.getElementById('lifeContainer');
const numberOfBeers = document.getElementById('numberOfBeers');
const removePopup = document.getElementById('removePopup')

const gameContainerRect = gameContainer.getBoundingClientRect();

let drinkPositions = [];
let bagPosition = gameContainerRect.width/2 - systemetBag.getBoundingClientRect().width/2;
let lives = 3;
let beerCount = 0;
let drinksSpawning;
let drinksFalling;

function removeAllDrinks() {
    const drinks = document.getElementsByClassName('drink');
    const allDrinks = Array.from(drinks);
    allDrinks.forEach(drink => {
        drink.remove();
    });
    drinkPositions = [];
}

removePopup.addEventListener('click', () => {
    // reset the values
    lives = 3;
    beerCount = 0;
    bagPosition = gameContainerRect.width/2 - systemetBag.getBoundingClientRect().width/2;

    removeAllDrinks();
    updateBagPosition();
    updateBeerCountText();
    updateHearts();

    // set the intervals
    drinksSpawning = setInterval(spawnDrinksRegularly,500);
    drinksFalling = setInterval(makeDrinksFall,50);
    
    popup.style.display = 'none';
    gameFailed = false;
})

// remove a life
function removeLife() {
    lives -= 1;
    updateHearts();
}
// update the number of hearts on screen accordingly
function updateHearts() {
    for (let i = lives+1; i > lives; i--) {
        lifeContainer.removeChild(lifeContainer.firstChild);
    }
}

// add a beer to beercount 
function addBeer() {
    beerCount += 1;
    updateBeerCountText();
}
// update the text for beercount 
function updateBeerCountText() {
    numberOfBeers.innerText = 'Beers: ' + beerCount;
}

// generate a random drink
// type of drink
function typeOfDrink() {
    const whatType = Math.floor(Math.random() * 2);
    
    return whatType;
}
// position 
function drinkPosition() {
    const randomPosition = (Math.random() * gameContainerRect.width) + gameContainerRect.left;

    return randomPosition;
}
// spawn the drink
function spawnDrink() {
    const drink = document.createElement('img');
    const whatType = typeOfDrink();

    drink.classList.add('drink');

    if (whatType === 0) {
        drink.setAttribute('src','glyphs/beercan.svg');
    }
    if (whatType === 1) {
        drink.setAttribute('src','glyphs/vodka.svg');
    }
    drink.style.left = drinkPosition() + 'px';
    gameContainer.appendChild(drink);
}

// spawn drink regularly
function spawnDrinksRegularly() {
    spawnDrink();
    drinkPositions.push(0);
}

// make the drinks fall
function makeDrinksFall() {
    const drinks = document.getElementsByClassName('drink');
    for (let i = 0; i < drinks.length; i++) {
        drinkPositions[i] += 3.5;
        drinks[i].style.top = drinkPositions[i] + 'vh';
        detectCatch(drinks[i]);
    }
}

function detectCatch(drink) {
    const currentDrinkPosition = drink.getBoundingClientRect();
    const currentBagPosition = systemetBag.getBoundingClientRect();
    if (currentDrinkPosition.left > currentBagPosition.left && currentDrinkPosition.right < currentBagPosition.right && currentDrinkPosition.bottom > currentBagPosition.bottom && currentDrinkPosition.bottom < currentBagPosition.bottom + currentBagPosition.width/2) {
        if (drink.src.includes('vodka')) {
            removeLife();
        }
        else if (drink.src.includes('beer')) {
            addBeer();
        }
    }
}

function updateBagPosition() {
    systemetBag.style.left = bagPosition + 'px';
}

function moveToTheLeft() {
    if (bagPosition > gameContainerRect.left - gameContainerRect.left) {
        bagPosition -= 8;
    }
    updateBagPosition();
}
function moveToTheRight() {
    if (bagPosition < gameContainerRect.right - gameContainerRect.left - systemetBag.getBoundingClientRect().width) {
        bagPosition += 8;
    }
    updateBagPosition();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        moveToTheRight();
    }
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveToTheLeft();
    }
})

// on launch
updateBagPosition();
updateBeerCountText();