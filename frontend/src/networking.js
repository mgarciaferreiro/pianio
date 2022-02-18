import io from 'socket.io-client';
import { processGameUpdate } from './state';
import { strict } from 'assert';

const Constants = require('./shared/constants');

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
// const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });
// const socket = io(`${socketProtocol}://localhost:3001`, { reconnection: false });
const socket = io(`${socketProtocol}://localhost:3001`);

const connectedPromise = new Promise(resolve => {
  console.log('connected promise')
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connect = onGameOver => (
  connectedPromise.then(() => {
    // Register callbacks
    socket.on(Constants.MSG_TYPES.CREATE_GAME_SUCCESS, gameId => {
      console.log('Created game with ID ' + gameId);
    });
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
    socket.on(Constants.MSG_TYPES.DISCONNECT, () => {
      console.log('Disconnected from server.');
    });
  })
);

export const createGame = () => {
  console.log('Creating game request');
  console.log(socket)
  socket.emit(Constants.MSG_TYPES.CREATE_GAME_REQUEST, socket.id);
}

export const play = username => {
  socket.emit(Constants.MSG_TYPES.JOIN_GAME_REQUEST, username);
};