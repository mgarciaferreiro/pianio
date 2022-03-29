import logo from './logo.svg'
import './App.css'
import WebFont from 'webfontloader'
import React, { useState, useEffect } from 'react'
import waitingGif from './waiting.gif'
import waitingGif2 from './waiting2.gif'
import waitingGif3 from './waiting3.gif'
import waitingGif4 from './waiting4.gif'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function Lobby() {
  const [roomCode, setRoomCode] = useState('Room1')
  const [name, setName] = useState('Andri')
  const [players, setPlayers] = useState([
    { name: 'Bandri', picture: 'waitingGif' },
    { name: 'Xavier', picture: 'waitingGif2' },
    { name: 'Marta', picture: 'waitingGi3' },
    { name: 'A', picture: '' },
    { name: 'B', picture: 'waitingGif' },
    // {"name" : "C", "picture" : "waitingGif2", "joined" : "none"},
    // {"name" : "D", "picture" : "waitingGi3", "joined" : "none"},
    // {"name" : "", "picture" : "", "joined" : "none"},
  ])

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Abril Fatface', 'GFS Didot', 'Antic Didone'],
      },
    })
  }, [])
  // Taking in: room code, number of users
  //
  return (
    <div>
      <br />
      <p className="lobbyName" style={{ fontFamily: 'Abril Fatface' }}>
        Lobby 68fjcu381s
      </p>      {players[0].name === name && (
        <Link to="/game">
          <button className="startGame">Start Game</button>
        </Link>
      )}

      {players[0].name !== name && (
        <div>
        <h3>Waiting for {players[0].name} to start the game</h3>
        <Link to="/">
          <button className="startGame">Leave Lobby</button>
        </Link>
        </div>
      )}

      {players.map((player, i) => {
        console.log(i)
        console.log(player)
        if (i + 1 < players.length && i % 2 === 0) {
          return (
            <div className="flex-container">
              <div className="player1" style={{ visibility: 'visible' }}>
                <img className="waitingGif" src={waitingGif3} alt="waiting" />
                <h3
                  className="playerCount"
                  style={{ fontFamily: 'Abril Fatface' }}
                >
                  {player.name}
                </h3>
              </div>
              <div className="player2" style={{ visibility: 'visible' }}>
                <img className="waitingGif" src={waitingGif4} alt="waiting" />
                <h3
                  className="playerCount"
                  style={{ fontFamily: 'Abril Fatface' }}
                >
                  {players[i + 1].name}
                </h3>
              </div>
            </div>
          )
        } else if (i === players.length - 1 && i % 2 === 0) {
          return (
            <div className="flex-container">
              <div className="player1" style={{ visibility: player.joined }}>
                <img className="waitingGif" src={waitingGif3} alt="waiting" />
                <h3
                  className="playerCount"
                  style={{ fontFamily: 'Abril Fatface' }}
                >
                  {player.name}
                </h3>
              </div>
              <div className="player2" style={{ visibility: 'hidden' }}>
                <img className="waitingGif" src={waitingGif4} alt="waiting" />
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Lobby
