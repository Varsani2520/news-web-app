import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const SingleCardDetail = ({ title, image, alt, published, body, href }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: "800px", width: "100%", position: "relative" }}>
        <CardMedia
          component="img"
          image={image || "/News-logo.jpg"}
          alt={alt || "News Image"}
          sx={{ height: "100%", objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Published: {new Date(published).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" paragraph>
            {body}
          </Typography>
          <MuiLink href={href} target="_blank" rel="noopener">
            Read Full Article
          </MuiLink>
        </CardContent>
        <IconButton
          aria-label="add to favorites"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "white",
            "&:hover": { backgroundColor: "white" },
          }}
        >
          <FavoriteIcon color="secondary" />
        </IconButton>
      </Card>
    </Box>
  );
};

export default SingleCardDetail;
