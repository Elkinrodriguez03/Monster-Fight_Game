let playerAttack
let enemyAttack
let playerLifes = 3
let enemyLifes = 3

function startGame() {
    let sectionSelectAttack = document.getElementById('select-attack')
    sectionSelectAttack.style.display = 'none'

    let sectionNewFight = document.getElementById('reset')
    sectionNewFight.style.display = 'none'
    
    let playerFighterButton = document.getElementById('fighter-button')
    playerFighterButton.addEventListener('click', selectPlayerFighter   )

    let shotgunButton = document.getElementById('shotgun-button')
    shotgunButton.addEventListener('click', shotgunAttack)
    let fangsButton = document.getElementById('fangs-button')
    fangsButton.addEventListener('click', fangsAttack)
    let clawsButton = document.getElementById('claws-button')
    clawsButton.addEventListener('click', clawsAttack)

    let newFightButton = document.getElementById('new-fight-button')
    newFightButton.addEventListener('click', resetGame)
}

function selectPlayerFighter() {
    let sectionFighterSelect = document.getElementById('select-fighter')
    sectionFighterSelect.style.display = 'none'
    
    let sectionAttackSelect = document.getElementById('select-attack')
    sectionAttackSelect.style.display = 'flex'
    
    let inputHuman = document.getElementById('human')
    let inputVampire = document.getElementById('vampire')
    let inputWerewolf = document.getElementById('werewolf')
    let spanPlayerFighter = document.getElementById('player-fighter')
    
    if (inputHuman.checked) {
        spanPlayerFighter.innerHTML = 'Human'
    } else if (inputVampire.checked) {
        spanPlayerFighter.innerHTML = 'Vampire'
    } else if (inputWerewolf.checked) {
        spanPlayerFighter.innerHTML = 'Werewolf'
    } else {
        alert('Choose a Fighter')
    }

    selectEnemyFighter()
}

function selectEnemyFighter() {
    let randomFighter = random(1,3)
    let spanEnemyFighter = document.getElementById('enemy-fighter')

    if (randomFighter == 1) {
        spanEnemyFighter.innerHTML = 'Human'
    } else if (randomFighter == 2) {
        spanEnemyFighter.innerHTML = 'Vampire'
    } else {
        spanEnemyFighter.innerHTML = 'Werewolf'
    }
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
    let spanPlayerLifes = document.getElementById('player-lifes')
    let spanEnemyLifes = document.getElementById('enemy-lifes')
    
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
    let sectionMessages = document.getElementById('messages')
    let playerAttacks = document.getElementById('player-attacks')
    let enemyAttacks = document.getElementById('enemy-attacks')
    
    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')

    sectionMessages.innerHTML = result
    newPlayerAttack.innerHTML = playerAttack
    newEnemyAttack.innerHTML = enemyAttack

    playerAttacks.appendChild(newPlayerAttack)
    enemyAttacks.appendChild(newEnemyAttack)
}

function newFinalMessage(finalResult) {
    let sectionMessages = document.getElementById('messages')
    
    sectionMessages.innerHTML = finalResult

    let shotgunButton = document.getElementById('shotgun-button')
    shotgunButton.disabled = true
    let fangsButton = document.getElementById('fangs-button')
    fangsButton.disabled = true
    let clawsButton = document.getElementById('claws-button')
    clawsButton.disabled = true

    let sectionNewFight = document.getElementById('reset')
    sectionNewFight.style.display = 'block'
}

function resetGame() {
    location.reload()
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', startGame)