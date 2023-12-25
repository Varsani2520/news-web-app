"use client";
import { getCategoryNews } from "@/app/service/getCategory";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
// pages/category/[category].js
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const router = useRouter();
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const result = await getCategoryNews(category);
        setCardsData(result.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category news:", error);
      }
    };

    if (category) {
      fetchCategoryNews();
    }
  }, [category]);
  const handleCardClick = (card) => {
    localStorage.setItem("clickedCard", JSON.stringify(card));

    router.push(`/category/${category}/${encodeURIComponent(card.title)}`);
  };
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Box>
                  <Card sx={{ maxWidth: 345 }}>
                    <Skeleton
                      variant="rectangular"
                      height={194}
                      animation="wave"
                    />
                    <CardContent>
                      <Skeleton animation="wave" />
                    </CardContent>
                  </Card>
                  <br />
                </Box>
              </Grid>
            ))
          : cardsData.map((card) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={card.id}>
                <Card
                  sx={{
                    maxWidth: "100%",
                    transition: "transform 0.3s ease-in-out",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardHeader
                    title={card.title}
                    sx={{ background: "#d4d5ee" }}
                  />
                  <CardMedia
                    component="img"
                    image={card.urlToImage ? card.urlToImage : "/News-logo.jpg"}
                    alt={card.alt}
                    sx={{ cursor: "pointer", objectFit: "cover" }}
                    onClick={() => handleCardClick(card)}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
                <br />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default CategoryPage;
