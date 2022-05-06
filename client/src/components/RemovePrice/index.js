import { useMutation, useQuery } from "@apollo/client";
import { Autocomplete, Button, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { DELETE_PRICE } from "../../utils/mutations";
import { QUERY_PRICES } from "../../utils/queries";

function RemoveItem() {
  const { loading, data: pricesData } = useQuery(QUERY_PRICES);
  const [deleteItem, { error }] = useMutation(DELETE_PRICE);
  const [formState, setFormState] = useState();
  const prices = pricesData?.prices;
  let priceNames = [];

  if (prices) {
    for (let i = 0; i < prices.length; i++) {
      priceNames.push(prices[i].name);
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await deleteItem({
        variables: {
          name: formState,
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
      {!loading ? (
        <Autocomplete
          fullWidth
          disablePortal
          name="name"
          options={priceNames}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} label="Items" />}
        />
      ) : (
        <CircularProgress />
      )}
      {error && <Typography color="error">Field empty</Typography>}
      <Button variant="contained" fullWidth onClick={handleFormSubmit}>
        Remove Item
      </Button>
    </>
  );
}

export default RemoveItem;
