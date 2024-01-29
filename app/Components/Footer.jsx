import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer style={{ background: "red", padding: "20px" }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* First Group: News App Logo, Subscribe, Social Media Icons */}
          <Grid
            item
            xs={12}
            sm={6}
            style={{ display: "flex", alignItems: "center" }}
          >
            {/* Subscribe Text Field */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* News App Logo */}
              <img
                src="/News-logo.jpg"
                alt="News App Logo"
                style={{
                  width: "30%",
                  marginRight: "10px",
                  marginBottom: "5%",
                }}
              />
              <TextField
                id="subscribe"
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                        }}
                      >
                        Subscribe
                      </Button>
                    </InputAdornment>
                  ),
                }}
                sx={{ backgroundColor: "white", marginBottom: "10px" }}
              />

              {/* Social Media Icons */}
              <div
                style={{ display: "flex", marginLeft: "10px", color: "white" }}
              >
                <IconButton color="inherit" href="https://www.facebook.com">
                  <Facebook />
                </IconButton>
                <IconButton color="inherit" href="https://www.twitter.com">
                  <Twitter />
                </IconButton>
                <IconButton color="inherit" href="https://www.linkedin.com">
                  <LinkedIn />
                </IconButton>
              </div>
            </div>
          </Grid>

          {/* Second Group: Categories */}
          <Grid item xs={12} sm={6}>
            {/* Categories Header */}
            <Typography variant="h6" color="white" gutterBottom>
              Categories
            </Typography>

            {/* Big Underline */}
            <div
              style={{ borderBottom: "2px solid white", marginBottom: "10px" }}
            ></div>

            {/* News Categories */}
            <Grid container spacing={2}>
              {/* Left Section */}
              <Grid item xs={12} sm={4}>
                <Link
                  href="/pages/search/business"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: "20%",
                    }}
                  >
                    Business
                  </Typography>
                </Link>
                <Link
                  href="/pages/search/sport"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: "20%",
                    }}
                  >
                    Sports
                  </Typography>
                </Link>
                <Link
                  href="/pages/search/education"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: "20%",
                    }}
                  >
                    Education
                  </Typography>
                </Link>
                <Link
                  href="/pages/search/career"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: "20%",
                    }}
                  >
                    Career
                  </Typography>
                </Link>
                {/* Add more categories as needed */}
              </Grid>

              {/* Middle Section */}
              <Grid item xs={12} sm={4}>
                <Link
                  href="/pages/search/fun"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: "20%",
                    }}
                  >
                    Fun
                  </Typography>
                </Link>
                <Link
                  href="/pages/search/bollywood"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: "20%",
                    }}
                  >
                    bollywood
                  </Typography>
                </Link>
                <Link
                  href="/pages/search/hollywood"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: "20%",
                    }}
                  >
                    hollywood
                  </Typography>
                </Link>
                <Link
                  href="/pages/search/movies"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: "20%",
                    }}
                  >
                    Movies
                  </Typography>
                </Link>
                {/* Add more categories as needed */}
              </Grid>

              {/* Right Section */}
              <Grid item xs={12} sm={4}>
                <Link
                  href="/pages/search/politics"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: "20%",
                    }}
                  >
                    Politics
                  </Typography>
                </Link>
                <Link
                  href="/pages/search/family"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: "20%",
                    }}
                  >
                    Family
                  </Typography>
                </Link>
                <Link
                  href="/pages/search/social"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: "20%",
                    }}
                  >
                    social
                  </Typography>
                </Link>
                <Link
                  href="/pages/search/Health"
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: "20%",
                    }}
                  >
                    Health
                  </Typography>
                </Link>
                {/* Add more categories as needed */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
