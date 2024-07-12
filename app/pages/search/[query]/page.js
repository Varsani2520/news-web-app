"use client"
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography, Skeleton } from "@mui/material";
import { getQuery } from "@/app/service/getQuery";

const SearchPage = () => {
  const router = useRouter();
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        // No search query provided
        return;
      }
      try {
        const response = await getQuery(query);

        console.log("Search Results:", response.docs);
        setSearchResults(response.docs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <Container maxWidth="xl" sx={{ mt: { xs: "25%", md: "15%", lg: "10%" } }}>
      <h1>Search Results for: {query}</h1>
      <Grid container spacing={3}>
        {loading
          ? // Skeleton Loading
            Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Skeleton variant="rectangular" height={180} />
                  <CardHeader title={<Skeleton />} />
                  <Skeleton
                    variant="text"
                    height={20}
                    width="80%"
                    sx={{ margin: "auto" }}
                  />
                  <Skeleton
                    variant="text"
                    height={20}
                    width="50%"
                    sx={{ margin: "auto" }}
                  />
                </Card>
              </Grid>
            ))
          : // Actual Search Results
            searchResults.map((result, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardHeader
                    title={result.title}
                    sx={{ background: "orange", textAlign: "center" }}
                  />
                  {result.image && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={result.image}
                      alt={result.title}
                      sx={{ objectFit: "cover" }}
                    />
                  )}

                  <Typography
                    variant="body2"
                    sx={{ paddingTop: "10%", textAlign: "center" }}
                  >
                    {result.date}
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    URL:{" "}
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {result.url}
                    </a>
                  </Typography>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default SearchPage;
