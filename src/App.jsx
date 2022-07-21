import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import logo from './assets/bicycle-logo.png'
import PlayingCard from './PlayingCard'
import './App.css'

// Cards API
const BASE_API = "https://deckofcardsapi.com/api/deck/";
const SHUFFLE_API = "new/shuffle/?deck_count=1"

// Returns deck id
const getNewDeck = async () => {
  const resp = await axios.get(BASE_API + SHUFFLE_API)
  return resp.data.deck_id
}

let deck_id = await getNewDeck()

function App() {

  const [count, setCount] = useState(52)
  const [cards, setCards] = useState([])
  const [isRemaining, setIsRemaining] = useState(`Cards left in deck: ${count}`)
  const [disable, setDisable] = useState(false);

  async function fetchCard() {
    const response = await axios.get(BASE_API + `${deck_id}/draw/?count=1`)
    let { error, cards, remaining } = response.data

    if (error) {
      setIsRemaining(error)
      setDisable(true)
    } else {
      setCards(prevCards => [...prevCards, <PlayingCard key={cards[0].code} card={cards[0].image}/>])
      setCount(remaining)
      setIsRemaining(`Cards left in deck: ${count}`)
    }
  }

  useEffect(function fetchCardWhenMounted() {
    console.log('i fire once');

    fetchCard();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={logo} alt="Blackjack!" />
      </header>
      <main className="App-main">
        <Container>
          <Box
            sx={{ my: 4 }}
          >
            <Button data-testid="deal-btn" color="secondary" variant="contained" onClick={fetchCard} disabled={disable}>
              Deal New Card
            </Button>
          </Box>
          <Box
            data-testid="isRemaining" 
            sx={{ my: 4 }}
          >
            {isRemaining}
          </Box>
          <Box
            data-testid="cards" 
            sx={{ display: 'inline' }}
          >
            {cards}
          </Box>
        </Container>
      </main>
    </div>
  )
}

export default App
