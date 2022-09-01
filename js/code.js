const sectionSelectAttack = document.getElementById('select-attack')
const sectionNewFight = document.getElementById('reset')
const playerFighterButton = document.getElementById('fighter-button')
const newFightButton = document.getElementById('reset-button')
sectionNewFight.style.display = 'none'

const sectionFighterSelect = document.getElementById('select-fighter')

const spanPlayerFighter = document.getElementById('player-fighter')
const spanEnemyFighter = document.getElementById('enemy-fighter')

const spanPlayerLifes = document.getElementById('player-lifes')
const spanEnemyLifes = document.getElementById('enemy-lifes')

const sectionMessages = document.getElementById('result')
const playerAttacks = document.getElementById('player-attacks')
const enemyAttacks = document.getElementById('enemy-attacks')
const cardsContainer = document.getElementById('cards-container')
const attacksContainer = document.getElementById('attacks-container')

let monsterFighters = []
let playerAttack = []
let enemyAttack
let monsterFighterOptions
let monsterFighterAttacks
let playerLifes = 3
let enemyLifes = 3
let inputHuman
let inputVampire
let inputWerewolf
let playerFighter
let shotgunButton
let fangsButton
let clawsButton
let buttons = []


class MonsterFighter {
    constructor(name, picture, life) {
        this.name = name
        this.picture = picture
        this.life = life
        this.attacks = []
    }
}

let human = new MonsterFighter('Human', '/assets/Old_MMA_fighter.png', 5)

let vampire = new MonsterFighter('Vampire', '/assets/vampire_fighter.png', 5)

let werewolf = new MonsterFighter('Werewolf', '/assets/werewolf_fighter.png', 5)

human.attacks.push(
    { name: 'Glock G19', id: 'shotgun-button' },
    { name: 'M&P15 Rifle', id: 'shotgun-button' },
    { name: 'Mossberg 500', id: 'shotgun-button' },
    { name: 'Knife', id: 'claws-button' },
    { name: 'Mind Control', id: 'fangs-button' },
)

vampire.attacks.push(
    { name: 'Poison Fangs', id: 'fangs-button' },
    { name: 'Spit Acid', id: 'fangs-button' },
    { name: 'Mind Control', id: 'fangs-button' },
    { name: 'Glock G19', id: 'shotgun-button' },
    { name: 'Axe', id: 'claws-button' },
)

werewolf.attacks.push(
    { name: 'Iron Claws', id: 'claws-button' },
    { name: 'Super Bite', id: 'claws-button' },
    { name: 'Spit Acid', id: 'fangs-button' },
    { name: 'M&P15 Rifle', id: 'shotgun-button' },
    { name: 'Axe', id: 'claws-button' },
)

monsterFighters.push(human, vampire, werewolf)

function startGame() {
    
    sectionSelectAttack.style.display = 'none'
    
    monsterFighters.forEach((monsterFighter) => {
        monsterFighterOptions = `
        <input type="radio" name="fighter" id=${monsterFighter.name} />
        <label class="fighter-card" for=${monsterFighter.name}>
            <p>${monsterFighter.name}</p>
            <img src=${monsterFighter.picture} alt=${monsterFighter.name}>
        </label>
        `
        cardsContainer.innerHTML += monsterFighterOptions

        inputHuman = document.getElementById('Human')
        inputVampire = document.getElementById('Vampire')
        inputWerewolf = document.getElementById('Werewolf')
    })
    
    playerFighterButton.addEventListener('click', selectPlayerFighter)
    
    newFightButton.addEventListener('click', resetGame)    
}

function selectPlayerFighter() {
    
    sectionFighterSelect.style.display = 'none'
    sectionSelectAttack.style.display = 'flex'

    if (inputHuman.checked) {
        spanPlayerFighter.innerHTML = inputHuman.id
        playerFighter = inputHuman.id
    } else if (inputVampire.checked) {
        spanPlayerFighter.innerHTML = inputVampire.id
        playerFighter = inputVampire.id
    } else if (inputWerewolf.checked) {
        spanPlayerFighter.innerHTML = inputWerewolf.id
        playerFighter = inputWerewolf.id
    } else {
        alert('Choose a Fighter')
    }
    
    selectEnemyFighter()
    extractAttacks(playerFighter)
    attackSequence()
}

function extractAttacks(playerFighter) {
    let attacks
    for (let i = 0; i < monsterFighters.length; i++) {
        if (playerFighter === monsterFighters[i].name) {
            attacks = monsterFighters[i].attacks
        }
    }
    showAttacks(attacks)
}

function showAttacks(attacks) {
    attacks.forEach((attack) => {
        monsterFighterAttacks = `
        <button id=${attack.id} class="attack-button buttonsA">${attack.name}</button>  
        `
        attacksContainer.innerHTML += monsterFighterAttacks
    })

    shotgunButton = document.getElementById('shotgun-button')
    fangsButton = document.getElementById('fangs-button')
    clawsButton = document.getElementById('claws-button')
    buttons = document.querySelectorAll('.buttonsA')

    shotgunButton.addEventListener('click', shotgunAttack)
    fangsButton.addEventListener('click', fangsAttack)
    clawsButton.addEventListener('click', clawsAttack)
}

function attackSequence() {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (e.target.textconte)
        })
    })
}

function selectEnemyFighter() {
    let randomFighter = random(0, monsterFighters.length -1)
    
    spanEnemyFighter.innerHTML = monsterFighters[randomFighter].name

    
}

function shotgunAttack() {      
    playerAttack = 'SHOTGUN'
    randomEnemyAttack()
}
function fangsAttack() {
    playerAttack = 'FANGS'
    randomEnemyAttack()
}
function clawsAttack() {
    playerAttack = 'CLAWS'
    randomEnemyAttack()
}

function randomEnemyAttack() {
    let randomAttack = random(1,3)
    
    if (randomAttack == 1) {
        enemyAttack = 'SHOTGUN'
    } else if (randomAttack == 2) {
        enemyAttack = 'FANGS'
    } else {
        enemyAttack = 'CLAWS'
    }

    fight()
}

function fight() {
    
    
    if(enemyAttack == playerAttack) {
        newMessage("TIE")
    } else if(playerAttack == 'SHOTGUN' && enemyAttack == 'CLAWS') {
        newMessage("You Win")
        enemyLifes-- 
        spanEnemyLifes.innerHTML = enemyLifes
    } else if(playerAttack == 'FANGS' && enemyAttack == 'SHOTGUN') {
        newMessage("You Win")
        enemyLifes--
        spanEnemyLifes.innerHTML = enemyLifes
    } else if(playerAttack == 'CLAWS' && enemyLifes == 'FANGS') {
        newMessage("You Win")
        enemyLifes--
        spanEnemyLifes.innerHTML = enemyLifes
    } else {
        newMessage("You Lose")
        playerLifes--
        spanPlayerLifes.innerHTML = playerLifes
    }

    lifeCheck()
}

function lifeCheck() {
    if (enemyLifes == 0) {
        newFinalMessage("CONGRATULATION!! You Won :D")
    } else if (playerLifes == 0) {
        newFinalMessage('K.O :(')
    }
}

function newMessage(result) {
    
    
    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')
    
    sectionMessages.innerHTML = result
    newPlayerAttack.innerHTML = playerAttack
    newEnemyAttack.innerHTML = enemyAttack
    
    playerAttacks.appendChild(newPlayerAttack)
    enemyAttacks.appendChild(newEnemyAttack)
}

function newFinalMessage(finalResult) {
    
    
    sectionMessages.innerHTML = finalResult
    
    
    shotgunButton.disabled = true
    
    fangsButton.disabled = true
    
    clawsButton.disabled = true
    
    sectionNewFight.style.display = 'block'
    
}

function resetGame() {
    location.reload()
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', startGame)