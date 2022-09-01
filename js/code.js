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
let enemyAttack = []
let monsterFighterOptions
let monsterFighterAttacks
let enemyFighterAttacks
let playerLifes = 3
let enemyLifes = 3
let inputHuman
let inputVampire
let inputWerewolf
let playerFighter
let fireGunButton
let vampireAttackButton
let werewolfAttackButton
let buttons = []
let indexPlayerAttack
let indexEnemyAttack
let playerWins = 0
let enemyWins = 0

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
    { name: '🔥', id: 'firegun-button' },
    { name: '🔥', id: 'firegun-button' },
    { name: '🔥', id: 'firegun-button' },
    { name: '💧', id: 'fangs-button' },
    { name: '🌱', id: 'claws-button' },
)

vampire.attacks.push(
    { name: '💧', id: 'fangs-button' },
    { name: '💧', id: 'fangs-button' },
    { name: '💧', id: 'fangs-button' },
    { name: '🔥', id: 'firegun-button' },
    { name: '🌱', id: 'claws-button' },
)

werewolf.attacks.push(
    { name: '🌱', id: 'claws-button' },
    { name: '🌱', id: 'claws-button' },
    { name: '🌱', id: 'claws-button' },
    { name: '💧', id: 'fangs-button' },
    { name: '🔥', id: 'firegun-button' },
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
        <button id=${attack.id} class="attack-button buttons">${attack.name}</button>  
        `
        attacksContainer.innerHTML += monsterFighterAttacks
    })

    fireGunButton = document.getElementById('firegun-button')
    vampireAttackButton = document.getElementById('vampireAttack-button')
    werewolfAttackButton = document.getElementById('werewolfAttack-button')
    buttons = document.querySelectorAll('.buttons')
}

function attackSequence() {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                playerAttack.push('SHOTGUN')
                console.log(playerAttack)
                button.style.background = '#A77979'
                button.disabled = true
            }   else if (e.target.textContent === '💧') {
                playerAttack.push('Vampire Attack')
                console.log(playerAttack)
                button.style.background = '#A77979'
                button.disabled = true
            } else {
                playerAttack.push('Werewolf Attack')
                console.log(playerAttack)
                button.style.background = '#A77979'
                button.disabled = true
            }
            randomEnemyAttack()
        })
    })
}

function selectEnemyFighter() {
    let randomFighter = random(0, monsterFighters.length -1)
    
    spanEnemyFighter.innerHTML = monsterFighters[randomFighter].name

    enemyFighterAttacks = monsterFighters[randomFighter].attacks
}

function randomEnemyAttack() {
    let randomAttack = random(0, enemyFighterAttacks.length -1)
    
    if (randomAttack == 0 || randomAttack == 1) {
        enemyAttack.push('SHOTGUN')
    } else if (randomAttack == 3 || randomAttack == 4) {
        enemyAttack.push('Vampire Attack')
    } else {
        enemyAttack.push('Werewolf Attack')
    }
    console.log(enemyAttack)
    startFight()
}

function startFight() {
    if (playerAttack.length === 5) {
        fight()
    }
}

function indexBothFighters(player, enemy) {
    indexPlayerAttack = playerAttack[player]
    indexEnemyAttack = enemyAttack[enemy]
}

function fight() {

    for (let index = 0; index < playerAttack.length; index++) {
        if(playerAttack[index] === enemyAttack[index]) {
            indexBothFighters(index, index)
            newMessage("TIE")
        } else if (playerAttack[index] === 'SHOTGUN' && enemyAttack[index] === 'Werewolf Attack') {
            indexBothFighters(index, index)
            newMessage("YOU WIN")
            playerWins++
            spanPlayerLifes.innerHTML = playerWins
        } else if (playerAttack[index] === 'Vampire Attack' && enemyAttack[index] === 'SHOTGUN') {
            indexBothFighters(index, index)
            newMessage("YOU WIN")
            playerWins++
            spanPlayerLifes.innerHTML = playerWins
         } else if (playerAttack[index] === 'Werewolf Attack' && enemyAttack[index] === 'Vampire Attack') {
            indexBothFighters(index, index)
            newMessage("YOU WIN")
            playerWins++
            spanPlayerLifes.innerHTML = playerWins
         } else {
            indexBothFighters(index, index)
            newMessage("YOU LOSE")
            enemyWins++
            spanEnemyLifes.innerHTML = enemyWins
         }

    }

    lifeCheck()
}

function lifeCheck() {
    if (playerWins === enemyWins) {
        newFinalMessage("This is a TIE!!!")
    } else if (playerWins > enemyWins) {
        newFinalMessage("CONGRATULATION!! You Won :D")
    } else {
        newFinalMessage('K.O :(')
    }
}

function newMessage(result) {
    
    
    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')
    
    sectionMessages.innerHTML = result
    newPlayerAttack.innerHTML = indexPlayerAttack
    newEnemyAttack.innerHTML = indexEnemyAttack
    
    playerAttacks.appendChild(newPlayerAttack)
    enemyAttacks.appendChild(newEnemyAttack)
}

function newFinalMessage(finalResult) {
    
    sectionMessages.innerHTML = finalResult
        
    sectionNewFight.style.display = 'block'
    
}

function resetGame() {
    location.reload()
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', startGame)