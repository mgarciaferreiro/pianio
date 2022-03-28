const Constants = require('../src/shared/constants');
const Player = require('./player');

class Game {

  constructor(host, gameId, socket) {
    this.players = {} //maps player name to player object
    this.host = host
    this.gameId = gameId
    this.socket = socket
    this.availableCharacters = ["minnie", "mickey", "donald", "goofy", "tom", "berlioz"]

    // Generate a random song with 6 notes
    this.song = Array.from({length: Constants.SONG_LENGTH}, () =>  Math.floor(Math.random() * 6))
  }

  // TODO: use this?
  start() {
    // Set timer to call update method 60 times / second 
    setInterval(this.update.bind(this), 1000 / 60);

    this.socket.to(this.gameId).emit(Constants.MSG_TYPES.START_GAME)
  }

  addPlayer(username) {
    // Pick a random character and remove it from the array of available characters
    const character = this.availableCharacters[Math.floor(Math.random()*this.availableCharacters.length)]
    this.availableCharacters = this.availableCharacters.filter(function(ele){ return ele != character })
    this.players[username] = new Player(username, character)
  }

  removePlayer(username) {
    const character = this.players[username].getCharacter()
    this.players[username] = null
    this.availableCharacters.push(character)
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
    this.socket.to(this.gameId).emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate())
  }

  // Create update to send to the client
  createUpdate() {
    return {
      players: this.players.map(p => p.serializeForUpdate()),
      host: this.host,
      gameId: this.gameId
    }
  }

}

module.exports = Game