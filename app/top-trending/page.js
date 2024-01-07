"use client";
// Your main page component
import React, { useEffect, useState } from "react";
import { Container, Box, Grid } from "@mui/material";
import SkeletonCard from "../Components/SkeletonCard";
import { getPopularity } from "../service/getPopularity";
import slugify from "slugify";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import CardSaple from "../Components/CardSaple";

const Page = () => {
  const [card, setCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = Cookies.get("login")?.value === "true";

  function fav(item) {
    if (user) {
      dispatch(addToFavouriteItem(item));
      toast.success("Added to wishlist successfully");
    } else {
      toast.error("Please log in first to like articles");
    }
  }

  async function fetchCards() {
    const result = await getPopularity();
    setCard(result.articles.results);
    setLoading(false);
  }

  const handleCardClick = (response) => {
    localStorage.setItem("clickedCard", JSON.stringify(response));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: { xs: "25%", md: "15%", lg: "10%" } }}>
      <Toaster />
      <Box sx={{ display: "flex" }}>
        <Grid container spacing={2}>
          {loading
            ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard />)
            : card.map((response) => (
                <CardSaple
                  key={response.id}
                  title={response.title}
                  image={response.image}
                  alt={response.alt}
                  onClick={() => handleCardClick(response)}
                  onFavoriteClick={() => fav(response)}
                  href={`/top-trending/${slugify(response.title)}`}
                />
              ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Page;
