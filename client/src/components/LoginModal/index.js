import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function LoginModal(props) {
  const { openLogin, setOpenLogin } = props;
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleClose = () => {
    setOpenLogin(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
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
          onChange={handleChange}
        />
        <br />
        <TextField
          autoFocus
          margin="dense"
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          onChange={handleChange}
        />
        {error ? (
          <DialogContentText>
            <p>The provided credentials are incorrect</p>
          </DialogContentText>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={handleFormSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginModal;
