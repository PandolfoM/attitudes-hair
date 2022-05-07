import { useMutation } from "@apollo/client";
import {
  Alert,
  Button,
  Collapse,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { ADD_USER } from "../../utils/mutations";

function AddUser() {
  const [addUser, { error }] = useMutation(ADD_USER);
  const [openSnack, setOpenSnack] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleAlertClose = () => {
    setOpenSnack(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });

      setFormState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });

      setOpenSnack(true);
    } catch (e) {
      console.log(e);
      setOpenAlert(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      {error && formState.email === "" ? (
        <TextField
          error
          name="email"
          label="Email *"
          type="email"
          autoComplete="username"
          variant="outlined"
          value={formState.email}
          onChange={handleChange}
        />
      ) : (
        <TextField
          name="email"
          label="Email *"
          type="email"
          autoComplete="username"
          variant="outlined"
          value={formState.email}
          onChange={handleChange}
        />
      )}
      {error && formState.password === "" ? (
        <TextField
          error
          name="password"
          label="Password *"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={formState.password}
          onChange={handleChange}
        />
      ) : (
        <TextField
          name="password"
          label="Password *"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={formState.password}
          onChange={handleChange}
        />
      )}
      {error && formState.firstName === "" ? (
        <TextField
          error
          name="firstName"
          label="First Name *"
          variant="outlined"
          value={formState.firstName}
          onChange={handleChange}
        />
      ) : (
        <TextField
          name="firstName"
          label="First Name *"
          variant="outlined"
          value={formState.firstName}
          onChange={handleChange}
        />
      )}
      {error && formState.lastName === "" ? (
        <TextField
          error
          name="lastName"
          label="Last Name *"
          variant="outlined"
          value={formState.lastName}
          onChange={handleChange}
        />
      ) : (
        <TextField
          name="lastName"
          label="Last Name *"
          variant="outlined"
          value={formState.lastName}
          onChange={handleChange}
        />
      )}
      <Collapse in={openAlert}>
        <Alert severity="error" onClose={() => setOpenAlert(false)}>
          Invalid Field(s)
        </Alert>
      </Collapse>
      {!error && (
        <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleAlertClose}>
          <Alert
            onClose={handleAlertClose}
            severity="success"
            sx={{ width: "100%" }}>
            User Added!
          </Alert>
        </Snackbar>
      )}
      <Button variant="contained" fullWidth onClick={handleFormSubmit}>
        Add User
      </Button>
    </>
  );
}

export default AddUser;
