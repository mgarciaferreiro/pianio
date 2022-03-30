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
  socket.on(Constants.MSG_TYPES.DISCONNECT, () => 
    onDisconnect(socket));
  // TODO: register the other functions
  socket.on(Constants.MSG_TYPES.JOIN_GAME_REQUEST, (username, gameId) => 
    joinGame(username, gameId, socket));
  socket.on(Constants.MSG_TYPES.GAME_UPDATE_REQUEST, (username, position, gameId, seconds) => 
    updateGame(username, position, gameId, seconds, socket));
  socket.on(Constants.MSG_TYPES.START_GAME_REQUEST, (gameId) => startGame(gameId, socket));
  socket.on(Constants.MSG_TYPES.LEAVE_LOBBY_REQUEST, () =>
    onDisconnect(socket));
  // socket.on(Constants.MSG_TYPES.RESTART_GAME, restartGame);
  // socket.on(Constants.MSG_TYPES.GET_OVERALL_LEADERBOARD, getOverallLeaderboard);

});

io.listen(3001);

setInterval(() => {
  io.emit('message', new Date().toISOString());
}, 1000);

// Game functions

const games = {} // maps gameId to game objects

function onDisconnect(socket) {
  // this = socket
  console.log(`disconnect: ${this.id}`);
  // TODO: remove the player from the game
  console.log(games)
  for (const [gid, g] of Object.entries(games)) {
    console.log([gid, g])
    if (g.removePlayer(socket.id)) {
      console.log('removed player')
      socket.to(gid).emit(Constants.MSG_TYPES.GAME_UPDATE_RESPONSE, g.createGameWithoutSocket());
    }
  }
}

function generateGameId() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

function createGame(hostName, socket) {
  console.log('Creating game ' + hostName)

  gameId = generateGameId()

  while (gameId in games) {
    gameId = generateGameId()
  }

  const game = new Game(hostName, gameId, socket);
  game.addPlayer(hostName, socket.id)

  games[gameId] = game;
  socket.join(gameId);

  console.log(hostName + ' created game ' + gameId);
  console.log(game)
  socket.emit(Constants.MSG_TYPES.CREATE_GAME_SUCCESS, game.createGameWithoutSocket()); //emit to client
}

// TODO: test and add back these functions

function joinGame(username, gameId, socket) {
  console.log('Joining game ' + gameId + username)
  if (!(gameId in games)) {
    socket.emit(Constants.MSG_TYPES.JOIN_GAME_FAILURE);
  } else {
    game = games[gameId];
    game.addPlayer(username, socket.id);
    socket.emit(Constants.MSG_TYPES.JOIN_GAME_SUCCESS, game.createGameWithoutSocket()); 

    socket.join(gameId);
    socket.to(gameId).emit(Constants.MSG_TYPES.PLAYER_JOINED_SESSION, game.createGameWithoutSocket()); //emit to client

    //emit to client
  }
}

function updateGame(username, position, gameId, seconds, socket) {
  console.log('Updating game ' + gameId + username + position)
  game = games[gameId];
  if (game.setPosition(username, position, seconds)) {
    console.log(game.createGameWithoutSocket())
    socket.emit(Constants.MSG_TYPES.GAME_WON, game.createGameWithoutSocket())
  }
  socket.to(gameId).emit(Constants.MSG_TYPES.GAME_UPDATE_RESPONSE, game.createGameWithoutSocket()); //emit to client
}

function startGame(gameId, socket) {
  console.log('Starting game ' + gameId)
  const game = games[gameId];
  game.start();
  socket.emit(Constants.MSG_TYPES.START_GAME_RESPONSE)
  socket.to(gameId).emit(Constants.MSG_TYPES.START_GAME_RESPONSE);
}


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