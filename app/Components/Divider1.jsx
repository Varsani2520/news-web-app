import React from 'react';
import { Stack, Typography } from '@mui/material';

const Divider1 = ({ title }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: '#f44336', 
        color: '#ffffff', 
        padding: '10px 20px', 
        marginY: '6%', 
        borderRadius: '4px', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
      }}
    >
      <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
    </Stack>
  );
};

export default Divider1;
