const Constants = require('../src/shared/constants');
const Player = require('./player');
class Game {

  constructor(host, gameId, gameSocket, isPrivate, numKeys) {
    this.players = {} //maps player name to player object
    this.host = host
    
    this.gameId = gameId
    this.availableCharacters = ["minnie", "mickey", "donald", "goofy", "tom", "berlioz"]

    this.gameSocket = gameSocket
    this.socketIdToUsername = {}

    this.gameIndex = 0

    this.gameHistory = {}
    this.gameHistory[0] = []
    
    this.usernameToWins = {}
    this.isPrivate = isPrivate

    this.keys = ['D', 'F', 'G', 'H', 'J', 'K']
    if (numKeys == Constants.EASY) {
      this.keys = ['F', 'G', 'H', 'J']
    } else if (numKeys == Constants.HARD) {
      this.keys = ['S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    }

    // Generate a random song with 6 notes
    this.songIndex = Object.keys(Constants.SONGS)[Math.floor(Math.random() * Object.keys(Constants.SONGS).length)]
    const songLength = (Constants.SONGS[this.songIndex]).length
    this.song = Array.from({length: songLength}, () =>  Math.floor(Math.random() * numKeys))
  }

  // TODO: use this?
  /*start() {
    // Set timer to call update method 60 times / second 
    this.intervalId = setInterval(this.update.bind(this), 1000 / 60);
  }*/

  addPlayer(username, socketId) {
    // Pick a random character and remove it from the array of available characters
    const character = this.availableCharacters[Math.floor(Math.random()*this.availableCharacters.length)]
    this.availableCharacters = this.availableCharacters.filter(function(ele){ return ele != character })
    this.usernameToWins[username] = 0
    this.players[username] = new Player(username, character)
    this.socketIdToUsername[socketId] = username
  }

  removePlayer(socketId) {
    // console.log("in remove player " + socketId)
    // console.log(this.players)
    // console.log(this.socketIdToUsername)
    if (socketId in this.socketIdToUsername && this.socketIdToUsername[socketId] in this.players) {
      const character = this.players[this.socketIdToUsername[socketId]].getCharacter()
      this.availableCharacters.push(character)
      delete this.players[this.socketIdToUsername[socketId]]
      delete this.socketIdToUsername[socketId]
      return true
    } else {
      return false
    }
  }

  setPosition(username, position, seconds) {
    const player = this.players[username]
    if (player != null && player.setPosition(position, seconds)) {
      this.gameHistory[this.gameIndex].push(player.username)
      if (this.gameHistory[this.gameIndex].length == 1) {
        this.usernameToWins[username]++
      }
      return true
    }
    this.players[username] = player
    return false
  }

  update() {
    /*this.players.forEach((player, i) => {
      if (player.isFinished) {
        socket.emit(Constants.MSG_TYPES.GAME_WON);
        this.removePlayer(socket);
      }
    })*/

    // Send a game update to each player 
    this.gameSocket.to(this.gameId).emit(Constants.MSG_TYPES.GAME_UPDATE_RESPONSE, this.createGameWithoutSocket())
  }

  reset() {
    this.gameIndex++
    this.gameHistory[this.gameIndex] = []
    this.song = Array.from({length: Constants.SONG_LENGTH}, () =>  Math.floor(Math.random() * 6))
    for (const [username, player] of Object.entries(this.players)) {
      player.reset()
    }
  }

  // Create game object to send to the client
  createGameWithoutSocket() {
    return {
      players: this.players,
      host: this.host,
      gameId: this.gameId,
      socketIdToUsername: this.socketIdToUsername,
      gameHistory: this.gameHistory,
      gameIndex: this.gameIndex,
      usernameToWins: this.usernameToWins,
      songIndex: this.songIndex,
      keys: this.keys
    }
  }
}

module.exports = Game