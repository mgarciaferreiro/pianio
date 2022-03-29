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

const gifs = [minnie, mickey, donald, goofy, tom, berlioz]

function Lobby({gameState}) {
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
       <div className="flex-container">
//         {gameState != null ? Object.keys(gameState.players).map((player, i) => 
//           <div key={player} className={"player1"}>
//             <img className="waitingGif" src={gifs[i]} alt="waiting" />
//             <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>
//               {player}
//             </h3>
//           </div>
//         ) : null}
//         {/* <div className="player1">
//           <img className="waitingGif" src={minnie} alt="waiting" />
//           <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>
//             Andri
//           </h3>
//         </div>

//         <div className="player2">
//           <img className="waitingGif" src={mickey} alt="waiting" />
//           <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>
//             Amy
//           </h3>
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
