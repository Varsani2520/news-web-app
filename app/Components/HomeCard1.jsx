"use client";
// Import necessary modules
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import {
  CardActions,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Skeleton from "@mui/material/Skeleton";
import { getHeadlines } from "../service/getHeadlines";
import { useDispatch, useSelector } from "react-redux";
import { addToFavouriteItem } from "../action/action";
import toast, { Toaster } from "react-hot-toast";
import slugify from "slugify";
import Link from "next/link";
import { db } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";
import SkeletonCard from "./SkeletonCard";
import CardSaple from "./CardSaple";

const HomeCard1 = (request) => {
  const [card, setCard] = useState([]);
  const [loading, setLoading] = useState(true);
  // to check whether user is online or not
  const dispatch = useDispatch();
  const user = Cookies.get("login")?.value === "true";
  function fav(item) {
    if (user) {
      dispatch(addToFavouriteItem(item));
      toast.success("Added to wishlist  successfully");
    } else {
      toast.error("Please log in first to like articles");
    }
  }
  const handleCardClick = (response) => {
    localStorage.setItem("selectedCardData", JSON.stringify(response));
  };
  // to check whether user is online or not
  const isOnline = navigator.onLine;

  async function fetchCards() {
    // if online then get data from api
    if (isOnline) {
      try {
        const card = await getHeadlines();
        // store the data in firestore so we got it when user is offline
        if (card.articles) {
          try {
            await Promise.all(
              card.articles.map(async (article) => {
                await addDoc(collection(db, "headlines"), article);
              })
            );
            console.log("headlines added to Firestore");
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
      const querySnapshot = await getDocs(collection(db, "headlines"));
      const newCards = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        newCards.push(doc.data());
      });
      setCard(newCards);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <Container maxWidth="xl">
      <Toaster />
      <Box sx={{ display: "flex" }}>
        <Grid container spacing={2}>
          {loading
            ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard />)
            : card
                .slice(0, 12)
                .map((response) => (
                  <CardSaple
                    key={response.id}
                    title={response.title}
                    image={response.image}
                    alt={response.alt}
                    onClick={() => handleCardClick(response)}
                    onFavoriteClick={() => fav(response)}
                    href={`/top-headlines/${slugify(response.title)}`}
                  />
                ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomeCard1;
