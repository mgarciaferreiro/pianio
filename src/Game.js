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
import { sendUpdate } from './networking'
import Constants from './shared/constants'
import { useNavigate } from 'react-router-dom'
import Session from 'react-session-api'
import plus1 from './images/plus1.png'

const numKeys = 6
const letters = ['D', 'F', 'G', 'H', 'J', 'K']

const getSongArray = song => {
  const songArray = Array(song.length).fill().map(() => Array(numKeys).fill(0))
  for (let i = 0; i < song.length; i++) {
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
    const [timeColor, setTimeColor] = useState("black")
    const [display1, setDisplay1] = useState("none")

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
        const correctTile = song[position]

        if (tilePressed === correctTile) {
          setDisplay1("none")
          playNote()
          if (position === song.length-1) {
              setHasWon(true)
              setIsActive(false)
          } else {
              setBoard(getBoardAtPosition(song, position + 1))
          }
          sendUpdate(name, position + 1, gameState.gameId, seconds)
          setPosition(position + 1)
        } else {
            setDisplay1("")
            setSeconds(seconds+10)
            setTimeout(() => {setDisplay1('none')}, 200)
            // setHasLost(true)
        }
    }

    // const notes = ['A', 'As', 'B', 'C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs']
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

    function playNote() {
      // const randomNote = notes[Math.floor(Math.random() * notes.length)]
      const currNote = Constants.SONGS[gameState.songIndex][position]
      // console.log(currNote + " is the current note")
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
        <div className="flex-container">
          {/* <div style={{backgroundColor:"white"}} >
            <p style={{color:"red", fontSize:"100px", fontWeight: 'bold', }}>
              +1
            </p>
          </div> */}
          <div className="piano">
          <p className="timer" style={{color:timeColor}}>{Number(seconds / 10).toFixed(1)}s</p>
            <img src={plus1} style ={{display: display1}} className ="plusOne"alt="s"/>
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
          <div className="progressBoard">
            <h3 className="progressText" style={{ fontFamily: 'Abril Fatface' }}>START</h3>
            {getSongArray(song).map((row, i) => (
              <div key={i} >
                <div className="row">
                  {row.map((col, j) => (
                    <div key={j}
                    className={col ? "tile-small tile-black" : "tile-small tile-white"}>
                    </div>
                  ))}
                  {position === i && 

                  <Player className="player" player={gameState.players[name]}></Player>}
                  { Object.keys(gameState.players).map((player, j) => (
                    (gameState.players[player].position === i && player !== name) && 
                    <Player className="player" player={gameState.players[player]}></Player>
                  ))}
                </div>
              </div>
            ))}
            <h3 className="progressText" style={{ fontFamily: 'Abril Fatface' }}>END</h3>
          </div>
        </div>
    )
  }
  
  export default Game