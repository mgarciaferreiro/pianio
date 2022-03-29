import logo from './logo.svg'
import './App.css'
import WebFont from 'webfontloader'
import Lobby from './Lobby'
import React, { useState, useEffect } from 'react'
import Constants from './shared/constants';
import { createGame, joinGame } from './networking';
import { socket } from './App'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function Home({name, setName}) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [clickedJoin, setClickedJoin] = useState(false)
  const [gameId, setGameId] = useState('')
  
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
      joinGame(name, lobbyCode)
      setErrorMessage("")
    }
  }

  useEffect(() => {
    socket.on(Constants.MSG_TYPES.JOIN_GAME_RESPONSE, res => {
      console.log("IN SOCKET ENDPT CLIENT JOIN")
      if (res.status == 'success') {
        console.log('client join success')
        
      } else {
        console.log('client join fail')
      }
    });
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
            <button className="join" onClick={() => createGame(name)}>
              Create a Room
            </button>
          {/* TODO: change hardcoded game ID, and combine joinGame and toggleJoiningRoom */}

          {/* <Link to="/lobby"> */}
            <button className="join" onClick={() => toggleJoiningRoom()}>Find a Room</button>
          {/* </Link> */}
           {/*<Link to="/lobby">
             <button className="join" onClick={() => joinGame(name, '123')}>
               Join a Room
             </button>
      </Link>*/}
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
              Join Random Room
            </button>
          </Link>
      </div>
      )}

      <p className="error">{errorMessage}</p>
    </div>
  )
}

export default Home
