import { Stack, Typography } from '@mui/material'
import React from 'react'

const Divider1 = ({ title }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ paddingY: '5%' }}>
      <Typography gutterBottom variant="h3" component="div">
        {title}
      </Typography>
      <Typography gutterBottom variant="h6" component="div">
        View More
      </Typography>
    </Stack>
  )
}

export default Divider1
