import './App.css'
import React, { useState, useEffect } from 'react'
import WebFont from 'webfontloader'
import { useNavigate } from 'react-router-dom'
import minnie from './gifs/minnie.gif'
import mickey from './gifs/mickey.gif'
import donald from './gifs/donald.gif'
import goofy from './gifs/goofy.gif'
import tom from './gifs/tom.gif'
import berlioz from './gifs/berlioz.gif'

import { restartGame, leaveLobby } from './networking'

function Victory({ gameState, name }) {
  let navigate = useNavigate()
  const gifs = {minnie, mickey, donald, goofy, tom, berlioz}
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Abril Fatface', 'GFS Didot', 'Antic Didone'],
      },
    })
  }, [])

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
      <div className="flex">
      {gameState.gameHistory[gameState.gameIndex].map((name, i) =>
        <p className="leaderboardItem" key={i}>
          <strong>{i + 1}. {name}: </strong>{gameState.players[name].seconds / 10}s
        </p>
      )}
      </div>

      <br />
      <div className="App">
        {gameState.host === name && (
          <button className="startGame" onClick={() => restartGame(gameState.gameId)}>
            Restart Game</button>
        )}
      </div>
      
      {(gameState.host !== name || Object.keys(gameState.players).length == 1) && (
      <button className="startGame leaveLobby" onClick={() => {
        leaveLobby()
        navigate('/')
      }}>
        Leave Game
      </button>)}
    </div>
  )
}

export default Victory
