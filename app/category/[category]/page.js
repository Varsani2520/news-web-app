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
import Cookies from "js-cookie";
import SkeletonCard from "@/app/Components/SkeletonCard";
import CardSaple from "@/app/Components/CardSaple";

const CategoryPage = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState([]);
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
  const isOnline = navigator.onLine;

  async function fetchCategoryNews() {
    // if online then get data from api
    if (isOnline) {
      try {
        const cardsData = await getCategoryNews(category);
        console.log("res", cardsData);
        setCard(cardsData.articles.results);
        // disable skeleton
        setLoading(false);
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
          ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard />)
          : card.map((card) => (
              <CardSaple
                key={card.id}
                title={card.title}
                image={card.image}
                alt={card.alt}
                onClick={() => handleCardClick(card)}
                onFavoriteClick={() => fav(card)}
                href={`/category/${category}/${slugify(card.title)}`}
              />
            ))}
      </Grid>
    </Container>
  );
};

export default CategoryPage;
