import './App.css'
import React, { useState, useEffect } from 'react'
import WebFont from 'webfontloader'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import minnie from './gifs/minnie.gif'
import mickey from './gifs/mickey.gif'
import donald from './gifs/donald.gif'
import goofy from './gifs/goofy.gif'
import tom from './gifs/tom.gif'
import berlioz from './gifs/berlioz.gif'

function Victory({ gameState }) {
  const [createRoom, setCreateRoom] = useState(false)
  const gifs = { minnie, mickey, donald, goofy, tom, berlioz }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Abril Fatface', 'GFS Didot', 'Antic Didone'],
      },
    })
  }, [])

  const roomCreation = () => {
    setCreateRoom(!createRoom)
  }

  return (
    <div className="app">
      <p className="victoryTitle" style={{ fontFamily: 'Abril Fatface' }}>
        {gameState.gameHistory[gameState.gameIndex][0]} finished 1st
      </p>
      <img
        className="victoryGif"
        src={
          gifs[
            gameState.players[gameState.gameHistory[gameState.gameIndex][0]]
              .character
          ]
        }
        alt="waiting"
      />

      <p className="subtitle" style={{ fontFamily: 'Abril Fatface' }}>
        with{' '}
        {gameState.players[gameState.gameHistory[gameState.gameIndex][0]]
          .seconds / 10}
        s
      </p>
      <div className="leaderboardDiv">

      {gameState.gameHistory[gameState.gameIndex].map((playerUsername, i) => {
        return (
          <p className="leaderboardItem">
            {i + 1}. &nbsp;<strong>{playerUsername}:</strong>{' '}
            {gameState.players[playerUsername].seconds / 10}s
          </p>
        )
      })}
      </div>

      <br />
      <div className="App">
        <Link to="/lobby">
          <button className="join" onClick={() => roomCreation()}>
            Create a Room
          </button>
        </Link>
        <Link to="/lobby">
          <button className="join">Join a Room</button>
        </Link>
      </div>
    </div>
  )
}

export default Victory
