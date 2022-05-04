import React, { useState } from "react";
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
  Button,
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

function Dashboard() {
  const [openSettings, setOpenSettings] = useState(false);
  const [value, setValue] = useState(0);
  const { loading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me;

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
      <div className="sidebar">
        <ul className="nav-list">
          <Tabs value={value} orientation="vertical" onChange={handleChange}>
            <Tooltip title="Users" placement="right" arrow>
              <Tab label={<PersonIcon />} {...a11yProps(0)} />
            </Tooltip>
            <Tooltip title="Prices" placement="right" arrow>
              <Tab label={<SellIcon />} {...a11yProps(1)} />
            </Tooltip>
          </Tabs>
          <li className="profile">
            <div className="profile-details">
              <Tooltip title="Settings" placement="right" arrow>
                <IconButton onClick={() => setOpenSettings(true)}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout" placement="right" arrow>
                <IconButton>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={`${user.firstName} ${user.lastName}`}
                placement="right"
                arrow>
                <Avatar
                  alt={`${user.firstName} ${user.lastName}`}
                  sx={{ backgroundColor: user.color }}
                  src={`${user.pfp}`}>
                  {firstLetter(user.firstName)}
                </Avatar>
              </Tooltip>
            </div>
          </li>
        </ul>
      </div>
      <div className="dashboard-content">
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
      </div>
    </>
  );
}

export default Dashboard;
