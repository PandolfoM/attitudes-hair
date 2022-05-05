import { useMutation } from "@apollo/client";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Auth from "../../utils/auth";
import { ADD_PRICE } from "../../utils/mutations";

function AddPrice() {
  const [addPrice, { error }] = useMutation(ADD_PRICE);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    extra: false,
  });

  const handleFormSubmit = async (event) => {
    try {
      let extra;
      if (formState.extra === "true") {
        extra = true;
      } else {
        extra = false;
      }

      const mutationResponse = await addPrice({
        variables: {
          name: formState.name,
          price: parseInt(formState.price),
          additional: extra,
        },
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
  };

  return (
    <>
      {error && formState.name === "" ? (
        <TextField
          error
          name="name"
          label="Name *"
          variant="outlined"
          onChange={handleChange}
        />
      ) : (
        <TextField
          name="name"
          label="Name *"
          variant="outlined"
          onChange={handleChange}
        />
      )}
      {error && formState.price === "" ? (
        <TextField
          error
          name="price"
          label="Price *"
          type="number"
          variant="outlined"
          onChange={handleChange}
        />
      ) : (
        <TextField
          name="price"
          label="Price *"
          type="number"
          variant="outlined"
          onChange={handleChange}
        />
      )}
      <FormControl sx={{ display: "flex", textAlign: "left" }}>
        <FormLabel>Extra Cost *</FormLabel>
        <RadioGroup row value={formState.extra} onChange={handleChange}>
          <FormControlLabel
            name="extra"
            value={false}
            control={<Radio />}
            label="No"
          />
          <FormControlLabel
            name="extra"
            value={true}
            control={<Radio />}
            label="Yes"
          />
        </RadioGroup>
      </FormControl>
      {error && <Typography color="error">Field(s) empty</Typography>}
      <Button variant="contained" fullWidth onClick={handleFormSubmit}>
        Add Item
      </Button>
    </>
  );
}

export default AddPrice;
