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
            {favourite == null ? (
                <p>No items in the favorites</p>
            ) : (
                <Grid container spacing={2}>
                    {
                        favourite.map((singleFav) => (
                            <Grid item key={singleFav.title} xs={12} md={6}>
                                {singleFav ? ( // Add a null check here
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            alt="Product Image"
                                            height="140"
                                            image={singleFav.urlToImage}
                                        >

                                        </CardMedia>
                                        <CardContent>
                                            <Typography variant="h5">{singleFav.title}</Typography>
                                            <Typography>Rating: {singleFav.rating}</Typography>
                                            <Typography>Price: {singleFav.price}</Typography>
                                            <Button onClick={() => rmv(singleFav)}>Remove</Button>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <p>Invalid item</p>
                                )}
                            </Grid>
                        ))}
                </Grid>
            )}
        </div>
    );
};

export default Likes;
