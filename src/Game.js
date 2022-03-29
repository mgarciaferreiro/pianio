import './App.css'
import React, { useState, useEffect } from 'react'
import Victory from './Victory.js'
import Player from './Player.js'
import useSound from 'use-sound'
import A from './notes/A.mp3'
import As from './notes/As.mp3'
import B from './notes/B.mp3'
import C from './notes/C.mp3'
import Cs from './notes/Cs.mp3'
import D from './notes/D.mp3'
import Ds from './notes/Ds.mp3'
import E from './notes/E.mp3'
import F from './notes/F.mp3'
import Fs from './notes/Fs.mp3'
import G from './notes/G.mp3'
import Gs from './notes/Gs.mp3'
// import A_Note from './Notes/piano-a_A_major.mp3'
// import B_Note from './Notes/piano-b_B_major.mp3'
// import C_Note from './Notes/piano-c_C_major.mp3'
// import D_Note from './Notes/piano-d_D_major.mp3'
// import E_Note from './Notes/piano-e_E_major.mp3'
// import F_Note from './Notes/piano-f_F_major.mp3'
// import G_Note from './Notes/piano-g_G_major.mp3'

import { sendUpdate } from './networking'
import Constants from './shared/constants'
import { useNavigate } from 'react-router-dom'
import Session from 'react-session-api'

const numKeys = 6
const letters = ['D', 'F', 'G', 'H', 'J', 'K']

const randomSong = Object.keys(Constants.SONGS)[Math.floor(Math.random() * Object.keys(Constants.SONGS).length)]
const randomSongArray = Constants.SONGS[randomSong]
var songPos = 0

const getSongArray = song => {
  const songArray = Array(Constants.SONG_LENGTH).fill().map(() => Array(numKeys).fill(0))
  for (let i = 0; i < Constants.SONG_LENGTH; i++) {
    let blackTileIndex = song[i]
    songArray[i][blackTileIndex] = 1
  }
  return songArray
}

const getBoardAtPosition = (song, pos) => {
    const newBoard = Array(3).fill().map(() => Array(numKeys).fill(0));
    for (let i = 0; i < 3; i++) {
        let blackTileIndex = song[pos + i]
        newBoard[i][blackTileIndex] = 1
    }
    return newBoard
}

function Game({gameState, song, name}) {
    // console.log(song)
    const [position, setPosition] = useState(0)
    const [hasWon, setHasWon] = useState(false)
    const [hasLost, setHasLost] = useState(false)
    const [board, setBoard] = useState(getBoardAtPosition(song, 0))
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(true)
    // console.log(board)
    
    useEffect(() => {
      // Start timer
      let interval = null;
      if (isActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 100);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, seconds]);
  
    const handleKeyPress = (event) => {
        const tilePressed = letters.indexOf(event.key.toUpperCase())
        if (tilePressed === -1) return
        const correctTile = song[position]
        if (tilePressed === correctTile) {
          // playRandomNote()
          playSong(songPos)
          songPos = songPos + 1
            if (position === song.length-1) {
                setHasWon(true)
                setIsActive(false)
            } else {
                setBoard(getBoardAtPosition(song, position + 1))
            }
            sendUpdate(name, position + 1, gameState.gameId)
            setPosition(position + 1)
        } else {
            setSeconds(seconds+10)
            setHasLost(true)
        }
    }

    const notes = ['A', 'As', 'B', 'C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs']
    const [play_A] = useSound(A);
    const [play_As] = useSound(As);
    const [play_B] = useSound(B);
    const [play_C] = useSound(C);
    const [play_Cs] = useSound(Cs);
    const [play_D] = useSound(D);
    const [play_Ds] = useSound(Ds);
    const [play_E] = useSound(E);
    const [play_F] = useSound(F);
    const [play_Fs] = useSound(Fs);
    const [play_G] = useSound(G);
    const [play_Gs] = useSound(Gs);

    function playSong(songPos) {
      const currNote = randomSongArray[songPos]
      console.log(currNote + " is the current note")
      if(currNote === 'A') {
        play_A()
      } else if(currNote === 'As') {
          play_As()
      } else if(currNote === 'B') {
        play_B()
      } else if(currNote === 'C') {
        play_C()
      } else if(currNote === 'Cs') {
        play_Cs()
      } else if(currNote === 'D') {
        play_D()
      } else if(currNote === 'Ds') {
        play_Ds()
      } else if(currNote === 'E') {
        play_E()
      } else if(currNote === 'F') {
        play_F()
      } else if(currNote === 'Fs') {
        play_Fs()
      } else if(currNote === 'G') {
        play_G()
      } else if(currNote === 'Gs') {
        play_Gs()
      } 
      console.log(songPos)
      songPos = songPos + 1
      console.log(songPos)
    }

    function playRandomNote() {
      const randomNote = notes[Math.floor(Math.random() * notes.length)]
      if(randomNote === 'A') {
        play_A()
      } else if(randomNote === 'As') {
          play_As()
      } else if(randomNote === 'B') {
        play_B()
      } else if(randomNote === 'C') {
        play_C()
      } else if(randomNote === 'Cs') {
        play_Cs()
      } else if(randomNote === 'D') {
        play_D()
      } else if(randomNote === 'Ds') {
        play_Ds()
      } else if(randomNote === 'E') {
        play_E()
      } else if(randomNote === 'F') {
        play_F()
      } else if(randomNote === 'Fs') {
        play_Fs()
      } else if(randomNote === 'G') {
        play_G()
      } else if(randomNote === 'Gs') {
        play_Gs()
      } 
    }
    let navigate = useNavigate();

    useEffect(() => {
      if(Session.get("Name") === undefined) {
        navigate('/')
      }
        document.addEventListener("keydown", handleKeyPress)
        return () => {
          document.removeEventListener("keydown", handleKeyPress)
        }
    }, [handleKeyPress])
    return (
      <div>
        {hasWon && <Victory time = {Number(seconds / 10).toFixed(1)} />}
        {!hasWon &&
        <div className="flex-container">
          <div className="piano">
          <p className="timer">{Number(seconds / 10).toFixed(1)}s</p>
            {board.map((row, i) => (
              <div key={i} className="row">
                { row.map((col, j) => (
                  <div key={j}
                  className={col ? "tile tile-black" : "tile tile-white" }>
                      {i === 0 ? letters[j] : ''}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="progress-board">
            <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>START</h3>
            {getSongArray(song).map((row, i) => (
              <div key={i} >
                <div className="row">
                  { row.map((col, j) => (
                    <div key={j}
                    className={col ? "tile-small tile-black" : "tile-small tile-white"}>
                    </div>
                  ))}
                  {position === i ? 
                  <Player className="player" player={gameState.players[name]}></Player> : null}
                  { Object.keys(gameState.players).map((player, j) => (
                    gameState.players[player].position === i && player !== name ?
                    <Player className="player" player={gameState.players[player]}></Player> : null
                  ))}
                </div>
              </div>
            ))}
            <h3 className="playerCount" style={{ fontFamily: 'Abril Fatface' }}>END</h3>
          </div>
        </div>
        }
      </div>
    )
}
  
  export default Game