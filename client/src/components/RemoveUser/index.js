import { useMutation, useQuery } from "@apollo/client";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DELETE_USER } from "../../utils/mutations";
import { QUERY_USERS } from "../../utils/queries";

function RemoveUser() {
  const [deleteUser, { error }] = useMutation(DELETE_USER);
  const { loading, data } = useQuery(QUERY_USERS);
  const [formState, setFormState] = useState();
  let userNames = [];
  if (data) {
    let userData = data.users;
    let users = { ...userData };

    for (let i = 0; i < userData.length; i++) {
      userNames.push(`${users[i].firstName} ${users[i].lastName} - ${users[i]._id}`);
    }
  }

  const handleFormSubmit = async () => {
    try {
      const regEx = /[^-]*$/
      let id = regEx.exec(formState)
      await deleteUser({
        variables: {
          id: id[0].trim(),
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event, value) => {
    setFormState(value);
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Autocomplete
            fullWidth
            disablePortal
            options={userNames}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} label="Search Item" />
            )}
          />
        </>
      )}
      {error && <Typography color="error">Field empty</Typography>}
      <Button variant="contained" onClick={handleFormSubmit} fullWidth>
        Remove User
      </Button>
    </>
  );
}

export default RemoveUser;
