import React, { useState, useEffect, useRef } from 'react'
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

  const timerID = useRef();

  let [count, setCount] = useState(null)
  let [playingCards, setPlayingCards] = useState([])
  let [disable, setDisable] = useState(false);
  let [timer, setTimer] = useState(false);
  let [btnText, setBtnText] = useState(`Start Drawing Cards`);

  useEffect(function fetchCardWhenMounted() {

    if (timer) {

      timerID.current = setInterval(() => {
        console.log("EFFECT RAN!")
  
        async function fetchCard() {
          const response = await axios.get(BASE_API + `${deck_id}/draw/?count=1`)
          let { error, cards, remaining } = response.data
      
          if (error) {
            setDisable(true)
          } else {
            setCount(remaining)
            setBtnText(`STOP`)
            setPlayingCards(prevCards => [...prevCards, <PlayingCard key={cards[0].code} card={cards[0].image}/>])
          }
        }
  
        fetchCard();
      }, 1000)
  
      return function cleanUpClearTimer() {
        console.log("Unmount ID", timerID.current);
        setBtnText(`Start Drawing Cards`);
        clearInterval(timerID.current);
      }

    }
    
  
  }, [timer])

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
            <Button
              data-testid="deal-btn"
              color="secondary"
              variant="contained"
              onClick={() => setTimer(prevBool => !prevBool)}
              disabled={disable}
            >
              {btnText}
            </Button>
          </Box>
          <Box
            data-testid="cards" 
            sx={{ display: 'inline' }}
          >
            {playingCards}
          </Box>
        </Container>
      </main>
    </div>
  )
}

export default App
