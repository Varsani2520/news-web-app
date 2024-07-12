import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const CardSaple = ({ title, image, alt, onClick, onFavoriteClick, href }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Link href={href}>
        <CardMedia
          component="img"
          image={image}
          alt={alt}
          sx={{ cursor: "pointer", objectFit: "cover", height: 200 }}
          onClick={onClick}
        />
      </Link>
      <CardContent>
        <Typography variant="subtitle1" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions sx={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton
          aria-label="add to favorites"
          onClick={onFavoriteClick}
          sx={{
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.2)",
            },
          }}
        >
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite color="error" />}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CardSaple;
