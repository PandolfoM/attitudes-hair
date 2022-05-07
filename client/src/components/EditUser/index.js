import { useMutation, useQuery } from "@apollo/client";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { UPDATE_USER2 } from "../../utils/mutations";
import { QUERY_USER, QUERY_USERS } from "../../utils/queries";

function EditUser() {
  const [updateUser] = useMutation(UPDATE_USER2);
  const { loading, data } = useQuery(QUERY_USERS);
  const [searchInput, setSearchInput] = useState();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  let userNames = [];

  if (data) {
    let userData = data.users;
    let users = { ...userData };

    for (let i = 0; i < userData.length; i++) {
      userNames.push(`${users[i].firstName} ${users[i].lastName} - ${users[i]._id}`);
    }
  }

  const regEx = /[^-]*$/
  let id = regEx.exec(searchInput)
  const { data: userData } = useQuery(QUERY_USER, {
    variables: { id: id[0].trim() },
  });
  const user = userData?.user;

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      await updateUser({
        variables: {
          id: user._id,
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
        },
      });

      setFormState({
        firstName: '',
        lastName: '',
        email: '',
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user) {
      setFormState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSearch = (event, value) => {
    setSearchInput(value);
  };

  return (
    <>
      {!loading ? (
        <>
          <Autocomplete
            fullWidth
            disablePortal
            options={userNames}
            onChange={handleSearch}
            renderInput={(params) => (
              <TextField {...params} label="Search User" />
            )}
          />
          {user ? (
            <Box>
              <TextField
                name="id"
                defaultValue={user._id}
                variant="outlined"
                sx={{ display: "none" }}
              />
              <TextField
                name="firstName"
                label="First Name"
                value={formState.firstName}
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={formState.lastName}
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                name="email"
                label="Email"
                value={formState.email}
                variant="outlined"
                onChange={handleChange}
              />
            </Box>
          ) : null}
        </>
      ) : (
        <CircularProgress />
      )}
      <Button variant="contained" onClick={handleFormSubmit} fullWidth>
        Save
      </Button>
    </>
  );
}

export default EditUser;
