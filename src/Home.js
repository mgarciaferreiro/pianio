import logo from './logo.svg'
import './App.css'
import WebFont from 'webfontloader'
import Lobby from './Lobby'
import React, { useState, useEffect } from 'react'
import { createGame, joinGame } from './networking';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function Home({name, setName}) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [joiningRoom, setJoiningRoom] = useState(false)
  const [lobbyCode, setLobbyCode] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const filter = require('leo-profanity')

  const checkName = () => {
    console.log(filter.check(name))
    if (name === '') {
      setErrorMessage("Name can't be empty!")
    } else if (filter.check(name)) {
      setErrorMessage('Please keep your name appropriate!')
    } else {
      setErrorMessage('')
      setLoggedIn(!loggedIn)
    }
  }

  const toggleJoiningRoom = () => {
    setJoiningRoom(!joiningRoom)
    setLoggedIn(!loggedIn)
  }

  const joinRoom = () => {
    console.log(lobbyCode)
    if(lobbyCode.length !== 4) {
      setErrorMessage("Lobby code must be 4 characters")
    } else {
      setErrorMessage("")

    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Abril Fatface', 'GFS Didot', 'Antic Didone'],
      },
    })
    filter.loadDictionary()
  }, [])

  return (
    <div className="App">
      <p className="title" style={{ fontFamily: 'Abril Fatface' }}>
        peean.io
      </p>
      <p className="blurb">race to play piano tiles with your keyboard</p>
      {(!loggedIn && !joiningRoom)&& (
        <div>
          <input
            placeholder="Nickname"
            className="addName"
            onChange={e => {
              setName(e.target.value)
            }}
          ></input>
          <button className="play" onClick={() => checkName()}>
            Play
          </button>
        </div>
      )}

      {loggedIn && (
        <div>
          <Link to="/lobby">
            <button className="join" onClick={() => createGame(name)}>
              Create a Room
            </button>
          </Link>
          {/* TODO: change hardcoded game ID, and combine joinGame and toggleJoiningRoom */}
            <button className="join" onClick={() => toggleJoiningRoom()}>Find a Room</button>
           {/* <Link to="/lobby">
             <button className="join" onClick={() => joinGame(name, '123')}>
               Join a Room
             </button>
           </Link> */}
        </div>
      )}

{joiningRoom && (
        <div>
        <input
          placeholder="4 Character Lobby Code"
          className="addName"
          onChange={e => {
            setLobbyCode(e.target.value)
          }}
        ></input>
        <button className="joinRoom" onClick={() => joinRoom()}>
          Join Room
        </button>
        <Link to="/lobby">
            <button className="joinRoom" onClick={() => createGame(name)}>
              Random Room
            </button>
          </Link>
          <br />
          <button className="backButton" onClick={() => toggleJoiningRoom()}>
              Back
            </button>

      </div>
      )}

      <p className="error">{errorMessage}</p>
    </div>
  )
}

export default Home
