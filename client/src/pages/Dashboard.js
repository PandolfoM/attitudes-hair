import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import "./style.css";

import PersonIcon from "@mui/icons-material/Person";
import SellIcon from "@mui/icons-material/Sell";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import SettingsModal from "../components/SettingsModal";
import { firstLetter } from "../utils/helpers";

function Dashboard() {
  const [openSettings, setOpenSettings] = useState(false);
  const { loading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!Auth.loggedIn()) {
    return <h4>You are not logged in!</h4>;
  }

  return (
    <>
      <div className="sidebar">
        <ul className="nav-list">
          <li>
            <Tooltip title="Users" placement="right" arrow>
              <IconButton>
                <PersonIcon />
              </IconButton>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="Prices" placement="right" arrow>
              <IconButton>
                <SellIcon />
              </IconButton>
            </Tooltip>
          </li>
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
              <Tooltip title={`${user.firstName} ${user.lastName}`} placement="right" arrow>
                <Avatar alt={`${user.firstName} ${user.lastName}`} sx={{backgroundColor: user.color}} src={`${user.pfp}`}>
                  {firstLetter(user.firstName)}
                </Avatar>
              </Tooltip>
            </div>
          </li>
        </ul>
      </div>
      <div className="dashboard-content">
        <h1>Welcome, {user.firstName} {user.lastName}</h1>
        <SettingsModal openSettings={openSettings} setOpenSettings={setOpenSettings}/>
      </div>
    </>
  );
}

export default Dashboard;
