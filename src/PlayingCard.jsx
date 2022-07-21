import React from 'react';
import Box from '@mui/material/Box';
import './PlayingCard.css';

const PlayingCard = ({ card }) => {

  return (
    <Box data-testid="PlayingCard" sx={{ display: 'inline-block', width: 200 }}>
      <img className="PlayingCard-image" src={card} />
    </Box>
  )
}

export default PlayingCard 