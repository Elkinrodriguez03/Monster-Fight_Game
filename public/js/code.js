const URL = 'https://monster-fight-game.vercel.app'
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

let playerId = null
let enemyId = null
let monsterFighters = []
let enemyFighters = []
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
backgroundMap.src = './assets/roadMap.jpg'
let heightMap 
let widthMap = window.innerWidth - 20
const maxWidthMap = 520

if (widthMap > maxWidthMap) {
    widthMap = maxWidthMap - 20
}

heightMap = widthMap * 600 / 800

map.width = widthMap
map.height = heightMap

class MonsterFighter {
    constructor(name, picture, life, mapPicture, id = null) {
        this.id = id
        this.name = name
        this.picture = picture
        this.life = life
        this.attacks = []
        this.widthP = 60
        this.heightP = 60
        this.x = random(0, map.width - this.widthP)
        this.y = random(0, map.height - this.heightP)
        this.mapPic = new Image()
        this.mapPic.src = mapPicture
        this.speedX = 0
        this.speedY = 0
    }

    drawFighter() {
        canvasMap.drawImage(
            this.mapPic, 
            this.x,
            this.y,
            this.widthP,
            this.heightP
        )
    }
}

let human = new MonsterFighter('Human', './assets/Old_MMA_fighter.png', 5, "./assets/Old_MMA_fighter_face.png")

let vampire = new MonsterFighter('Vampire', './assets/vampire_fighter.png', 5, './assets/vampire_fighter_face.png')

let werewolf = new MonsterFighter('Werewolf', './assets/werewolf_fighter.png', 5, "./assets/werewolf_fighter _face.png")

const HUMAN_ATTACKS = [
    { name: '🔥', id: 'firegun-button' },
    { name: '🔥', id: 'firegun-button' },
    { name: '🔥', id: 'firegun-button' },
    { name: '💧', id: 'fangs-button' },
    { name: '🌱', id: 'claws-button' },
]

human.attacks.push(...HUMAN_ATTACKS)

const VAMPIRE_ATTACKS = [
    { name: '💧', id: 'fangs-button' },
    { name: '💧', id: 'fangs-button' },
    { name: '💧', id: 'fangs-button' },
    { name: '🔥', id: 'firegun-button' },
    { name: '🌱', id: 'claws-button' },
]

vampire.attacks.push(...VAMPIRE_ATTACKS)

const WEREWOLF_ATTACKS = [
    { name: '🌱', id: 'claws-button' },
    { name: '🌱', id: 'claws-button' },
    { name: '🌱', id: 'claws-button' },
    { name: '💧', id: 'fangs-button' },
    { name: '🔥', id: 'firegun-button' },
]

werewolf.attacks.push(...WEREWOLF_ATTACKS)

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

    joinGame()
}

function joinGame() {
    fetch(`${URL}/join`)
        .then((res) => {
            if (res.ok) {
                res.text()
                    .then((res) => { 
                        console.log(res);
                        playerId = res
                    })
            }
        })
}

function selectPlayerFighter() {

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
        return
    }

    sectionFighterSelect.style.display = 'none'

    selectMonsterFighter (playerFighter)
    
    extractAttacks(playerFighter)
    sectionShowMap.style.display = 'flex'
    startMap()
}

function selectMonsterFighter(playerFighter) {
    fetch(`${URL}/monsterFighter/${playerId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fighter:playerFighter
        })
    })
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
            if (playerAttack.length === 5) {
                sendAttacks()
            }
        })
    })
}

function sendAttacks() {
    fetch(`${URL}/monsterFighter/${playerId}/attacks`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attacks: playerAttack
        })
    })

    interval = setInterval(getAttacks, 50)
}

function getAttacks() {
    fetch(`${URL}/monsterFighter/${enemyId}/attacks`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ attacks }) {
                        if (attacks.length === 5) {
                            enemyAttack = attacks
                            fight()
                        }
                    })
            }
        })
}

function selectEnemyFighter(enemy) {
    
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
    clearInterval(interval)

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
    // Matter.Composite.clear(canvasMap.monsterFighterObject, keepStatic = true)
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function drawCanvas() {

    monsterFighterObject.x = monsterFighterObject.x + monsterFighterObject.speedX
    monsterFighterObject.y = monsterFighterObject.y + monsterFighterObject.speedY

    canvasMap.clearRect(0, 0, map.width, map.height)
    canvasMap.drawImage(
        backgroundMap,
        0,
        0,
        map.width,
        map.height
    )
    monsterFighterObject.drawFighter()

    sendPosition(monsterFighterObject.x, monsterFighterObject.y)

    enemyFighters.forEach(function (monsterFighter) {
        monsterFighter.drawFighter()
        checkCollision(monsterFighter)
    })

}   

function sendPosition(x, y) {
    fetch(`${URL}/monsterFighter/${playerId}/position`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        }),
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({enemies}) {
                    console.log(enemies);
                    enemyFighters = enemies.map(function (enemy) {
                        let enemyFighter = null
                        const fighterName = enemy.fighter.name || ""
                        if (fighterName === "Human") {
                            enemyFighter = new MonsterFighter('Human', './assets/Old_MMA_fighter.png', 5, './assets/Old_MMA_fighter_face.png', enemy.id)                        
                        } else if (fighterName === "Vampire") {
                            enemyFighter = new MonsterFighter('Vampire', './assets/vampire_fighter.png', 5, './assets/vampire_fighter_face.png', enemy.id)
                        } else if (fighterName === "Werewolf") {
                            enemyFighter = new MonsterFighter('Werewolf', './assets/werewolf_fighter.png', 5, './assets/werewolf_fighter _face.png', enemy.id)
                        }

                        enemyFighter.x = enemy.x
                        enemyFighter.y = enemy.y

                        return enemyFighter
                    })
                })
        }
    })
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
    monsterFighterObject = getFighterObject(playerFighter)
    console.log(monsterFighterObject, playerFighter);
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

    enemyId = enemy.id
    sectionSelectAttack.style.display = 'flex'
    sectionShowMap.style.display = 'none'
    selectEnemyFighter(enemy)
}

window.addEventListener('load', startGame)