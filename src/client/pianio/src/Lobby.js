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
  const [playerCount, setPlayerCount] = useState(1)
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
        <div className="player1">
          <img className="waitingGif" src={waitingGif} alt="waiting" />
          <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>
            Andri
          </h3>
        </div>

        <div className="player2">
          <img className="waitingGif" src={waitingGif2} alt="waiting" />
          <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>
            Amy
          </h3>
        </div>
      </div>

      <div className="flex-container">
        <div className="player1">
          <img className="waitingGif" src={waitingGif3} alt="waiting" />
          <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>
            Xavier
          </h3>
        </div>
        <div className="player2">
          <img className="waitingGif" src={waitingGif4} alt="waiting" />
          <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>
            Marta
          </h3>
        </div>
      </div>
      {/* <div className='flex-container'> 
            <div className='player1'>
                  <img className='waitingGif' src={waitingGif3} alt='waiting' />
                  <h3 className = 'playerCount' style={{ fontFamily: 'Abril Fatface' }}>Xavier</h3>
                </div>
                <div className='player2'>
                  <img className='waitingGif' src={waitingGif4} alt='waiting' />
                  <h3 className = 'playerCount' style={{ fontFamily: 'Abril Fatface' }}>Marta</h3>
                </div>
          </div> */}
      <Link to="/game">
        <button className="startGame">Start Game</button>
      </Link>
    </div>
  )
}

export default Lobby
