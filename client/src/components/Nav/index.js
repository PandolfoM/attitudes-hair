import React, { useState } from "react";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { firstLetter } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LoginModal from "../LoginModal";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import logo from "../../assets/attitudes.svg";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  if (
    window.location.pathname === "/contact" ||
    window.location.pathname === "/pricing"
  ) {
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  } else {
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
      color: trigger ? "nav" : "navclear",
    });
  }
}

function ScrollTop(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}>
        {children}
      </Box>
    </Zoom>
  );
}

const Nav = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const { loading, data: userData } = useQuery(QUERY_ME);

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

  function showProfile() {
    if (Auth.loggedIn()) {
      return (
        <>
          {loading ? (
            <CircularProgress />
          ) : (
            <Tooltip title={`${userData.me.firstName} ${userData.me.lastName}`}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userData.me.pfp ? (
                  <Avatar
                    alt={`${userData.me.firstName} ${userData.me.lastName}`}
                    src={`${userData.me.pfp}`}>
                    {firstLetter(userData.me.firstName)}
                  </Avatar>
                ) : (
                  <Avatar
                    alt={`${userData.me.firstName} ${userData.me.lastName}`}
                    sx={{ backgroundColor: userData.me.color }}>
                    {firstLetter(userData.me.firstName)}
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
          )}
          <Menu
            sx={{ mt: "45px", overflow: "hidden" }}
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
            onClose={handleCloseUserMenu}>
            <Link to="/dashboard">
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
            </Link>
            <MenuItem
              onClick={() => {
                Auth.logout();
                handleCloseUserMenu();
              }}>
              <Typography>Logout</Typography>
            </MenuItem>
          </Menu>
        </>
      );
    }
  }

  function showLogin() {
    if (!Auth.loggedIn()) {
      return (
        <Button
          color="inherit"
          onClick={() => setOpenLogin(true)}
          sx={{ my: 2, display: "block", transition: "none" }}>
          Login
        </Button>
      );
    }
  }

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar
          sx={{ paddingRight: "0px !important", transition: "all 0.2s ease" }}
          position="fixed"
          id="navbar"
          color="nav">
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ alignItems: "center" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                onClick={handleCloseNavMenu}
                sx={{
                  mr: 2,
                  display: {
                    xs: "none",
                    md: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                  },
                }}>
                <Link to="/">
                  <img
                    src={logo}
                    alt="Attitudes Hair Design"
                    style={{ height: "7vh" }}
                  />
                </Link>
              </Typography>

              <Typography
                variant="h6"
                noWrap
                component="div"
                onClick={handleCloseNavMenu}
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none", cursor: "pointer" },
                }}>
                <Link to="/">
                  <img
                    src={logo}
                    alt="Attitudes Hair Design"
                    style={{ height: "5vh", margin: "auto" }}
                  />
                </Link>
              </Typography>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                  justifyContent: "flex-end",
                }}>
                {showLogin()}
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleOpenNavMenu}>
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
                  }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <HashLink to="/#about">About Us</HashLink>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <HashLink to="/#services">Services</HashLink>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/pricing">Pricing</Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/contact">Contact</Link>
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  justifyContent: "flex-end",
                  marginRight: "10px",
                }}>
                <HashLink to="/#about">
                  <Button
                    color="inherit"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block", transition: "none" }}>
                    About Us
                  </Button>
                </HashLink>
                <HashLink to="/#service">
                  <Button
                    color="inherit"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block", transition: "none" }}>
                    Services
                  </Button>
                </HashLink>
                <Link to="/pricing">
                  <Button
                    color="inherit"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block", transition: "none" }}>
                    Pricing
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    color="inherit"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block", transition: "none" }}>
                    Contact
                  </Button>
                </Link>
                {showLogin()}
              </Box>

              <Box sx={{ flexGrow: 0 }}>{showProfile()}</Box>
            </Toolbar>
          </Container>
          <ScrollTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </AppBar>
      </ElevationScroll>

      <LoginModal openLogin={openLogin} setOpenLogin={setOpenLogin} />
    </>
  );
};
export default Nav;
