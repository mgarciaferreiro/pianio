import './App.css'
import Lobby from './Lobby'
import Home from './Home'
import Game from './Game'
import Victory from './Victory'
import io from 'socket.io-client';
import Constants from './shared/constants';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { CookiesProvider } from "react-cookie";

export const socket = io('localhost:3001');
// export const socket = io('http://ec2-3-82-195-179.compute-1.amazonaws.com:3001/');

function App() {
  let navigate = useNavigate()
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [gameState, setGameState] = useState(null)
  const [song, setSong] = useState([])
  const [name, setName] = useState('')
  const [leaderboard, setLeaderboard] = useState('')

  useEffect(() => {
    // getLeaderboard()
    socket.on('connect', () => {
      setIsConnected(true)
    })
    socket.on('disconnect', () => {
      socket.emit(Constants.MSG_TYPES.DISCONNECTED)
      setIsConnected(false)
    })
    socket.on(Constants.MSG_TYPES.CREATE_GAME_SUCCESS, (game, song) => {
      console.log('Created game with ID ' + game.gameId)
      console.log(game)
      setGameState(game)
      setSong(Array.from(song))
      navigate('/Lobby')
    })
    socket.on(Constants.MSG_TYPES.PLAYER_JOINED_SESSION, game => {
      console.log('Player joined game ' + game.gameId)
      setGameState(game)
    })
    socket.on(Constants.MSG_TYPES.JOIN_GAME_SUCCESS, (game, song) => {
      console.log('Joined game successfully')
      setGameState(game)
      setSong(song)
      navigate('/Lobby')
    })
    socket.on(Constants.MSG_TYPES.GAME_UPDATE_RESPONSE, game => {
      // console.log('Received game update');
      setGameState(game)
    })
    socket.on(Constants.MSG_TYPES.START_GAME_RESPONSE, () => {
      navigate('/Game')
    })
    socket.on(Constants.MSG_TYPES.LEAVE_LOBBY_RESPONSE, () => {
      console.log('leave lobby response')
      navigate('/')
    })
    socket.on(Constants.MSG_TYPES.GAME_WON, game => {
      setGameState(game)
      navigate('/Victory')
    })
    socket.on(Constants.MSG_TYPES.RESTART_GAME_RESPONSE, (game) => {
      console.log("received restart game response from server")
      console.log(game)
      navigate('/Lobby')
      setGameState(game)
    })
    socket.on(Constants.MSG_TYPES.LEADERBOARD_RESPONSE, leaderboard => {
      console.log('Leaderboard: ')
      console.log(leaderboard)
      setLeaderboard(leaderboard)
    })
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off(Constants.MSG_TYPES.DISCONNECTED)
      socket.off(Constants.MSG_TYPES.CREATE_GAME_SUCCESS)
      socket.off(Constants.MSG_TYPES.PLAYER_JOINED_SESSION)
      socket.off(Constants.MSG_TYPES.JOIN_GAME_SUCCESS)
      socket.off(Constants.MSG_TYPES.GAME_UPDATE_RESPONSE)
      socket.off(Constants.MSG_TYPES.START_GAME_RESPONSE)
      socket.off(Constants.MSG_TYPES.LEAVE_LOBBY_RESPONSE)
      socket.off(Constants.MSG_TYPES.GAME_WON)
      socket.off(Constants.MSG_TYPES.RESTART_GAME_RESPONSE)
      socket.off(Constants.MSG_TYPES.LEADERBOARD_RESPONSE)
    };
  });

  return (
    <CookiesProvider>
    <div>
      <Routes>
        <Route path="/" element={<Home name={name} setName={setName} leaderboard={leaderboard}/>} />
        <Route path="/lobby" element={<Lobby gameState={gameState} name={name}/>} />
        <Route path="/game" element={<Game gameState={gameState} song={song} name={name}/>} />
        <Route path="/victory" element={<Victory gameState={gameState} name={name}/>} />
      </Routes>
    </div>
    </CookiesProvider>

  )
}

export default App
