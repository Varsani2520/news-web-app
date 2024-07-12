'use client';

import React, { useEffect, useState } from "react";
import { Container, Grid, Box, CardHeader, CardContent, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import SkeletonCard from "./SkeletonCard";
import { getQuery } from "../service/getQuery";

const categoryDescriptions = {
  business: "Stay updated with the latest financial markets and business trends.",
  sports: "Catch up on all sports news and events.",
  technology: "Discover the latest advancements in technology.",
  entertainment: "Find out what's happening in the world of entertainment.",
  general: "Get the latest general news from around the world.",
  science: "Explore news and discoveries in the field of science.",
  health: "Stay informed about health news and medical breakthroughs."
};

const HomeCard2 = ({ categories }) => {
  const [loading, setLoading] = useState(true);
  const [cardsData, setCardsData] = useState({});
  const router = useRouter();

  const fetchCards = async () => {
    try {
      const data = {};
      await Promise.all(
        categories.map(async (category) => {
          const result = await getQuery({ q: category });
          console.log(`Result for category ${category}:`, result);
          data[category] = result;
        })
      );
      setCardsData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [categories]);

  const handleNavigate = (category) => {
    setLoading(true); // Show loading state while navigating
    setTimeout(() => {
      router.push(`/category/${category}`); // Navigate to category page
    }, 1000); // Example: Delay before navigation
  };

  return (
    <Container maxWidth="xl" sx={{ background: "#eceff2", padding: 2 }}>
      <Grid container spacing={2}>
        {loading ? (
          // Display skeleton cards while loading
          Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <SkeletonCard />
            </Grid>
          ))
        ) : (
          // Display category cards when data is loaded
          categories.slice(0, 4).map((category) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={category}>
              <Box sx={{ background: 'white', padding: 2, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
               
                <CardContent onClick={() => handleNavigate(category)}>
                <Typography variant="body1" color="text.secondary">
                    {category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {categoryDescriptions[category]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    {cardsData[category]?.[0]?.snippet || ""}
                  </Typography>
                
                </CardContent>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default HomeCard2;
