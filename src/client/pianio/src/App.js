import './App.css'
import Lobby from './Lobby'
import Home from './Home'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
      </Routes>
    </div>
  )
}

export default App
