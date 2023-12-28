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

const CategoryPage = () => {
  const router = useRouter();
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [cardsData, setCardsData] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(
    (state) => state.user.user && state.user.user.isAuthenticated
  );
  function fav(item) {
    dispatch(addToFavouriteItem(item));
    toast.success("Added to wishlist  successfully");
  }
  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const result = await getCategoryNews(category);
        setCardsData(result.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category news:", error);
      }
    };

    if (category) {
      fetchCategoryNews();
    }
  }, [category]);
  const handleCardClick = (card) => {
    localStorage.setItem("clickedCard", JSON.stringify(card));

    router.push(`/category/${category}/${slugify(card.title)}`);
  };
  return (
    <Container maxWidth="xl" sx={{ mt: { xs: "25%", md: "15%", lg: "10%" } }}>
      <Toaster />
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
          : cardsData.map((card) => (
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
                  <CardMedia
                    component="img"
                    image={card.urlToImage ? card.urlToImage : "/News-logo.jpg"}
                    alt={card.alt}
                    sx={{ cursor: "pointer", objectFit: "cover" }}
                    onClick={() => handleCardClick(card)}
                  />
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
