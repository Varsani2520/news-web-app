"use client";
import { getCategoryNews } from "@/app/service/getCategory";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Container,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
// pages/category/[category].js`
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addToFavouriteItem } from "@/app/action/action";
import slugify from "slugify";
import Link from "next/link";
import Head from "next/head";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";

const CategoryPage = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState([]);
  const dispatch = useDispatch();
  function fav(item) {
    dispatch(addToFavouriteItem(item));
    toast.success("Added to wishlist  successfully");
  }
  const isOnline = navigator.onLine;

  async function fetchCategoryNews() {
    // if online then get data from api
    if (isOnline) {
      try {
        const cardsData = await getCategoryNews(category);
        console.log("res", cardsData);
        setCard(cardsData.articles.results);
        // store the data in firestore so we got it when user is offline
        if (cardsData.articles.results) {
          try {
            await Promise.all(
              cardsData.articles.results.map(async (article) => {
                await addDoc(collection(db, "category"), article);
              })
            );
            console.log("cat added to Firestore");
          } catch (error) {
            console.log("error in store db", error);
          }
        }
        // disable skeleton
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    // if user is offline, then getting data from Firestore
    else {
      const querySnapshot = await getDocs(collection(db, "category"));
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
    fetchCategoryNews();
  }, []);
  const handleCardClick = (card) => {
    localStorage.setItem("clickedCard", JSON.stringify(card));
  };
  return (
    <Container maxWidth="xl" sx={{ mt: { xs: "25%", md: "15%", lg: "10%" } }}>
      <Toaster />
      <Typography variant="h2">{category}</Typography>{" "}
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
          : card.map((card) => (
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
                    sx={{ background: "#ff2800" }}
                  />
                  <Link href={`/category/${category}/${slugify(card.title)}`}>
                    <CardMedia
                      component="img"
                      image={card.image ? card.image : "/News-logo.jpg"}
                      alt={card.alt}
                      sx={{ cursor: "pointer", objectFit: "cover" }}
                      onClick={() => handleCardClick(card)}
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
                        onClick={() => fav(card)}
                        inputProps={{ "aria-label": "Favorite" }}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite color="secondary" />}
                      />
                    </IconButton>
                  </CardActions>
                </Card>
                <br />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default CategoryPage;
