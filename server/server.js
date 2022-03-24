const Game = require('./game');
const Constants = require('../src/shared/constants');

const io = require('socket.io')({
    cors: {
      origin: ['http://localhost:3000']
    }
  });

io.on('connection', socket => {
  console.log(`connect: ${socket.id}`);

  socket.on('hello!', () => {
    console.log(`hello from ${socket.id}`);
  });

  socket.on(Constants.MSG_TYPES.CREATE_GAME_REQUEST, (hostName) => createGame(hostName, socket));
  socket.on(Constants.MSG_TYPES.DISCONNECT, onDisconnect);
  // TODO: register the other functions
  socket.on(Constants.MSG_TYPES.JOIN_GAME_REQUEST, (username, gameId) => joinGame(username, gameId, socket));
  // socket.on(Constants.MSG_TYPES.START_GAME, startGame);
  // socket.on(Constants.MSG_TYPES.RESTART_GAME, restartGame);
  // socket.on(Constants.MSG_TYPES.GET_OVERALL_LEADERBOARD, getOverallLeaderboard);

});

io.listen(3001);

setInterval(() => {
  io.emit('message', new Date().toISOString());
}, 1000);

// Game functions

const games = {} // maps gameId to game objects

function onDisconnect() {
  // this = socket
  console.log(`disconnect: ${this.id}`);
  // TODO: remove the player from the game
}

function createGame(hostName, socket) {
  console.log('Creating game ' + hostName)
  // let gameId = (Math.floor(Math.random() * 100000 + 1));
  
  // while (gameId.toString() in games) {
  //   gameId++;
  // }

  // gameId = gameId.toString();

  /* TODO: remove hardcoded game ID */
  gameId = '123'

  const game = new Game(hostName);
  game.addPlayer(hostName)

  games[gameId] = game;
  socket.join(gameId);

  console.log(hostName + ' created game ' + gameId);

  socket.emit(Constants.MSG_TYPES.CREATE_GAME_SUCCESS, gameId); //emit to client
}

// TODO: test and add back these functions


function joinGame(username, gameId, socket) {
  console.log('Joining game ' + gameId + username)
  if (!(gameId in games)) {
    socket.emit(Constants.MSG_TYPES.JOIN_GAME_FAILURE);
  } else {
    game = games[gameId];
    game.addPlayer(username);
    socket.join(gameId);
    socket.to(gameId).emit(Constants.MSG_TYPES.PLAYER_JOINED_SESSION, username); //emit to client

    socket.emit(Constants.MSG_TYPES.JOIN_GAME_SUCCESS); //emit to client
  }
}

// function startGame(gameId) {
//   this.to(gameId).emit(Constants.MSG_TYPES.START_GAME);
//   const game = games[gameId];
//   game.start();
// }

// function restartGame(gameId) {
//   this.to(gameId).emit(Constants.MSG_TYPES.RESTART_GAME);
//   const game = games[gameId];
//   game.start();
// }

// function getOverallLeaderboard(gameId) {
//   const game = games[gameId];
//   game.updateOverallLeaderboard();
//   this.to(gameId).emit(Constants.MSG_TYPES.FINISH_GAME, game.overallLeaderboard);
//   this.emit(Constants.MSG_TYPES.FINISH_GAME, game.overallLeaderboard);

// }