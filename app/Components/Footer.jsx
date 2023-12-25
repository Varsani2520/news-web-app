import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <footer style={{ background: 'hotpink', padding: '20px' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Left Section: About */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              About
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ color: 'white', fontWeight: 'bold', padding: '5px' }}>
              <Link href="/pages/contact" color="inherit">
                Contact Us
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ color: 'white', fontWeight: 'bold', padding: '5px' }}>
              <Link href="/pages/about" color="inherit">
                About Us
              </Link>
            </Typography>
          </Grid>

          {/* Center Section: Address */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Mail Us
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ color: 'white', fontWeight: 'bold', padding: '5px' }}>
              Bhuj,Gujarat,ABC area, 370030
            </Typography>
          </Grid>

          {/* Right Section: Social */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Social
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ color: 'white', fontWeight: 'bold', padding: '5px' }}>
              <Link href="https://www.facebook.com" color="inherit">
                Facebook
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ color: 'white', fontWeight: 'bold', padding: '5px' }}>
              <Link href="https://www.twitter.com" color="inherit">
                Twitter
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ color: 'white', fontWeight: 'bold', padding: '5px' }}>
              <Link href="https://www.linkedin.com" color="inherit">
                LinkedIn
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;