import React, { useState } from "react";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { firstLetter } from "../../utils/helpers";
import "./style.css";

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
import LoginModal from "../LoginModal";
import { CircularProgress } from "@mui/material";

const Nav = () => {
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
          onClick={() => setOpenLogin(true)}
          sx={{ my: 2, display: "block" }}>
          Login
        </Button>
      );
    }
  }

  return (
    <>
      <AppBar position="fixed" color="nav">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}>
              Attitudes Design
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              Attitudes Design
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
                  <Typography textAlign="center">About Us</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
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
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}>
                About Us
              </Button>
              <Button
                color="inherit"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}>
                Services
              </Button>
              <Button
                color="inherit"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}>
                Gallery
              </Button>
              <Button
                color="inherit"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}>
                Contact
              </Button>
              {showLogin()}
            </Box>

            <Box sx={{ flexGrow: 0 }}>{showProfile()}</Box>
          </Toolbar>
        </Container>
      </AppBar>

      <LoginModal
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}></LoginModal>
    </>
  );
};
export default Nav;
