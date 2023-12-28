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
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from "firebase/auth";
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

    const [anchorEl, setAnchorEl] = React.useState(null);


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

    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(true);

    const router = useRouter();
    const authenticated = useSelector((state) => state.user.isAuthenticated);
    const user = authenticated ? useSelector((state) => state.user.user.url) : "/News-logo.jpg"
    console.log(user)
    const [users, setUserDetails] = React.useState({
        email: "", password: ''
    })
    const [otpModel, setOtpModel] = React.useState(false);
    const [ph, setPh] = React.useState("");
    const [signupLoading, setSignupLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    async function onSignup({
        setLoading,
        onCaptchVerify,
        setSignupLoading,
        setOtpModel,
        setOpen,
        ph,
    }) {

        // setLoading(true);
        // setSignupLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;
        const formatPh = "+" + ph;
        console.log("pghone", formatPh);

        setOtpModel(true);
        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                toast.success("OTP sended successfully!");
                window.confirmationResult = confirmationResult;
                setOpen(false);
                setLoading(false);
                setSignupLoading(false);

            })
            .catch((error) => {
                console.log("error in sending otp", error);
            });
    }
    // when user verify capture
    async function onCaptchVerify() {
        const auth = getAuth();
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recapture",
                {
                    size: "invisible",
                    callback: (response) => {
                        // callback function signUp that contain all other stuff like ph, setphone etc...
                        onSignup({
                            setLoading,
                            onCaptchVerify,
                            setSignupLoading,
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
            setSignupLoading,
            setOtpModel,
            setOpen,
            ph
        );
    }
    // const [searchQuery, setSearchQuery] = React.useState("");

    // const handleSearch = async () => {
    //     if (!searchQuery.trim()) {
    //         console.error("Search query is empty.");
    //         return;
    //     }
    //     console.log("Search Query:", searchQuery);
    //     const apiKey = '69f2b0c4d53e40099e654bc7119426ac';
    //     const apiUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;

    //     try {
    //         const response = await fetch(apiUrl);
    //         const data = await response.json();

    //         console.log("News Data:", data);

    //         router.push({
    //             pathname: '/search', // Change 'search' to the desired path for displaying search results
    //             query: { q: searchQuery }, // Pass the search query as a parameter
    //         });
    //     } catch (error) {
    //         console.error("Error fetching news data:", error);
    //     }
    // };

    // const handleSearchInputChange = (event) => {
    //     setSearchQuery(event.target.value);
    // };


    return (
        <AppBar
            position="fixed"
            sx={{
                background: "rgba(255, 255, 255, 0.8)",
                color: "black",
                zIndex: 1000
            }}
        >
            <Container maxWidth="xl">
                <Toaster />

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
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}

                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Link href={page.href} style={{ textDecoration: "none" }}>
                                        <Typography textAlign="center" sx={{ cursor: 'pointer' }}>{page.label}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <img src="/News-logo.jpg" style={{ height: '100px', width: '170px' }} />
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
                    <Box sx={{ flexGrow: 1, display: "flex", marginLeft: "auto", marginRight: 2 }}>
                        {/* <TextField

                            variant="outlined"
                            size="large"
                            placeholder="Search for news..."
                            InputProps={{
                                endAdornment: (
                                    <IconButton size="small" color="primary" aria-label="search" onClick={handleSearch}>

                                        🔍
                                    </IconButton>
                                )
                            }}
                            onChange={handleSearchInputChange}
                        /> */}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {!authenticated ? (
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
                                            value={users.email}
                                            onChange={(e) =>
                                                setUserDetails({ ...users, email: e.target.value })
                                            }
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                        />
                                        <TextField
                                            value={users.password}
                                            onChange={(e) =>
                                                setUserDetails({ ...users, password: e.target.value })
                                            }
                                            fullWidth

                                            type="password"
                                            variant="outlined"
                                            margin="normal"
                                        />
                                        <PhoneInput
                                            country={"in"}
                                            value={ph}
                                            className="appearance-none border rounded w-full border-none"
                                            onChange={setPh}
                                            inputStyle={{ width: "240px" }}
                                        />
                                        <Button variant="contained"
                                            startIcon={<PhoneIcon />}
                                            sx={{ marginRight: 1 }}
                                            onClick={() => onSignup({
                                                setLoading: setLoading,
                                                onCaptchVerify: onCaptchVerify,
                                                setOtpModel: setOtpModel,
                                                setOpen: setOpen,
                                                ph: ph,
                                            })}
                                        >
                                            sign up
                                        </Button>
                                        <div id="recapture">

                                        </div>

                                        <Button variant="contained"
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
                                    <IconButton sx={{ p: 0 }} size="small"
                                    >
                                        <Avatar src={user} />
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
                        loading={loading}
                        setLoading={setLoading}
                        phoneNo={ph}
                    />
                </Dialog>
            </Container>
        </AppBar >
    );
}

export default Navbar;

