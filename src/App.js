import './App.css'
import Lobby from './Lobby'
import Home from './Home'
import Game from './Game'
import io from 'socket.io-client';
import Constants from './shared/constants';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

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
    return () => {
      socket.off('connect');
      socket.off('disconnect');
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
