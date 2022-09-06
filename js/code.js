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

const sectionShowMap = document.getElementById('show-map')
const map = document.getElementById('map')


let monsterFighters = []
let playerAttack = []
let enemyAttack = []
let monsterFighterObject
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
let canvasMap = map.getContext("2d")
let interval
let backgroundMap = new Image()
backgroundMap.src = '/assets/roadMap.jpg'
// let heightMap 
// let widthMap = window.innerWidth - 20
// const maxWidthMap = 420

// if (widthMap > maxWidthMap) {
//     widthMap = maxWidthMap -20
// }

// heightMap = widthMap * 600 / 800

// map.width = widthMap
// map.height = heightMap

class MonsterFighter {
    constructor(name, picture, life, mapPicture, x = 270, y = 210 ) {
        this.name = name
        this.picture = picture
        this.life = life
        this.attacks = []
        this.x = x //random(0, map.width - this.widthP)
        this.y = y //random(0, map.height - this.heightP)
        this.widthP = 90
        this.heightP = 90
        this.mapPicture = new Image()
        this.mapPicture.src = mapPicture
        this.speedX = 0
        this.speedY = 0
    }

    drawFighter() {
        canvasMap.drawImage(
            this.mapPicture, 
            this.x,
            this.y,
            this.widthP,
            this.heightP
        )
    }
}

let human = new MonsterFighter('Human', '/assets/Old_MMA_fighter.png', 5, "/assets/Old_MMA_fighter_face.png")

let vampire = new MonsterFighter('Vampire', '/assets/vampire_fighter.png', 5, '/assets/vampire_fighter_face.png')

let werewolf = new MonsterFighter('Werewolf', '/assets/werewolf_fighter.png', 5, "/assets/werewolf_fighter _face.png")

let humanEnemy = new MonsterFighter('Human', '/assets/Old_MMA_fighter.png', 5, '/assets/Old_MMA_fighter_face.png', 30, 210)

let vampireEnemy = new MonsterFighter('Vampire', '/assets/vampire_fighter.png', 5, '/assets/vampire_fighter_face.png', 270, 30)

let werewolfEnemy = new MonsterFighter('Werewolf', '/assets/werewolf_fighter.png', 5, '/assets/werewolf_fighter _face.png', 30, 10)

human.attacks.push(
    { name: '🔥', id: 'firegun-button' },
    { name: '🔥', id: 'firegun-button' },
    { name: '🔥', id: 'firegun-button' },
    { name: '💧', id: 'fangs-button' },
    { name: '🌱', id: 'claws-button' },
)

humanEnemy.attacks.push(
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

vampireEnemy.attacks.push(
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

werewolfEnemy.attacks.push(
    { name: '🌱', id: 'claws-button' },
    { name: '🌱', id: 'claws-button' },
    { name: '🌱', id: 'claws-button' },
    { name: '💧', id: 'fangs-button' },
    { name: '🔥', id: 'firegun-button' },
)

monsterFighters.push(human, vampire, werewolf)

function startGame() {
    
    sectionSelectAttack.style.display = 'none'
    sectionShowMap.style.display = 'none'
    
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
    
    extractAttacks(playerFighter)
    sectionShowMap.style.display = 'flex'
    startMap()

    // selectEnemyFighter()
    // attackSequence()
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

function selectEnemyFighter(enemy) {
    // let randomFighter = random(0, monsterFighters.length -1)
    
    spanEnemyFighter.innerHTML = enemy.name
    enemyFighterAttacks = enemy.attacks
    attackSequence()
}

function randomEnemyAttack() {
    console.log('Enemy Attacks', enemyFighterAttacks);

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

function drawCanvas() {

    monsterFighterObject.x = monsterFighterObject.x + monsterFighterObject.speedX
    monsterFighterObject.y = monsterFighterObject.y + monsterFighterObject.speedY

    canvasMap.clearRect(0,0,map.width,map.height)
    canvasMap.drawImage(
        backgroundMap,
        0,
        0,
        map.width,
        map.height
    )
    monsterFighterObject.drawFighter()
    humanEnemy.drawFighter()
    vampireEnemy.drawFighter()
    werewolfEnemy.drawFighter()
    if(monsterFighterObject.speedX !== 0 || monsterFighterObject.speedY !== 0) {
        checkCollision(humanEnemy)
        checkCollision(vampireEnemy)
        checkCollision(werewolfEnemy)
    }
}

function moveRight() {
    monsterFighterObject.speedX = 5
}

function moveLeft() {
    monsterFighterObject.speedX = -5
}

function moveDown() {
    monsterFighterObject.speedY = 5
}

function moveUp() {
    monsterFighterObject.speedY = -5
}

function stopMotion() {
    monsterFighterObject.speedX = 0
    monsterFighterObject.speedY = 0
}

function keyPressed(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp()
            break
        case 'ArrowDown':
            moveDown()
            break
        case 'ArrowLeft':
            moveLeft()
            break
        case 'ArrowRight':
            moveRight()
            break    
        default:
            break
    }
}

function startMap() {
    map.width = 420
    map.height = 360
    monsterFighterObject = getFighterObject(playerFighter)
    interval = setInterval(drawCanvas, 50)

    window.addEventListener('keydown', keyPressed)
    window.addEventListener('keyup', stopMotion)
}

function getFighterObject() {
    for (let i = 0; i < monsterFighters.length; i++) {
        if (playerFighter === monsterFighters[i].name) {
            return monsterFighters[i]
        }
    }
}

function checkCollision(enemy) {
    const upEnemy = enemy.y
    const downEnemy = enemy.y + enemy.heightP
    const rightEnemy = enemy.x + enemy.widthP
    const leftEnemy = enemy.x

    const upFighter = 
        monsterFighterObject.y
    const downFighter = 
        monsterFighterObject.y + monsterFighterObject.heightP
    const rightFighter = 
        monsterFighterObject.x + monsterFighterObject.widthP
    const leftFighter = 
        monsterFighterObject.x

    if(
        downFighter < upEnemy ||
        upFighter > downEnemy ||
        rightFighter < leftEnemy ||
        leftFighter > rightEnemy
    ) {
        return
    }

    
    stopMotion()
    clearInterval(interval)
    console.log("collision detected");
    sectionSelectAttack.style.display = 'flex'
    sectionShowMap.style.display = 'none'
    selectEnemyFighter(enemy)
}

window.addEventListener('load', startGame)