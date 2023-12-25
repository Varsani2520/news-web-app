"use client";
import {
  Container,
  Typography,
  Link,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [selectedCardData, setSelectedCardData] = useState(null);

  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem("selectedCardData");

    // Check if data exists
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("Data from local storage:", parsedData);

      // Set the data to the state
      setSelectedCardData(parsedData);
    }
  }, []);

  return (
    <Container maxWidth="xl" sx={{ marginTop: "20px" }}>
      {selectedCardData && (
        <Card sx={{ maxWidth: 1000, margin: "auto" }}>
          <CardMedia
            component="img"
            alt={selectedCardData.title}
            sx={{ height: "100%", width: "100%", objectfit: "cover" }}
            image={selectedCardData.urlToImage || "/default-image.jpg"}
          />
          <CardContent>
            <Typography variant="h4">{selectedCardData.title}</Typography>
            <Typography variant="h6">
              Author: {selectedCardData.author}
            </Typography>
            <Typography variant="body1">
              Content: {selectedCardData.content}
            </Typography>
            <Typography variant="body2">
              Published At: {selectedCardData.publishedAt}
            </Typography>
            <Typography variant="body1">
              {selectedCardData.description}
            </Typography>
            <Link
              href={selectedCardData.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </Link>
            {/* Add more information as needed */}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Page;
