import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import "./style.css";

import PersonIcon from "@mui/icons-material/Person";
import SellIcon from "@mui/icons-material/Sell";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import SettingsModal from "../components/SettingsModal";
import { firstLetter } from "../utils/helpers";
import { Link } from "react-router-dom";
import Users from "../components/Users";
import Prices from "../components/Prices";
import logo from "../assets/attitudes.svg";

function Dashboard() {
  const [openSettings, setOpenSettings] = useState(false);
  const [value, setValue] = useState(0);
  const { loading, data: userData } = useQuery(QUERY_ME);
  const [darkMode, setDarkMode] = useState(false);
  let DarkMode = localStorage.getItem('darkMode')
  const user = userData?.me;

  useEffect(() => {
    if (DarkMode === "true") {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [DarkMode])

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!Auth.loggedIn()) {
    return <h4>You are not logged in!</h4>;
  }

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}>
        {value === index && children}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {darkMode ? (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline>
            <Box className="sidebar">
              <ul className="nav-list">
                <img
                  src={logo}
                  alt="Attitudes Hair Design Studio"
                  style={{
                    width: "90%",
                    height: "auto",
                    margin: "0 auto 15px auto",
                  }}
                />
                <Tabs
                  value={value}
                  orientation="vertical"
                  onChange={handleChange}>
                  <Tooltip title="Users" placement="right" arrow>
                    <Tab label={<PersonIcon />} {...a11yProps(0)} />
                  </Tooltip>
                  <Tooltip title="Price Menu" placement="right" arrow>
                    <Tab label={<SellIcon />} {...a11yProps(1)} />
                  </Tooltip>
                </Tabs>
                <li className="profile">
                  <Box className="profile-details">
                    <Tooltip title="Settings" placement="right" arrow>
                      <IconButton onClick={() => setOpenSettings(true)}>
                        <SettingsIcon
                          sx={{ color: "white", width: "70%", height: "auto" }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Logout" placement="right" arrow>
                      <IconButton onClick={() => Auth.logout()}>
                        <LogoutIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={`${user.firstName} ${user.lastName}`}
                      placement="right"
                      arrow>
                      {user.pfp ? (
                        <Avatar
                          alt={`${user.firstName} ${user.lastName}`}
                          src={`${user.pfp}`}>
                          {firstLetter(user.firstName)}
                        </Avatar>
                      ) : (
                        <Avatar
                          alt={`${user.firstName} ${user.lastName}`}
                          sx={{ backgroundColor: user.color }}>
                          {firstLetter(user.firstName)}
                        </Avatar>
                      )}
                    </Tooltip>
                  </Box>
                </li>
              </ul>
            </Box>
            <Box className="dashboard-content">
              <Link to={"/"}>
                <Button sx={{ paddingLeft: "0" }}>
                  <ArrowBackIosNewIcon />
                  Back to Home
                </Button>
              </Link>
              <h1>
                Welcome, {user.firstName} {user.lastName}
              </h1>
              <TabPanel value={value} index={0}>
                <Users />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Prices />
              </TabPanel>
              <SettingsModal
                openSettings={openSettings}
                setOpenSettings={setOpenSettings}
              />
            </Box>
          </CssBaseline>
        </ThemeProvider>
      ) : (
          <CssBaseline>
            <Box className="sidebar">
              <ul className="nav-list">
                <img
                  src={logo}
                  alt="Attitudes Hair Design Studio"
                  style={{
                    width: "90%",
                    height: "auto",
                    margin: "0 auto 15px auto",
                  }}
                />
                <Tabs
                  value={value}
                  orientation="vertical"
                  onChange={handleChange}>
                  <Tooltip title="Users" placement="right" arrow>
                    <Tab label={<PersonIcon />} {...a11yProps(0)} />
                  </Tooltip>
                  <Tooltip title="Price Menu" placement="right" arrow>
                    <Tab label={<SellIcon />} {...a11yProps(1)} />
                  </Tooltip>
                </Tabs>
                <li className="profile">
                  <Box className="profile-details">
                    <Tooltip title="Settings" placement="right" arrow>
                      <IconButton onClick={() => setOpenSettings(true)}>
                        <SettingsIcon
                          sx={{ color: "white", width: "70%", height: "auto" }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Logout" placement="right" arrow>
                      <IconButton onClick={() => Auth.logout()}>
                        <LogoutIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={`${user.firstName} ${user.lastName}`}
                      placement="right"
                      arrow>
                      {user.pfp ? (
                        <Avatar
                          alt={`${user.firstName} ${user.lastName}`}
                          src={`${user.pfp}`}>
                          {firstLetter(user.firstName)}
                        </Avatar>
                      ) : (
                        <Avatar
                          alt={`${user.firstName} ${user.lastName}`}
                          sx={{ backgroundColor: user.color }}>
                          {firstLetter(user.firstName)}
                        </Avatar>
                      )}
                    </Tooltip>
                  </Box>
                </li>
              </ul>
            </Box>
            <Box className="dashboard-content">
              <Link to={"/"}>
                <Button sx={{ paddingLeft: "0" }}>
                  <ArrowBackIosNewIcon />
                  Back to Home
                </Button>
              </Link>
              <h1>
                Welcome, {user.firstName} {user.lastName}
              </h1>
              <TabPanel value={value} index={0}>
                <Users />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Prices />
              </TabPanel>
              <SettingsModal
                openSettings={openSettings}
                setOpenSettings={setOpenSettings}
              />
            </Box>
          </CssBaseline>
      )}
    </>
  );
}

export default Dashboard;
