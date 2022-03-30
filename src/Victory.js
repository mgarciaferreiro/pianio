import './App.css'
import React, { useState, useEffect } from 'react'
import WebFont from 'webfontloader'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import minnie from './gifs/minnie.gif'

function Victory({ gameState }) {
  const [createRoom, setCreateRoom] = useState(false)

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
        {gameState.finishers[0]} Finished 1st
      </p>
      <img
        className="victoryGif"
        src={gameState.players[gameState.finishers[0]].character}
        alt="waiting"
      />

      <p className="subtitle" style={{ fontFamily: 'Abril Fatface' }}>
        with {gameState.players[gameState.finishers[0]].time}s
      </p>
      {gameState.finishers.map((player, i) => {
        if (i !== 0) {
          return (
            <div>
              <br />
              <li>
                {player}: {gameState.players[player].time}
              </li>
            </div>
          )
        }
      })}

      <ol></ol>
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
