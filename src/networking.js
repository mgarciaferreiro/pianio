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

export const sendUpdate = (username, position, gameId) => {
  console.log('Sending game update ' + gameId + username + position + socket.id);
  socket.emit(Constants.MSG_TYPES.GAME_UPDATE, username, position, gameId);
}