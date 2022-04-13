import { socket } from './App';
const Constants = require('./shared/constants');


export const createGame = (hostName, numKeys) => {
  console.log('Creating game request ' + hostName + socket.id);
  socket.emit(Constants.MSG_TYPES.CREATE_GAME_REQUEST, hostName, numKeys);
}

export const createSoloGame = (hostName, numKeys) => {
  console.log('Creating solo game request ' + hostName + socket.id);
  socket.emit(Constants.MSG_TYPES.CREATE_SOLO_GAME_REQUEST, hostName, numKeys);
}

export const joinGame = (username, gameId) => {
  console.log('Join game request ' + gameId + username + socket.id);
  socket.emit(Constants.MSG_TYPES.JOIN_GAME_REQUEST, username, gameId);
}

export const joinRandomGame = (username, difficulty) => {
  console.log('Join random game request ' + username + socket.id);
  socket.emit(Constants.MSG_TYPES.JOIN_RANDOM_GAME_REQUEST, username, difficulty);
} 

export const sendUpdate = (username, position, gameId, seconds) => {
  // console.log('Sending game update ' + gameId + username + position + socket.id + seconds);
  socket.emit(Constants.MSG_TYPES.GAME_UPDATE_REQUEST, username, position, gameId, seconds);
}

export const startGame = (gameId) => {
  console.log('sending start game request ' + gameId);
  socket.emit(Constants.MSG_TYPES.START_GAME_REQUEST, gameId)
}

export const leaveLobby = () => {
  socket.emit(Constants.MSG_TYPES.LEAVE_LOBBY_REQUEST)
}

export const restartGame = (gameId) => {
  console.log('sending restart game request')
  socket.emit(Constants.MSG_TYPES.RESTART_GAME_REQUEST, gameId)
}

export const getLeaderboard = () => {
  console.log('sending leaderboard request')
  socket.emit(Constants.MSG_TYPES.LEADERBOARD_REQUEST)
}