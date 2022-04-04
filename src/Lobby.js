import logo from './logo.svg'
import './App.css'
import WebFont from 'webfontloader'
import React, { useState, useEffect } from 'react'
import minnie from './gifs/minnie.gif'
import mickey from './gifs/mickey.gif'
import donald from './gifs/donald.gif'
import goofy from './gifs/goofy.gif'
import tom from './gifs/tom.gif'
import berlioz from './gifs/berlioz.gif'
import { useNavigate } from "react-router-dom";
import Session from 'react-session-api'


import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { startGame, leaveLobby } from './networking'


const gifs = {minnie, mickey, donald, goofy, tom, berlioz}

function Lobby({gameState, name}) {
  let navigate = useNavigate()

  const clickedStartGame = () => {
    console.log(gameState.gameId)
    navigate('/Game')
    startGame(gameState.gameId)
  }

  const clickedLeaveLobby = () => {
    leaveLobby()
  }

  useEffect(() => {
    if(Session.get("Name") === undefined) {
      navigate('/')
    }
    WebFont.load({
      google: {
        families: ['Abril Fatface', 'GFS Didot', 'Antic Didone'],
      },
    })
  }, [])

  return (
<div>
{Session.get("Name") !== undefined &&
        <div>
        <br />
        <p className="lobbyName" style={{ fontFamily: 'Abril Fatface' }}>
          Lobby {gameState.gameId}
        </p>
        {gameState.host === name && (
          <button className="startGame" onClick={() => clickedStartGame()}>
            Start Game</button>
        )}
  
        {gameState.host !== name && (
          <div>
            <h3>Waiting for {gameState.host} to start the game</h3>
            <Link to='/'></Link>  
              <button className="startGame" onClick={() => clickedLeaveLobby(name)}>Leave Lobby</button>


          </div>
        )}
  
        {
          Object.keys(gameState.players).map((player, i) => {
            console.log(player, i)
            if (i + 1 < gameState.players.length && i % 2 === 0) {
              return (
                <div className="flex-container">
                  <div className="player1" style={{ visibility: 'visible' }}>
                    <img className="waitingGif" src={gifs[i]} alt="waiting" />
                    <h3
                      className="playerCount"
                      style={{ fontFamily: 'Abril Fatface' }}
                    >
                      {gameState.players[i].name}
                    </h3>
                  </div>
                  <div className="player2" style={{ visibility: 'visible' }}>
                    <img className="waitingGif" src={gifs[i + 1]} alt="waiting" />
                    <h3
                      className="playerCount"
                      style={{ fontFamily: 'Abril Fatface' }}
                    >
                      {gameState.players[i + 1].name}
                    </h3>
                  </div>
                </div>
              )
            } else {
              return (
                <div className="flex-container">
                  <div className="player1" style={{ visibility: player.joined }}>
                    <img className="waitingGif" src={gifs[gameState.players[player].character]} alt="waiting" />
                    <h3
                      className="playerCount"
                      style={{ fontFamily: 'Abril Fatface' }}
                    >
                      {player}
                    </h3>
                  </div>
                  <div className="player2" style={{ visibility: 'hidden' }}>
                    <img className="waitingGif" src={gifs[i]} alt="waiting" />
                  </div>
                </div>
              )
            }
          })}
      </div>


    } 
    </div>
    
  )
}

export default Lobby