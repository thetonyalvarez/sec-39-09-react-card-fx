import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

const PlayingCard = (props) => {
  return (
    <img className="PlayingCard-image" src={props.image}/>
  )
}

export default PlayingCard