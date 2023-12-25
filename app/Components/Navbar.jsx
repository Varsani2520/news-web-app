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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Badge, Divider, ListItemIcon, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { UserAuth } from "../context/AuthContext";


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
const settings = [
    { label: "Profile", href: "/pages/profile", icon: <Avatar /> },
    { label: "My account", href: "/pages/account" },
    {
        label: "Settings", href: "/pages/settings", icon: <ListItemIcon>
            <Settings fontSize="small" />
        </ListItemIcon>
    },
    {
        label: "Logout", href: "/pages/logout", icon: <ListItemIcon>
            <Logout fontSize="small" />
        </ListItemIcon>
    }];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    const { user } = UserAuth();

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);
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
                    <img src="/News-logo.jpg" style={{ height: '100px', width: '170px' }} />
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
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} sx={{ xs: 'block', md: 'none' }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.label} onClick={handleClose}>
                                    <Link href={page.href} style={{ textDecoration: "none" }}>
                                        <Typography textAlign="center">{page.label}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>


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
            <TextField
              
              variant="outlined"
              size="large"
              placeholder="Search for news..."
              InputProps={{
                endAdornment: (
                  <IconButton size="small" color="primary" aria-label="search">
                    {/* You can replace the following placeholder with an actual search icon */}
                    🔍
                  </IconButton>
                )
              }}
            />
          </Box>
                    <Box sx={{ flexGrow: 0 }}>

                        {loading ? null : !user ? (
                            <>
                                <Link href="/pages/signup" passHref>
                                    <Button component="a" variant="contained" sx={{ marginRight: 2 }} >Sign up</Button>
                                </Link>
                                <Link href="pages/login" passHref>
                                    <Button component="a" variant="contained" sx={{ marginRight: 2 }} >Login</Button>
                                </Link>
                            </>


                        ) : (
                            <div>
                                <IconButton
                                    color="primary"
                                    aria-label="add to shopping cart"
                                    href="/pages/profile/favourites"
                                    sx={{ marginRight: 2 }}
                                >
                                    <StyledBadge badgeContent="1" color="secondary">
                                        <FavoriteBorderOutlinedIcon />
                                    </StyledBadge>
                                </IconButton>

                                <Tooltip title="Open settings" >
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} size="small"

                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}>
                                        <Avatar src={user.photoURL} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        )}
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <div key={setting.label}>

                                    <MenuItem key={setting.label} onClick={handleClose}><Link href={setting.href}>
                                        <Avatar >{setting.icon}</Avatar>
                                        <Typography>{setting.label}</Typography></Link>
                                    </MenuItem>
                                </div>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;

