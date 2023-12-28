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
    const authenticated = useSelector((state) => state.user.user && state.user.user.isAuthenticated);
    const user = authenticated ? useSelector((state) => state.user.user.url) : ""

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
    React.useEffect(() => {
        const checkAuthentication = async () => {
          await new Promise((resolve) => setTimeout(resolve, 70));
    
          if (!authenticated) {
            setLoading(false);
          }
        };
    
        checkAuthentication();
      }, [authenticated]);
    
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
                        { !user ? (
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

                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                        />
                                        <TextField

                                            fullWidth

                                            type="password"
                                            variant="outlined"
                                            margin="normal"
                                        />
                                        <Button variant="contained"
                                            startIcon={<PhoneIcon />}
                                            sx={{ marginRight: 1 }}
                                        >
                                            Phone
                                        </Button>
                                       

                                        <Button variant="contained"
                                            startIcon={<GoogleIcon />}
                                            onClick={() => handleSignIn(dispatch)}
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
            </Container>
        </AppBar >
    );
}

export default Navbar;

