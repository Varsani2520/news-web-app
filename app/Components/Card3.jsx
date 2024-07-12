import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const Card3 = ({ image, title, description }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row',  boxShadow: 3, cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' }, marginBottom: '10px', }}>
      <CardMedia
        component="img"
        height="150"
        image={image}
        alt={title}
        style={{ objectFit: 'cover', width: '150px' }}    />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Box>
  );
};

Card3.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card3;
