import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import {
  Alert,
  Avatar,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { firstLetter } from "../../utils/helpers";
import { UPDATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

function SettingsModal(props) {
  const [sketchPickerColor, setSketchPickerColor] = useState("#bdbdbd");
  const [openAlert, setOpenAlert] = useState(false);
  const { openSettings, setOpenSettings } = props;
  const { loading, data: userData } = useQuery(QUERY_ME);
  const [updateUser, { error }] = useMutation(UPDATE_USER);
  const user = userData?.me;

  useEffect(() => {
    setSketchPickerColor(user.color);
  }, [user.color]);

  const handleClose = () => {
    setOpenSettings(false);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleColorSave = async () => {
    try {
      await updateUser({
        variables: { color: sketchPickerColor },
      });

      if (user.color !== sketchPickerColor) {
        setOpenAlert(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleColorReset = async () => {
    setSketchPickerColor(user.color);
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
              <Button
                variant="contained"
                sx={{ display: "flex", margin: "5px 0" }}
                color="secondary"
                onClick={handleColorSave}>
                Save Color
              </Button>
              {user.color !== sketchPickerColor ? (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#a90202",
                    color: "white",
                    margin: "5px 0",
                  }}
                  color="nav"
                  onClick={handleColorReset}>
                  Reset
                </Button>
              ) : null}
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <SketchPicker
                onChange={(color) => {
                  setSketchPickerColor(color.hex);
                }}
                color={sketchPickerColor}
              />
              <Avatar
                alt={`${user.firstName} ${user.lastName}`}
                sx={{
                  backgroundColor: sketchPickerColor,
                  height: "100%",
                  marginLeft: "5px",
                }}
                variant="square">
                {firstLetter(user.firstName)}
              </Avatar>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}>
          Color successfully changed
        </Alert>
      </Snackbar>
    </>
  );
}

export default SettingsModal;
