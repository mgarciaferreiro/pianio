import './App.css'
import Lobby from './Lobby'
import Home from './Home'
import Game from './Game'
import io from 'socket.io-client';
import Constants from './shared/constants';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import {updatePosition, addPlayer} from './state'

export const socket = io('localhost:3001');

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    socket.on(Constants.MSG_TYPES.CREATE_GAME_SUCCESS, gameId => {
      console.log('Created game with ID ' + gameId);
    });
    socket.on(Constants.MSG_TYPES.PLAYER_JOINED_SESSION, (username) => {
      console.log('Player joined game ' + username);
      addPlayer(username);
    });
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, (username, position) => {
      console.log('Received game update ' + username + position);
      updatePosition(username, position);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off(Constants.MSG_TYPES.CREATE_GAME_SUCCESS)
      socket.off(Constants.MSG_TYPES.GAME_UPDATE)
    };
  });

  return (
    <div>
      {/* <header className="App-header">
        <p>Connected: { '' + isConnected }</p>
      </header> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  )
}

export default App
