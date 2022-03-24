import logo from './logo.svg'
import './App.css'
import WebFont from 'webfontloader'
import Lobby from './Lobby'
import React, { useState, useEffect } from 'react'
import { createGame, joinGame } from './networking';
import { setUsername } from './state';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function Home() {
  const [name, setName] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
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
      {!loggedIn && (
        <div>
          <input
            placeholder="Nickname"
            className="addName"
            onChange={e => {
              setName(e.target.value)
              setUsername(e.target.value)
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
          <Link to="/lobby">
            {/* TODO: change hardcoded game ID */}
            <button className="join" onClick={() => joinGame(name, '123')}>
              Join a Room
            </button>
          </Link>
        </div>
      )}

      <p className="error">{errorMessage}</p>
    </div>
  )
}

export default Home
