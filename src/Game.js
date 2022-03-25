import './App.css'
import React, { useState, useEffect } from 'react'
import Victory from './Victory.js'
import { sendUpdate } from './networking'
import Constants from './shared/constants';

const numKeys = 6
const letters = ['D', 'F', 'G', 'H', 'J', 'K']

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
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(true);
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
        console.log(event.key)
        const tilePressed = letters.indexOf(event.key.toUpperCase())
        if (tilePressed === -1) return

        const correctTile = song[position]
        if (tilePressed === correctTile) {
          playNote()
            if (position === song.length-1) {
                setHasWon(true)
                setIsActive(false)
            } else {
                setBoard(getBoardAtPosition(song, position + 1))
            }
            sendUpdate(name, position + 1, gameState.gameId)
            setPosition(position + 1)
        } else {
            setHasLost(true)
        }
    }

    // plays a random key
    function playNote() {
      const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
      const randomNote = notes[Math.floor(Math.random() * notes.length)]
      const noteAudio = document.getElementById(randomNote)
      noteAudio.currentTime = 0
      noteAudio.play()
        .then(() => {
          // audio is playing
        })
        .catch(error => {
          console.log(error);
        });
    }
    
    useEffect(() => {
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
            {getSongArray(song).map((row, i) => (
              <div key={i}>
              <div className="row">
                { row.map((col, j) => (
                  <div key={j}
                  className={position === i ? "tile-small tile-red" : 
                  (col ? "tile-small tile-black" : "tile-small tile-white") }>
                  </div>
                ))}
              </div>
              {/* TODO: update progress board */}
              </div>
            ))}
          </div>
          <audio id="C" src="http://www.vibrationdata.com/piano_middle_C.mp3"></audio>
          <audio id="Db" src="http://www.vibrationdata.com/piano_C_sharp.mp3"></audio>
          <audio id="D" src="http://www.vibrationdata.com/piano_D.mp3"></audio>
          <audio id="Eb" src="http://www.vibrationdata.com/piano_D_sharp.mp3"></audio>
          <audio id="E" src="http://www.vibrationdata.com/piano_E.mp3"></audio>
          <audio id="F" src="http://www.vibrationdata.com/piano_F.mp3"></audio>
          <audio id="Gb" src="http://www.vibrationdata.com/piano_F_sharp.mp3"></audio>
          <audio id="G" src="http://www.vibrationdata.com/piano_G.mp3"></audio>
          <audio id="Ab" src="http://www.vibrationdata.com/piano_G_sharp.mp3"></audio>
          <audio id="A" src="http://www.vibrationdata.com/piano_A.mp3"></audio>
          <audio id="Bb" src="http://www.vibrationdata.com/piano_A_sharp.mp3"></audio>
          <audio id="B" src="http://www.vibrationdata.com/piano_B.mp3"></audio>
        </div>
        }
      </div>
    )
}
  
  export default Game