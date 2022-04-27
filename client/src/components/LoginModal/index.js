import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function LoginModal(props) {
  const { openLogin, setOpenLogin } = props;
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    checked: false,
  });
  const [login, { error }] = useMutation(LOGIN);

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const handleClose = () => {
    setOpenLogin(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password, remember:  formState.checked},
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormState({
      ...formState,
      [name]: value,
      checked,
    });
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
          name="email"
          variant="standard"
          fullWidth
          onChange={handleChange}
        />
      </DialogContent>
      <DialogContent sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
        <TextField
          autoFocus
          margin="dense"
          label="Password"
          type="password"
          name="password"
          variant="standard"
          fullWidth
          onChange={handleChange}
        />
      </DialogContent>
      <DialogContent sx={{ paddingTop: "0px" }}>
        {error ? (
          <DialogContentText color="error">
            The provided credentials are incorrect
          </DialogContentText>
        ) : null}
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={formState.checked} name="checked" onChange={handleChange} />}
            label="Remember me"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={handleFormSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginModal;
