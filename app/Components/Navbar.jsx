"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { handleSignIn } from "../context/AuthContext";
import { TextField } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import GoogleIcon from "@mui/icons-material/Google";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import PhoneOtp from "./PhoneOtp";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";
import toast, { Toaster } from "react-hot-toast";

const pages = [
  { label: "Home", href: "/" },
  { label: "Business", href: "/category/business" },
  { label: "Sports", href: "/category/sports" },
  { label: "Technology", href: "/category/technology" },
  { label: "Entertainments", href: "/category/entertainment" },
  { label: "Science", href: "/category/science" },
  { label: "General", href: "/category/general" },
  { label: "Health", href: "/category/health" },
  { label: "Trending", href: "/top-trending" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openSignUpModal, setOpenSignUpModal] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenSignUpModal = () => {
    setOpenSignUpModal(true);
  };

  const handleCloseSignUpModal = () => {
    setOpenSignUpModal(false);
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();
  const user = useSelector((state) => state.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userImage = user.isAuthenticated ? user.user.url : "";
  const [users, setUserDetails] = React.useState({
    name: "",
    email: "",
    password: "",
    url: "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg",
  });
  const [otpModel, setOtpModel] = React.useState(false);
  const [ph, setPh] = React.useState("");
  const [open, setOpen] = React.useState(false);

  async function onSignup({
    setLoading,
    onCaptchVerify,
    setOtpModel,
    setOpen,
    ph,
  }) {
    onCaptchVerify();

    const appVerifier =
      typeof window !== "undefined" ? window.recaptchaVerifier : null;

    const formatPh = "+" + ph;
    console.log("pghone", formatPh);

    // if appverifier is done -> send otp to particular number
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sended successfully!");
        setOpen(false);
        setLoading(false);

        setOtpModel(true);
      })
      .catch((error) => {
        console.log("error in sending otp", error);
      });
  }
  // when user verify capture
  async function onCaptchVerify() {
    const auth = getAuth();
    if (typeof window !== "undefined")
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              // callback function signUp that contain all other stuff like ph, setphone etc...
              onSignup({
                setLoading,
                onCaptchVerify,

                setOtpModel,
                setOpen,
                ph,
              });
            },
          }
        );
      }
  }

  // when user click sign up btn
  async function handleSubmit(e) {
    e.preventDefault();

    onSignup(
      setLoading,
      onCaptchVerify,

      setOtpModel,
      setOpen,
      ph
    );
  }
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      console.error("Search query is empty.");
      return;
    }

    // Check if the user is authenticated
    if (!isAuthenticated) {
      // If not authenticated, show a toast message and return
      toast.error("Please log in to perform a search");
      return;
    }

    console.log("Search Query:", searchQuery);
    router.push(`/pages/search/${searchQuery}`);
    const apiKey = "50c06e8227e6493ca95655b769a50faf";
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log("News Data:", data);

      router.push({
        pathname: "/pages/search", // Change 'search' to the desired path for displaying search results
        query: { q: searchQuery }, // Pass the search query as a parameter
      });
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(255, 255, 255, 0.8)",
        color: "black",
        zIndex: 1000,
      }}
    >
      <Toaster />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <img src="/News-logo.jpg" style={{ height: '100px', width: '170px' }} /> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <div className="" id="recaptcha-containe"></div>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link href={page.href} style={{ textDecoration: "none" }}>
                    <Typography textAlign="center" sx={{ cursor: "pointer" }}>
                      {page.label}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <img
            src="/News-logo.jpg"
            style={{ height: "100px", width: "170px" }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                href={page.href}
                style={{ textDecoration: "none" }}
                key={page.label}
              >
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>
          {/* searchbar */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              marginLeft: "auto",
              marginRight: 2,
            }}
          >
            <TextField
              variant="outlined"
              size="large"
              placeholder="Search for news..."
              InputProps={{
                endAdornment: (
                  <IconButton
                    size="small"
                    color="primary"
                    aria-label="search"
                    onClick={handleSearch}
                  >
                    🔍
                  </IconButton>
                ),
              }}
              onChange={handleSearchInputChange}
              onKeyDown={(eveent) => {
                if (event.key == "Enter") {
                  handleSearch();
                }
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {!isAuthenticated ? (
              <>
                <Button
                  component="a"
                  variant="contained"
                  sx={{ marginRight: 2 }}
                  onClick={handleOpenSignUpModal}
                >
                  Sign up
                </Button>
                <Dialog
                  open={openSignUpModal}
                  onClose={handleCloseSignUpModal}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
                  <DialogContent>
                    <TextField
                      value={users.name}
                      onChange={(e) =>
                        setUserDetails({ ...users, name: e.target.value })
                      }
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      label="Enter your name"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      value={users.email}
                      onChange={(e) =>
                        setUserDetails({ ...users, email: e.target.value })
                      }
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      label="Enter your email"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      value={users.password}
                      onChange={(e) =>
                        setUserDetails({ ...users, password: e.target.value })
                      }
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      label="Enter your password"
                      type="password"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <PhoneInput
                      country={"in"}
                      value={ph}
                      className="appearance-none border rounded w-full border-none"
                      onChange={setPh}
                      inputStyle={{ width: "240px" }}
                    />
                    <Button
                      variant="contained"
                      startIcon={<PhoneIcon />}
                      sx={{ marginRight: 1 }}
                      onClick={() =>
                        onSignup({
                          setLoading: setLoading,
                          onCaptchVerify: onCaptchVerify,
                          setOtpModel: setOtpModel,
                          setOpen: setOpen,
                          ph: ph,
                        })
                      }
                    >
                      sign up
                    </Button>{" "}
                    or
                    <div id="recaptcha-container"></div>
                    <Button
                      variant="contained"
                      startIcon={<GoogleIcon />}
                      onClick={() => handleSignIn({ dispatch })}
                    >
                      Google
                    </Button>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseSignUpModal} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : (
              <div>
                <Link href="/pages/profile">
                  <IconButton sx={{ p: 0 }} size="small">
                    <Avatar src={userImage ? userImage : ""} />
                  </IconButton>
                </Link>
              </div>
            )}
          </Box>
        </Toolbar>
        <Dialog open={otpModel}>
          <PhoneOtp
            user={users}
            setOpen={setOtpModel}
            setLoading={setLoading}
            phoneNo={ph}
          />
        </Dialog>
      </Container>
    </AppBar>
  );
}

export default Navbar;
