import { Box, Card, CardContent, Grid, Skeleton } from "@mui/material";
import React from "react";

export default function SkeletonCard() {
  return (
 
      <Box>
        <Card sx={{ maxWidth: 345 }}>
          <Skeleton variant="rectangular" height={194} animation="wave" />
          <CardContent>
            <Skeleton animation="wave" />
          </CardContent>
        </Card>
        <br />
      </Box>
  );
}
