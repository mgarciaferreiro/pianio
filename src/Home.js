import logo from './logo.svg'
import './App.css'
import WebFont from 'webfontloader'
import React, { useState, useEffect } from 'react'
import Constants from './shared/constants'
import { createGame, joinGame, joinRandomGame, getLeaderboard } from './networking'
import { socket } from './App'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Session from 'react-session-api'
import Dropdown from './Dropdown'

function Home({ name, setName, leaderboard }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [clickedJoin, setClickedJoin] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  // const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [cookies, setCookie] = useCookies(['user'])
  const [difficulty, setDifficulty] = useState(Constants.MEDIUM)

  const [joiningRoom, setJoiningRoom] = useState(false)
  const [lobbyCode, setLobbyCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const filter = require('leo-profanity')

  const handleCookies = () => {
    setCookie('Name', name, { path: '/' })
  }

  const checkName = () => {
    console.log(filter.check(name))
    if (name === '') {
      setErrorMessage("Name can't be empty!")
    } else if (filter.check(name)) {
      setErrorMessage('Please keep your name appropriate!')
    } else {
      setErrorMessage('')
      setLoggedIn(!loggedIn)
      handleCookies()
      Session.set('Name', name)
    }
  }

  const toggleJoiningRoom = () => {
    setJoiningRoom(!joiningRoom)
    setLoggedIn(!loggedIn)
    setErrorMessage('')
  }

  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard)
    setLoggedIn(!loggedIn)
    setErrorMessage('')
  }

  const joinRoom = () => {
    console.log(lobbyCode)
    if (lobbyCode.length !== 4) {
      setErrorMessage('Lobby code must be 4 characters')
    } else {
      joinGame(name, lobbyCode)
    }
  }

  useEffect(() => {
    console.log(Session.get('Name'))
    setName(cookies.Name)
    getLeaderboard()

    socket.on(Constants.MSG_TYPES.JOIN_GAME_FAILURE, e => {
      console.log(e)
      setErrorMessage(e)
    })
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
      {!loggedIn && !joiningRoom && !showLeaderboard && (
        <div>
          <form onSubmit={() => checkName()}>
            <input
              placeholder="Nickname"
              value={name}
              className="addName"
              onChange={e => {
                setName(e.target.value)
              }}
            ></input>
            <button className="play" onClick={() => checkName()}>
              Play
            </button>
          </form>
        </div>
      )}

      {loggedIn && (
        <div>
          <Dropdown
            title="Create Game"
            options={[
              { label: 'Easy', value: Constants.EASY },
              { label: 'Medium', value: Constants.MEDIUM },
              { label: 'Hard', value: Constants.HARD },
            ]}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            onClick={() => createGame(name, difficulty)}
          />
          <button className="join" onClick={() => toggleJoiningRoom()}>
            Find a Room
          </button>
          <br />
          <br />
          <button
            className="toggleLeaderboard"
            onClick={() => toggleLeaderboard()}
          >
            Leaderboard
          </button>
        </div>
      )}

      {showLeaderboard && (
        <div className="leaderboardDiv">
          <p className="leaderboardTitle">Top Scorers</p>
          {Object.keys(leaderboard).map((item, i) => 
            <p className="leaderboardItem" key={i}>
              <strong>{leaderboard[i][0]}:</strong> {leaderboard[i][1]}s
            </p>
            )}
          <button
            className="backButton"
            style={{ marginTop: '5%' }}
            onClick={() => toggleLeaderboard()}
          >
            Back
          </button>
        </div>
      )}

      {joiningRoom && (
        <div>
          <input
            placeholder="4 Character Lobby Code"
            className="addName"
            onChange={e => {
              setLobbyCode(e.target.value.toUpperCase())
            }}
          ></input>
          <button className="joinRoom" onClick={() => joinRoom()}>
            Join Room
          </button>
          <Dropdown
            title="Random Room"
            options={[
              { label: 'Easy', value: Constants.EASY },
              { label: 'Medium', value: Constants.MEDIUM },
              { label: 'Hard', value: Constants.HARD },
            ]}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            onClick={() => joinRandomGame(name, difficulty)}
          />
          {/* <button className="joinRoom" onClick={() => joinRandomGame(name)}>
            Random Room
          </button> */}
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
