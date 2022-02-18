const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');
const Constants = require('../../../frontend/src/shared/constants');
const webpackConfig = require('../../webpack.dev.js');
const Game = require('./game');

// Setup an Express server
const app = express();
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the dist/ folder in production
  app.use(express.static('dist'));
}

// Listen on port 3001
const port = process.env.PORT || 3001;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Setup socket.io
const io = socketio(server);

// Listen for socket.io connections
io.on('connection', socket => {
  console.log('Player connected!', socket.id);
  socket.emit('connect', null);

  socket.on(Constants.MSG_TYPES.CREATE_GAME_REQUEST, createGame);
  socket.on(Constants.MSG_TYPES.JOIN_GAME_REQUEST, joinGame);
  socket.on(Constants.MSG_TYPES.START_GAME, startGame);
  socket.on(Constants.MSG_TYPES.RESTART_GAME, restartGame);
  socket.on(Constants.MSG_TYPES.GET_OVERALL_LEADERBOARD, getOverallLeaderboard);
  socket.on(Constants.MSG_TYPES.DISCONNECT, onDisconnect);
});

const games = {} // maps gameId to game objects


/**
 * client passes in hostName
 */

function createGame(hostName) {
  console.log('Creating game ' + hostName)
  const gameId = (Math.floor(Math.random() * 100000 + 1));
  
  while (gameId.toString() in games) {
    gameId++;
  }

  gameId = gameId.toString();
  const game = new Game(hostName);
  game.addPlayer(hostName)

  games[gameId] = game;
  this.join(gameId);

  this.emit(Constants.MSG_TYPES.CREATE_GAME_SUCCESS, gameId); //emit to client
}

function joinGame(username, gameId) {
  if (!(gameId in games)) {
    this.emit(Constants.MSG_TYPES.JOIN_GAME_FAILURE);
  } else {
    game = games[gameId];
    game.addPlayer(username);
    this.join(gameId);
    this.to(gameId).emit(Constants.MSG_TYPES.PLAYER_JOINED_SESSION); //emit to client

    this.emit(Constants.MSG_TYPES.JOIN_GAME_SUCCESS); //emit to client
  }
}

function startGame(gameId) {
  this.to(gameId).emit(Constants.MSG_TYPES.START_GAME);
  const game = games[gameId];
  game.start();
}

function restartGame(gameId) {
  this.to(gameId).emit(Constants.MSG_TYPES.RESTART_GAME);
  const game = games[gameId];
  game.start();
}

function getOverallLeaderboard(gameId) {
  const game = games[gameId];
  game.updateOverallLeaderboard();
  this.to(gameId).emit(Constants.MSG_TYPES.FINISH_GAME, game.overallLeaderboard);
  this.emit(Constants.MSG_TYPES.FINISH_GAME, game.overallLeaderboard);

}

function onDisconnect() {
  console.log("Disconnected")
  // game.removePlayer(this);
}