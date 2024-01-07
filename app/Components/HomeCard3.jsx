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
import Skeleton from "@mui/material/Skeleton";
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
const HomeCard3 = () => {
  const [card, setCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const isOnline = navigator.onLine;

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
    dispatch(addToFavouriteItem(item));
    toast.success("Added to wishlist  successfully");
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
              ? Array.from({ length: 8 }).map((_, index) => (
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
              : card.slice(0, 12).map((response) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={response.id}>
                    <Box>
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
                          title={response.title}
                          sx={{ background: "#ff2800" }}
                        />
                        <Link href={`/top-trending/${slugify(response.title)}`}>
                          <CardMedia
                            component="img"
                            image={
                              response.image ? response.image : "/News-logo.jpg"
                            }
                            alt={response.alt}
                            sx={{ cursor: "pointer", objectFit: "cover" }}
                            onClick={() => handleCardClick(response)}
                          />
                        </Link>
                        <CardActions disableSpacing>
                          <IconButton
                            aria-label="add to favorites"
                            sx={{
                              transition: "transform 0.3s ease-in-out",
                              "&:hover": {
                                transform: "scale(1.2)",
                              },
                            }}
                          >
                            <Checkbox
                              inputProps={{ "aria-label": "Favorite" }}
                              onClick={() => fav(response)}
                              icon={<FavoriteBorder />}
                              checkedIcon={<Favorite color="secondary" />}
                            />
                          </IconButton>
                        </CardActions>
                      </Card>
                      <br />
                    </Box>
                  </Grid>
                ))}
          </Grid>
        </Box>
        {!showAll && (
          <Button variant="outlined" onClick={handleViewMore}>
            View More Trending
          </Button>
        )}
      </Container>
    </>
  );
};

export default HomeCard3;
