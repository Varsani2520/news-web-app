"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { UserAuth } from "../context/AuthContext";

const LogOutPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { user, logOut } = UserAuth();

  console.log(user);
  const [loading, setLoading] = React.useState(true);
  const handleSignOut = async () => {
    try {
      await logOut();
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
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="50vh"
      >
        <Typography variant="h4" mb={3}>
          Welcome to Your App
        </Typography>
        <Button onClick={handleOpen} variant="contained" color="primary">
          Logout
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Are you sure to log out of your account?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Logging out will end your current session.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {loading ? null : user ? (
              <Button onClick={handleSignOut} color="primary">
                OK
              </Button>
            ) : (
              <></>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default LogOutPage;
