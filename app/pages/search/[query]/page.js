"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const SearchPage = () => {
  const router = useRouter();
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        // No search query provided
        return;
      }

      const apiKey = "69f2b0c4d53e40099e654bc7119426ac";
      const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log("Search Results:", data.articles);
        setSearchResults(data.articles);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <Container maxWidth="xl" sx={{ mt: { xs: "25%", md: "15%", lg: "10%" } }}>
      <h1>Search Results for: {query}</h1>
      <Grid container spacing={3}>
        {searchResults.map((result, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardHeader title={result.title} sx={{ background: "orange" }} />
              {result.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={result.image}
                  alt={result.title}
                />
              )}
              <TextField
                label="Description"
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                readOnly
                value={result.description}
              />
              <Typography>Source: {result.source.name}</Typography>
              <p>
                URL:{" "}
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  {result.url}
                </a>
              </p>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchPage;
