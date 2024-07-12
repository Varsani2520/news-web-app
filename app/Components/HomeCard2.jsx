import React, { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Card2 from "./Card2"; // Import Card2 component
import SkeletonCard from "./SkeletonCard";
import { getQuery } from "../service/getQuery";

const HomeCard2 = ({ categories }) => {
  const [loading, setLoading] = useState(true);
  const [cardsData, setCardsData] = useState({});
  const router = useRouter();

  const fetchCards = async () => {
    try {
      const data = {};
      await Promise.all(
        categories.map(async (category) => {
          const result = await getQuery({ q: category }); // Adjust getQuery function call according to your API
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

  const handleCardClick = (category) => {
    setLoading(true); // Show loading state while navigating
    setTimeout(() => {
      router.push(`/category/${category}`); // Navigate to category page
    }, 1000); // Example: Delay before navigation
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {loading ? (
          // Display skeleton cards while loading
          Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <SkeletonCard />
            </Grid>
          ))
        ) : (
          // Display category cards when data is loaded
          categories.map((category) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={category}>
              <Box>
                <Card2
                  image={
                    cardsData[category]?.[0]?.multimedia?.[0]?.url ||
                    "/News-logo.jpg"
                  }
                  title={`${category} News`}
                  description={cardsData[category]?.[0]?.snippet || ""}
                  onClick={() => handleCardClick(category)}
                  // Add any other props you need to pass to Card2
                />
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default HomeCard2;
