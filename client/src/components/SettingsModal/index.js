import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { firstLetter } from "../../utils/helpers";
import { UPDATE_USER } from "../../utils/mutations";

function SettingsModal(props) {
  const [ChromePickerColor, setChromePickerColor] = useState("#bdbdbd");
  const [profilePic, setProfilePic] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const { openSettings, setOpenSettings } = props;
  const { data: userData } = useQuery(QUERY_ME);
  const [updateUser] = useMutation(UPDATE_USER);
  const user = userData?.me;

  useEffect(() => {
    setChromePickerColor(user.color);
  }, [user.color]);

  useEffect(() => {
    setProfilePic(user.pfp);
  }, [user.pfp]);

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

  return (
    <>
      <Dialog
        open={openSettings}
        onClose={handleClose}
        fullWidth
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
          <h4>Avatar</h4>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Profile Picture URL"
                type="url"
                fullWidth
                variant="standard"
                value={profilePic}
                onChange={handleChange}
              />
              <Avatar
                alt={`${user.firstName} ${user.lastName}`}
                sx={{
                  backgroundColor: ChromePickerColor,
                  width: "120px",
                  height: "120px",
                  margin: "15px auto",
                  position: "relative",
                  boxShadow: "0 0 10px black"
                }}
                src={`${profilePic}`}>
                {firstLetter(user.firstName)}
              </Avatar>
              {user.color !== ChromePickerColor ? (
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    margin: "5px 0",
                  }}
                  onClick={handleColorReset}>
                  Reset Color
                </Button>
              ) : null}
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <ChromePicker
                onChange={(color) => {
                  setChromePickerColor(color.hex);
                }}
                color={ChromePickerColor}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
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
