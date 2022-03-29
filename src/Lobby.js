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
    /**<div>

      <br />
      <div className="flex-container">
        {gameState != null ? Object.keys(gameState.players).map((player, i) => 
          <div key={player} className={"player1"}>
            <img className="waitingGif" src={gifs[gameState.players[player].character]} alt="waiting" />
            <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>
              {player}
        </h3>*/
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
            <Link to='/'>
            <button className="startGame" onClick={() => clickedLeaveLobby(name)}>Leave Lobby</button>
              </Link>  
              


          </div>
        )}
  
        {
          Object.keys(gameState.players).map((player, i) => {
            console.log(player, i)
            console.log(gameState.players)

            if (i + 1 < Object.keys(gameState.players).length && i % 2 === 0) {
              return (
                <div className="flex-container">
                  <div className="player1" style={{ visibility: 'visible' }}>
                    <img className="waitingGif" src={gifs[gameState.players[player].character]} alt="waiting" />
                    <h3
                      className="playerCount"
                      style={{ fontFamily: 'Abril Fatface' }}
                    >
                      {player}
                    </h3>
                  </div>
                  <div className="player2" style={{ visibility: 'visible' }}>
                    <img className="waitingGif" src={gifs[gameState.players[Object.keys(gameState.players)[i+1]].character]} alt="waiting" />
                    <h3
                      className="playerCount"
                      style={{ fontFamily: 'Abril Fatface' }}
                    >
                      {Object.keys(gameState.players)[i+1]}
                    </h3>
                  </div>
                </div>
              )
            } else if (i  === Object.keys(gameState.players).length -1 && i % 2 === 0) {
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