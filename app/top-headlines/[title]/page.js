"use client";
import SingleCardDetai from "@/app/Components/SingleCardDetai";
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
    <Container maxWidth="xl" sx={{ mt: { xs: "25%", md: "15%", lg: "10%" } }}>
      {selectedCardData && (
        <SingleCardDetai
          alt={selectedCardData.alt}
          image={selectedCardData.image}
          title={selectedCardData.title}
          Published={selectedCardData.date}
          body={selectedCardData.body}
          href={selectedCardData.url}
        />
      )}
    </Container>
  );
};

export default Page;
