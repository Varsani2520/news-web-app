// CardComponent.js
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { IconButton, Checkbox, CardActions, Grid } from "@mui/material";
import Link from "next/link";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const CardSaple = ({ title, image, alt, onClick, onFavoriteClick, href,key }) => {
  return (
    <Grid item xs={12} sm={6} md={6} lg={4} key={key}>
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
          <CardHeader title={title} sx={{ background: "#ff2800" }} />

          <Link href={href}>
            <CardMedia
              component="img"
              image={image || "/News-logo.jpg"}
              alt={alt}
              sx={{ cursor: "pointer", objectFit: "cover" }}
              onClick={onClick}
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
                onClick={onFavoriteClick}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite color="secondary" />}
              />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};

export default CardSaple;
