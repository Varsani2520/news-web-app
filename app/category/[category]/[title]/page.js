"use client";
// pages/[category]/[title].js
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Link,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { category, title } = useParams();
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    const clickedCardData = localStorage.getItem("clickedCard");

    if (clickedCardData) {
      const parsedData = JSON.parse(clickedCardData);
      setParsedData(parsedData);
    }
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: { xs: "25%", md: "15%", lg: "10%" } }}>
      {parsedData && (
        <SingleCardDetai
          alt={parsedData.alt}
          image={parsedData.image}
          title={parsedData.title}
          Published={parsedData.date}
          body={parsedData.body}
          href={parsedData.url}
        />
      )}
    </Container>
  );
};

export default Page;
