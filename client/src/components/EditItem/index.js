import { useMutation, useQuery } from "@apollo/client";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { UPDATE_PRICE } from "../../utils/mutations";
import { QUERY_PRICE, QUERY_PRICES } from "../../utils/queries";

function EditItem() {
  const [updatePrice] = useMutation(UPDATE_PRICE);
  const { data: pricesData } = useQuery(QUERY_PRICES);
  const [searchInput, setSearchInput] = useState();
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    extra: false,
  });
  const prices = pricesData?.prices;
  let priceNames = [];

  const { loading, data: priceData } = useQuery(QUERY_PRICE, {
    variables: { name: searchInput },
  });
  const price = priceData?.price;

  if (prices) {
    for (let i = 0; i < prices.length; i++) {
      priceNames.push(prices[i].name);
    }
  }

  const handleFormSubmit = async () => {
    try {
      let extra;
      if (formState.extra === "true") {
        extra = true;
      } else {
        extra = false;
      }
      await updatePrice({
        variables: {
          id: price._id,
          name: formState.name,
          price: parseInt(formState.price),
          additional: extra,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (price) {
      setFormState({
        name: price.name,
        price: price.price,
        extra: price.additional,
      });
    }
  }, [price]);

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
            options={priceNames}
            onChange={handleSearch}
            renderInput={(params) => (
              <TextField {...params} label="Search Item" />
            )}
          />
          {price ? (
            <Box>
              <TextField
                name="id"
                defaultValue={price._id}
                variant="outlined"
                sx={{ display: "none" }}
              />
              <TextField
                name="name"
                label="Name"
                defaultValue={price.name}
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                name="price"
                label="Price"
                type="number"
                defaultValue={price.price}
                variant="outlined"
                onChange={handleChange}
              />
              <FormControl sx={{ display: "flex", textAlign: "left" }}>
                <FormLabel>Extra Cost</FormLabel>
                <RadioGroup
                  row
                  defaultValue={price.additional}
                  onChange={handleChange}>
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

export default EditItem;
