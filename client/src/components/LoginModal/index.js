import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function LoginModal(props) {
  const { openLogin, setOpenLogin } = props;

  const handleClose = () => {
    setOpenLogin(false);
  };

  return (
    <Dialog open={openLogin} onClose={handleClose} fullWidth maxWidth={"xs"}>
      <DialogTitle>
        <div>Login</div>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "secondary",
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          variant="standard"
          fullWidth
        />
        <br />
        <TextField
          autoFocus
          margin="dense"
          label="Password"
          type="password"
          variant="standard"
          fullWidth
        />
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
