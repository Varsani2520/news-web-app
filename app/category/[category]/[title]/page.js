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
        <Card sx={{ maxWidth: 1000, margin: "auto" }}>
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "red", // You can customize the color
              backgroundColor: "white", // Background color if needed
            }}
          >
            <FavoriteIcon />
          </IconButton>
          <CardMedia
            component="img"
            alt={parsedData.title}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              position: "relative",
            }}
            image={parsedData.image || "/default-image.jpg"}
          ></CardMedia>
          <CardContent>
            <Typography variant="h4">{parsedData.title}</Typography>
           
            
            <Typography variant="h6">
              Published At: {parsedData.date}
            </Typography>
            <Typography variant="body1">{parsedData.body}</Typography>
            <Link
              href={parsedData.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </Link>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Page;
