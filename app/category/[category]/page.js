'use client';
import { Box, Container, Grid, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addToFavouriteItem } from "@/app/action/action";
import slugify from "slugify";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import SkeletonCard from "@/app/Components/SkeletonCard";
import CardSaple from "@/app/Components/CardSaple";
import { getQuery } from "@/app/service/getQuery";
import Divider1 from "@/app/Components/Divider1";

const CategoryPage = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.isAuthenticated);
  const isOnline = navigator.onLine;

  const fav = (item) => {
    if (user) {
      dispatch(addToFavouriteItem(item));
      toast.success("Added to wishlist successfully");
    } else {
      toast.error("Please log in first to like articles");
    }
  };

  const fetchCategoryNews = async () => {
    if (isOnline) {
      try {
        const cardsData = await getQuery({ q: category });
        if (
          cardsData &&
          Array.isArray(cardsData.docs)
        ) {
          setCard(cardsData.docs); // Set articles directly if it's an array
          setLoading(false);
          if (cardsData.docs.length > 0) {
            try {
              await Promise.all(
                cardsData.docs.map(async (article) => {
                  await addDoc(collection(db, "category"), article);
                })
              );
            } catch (error) {
              console.log("Error storing data in Firestore", error);
            }
          }
        } else {
          console.error("Error: Invalid response structure from getQuery");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching category news:", error);
        setLoading(false);
      }
    } else {
      const querySnapshot = await getDocs(collection(db, "category"));
      const newCards = [];
      querySnapshot.forEach((doc) => {
        newCards.push(doc.data());
      });
      setCard(newCards);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryNews();
  }, [category]);

  const handleCardClick = (card) => {
    localStorage.setItem("clickedCard", JSON.stringify(card));
  };

  return (
    <Container maxWidth="xl">
      <Toaster />
      <Divider1 title={category} />
      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <SkeletonCard />
              </Grid>
            ))
          : card.map((cat) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={cat.id}>
                <CardSaple
                  title={cat.headline.main}
                  image={
                    cat.multimedia && cat.multimedia.length > 0
                      ? `https://www.nytimes.com/${cat.multimedia[0].url}`
                      : "/News-logo.jpg"
                  }
                  alt={cat.headline.main}
                  onClick={() => handleCardClick(cat)}
                  onFavoriteClick={() => fav(cat)}
                  href={`/category/${category}/${slugify(cat.headline?.main || "default-title")}`}
                />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default CategoryPage;
