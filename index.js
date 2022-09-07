const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const players = []

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
}

class MonsterFighter {
    constructor(name) {
        this.name = name
    }
}

app.get("/join", (req, ans) => {
    const id = `${Math.random()}`

    const player = new Player(id)

    players.push(player)

    ans.setHeader("Access-Control-Allow-Origin", "*")

    ans.send(id)
})

app.post("/monsterFighter/:playerId", (req, ans) => {
    const playerId = req.params.playerId || ""
    const name  = req.body.fighter || ""
    const fighter = new MonsterFighter(name)

    const indexPlayer = players.findIndex((player) => playerId === player.id)

    if(indexPlayer >= 0) {
        players[indexPlayer].assingFighter(fighter)
    }

    console.log(players);
    console.log(playerId);  
    ans.end()
})

app.post("/monsterFighter/:playerId/position", (req, ans) => {
    const playerId = req.params.playerId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const indexPlayer = players.findIndex((player) => playerId === player.id)

    if(indexPlayer >= 0) {
        players[indexPlayer].updatePosition(x, y)
    }

    const enemies = players.filter((player) => playerId !== player.id)

    ans.send({
        enemies
    })
})

app.listen(1777, () => {
    console.log("Server working")
})