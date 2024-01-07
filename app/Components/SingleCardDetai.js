import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function SingleCardDetai({
  alt,
  image,
  title,
  Published,
  body,
  href,
}) {
  return (
    <Card sx={{ maxWidth: 1000, margin: "auto" }}>
      <CardMedia
        component="img"
        alt={alt}
        sx={{ height: "100%", width: "100%", objectfit: "cover" }}
        image={image || "/default-image.jpg"}
      />
      <CardContent>
        <Typography variant="h4">title:{title}</Typography>

        <Typography variant="h6">Published At: {Published}</Typography>
        <Typography variant="body1">Description:{body}</Typography>
        <Link href={href} target="_blank" rel="noopener noreferrer">
          Read More
        </Link>
        {/* Add more information as needed */}
      </CardContent>
    </Card>
  );
}
