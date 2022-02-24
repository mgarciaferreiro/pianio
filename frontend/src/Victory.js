import './App.css'
import React, { useState, useEffect } from 'react'
import WebFont from 'webfontloader'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import waitingGif from './waiting.gif'


function Victory(props) {
    const [createRoom, setCreateRoom] = useState(false);
    useEffect(() => {
      WebFont.load({
        google: {
          families: ['Abril Fatface', 'GFS Didot', 'Antic Didone'],
        },
      })
    }, [])

    const roomCreation = () => {
      setCreateRoom(!createRoom)
    }

    return (
      <div className ="app">
        <p className="victoryTitle" style={{ fontFamily: 'Abril Fatface' }}>
        You Finished 1st
      </p>
      <img className="victoryGif" src={waitingGif} alt="waiting" />

      <p className="subtitle" style={{ fontFamily: 'Abril Fatface' }}>
        with {props.time}s
      </p>
      <ol>
        <li>Andri: {props.time}s</li>
        <br />
        <li>Bob: 52.9s</li>
        <br />
        <li>Alice: 60.5s</li>
      </ol>
      <br />
      <div className ="App">
          <Link to="/lobby">
            <button className="join" onClick={() => roomCreation()}>
              Create a Room
            </button>
          </Link>
          <Link to="/lobby">
            <button className="join">Join a Room</button>
          </Link>
        </div>
      </div>
    )
  }
  
  export default Victory