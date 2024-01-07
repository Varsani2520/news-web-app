import { Box, Card, CardContent, Grid, Skeleton } from "@mui/material";
import React from "react";

export default function SkeletonCard() {
  return (
    <Grid  item xs={12} sm={6} md={4} lg={3}>
      <Box>
        <Card sx={{ maxWidth: 345 }}>
          <Skeleton variant="rectangular" height={194} animation="wave" />
          <CardContent>
            <Skeleton animation="wave" />
          </CardContent>
        </Card>
        <br />
      </Box>
    </Grid>
  );
}
