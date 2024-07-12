'use client';
import React, { useEffect, useState } from "react";
import { Container, Grid, Divider } from "@mui/material";
import SkeletonCard from "./SkeletonCard";
import Card2 from "./Card2";
import Card3 from "./Card3";
import { useDispatch, useSelector } from "react-redux";
import { addToFavouriteItem } from "../action/action";
import toast from "react-hot-toast";
import slugify from "slugify";
import { getQuery } from "../service/getQuery";

const HomeCard1 = () => {
  const [card, setCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await getQuery("sports");
        const articles = response.docs; // Ensure this matches your data structure
        setCard(articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching headlines:", error);
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  function fav(item) {
    if (user) {
      dispatch(addToFavouriteItem(item));
      toast.success("Added to wishlist successfully");
    } else {
      toast.error("Please log in first to like articles");
    }
  }

  const handleCardClick = (article) => {
    localStorage.setItem("selectedCardData", JSON.stringify(article));
  };

  return (
    <Container maxWidth="xl">
      {loading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      ) : (
        <Grid container spacing={2}>
          {/* Card2 */}
          <Grid item xs={12} md={4}>
            {card.slice(0, 1).map((article, index) => (
              <Card2
                key={index}
                image={
                  article.multimedia && article.multimedia.length > 0
                    ? `https://www.nytimes.com/${article.multimedia[0].url}`
                    : "/News-logo.jpg"
                }
                title={article.headline ? article.headline.main : ""}
                description={article.snippet ? article.snippet : ""}
                onClick={() => handleCardClick(article)}
                onFavoriteClick={() => fav(article)}
                href={`/top-headlines/${slugify(article.headline.main)}`}
              />
            ))}
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ marginX: '120px' }} variant="middle" />
          {/* Card3 */}
          <Grid item xs={12} md={6}>
            {card.slice(1, 4).map((article, index) => (
              <Card3
                key={index}
                image={
                  article.multimedia && article.multimedia.length > 0
                    ? `https://www.nytimes.com/${article.multimedia[0].url}`
                    : "/News-logo.jpg"
                }
                title={article.headline ? article.headline.main : ""}
                onClick={() => handleCardClick(article)}
                onFavoriteClick={() => fav(article)}
                href={`/top-headlines/${slugify(article.headline.main)}`}
              />
            ))}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default HomeCard1;
