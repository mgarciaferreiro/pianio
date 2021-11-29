const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');
const Constants = require('../shared/constants');
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

// Listen on port 3000
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Setup socket.io
const io = socketio(server);

// Listen for socket.io connections
io.on('connection', socket => {
  console.log('Player connected!', socket.id);

  socket.on(Constants.MSG_TYPES.CREATE_GAME, createGame);
  socket.on(Constants.MSG_TYPES.JOIN_GAME_REQUEST, joinGame);
  socket.on(Constants.MSG_TYPES.INPUT, handleInput);
  socket.on(Constants.MSG_TYPES.START_GAME, startGame)
  socket.on(Constants.MSG_TYPES.RESTART_GAME, restartGame)
  socket.on(Constants.MSG_TYPES.DISCONNECT, onDisconnect);
});

// maps gameId to game objects
const games = {}

/**
 * client passes in hostName
 */

function createGame(hostName) {
  const gameId = (Math.floor(Math.random() * 100000 + 1));
  
  while (gameId.toString() in sessionIdToGame) {
    gameId++;
  }

  const gameId = gameId.toString();
  const game = new Game(hostName);
  game.addPlayer(hostName)

  games[gameId] = game;
  this.join(gameId);

  this.emit(Constants.MSG_TYPES.CREATE_GAME_SUCCESS); //emit to client
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

function handleInput(username, tileClicked) {
  game.handleTileClicked(username, tileClicked);
}

function onDisconnect() {
  game.removePlayer(this);
}