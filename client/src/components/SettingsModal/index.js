import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ChromePicker } from "react-color";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  Snackbar,
  Switch,
  Tab,
  Tabs,
  TextField,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { firstLetter } from "../../utils/helpers";
import { UPDATE_USER } from "../../utils/mutations";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ height: "50vh", overflowY: "auto", padding: "10px" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function SettingsModal(props) {
  const [ChromePickerColor, setChromePickerColor] = useState("#bdbdbd");
  const [profilePic, setProfilePic] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [currentTab, setCurrentTab] = React.useState(0);
  const { openSettings, setOpenSettings } = props;
  const { data: userData } = useQuery(QUERY_ME);
  const [updateUser] = useMutation(UPDATE_USER);
  const mobile = useMediaQuery("(max-width: 621px)");
  let DarkMode = localStorage.getItem('darkMode')
  const user = userData?.me;

  useEffect(() => {
    setChromePickerColor(user.color);
  }, [user.color]);

  useEffect(() => {
    setProfilePic(user.pfp);
  }, [user.pfp]);

  useEffect(() => {
    if (DarkMode === "true") {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [DarkMode]);

  const handleClose = () => {
    setOpenSettings(false);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleSave = async () => {
    try {
      await updateUser({
        variables: { color: ChromePickerColor, pfp: profilePic },
      });

      setOpenAlert(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleColorReset = async () => {
    setChromePickerColor(user.color);
  };

  const handleChange = (event) => {
    setProfilePic(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const toggleDarkMode = (event) => {
    setDarkMode(event.target.checked)
    localStorage.setItem('darkMode', event.target.checked)
  };

  return (
    <>
      <Dialog
        open={openSettings}
        onClose={handleClose}
        fullWidth
        className="settingsModal"
        maxWidth={"sm"}>
        <DialogTitle>
          Settings
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 12,
              color: "secondary",
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ overflowX: "hidden" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab label="Avatar" {...a11yProps(0)} />
              <Tab label="Dashboard" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Box>
            <TabPanel value={currentTab} index={0}>
              <Box>
                <TextField
                  margin="normal"
                  label="Profile Picture URL"
                  type="url"
                  fullWidth
                  variant="standard"
                  value={profilePic}
                  onChange={handleChange}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}>
                  {mobile ? (
                    <Avatar
                      alt={`${user.firstName} ${user.lastName}`}
                      variant="square"
                      sx={{
                        backgroundColor: ChromePickerColor,
                        width: "80%",
                        height: "auto",
                        marginBottom: "20px",
                      }}
                      src={`${profilePic}`}>
                      {firstLetter(user.firstName)}
                    </Avatar>
                  ) : (
                    <Avatar
                      alt={`${user.firstName} ${user.lastName}`}
                      variant="square"
                      sx={{
                        backgroundColor: ChromePickerColor,
                        width: "50%",
                        height: "auto",
                        marginRight: "20px",
                      }}
                      src={`${profilePic}`}>
                      {firstLetter(user.firstName)}
                    </Avatar>
                  )}
                  <Box sx={{display: "flex", justifyContent: "center"}}>
                    <ChromePicker
                      disableAlpha
                      onChange={(color) => {
                        setChromePickerColor(color.hex);
                      }}
                      color={ChromePickerColor}
                    />
                  </Box>
                </Box>
              </Box>
            </TabPanel>
          </Box>
          <TabPanel value={currentTab} index={1}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={darkMode} onChange={toggleDarkMode} />
                }
                label="Dark Mode"
              />
            </FormGroup>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          {user.color !== ChromePickerColor ? (
            <Button variant="text" color="error" onClick={handleColorReset}>
              Reset Color
            </Button>
          ) : null}
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}>
          Saved!
        </Alert>
      </Snackbar>
    </>
  );
}

export default SettingsModal;
