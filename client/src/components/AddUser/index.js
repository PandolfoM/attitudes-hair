import { useMutation } from "@apollo/client";
import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ADD_USER } from "../../utils/mutations";

function AddUser() {
  const [addUser, { error }] = useMutation(ADD_USER);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleFormSubmit = async (event) => {
    try {
      await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
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
  };

  return (
    <>
      {error && formState.email === "" ? (
        <TextField
          error
          name="email"
          label="Email *"
          type="email"
          variant="outlined"
          onChange={handleChange}
        />
      ) : (
        <TextField
          name="email"
          label="Email *"
          type="email"
          variant="outlined"
          onChange={handleChange}
        />
      )}
      {error && formState.password === "" ? (
        <TextField
          error
          name="password"
          label="Password *"
          variant="outlined"
          onChange={handleChange}
        />
      ) : (
        <TextField
          name="password"
          label="Password *"
          variant="outlined"
          onChange={handleChange}
        />
      )}
      {error && formState.firstName === "" ? (
        <TextField
          error
          name="firstName"
          label="First Name *"
          variant="outlined"
          onChange={handleChange}
        />
      ) : (
        <TextField
          name="firstName"
          label="First Name *"
          variant="outlined"
          onChange={handleChange}
        />
      )}
      {error && formState.lastName === "" ? (
        <TextField
          error
          name="lastName"
          label="Last Name *"
          variant="outlined"
          onChange={handleChange}
        />
      ) : (
        <TextField
          name="lastName"
          label="Last Name *"
          variant="outlined"
          onChange={handleChange}
        />
      )}
      {error && <Typography color="error">Invalid Field(s)</Typography>}
      <Button variant="contained" fullWidth onClick={handleFormSubmit}>
        Add User
      </Button>
    </>
  );
}

export default AddUser;
