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
import { Cookies, useCookies } from 'react-cookie';


import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'

const gifs = [minnie, mickey, donald, goofy, tom, berlioz]

function Lobby({gameState, name}) {
  const [cookies, setCookie] = useCookies(['user']);

  
  let navigate = useNavigate();
  useEffect(() => {
    if(cookies.Name === undefined) {
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
{
        <div>
        <br />
        <p className="lobbyName" style={{ fontFamily: 'Abril Fatface' }}>
          Lobby {gameState.gameId}
        </p>
        {gameState.host === name && (
          <Link to="/game">
            <button className="startGame">Start Game</button>
          </Link>
        )}
  
        {gameState.host !== name && (
          <div>
            <h3>Waiting for {gameState.host} to start the game</h3>
            <Link to="/">
              <button className="startGame">Leave Lobby</button>
            </Link>
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
                    <img className="waitingGif" src={gifs[i]} alt="waiting" />
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