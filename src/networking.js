import { socket } from './App';
const Constants = require('./shared/constants');


export const createGame = (hostName) => {
  console.log('Creating game request ' + hostName + socket.id);
  socket.emit(Constants.MSG_TYPES.CREATE_GAME_REQUEST, hostName);
}

export const joinGame = (username, gameId) => {
  console.log('Join game request ' + gameId + username + socket.id);
  socket.emit(Constants.MSG_TYPES.JOIN_GAME_REQUEST, username, gameId);
}

export const joinRandomGame = (username) => {
  console.log('Join random game request ' + username + socket.id);
  socket.emit(Constants.MSG_TYPES.JOIN_RANDOM_GAME_REQUEST, username);
} 

export const sendUpdate = (username, position, gameId, seconds) => {
  console.log('Sending game update ' + gameId + username + position + socket.id + seconds);
  socket.emit(Constants.MSG_TYPES.GAME_UPDATE_REQUEST, username, position, gameId, seconds);
}

export const startGame = (gameId) => {
  console.log('sending start game request ' + gameId);
  socket.emit(Constants.MSG_TYPES.START_GAME_REQUEST, gameId)
}

export const leaveLobby = () => {
  socket.emit(Constants.MSG_TYPES.LEAVE_LOBBY_REQUEST)
}
