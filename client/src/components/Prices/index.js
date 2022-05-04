import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_PRICE } from "../../utils/mutations";
import Auth from "../../utils/auth";

function Prices() {
  const [addPrice, { error }] = useMutation(ADD_PRICE);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    extra: false,
  });

  const paperStyle = {
    width: "500px",
    margin: "10px",
    textAlign: "center",
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addPrice({
        variables: {
          name: formState.name,
          price: parseInt(formState.price),
          extra: formState.extra,
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
    <Box>
      <h2>Prices</h2>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <Paper
          color="nav"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
            "& .MuiFormControl-root": { m: 1, width: "100%" },
            width: "500px",
            margin: "10px",
            textAlign: "center",
          }}>
          <h3>Add Item</h3>
          <Box component="form" sx={{ m: 2 }}>
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
          </Box>
        </Paper>
        <Paper sx={paperStyle}>
          <h3>Remove Item</h3>
        </Paper>
        <Paper sx={paperStyle}>
          <h3>Edit Item</h3>
        </Paper>
      </Box>
    </Box>
  );
}

export default Prices;
