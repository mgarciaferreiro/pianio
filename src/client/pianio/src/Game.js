import './App.css'
import WebFont from 'webfontloader'
import React, { useState, useEffect } from 'react'

// TODO: get song from server, get number of keys based on difficulty
const numKeys = 6
const letters = ['D', 'F', 'G', 'H', 'J', 'K']
const song = Array.from({length: 40}, () => Math.floor(Math.random() * numKeys));
const getBoardAtPosition = (pos) => {
    const newBoard = Array(3).fill().map(() => Array(numKeys).fill(0));
    for (let i = 0; i < 3; i++) {
        let blackTileIndex = song[pos + i]
        newBoard[i][blackTileIndex] = 1
    }
    return newBoard
}

function Game() {
    const [position, setPosition] = useState(0)
    const [hasWon, setHasWon] = useState(false)
    const [hasLost, setHasLost] = useState(false)
    const [board, setBoard] = useState(getBoardAtPosition(0))

    const handleKeyPress = (event) => {
        console.log(event.key)
        const tilePressed = letters.indexOf(event.key.toUpperCase())
        if (tilePressed === -1) return

        const correctTile = song[position]
        if (tilePressed === correctTile) {
            if (position === song.length) {
                setHasWon(true)
            } else {
                setBoard(getBoardAtPosition(position + 1))
            }
            setPosition(position + 1)
        } else {
            setHasLost(true)
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress, false)
    })
  
    return (
      <div className="piano">
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
    )
  }
  
  export default Game