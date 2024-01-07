"use client";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { CardContent, Container, Grid, Skeleton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCategoryNews } from "../service/getCategory";
import SkeletonCard from "./SkeletonCard";

const HomeCard2 = ({ categories }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [cardsData, setCardsData] = useState({});

  const fetchCards = async () => {
    try {
      const data = {};
      await Promise.all(
        categories.map(async (category) => {
          const result = await getCategoryNews(category);
          data[category] = result.articles.results;
        })
      );
      console.log(data);
      setCardsData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category news:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchCards();
  }, [categories]);

  const handleCardClick = (category) => {
    setLoading(true); // Set loading to true before navigating

    // Simulate some delay before navigating to the dynamic page
    setTimeout(() => {
      router.push(`/category/${category}`);
    }, 1000); // Adjust the delay time as needed
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex" }}>
        <Grid container spacing={2}>
          {loading
            ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard />)
            : categories.map((category) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={category}>
                  <Box>
                    <Link href={`category/${category}`}>
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
                        onClick={() => handleCardClick(category)}
                      >
                        <CardHeader
                          title={`${category} News`}
                          sx={{ background: "#ff2800" }}
                        />
                        {cardsData[category] && cardsData[category][0] && (
                          <div key={cardsData[category][0].id}>
                            <CardMedia
                              component="img"
                              image={
                                cardsData[category][0].image
                                  ? cardsData[category][0].image
                                  : "/News-logo.jpg"
                              }
                              alt={cardsData[category][0].alt}
                              sx={{
                                cursor: "pointer",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        )}
                      </Card>
                      <br />
                    </Link>
                  </Box>
                </Grid>
              ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomeCard2;
