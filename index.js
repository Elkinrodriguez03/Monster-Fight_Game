const express = require("express")
const cors = require("cors")

import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const players = []
const PORT = process.env.PORT || 1777

class Player {
    constructor(id) {
        this.id = id
    }

    assingFighter(fighter) {
        this.fighter = fighter
    }

    updatePosition(x, y) {
        this.x = x
        this.y = y
    }

    assingAttacks(attacks) {
        this.attacks = attacks
    }
}

class MonsterFighter {
    constructor(name) {
        this.name = name
    }
}

app.get("/join", (req, res) => {
    const id = `${Math.random()}`

    const player = new Player(id)

    players.push(player)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/monsterFighter/:playerId", (req, res) => {
    const playerId = req.params.playerId || ""
    const name  = req.body.fighter || ""
    const fighter = new MonsterFighter(name)

    const indexPlayer = players.findIndex((player) => playerId === player.id)

    if(indexPlayer >= 0) {
        players[indexPlayer].assingFighter(fighter)
    }

    console.log(players);
    console.log(playerId);  
    res.end()
})

app.post("/monsterFighter/:playerId/position", (req, res) => {
    const playerId = req.params.playerId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const indexPlayer = players.findIndex((player) => playerId === player.id)

    if(indexPlayer >= 0) {
        players[indexPlayer].updatePosition(x, y)
    }

    const enemies = players.filter((player) => playerId !== player.id)

    res.send({
        enemies
    })
})

app.post("/monsterFighter/:playerId/attacks", (req, res) => {
    const playerId = req.params.playerId || ""
    const attacks =req.body.attacks || []

    const indexPlayer = players.findIndex((player) => playerId === player.id)

    if(indexPlayer >= 0) {
        players[indexPlayer].assingAttacks(attacks)
    }

    res.end()
})

app.get("/monsterFighter/:playerId/attacks", (req, res) => {
    const playerId = req.params.playerId || ""
    const player = players.find((player) => player.id === playerId)
    res.send({
        attacks: player.attacks || []
    })
})

app.listen(PORT, () => {
    console.log("Server working")
})