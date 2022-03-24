
let username = null
let gameId = null
let players = []
let positions = {}

export function getUsername() {
    return username
}

export function setUsername(name) {
    username = name
}

export function getGameId() {
    return gameId
}

export function setGameId(id) {
    gameId = id
}

export function addPlayer(name) {
    players.push(name)
}

export function initPositions() {
    players.map(name => (
        positions[name] = 0
    ))
}

export function updatePosition(name, position) {
    positions[name] = position
}

export function getPosition(name) {
    return positions[name];
}

export function getPositions() {
    return positions;
}