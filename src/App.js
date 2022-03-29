import './App.css'
import Lobby from './Lobby'
import Home from './Home'
import Game from './Game'
import io from 'socket.io-client';
import Constants from './shared/constants';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { CookiesProvider } from "react-cookie";

export const socket = io('localhost:3001');

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected)
  const [gameState, setGameState] = useState(null)
  const [song, setSong] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    });
    socket.on('disconnect', () => {
      setIsConnected(false)
    });
    socket.on(Constants.MSG_TYPES.CREATE_GAME_SUCCESS, game => {
      console.log('Created game with ID ' + game.gameId)
      setGameState(game)
      setSong(Array.from(game.song))
    });
    socket.on(Constants.MSG_TYPES.PLAYER_JOINED_SESSION, game => {
      console.log('Player joined game ' + game.gameId)
      setGameState(game)
    });
    socket.on(Constants.MSG_TYPES.JOIN_GAME_SUCCESS, game => {
      console.log('Joined game successfully')
      setGameState(game)
      setSong(game.song)
    });
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, game => {
      console.log('Received game update');
      console.log(game)
      setGameState(game)
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off(Constants.MSG_TYPES.CREATE_GAME_SUCCESS)
      socket.off(Constants.MSG_TYPES.PLAYER_JOINED_SESSION)
      socket.off(Constants.MSG_TYPES.JOIN_GAME_SUCCESS)
      socket.off(Constants.MSG_TYPES.GAME_UPDATE)
    };
  });

  return (
    <CookiesProvider>

    <div>
      {/* <header className="App-header">
        <p>Connected: { '' + isConnected }</p>
      </header> */}
      <Routes>
        <Route path="/" element={<Home name={name} setName={setName}/>} />
        <Route path="/lobby" element={<Lobby gameState={gameState}/>} />
        <Route path="/game" element={<Game gameState={gameState} song={song} name={name}/>} />
      </Routes>
    </div>
    </CookiesProvider>

  )
}

export default App
