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

import { restartGame } from './networking'

function Victory({ gameState, name }) {
  const gifs = {minnie, mickey, donald, goofy, tom, berlioz}
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Abril Fatface', 'GFS Didot', 'Antic Didone'],
      },
    })
  }, [])


  const clickedRestart = () => {
    restartGame(gameState.gameId)
  }

  return (
    <div className="app">
      <p className="victoryTitle" style={{ fontFamily: 'Abril Fatface' }}>
        {gameState.gameHistory[gameState.gameIndex][0]} Finished 1st
      </p>
      <img
        className="victoryGif"
        src={gifs[gameState.players[gameState.gameHistory[gameState.gameIndex][0]].character]}
        alt="waiting"
      />

      <p className="subtitle" style={{ fontFamily: 'Abril Fatface' }}>
        with {gameState.players[gameState.gameHistory[gameState.gameIndex][0]].seconds / 10}s
      </p>
      { 
      
      gameState.gameHistory[gameState.gameIndex].map(
        (playerUsername, i) => {
          return (
            <div className="text" style={{ fontFamily: 'Abril Fatface' }}>
              <li>
                {playerUsername}: {gameState.players[playerUsername].seconds / 10}s
              </li>
              <br/>
            </div>
          )
        }
      )}

      <ol></ol>
      <br />
      <div className="App">
        {gameState.host === name && (
          <button className="startGame" onClick={() => clickedRestart()}>
            Return to Lobby</button>
        )}
      </div>
    </div>
  )
}

export default Victory
