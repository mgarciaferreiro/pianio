import { processGameUpdate } from './state';
import { socket } from './App';
const Constants = require('./shared/constants');


export const createGame = (hostName) => {
  console.log('Creating game request ' + hostName + socket.id);
  console.log(socket)
  socket.emit(Constants.MSG_TYPES.CREATE_GAME_REQUEST, hostName);
}

// export const play = username => {
//   socket.emit(Constants.MSG_TYPES.JOIN_GAME_REQUEST, username);
// };