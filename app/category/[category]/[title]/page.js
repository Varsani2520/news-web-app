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
    <Container maxWidth="xl" sx={{ mt: "20px" }}>
      {parsedData && (
        <Card sx={{ maxWidth: 1000, margin: "auto" }}>
          <CardMedia
            component="img"
            alt={parsedData.title}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              position: "relative",
            }}
            image={parsedData.urlToImage || "/default-image.jpg"}
          >
            {/* Like icon in the top-right corner */}
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
          </CardMedia>
          <CardContent>
            <Typography variant="h4">{parsedData.title}</Typography>
            <Typography variant="h6">Author: {parsedData.author}</Typography>
            <Typography variant="body1">
              Content: {parsedData.content}
            </Typography>
            <Typography variant="body2">
              Published At: {parsedData.publishedAt}
            </Typography>
            <Typography variant="body1">{parsedData.description}</Typography>
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
