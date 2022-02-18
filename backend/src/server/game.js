const Constants = require('../../../frontend/src/shared/constants');
const Player = require('./player');

class Game {
  constructor(host) {
    this.sockets = {}; //maps socket id to socket
    this.players = {}; //maps socket id to player object
    this.host = host

    // Generate a random song with 5 notes
    this.song = Array.from({length: Constants.SONG_LENGTH}, () =>  Math.floor(Math.random() * 5));
    this.lastUpdateTime = Date.now();
    this.shouldSendUpdate = false;
  }

  start() {
    // Set timer to call update method 60 times / second 
    setInterval(this.update.bind(this), 1000 / 60);

    // Set every player's position to 0 and notify them of game start
    Object.keys(this.sockets).forEach(playerID => {
      const player = this.players[playerID];
      player.setPosition(0)

      const socket = this.sockets[playerID];
      socket.emit(Constants.MSG_TYPES.START_GAME);
    });
  }

  addPlayer(socket, username) {
    this.sockets[socket.id] = socket;
    this.players[socket.id] = new Player(socket.id, username);
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }

  update() {
    // Calculate time elapsed
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;

    // Check if any players have lost or won
    Object.keys(this.sockets).forEach(playerID => {
      const socket = this.sockets[playerID];
      const player = this.players[playerID];
      if (player.hasLost) {
        socket.emit(Constants.MSG_TYPES.GAME_LOST);
        this.removePlayer(socket);
      }
      if (player.hasWon) {
        socket.emit(Constants.MSG_TYPES.GAME_WON);
        this.removePlayer(socket);
      }
    });

    // Send a game update to each player 
    if (this.shouldSendUpdate) {
        Object.keys(this.sockets).forEach(playerID => {
            const socket = this.sockets[playerID];
            const player = this.players[playerID];
            socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard));
          });
        this.shouldSendUpdate = false;
    }

  }

  getLeaderboard() {
    return Object.values(this.players)
      .sort((p1, p2) => p2.score - p1.score)
      .map(p => ({ username: p.username, score: Math.round(p.score) }));
  }

  // Create update to send to the client
  createUpdate(player, leaderboard) {
    return {
      t: Date.now(),
      me: player.serializeForUpdate(),
      others: this.players.map(p => p.serializeForUpdate()),
      leaderboard
    };
  }

}

module.exports = Game;