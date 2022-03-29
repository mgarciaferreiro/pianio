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
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from 'react-cookie';

const gifs = [minnie, mickey, donald, goofy, tom, berlioz]

// function Lobby({gameState}) {
function Lobby({}) {
  const [gameState, setGameState] = useState({
    players: [
      { name: 'Bandri', picture: 'minnie' },
      { name: 'Xavier', picture: 'mickey' },
      { name: 'Marta', picture: 'donald' },
      { name: 'A', picture: '' },
      { name: 'B', picture: 'goofy' },
    ],
  })
  const [cookies, setCookie] = useCookies(['user']);

  const [name, setName] = useState(cookies.Name)

  let navigate = useNavigate();

  useEffect(() => {
    console.log(cookies.Name)
    if(name === undefined) {
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
      <br />
      <p className="lobbyName" style={{ fontFamily: 'Abril Fatface' }}>
        Lobby 68fj
      </p>
      {gameState.players[0].name === name && (
        <Link to="/game">
          <button className="startGame">Start Game</button>
        </Link>
      )}

      {gameState.players[0].name !== name && (
        <div>
          <h3>Waiting for {gameState.players[0].name} to start the game</h3>
          <Link to="/">
            <button className="startGame">Leave Lobby</button>
          </Link>
        </div>
      )}

      {gameState != null &&
        Object.keys(gameState.players).map((player, i) => {
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
          } else if (i === gameState.players.length - 1 && i % 2 === 0) {
            return (
              <div className="flex-container">
                <div className="player1" style={{ visibility: player.joined }}>
                  <img className="waitingGif" src={gifs[i]} alt="waiting" />
                  <h3
                    className="playerCount"
                    style={{ fontFamily: 'Abril Fatface' }}
                  >
                    {gameState.players[i].name}
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
  )
}

export default Lobby
