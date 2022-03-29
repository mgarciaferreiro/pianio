const Constants = require('../src/shared/constants');
const Player = require('./player');
class Game {

  constructor(host, gameId, gameSocket) {
    this.players = {} //maps player name to player object
    this.host = host
    
//     // Generate a random song with 5 notes
//     this.song = Array.from({length: Constants.SONG_LENGTH}, () =>  Math.floor(Math.random() * 5));
//     console.log(this.song)
//     this.lastUpdateTime = Date.now();
//     this.shouldSendUpdate = false;
    this.gameId = gameId
    this.gameSocket = gameSocket
    this.socketIdToUsername = {}

    // Generate a random song with 6 notes
    this.song = Array.from({length: Constants.SONG_LENGTH}, () =>  Math.floor(Math.random() * 6))
  }

  start() {
    // Set timer to call update method 60 times / second 
    setInterval(this.update.bind(this), 1000 / 60);
  }

  addPlayer(username, character, socketId) {
    console.log('adding ' + socketId)
    this.players[username] = new Player(username, character)
    this.socketIdToUsername[socketId] = username
  }

  removePlayer(socketId) {
    console.log("in remove player " + socketId)
    console.log(this.players)
    console.log(this.socketIdToUsername)
    if (socketId in this.socketIdToUsername) {
      delete this.players[this.socketIdToUsername[socketId]]
      delete this.socketIdToUsername[socketId]
      return true
    } else {
      return false
    }
  }

  setPosition(username, position) {
    const player = this.players[username]
    player.setPosition(position)
    this.players[username] = player
  }

  update() {

    // TODO: Check if any players have won
    // this.players.forEach((player, i) => {
    //   if (player.isFinished) {
    //     socket.emit(Constants.MSG_TYPES.GAME_WON);
    //     this.removePlayer(socket);
    //   }
    // })

    // Send a game update to each player 
    this.gameSocket.to(this.gameId).emit(Constants.MSG_TYPES.GAME_UPDATE_RESPONSE, this.createGameWithoutSocket())
  }

  // Create update to send to the client
  /*createUpdate() {
    return {
      players: this.players.map((name, playerObj) => p.serializeForUpdate()),
      host: this.host,
      gameId: this.gameId
    }
  }
*/
  createGameWithoutSocket() {
    return {
      players: this.players,
      host: this.host,
      gameId: this.gameId,
      socketIdToUsername: this.socketIdToUsername,
      song: this.song
    }
  }
}

module.exports = Game