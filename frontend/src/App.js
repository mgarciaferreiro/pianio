import './App.css'
import Lobby from './Lobby'
import Home from './Home'
import Game from './Game'
import { connect, registerCallbacks } from './networking';
import socketClient from 'socket.io-client';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  )
}

export default App
