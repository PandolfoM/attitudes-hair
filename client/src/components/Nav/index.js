import React, { useState } from "react";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { firstLetter } from "../../utils/helpers";

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
import { scroller } from "react-scroll";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    color: trigger ? "nav" : "navclear",
  });
}

function ScrollTop(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      ".hero"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      return;
    }
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

  const ScrollTo = (element) => {
    scroller.scrollTo(element, {
      duration: 0,
      delay: 0,
    });
  };

  function showProfile() {
    if (Auth.loggedIn()) {
      return (
        <>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <Avatar alt="Matthew Pandolfo">
                  {firstLetter(userData.me.firstName)}
                </Avatar>
              )}
            </IconButton>
          </Tooltip>
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
            onClose={handleCloseUserMenu}>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Dashboard</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography href="/" onClick={() => Auth.logout()}>
                Logout
              </Typography>
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
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                onClick={() => {
                  handleCloseNavMenu();
                  ScrollTo('hero');
                }}
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex", cursor: "pointer" },
                }}>
                Attitudes Hair Design
              </Typography>

              <Typography
                variant="h6"
                noWrap
                component="div"
                onClick={() => {
                  handleCloseNavMenu();
                  ScrollTo('hero');
                }}
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none", cursor: "pointer" } }}>
                Attitudes Hair Design
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
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      ScrollTo("about");
                    }}>
                    <Typography textAlign="center">About Us</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      ScrollTo("service");
                    }}>
                    <Typography textAlign="center">Services</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Gallery</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Contact</Typography>
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
                <Button
                  color="inherit"
                  onClick={() => {
                    handleCloseNavMenu();
                    ScrollTo("about");
                  }}
                  sx={{ my: 2, display: "block", transition: "none" }}>
                  About Us
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    handleCloseNavMenu();
                    ScrollTo("service");
                  }}
                  sx={{ my: 2, display: "block", transition: "none" }}>
                  Services
                </Button>
                <Button
                  color="inherit"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block", transition: "none" }}>
                  Gallery
                </Button>
                <Button
                  color="inherit"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block", transition: "none" }}>
                  Contact
                </Button>
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
