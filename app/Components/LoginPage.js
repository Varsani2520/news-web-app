"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Box, Grid } from "@mui/material";

import Link from "next/link";
import {  UserAuth } from "../context/AuthContext";
import Lottie from "lottie-react";
import loginAnimation from "../lottie-animation/loginAnimation.json";
const LoginPage = () => {
  const { user, googleSignIn } = UserAuth();
  
  console.log(user);
  const [loading, setLoading] = React.useState(true);
  const handleSignIn = async () => {
    try {
      await googleSignIn();
      
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
    <>
      <Box sx={{ mt: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Lottie animationData={loginAnimation} height={50} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <form>
              <h2>Login</h2>
              <TextField
                label="Username"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: "1rem", fontSize: "1.2rem" }}
              >
                Login
              </Button>
              dont have account?
              <Link href="/pages/signup">Sign up</Link>
            </form>
            {loading ? null : !user ? (
              <Button variant="contained" onClick={handleSignIn}>
                Login with google
              </Button>
            ) : (
              <div></div>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginPage;
