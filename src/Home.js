import logo from './logo.svg'
import './App.css'
import WebFont from 'webfontloader'
import Lobby from './Lobby'
import React, { useState, useEffect } from 'react'
import Constants from './shared/constants';
import { createGame, joinGame } from './networking';
import { socket } from './App'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function Home() {
  const [name, setName] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [clickedJoin, setClickedJoin] = useState(false)
  const [gameId, setGameId] = useState('')
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

  const clickJoin = () => {
    console.log('clicked join, game id')

    if (gameId === '') {
      setErrorMessage('GameId cannot be empty!')
    }

    joinGame(name, gameId)
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
      {!loggedIn && (
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
          
          <button className="join" onClick={() => clickJoin()}>
            Join a Game
          </button>
          <input
            placeholder="Game ID"
            className="joinGame"
            onChange={e => {
              setGameId(e.target.value)
            }}
          ></input>

        </div>
      )}

      <p className="error">{errorMessage}</p>
    </div>
  )
}

export default Home
