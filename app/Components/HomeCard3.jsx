"use client";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { addToFavouriteItem, favourite } from "../action/action";
import {
  Button,
  CardActions,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { getPopularity } from "../service/getPopularity";
import toast, { Toaster } from "react-hot-toast";
import slugify from "slugify";
import Link from "next/link";
import { QuerySnapshot, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Cookies from "js-cookie";
import SkeletonCard from "./SkeletonCard";
import CardSaple from "./CardSaple";

const HomeCard3 = () => {
  const [card, setCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const isOnline = navigator.onLine;
  const user = Cookies.get("login")?.value === "true";
  const router = useRouter();
  const dispatch = useDispatch();
  async function fetchCards() {
    // if online then get data from api
    if (isOnline) {
      try {
        const card = await getPopularity();
        // store the data in firestore so we got it when user is offline
        if (card.articles) {
          try {
            await Promise.all(
              card.articles.map(async (article) => {
                await addDoc(collection(db, "popular"), article);
              })
            );
            console.log("popular added to Firestore");
          } catch (error) {
            console.log("error in store db", error);
          }
        }
        setCard(card.articles.results);
        // disable skeleton
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    // if user is offline, then getting data from Firestore
    else {
      const querySnapshot = await getDocs(collection(db, "popular"));
      const newCards = [];
      QuerySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        newCards.push(doc.data());
      });
      setCard(newCards);
      setLoading(false);
    }
  }
  function fav(item) {
    if (user) {
      dispatch(addToFavouriteItem(item));
      toast.success("Added to wishlist  successfully");
    } else {
      toast.error("Please log in first to like articles");
    }
  }
  const handleViewMore = () => {
    router.push("/top-trending");
    setShowAll(true);
  };
  useEffect(() => {
    fetchCards();
  }, []);
  const handleCardClick = (response) => {
    localStorage.setItem("clickedCard", JSON.stringify(response));
  };
  return (
    <>
      <Container maxWidth="xl">
        <Toaster />
        <Box sx={{ display: "flex" }}>
          <Grid container spacing={2}>
            {loading
              ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index+20}/>)
              : card
                  .slice(0, 12)
                  .map((response) => (
                    <CardSaple
                      key={response.uri}
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
        {!showAll && (
          <Button variant="contained" onClick={handleViewMore}>
            View More Trending
          </Button>
        )}
      </Container>
    </>
  );
};

export default HomeCard3;
