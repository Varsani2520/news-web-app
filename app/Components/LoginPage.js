"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Box, Grid } from "@mui/material";

import Link from "next/link";
import { UserAuth, handleSignIn } from "../context/AuthContext";
import Lottie from "lottie-react";
import loginAnimation from "../lottie-animation/loginAnimation.json";
import { loginUser } from "../action/action";
import { useDispatch, useSelector } from "react-redux";
const LoginPage = () => {
  const user = useSelector((state) => state.user.user && state.user.user.isAuthenticated);


  console.log(user);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
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
              <Button
                variant="contained"
                onClick={() => handleSignIn({ dispatch })}
              >
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
