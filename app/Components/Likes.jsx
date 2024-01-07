"use client"
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeToFavouriteItem } from "../action/action";
import toast from "react-hot-toast";

const Likes = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.isAuthenticated);
  const favourite = useSelector((state) => state.likes.likedItems);
  console.log(favourite);

  function rmv(item) {
    dispatch(removeToFavouriteItem(item));
    toast.success("remove item success");
  }

  return (
    <div>
      {favourite && favourite.length > 0 ? (
        <Grid container spacing={2}>
          {favourite.map((singleFav) => (
            <Grid item key={singleFav.title} xs={12} md={6}>
              {singleFav ? (
                <Card>
                  <CardMedia
                    component="img"
                    alt="Product Image"
                    height="140"
                    image={singleFav.image}
                  ></CardMedia>
                  <CardContent>
                    <Typography variant="h5">{singleFav.title}</Typography>

                    <Typography>Published at: {singleFav.date}</Typography>
                    <Button onClick={() => rmv(singleFav)}>Remove</Button>
                  </CardContent>
                </Card>
              ) : (
                <p>Invalid item</p>
              )}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">No items in the favorites</Typography>
      )}
    </div>
  );
};

export default Likes;
