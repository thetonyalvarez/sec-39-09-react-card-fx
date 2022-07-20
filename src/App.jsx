import { useState } from 'react'
import logo from './assets/blackjack.png'
import Button from '@mui/material/Button';
import PlayingCard from './PlayingCard'
import './App.css'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={logo} alt="Blackjack!" />
      </header>
      <main className="App-main">
        <Button color="secondary" variant="contained" href="/">
          Deal New Hand
        </Button>
        <PlayingCard/>
      </main>
    </div>
  )
}

export default App
