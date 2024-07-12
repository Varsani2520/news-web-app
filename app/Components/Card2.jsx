import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const Card2 = ({ image, title, description,height }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column',  cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' },marginBottom:'20%'}}>
      <CardMedia
        component="img"
        height={height}
        image={image}
        alt={title}
        style={{ objectFit: 'cover' }}
      />
      <CardContent sx={{padding:0}}>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Box>
  );
};

Card2.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card2;
