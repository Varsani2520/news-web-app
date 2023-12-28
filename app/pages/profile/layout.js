"use client";
import React from "react";
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout, removeAllFavouriteItem } from "@/app/action/action";
import toast, { Toaster } from "react-hot-toast";

const layout = ({ children }) => {
  const autenticated = useSelector((state) => state.user.isAuthenticated);
  const user = autenticated ? useSelector((state) => state.user.user.url) : "";
  const name = autenticated ? useSelector((state) => state.user.user.name) : "";
  const email = autenticated
    ? useSelector((state) => state.user.user.email)
    : "";
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(logout());
      dispatch(removeAllFavouriteItem());
      toast.success("logout success");
      window.location.href("/");
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
  return (
    <Container maxWidth="xl">
      <Toaster />
      <Grid container justifyContent="center" spacing={4} sx={{ mt: "10%" }}>
        <Grid item md={4} xs={12}>
          <Card
            sx={{
              backgroundColor: "#f0f0f0",
              marginTop: 4,
              position: "relative",
              padding: 3,
              marginBottom: 2,
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              {loading ? null : user ? (
                <>
                  <Avatar
                    src={user}
                    alt="User Avatar"
                    sx={{ width: 120, height: 120, marginBottom: 2 }}
                    type="file"
                  />
                  <Typography variant="h6" sx={{ fontSize: 20, color: "#333" }}>
                    {name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: 16, color: "#666" }}
                  >
                    {email}
                  </Typography>
                </>
              ) : (
                <></>
              )}
              {loading ? null : user ? (
                <Button
                  variant="contained"
                  onClick={() => handleSignOut()}
                  color="primary"
                  sx={{
                    marginTop: 2,
                    "&:hover": { backgroundColor: "#0069d9" },
                  }}
                >
                  Logout
                </Button>
              ) : (
                <></>
              )}
            </Box>
          </Card>
          <Divider />
          <Card sx={{ background: "#f0f0f0", padding: 3 }}>
            <div style={linkStyle}>
              <Link href="/pages/profile/likes" passHref>
                <Button variant="outlined" color="primary">
                  WishList
                </Button>
              </Link>
            </div>
            <Divider />
            <div style={linkStyle}>
              <Link href="/pages/profile/notifications" passHref>
                <Button variant="outlined" color="primary">
                  Notification
                </Button>
              </Link>
            </div>
          </Card>
        </Grid>
        <Grid item md={8} xs={12}>
          <Card
            sx={{
              backgroundColor: "#f0f0f0",
              marginTop: 4,
              padding: 3,
            }}
          >
            {children}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const linkStyle = {
  color: "#0069d9",
  fontSize: 16,
  cursor: "pointer",
  justifyContent: "center", // Center the button text
  margin: "8px", // Apply margin
  padding: "8px", // Apply padding
  "&:hover": {
    textDecoration: "underline",
    backgroundColor: "#f9f9f9", // Apply hover effect
  },
};

export default layout;
