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

const gifs = {minnie, mickey, donald, goofy, tom, berlioz}

function Lobby({gameState}) {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Abril Fatface', 'GFS Didot', 'Antic Didone'],
      },
    })
  }, [])

  return (
    <div>
      <br />
      <div className="flex-container">
        {gameState != null ? Object.keys(gameState.players).map((player, i) => 
          <div key={player} className={"player1"}>
            <img className="waitingGif" src={gifs[gameState.players[player].character]} alt="waiting" />
            <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>
              {player}
            </h3>
          </div>
        ) : null}
        {/* <div className="player1">
          <img className="waitingGif" src={minnie} alt="waiting" />
          <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>
            Andri
          </h3>
        </div>

        <div className="player2">
          <img className="waitingGif" src={mickey} alt="waiting" />
          <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>
            Amy
          </h3>
        </div>
      </div>

      <div className="flex-container">
        <div className="player1">
          <img className="waitingGif" src={donald} alt="waiting" />
          <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>
            Xavier
          </h3>
        </div>
        <div className="player2">
          <img className="waitingGif" src={tom} alt="waiting" />
          <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>
            Marta
          </h3>
        </div> */}
      </div>
      <Link to="/game">
        <button className="startGame" onClick={() => console.log("Clicked start game")}>
          Start Game
        </button>
      </Link>
    </div>
  )
}

export default Lobby
