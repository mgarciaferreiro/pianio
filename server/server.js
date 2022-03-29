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
  socket.on(Constants.MSG_TYPES.JOIN_GAME_REQUEST, (username, gameId) => 
    joinGame(username, gameId, socket));
  socket.on(Constants.MSG_TYPES.GAME_UPDATE, (username, position, gameId) => 
    updateGame(username, position, gameId, socket));
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

function generateGameId() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

function createGame(hostName, socket) {
  console.log('Creating game ' + hostName)
  // let gameId = (Math.floor(Math.random() * 100000 + 1));
  
  // while (gameId.toString() in games) {
  //   gameId++;
  // }

  // gameId = gameId.toString();

  /* TODO: remove hardcoded game ID */
  gameId = generateGameId()

  const game = new Game(hostName, gameId);
  game.addPlayer(hostName)

  games[gameId] = game;
  socket.join(gameId);

  console.log(hostName + ' created game ' + gameId);
  console.log(game)
  socket.emit(Constants.MSG_TYPES.CREATE_GAME_SUCCESS, game); //emit to client
}

// TODO: test and add back these functions

function joinGame(username, gameId, socket) {
  console.log('Joining game ' + gameId + username)
  if (!(gameId in games)) {
    socket.emit(Constants.MSG_TYPES.JOIN_GAME_FAILURE);
  } else {
    game = games[gameId];
    console.log(game)
    game.addPlayer(username);
    socket.emit(Constants.MSG_TYPES.JOIN_GAME_SUCCESS, game); 
    socket.join(gameId);
    socket.to(gameId).emit(Constants.MSG_TYPES.PLAYER_JOINED_SESSION, game); //emit to client

    //emit to client
  }
}

function updateGame(username, position, gameId, socket) {
  console.log('Updating game ' + gameId + username + position)
  game = games[gameId];
  game.setPosition(username, position)
  socket.to(gameId).emit(Constants.MSG_TYPES.GAME_UPDATE, game); //emit to client
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