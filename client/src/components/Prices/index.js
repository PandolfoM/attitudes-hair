import React from "react";
import { Box, Button, Paper } from "@mui/material";
import { useQuery } from "@apollo/client";
import RemoveItem from "../RemovePrice";
import EditItem from "../EditItem";
import AddPrice from "../AddPrice";
import { QUERY_PRICES } from "../../utils/queries";

function Prices() {
  const { refetch } = useQuery(QUERY_PRICES);

  const handleRefetch = () => {
    refetch();
  };

  return (
    <Box>
      <h2>Price Menu Settings</h2>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <Paper
          sx={{
            "& .MuiTextField-root": { margin: "8px 0", width: "100%" },
            "& .MuiFormControl-root": { margin: "8px 0", width: "100%" },
            width: "500px",
            margin: "10px",
            height: "auto",
            textAlign: "center",
          }}>
          <h3>Add Item</h3>
          <Box component="form" sx={{ margin: "10px", height: "100%" }}>
            <AddPrice />
          </Box>
        </Paper>
        <Paper
          sx={{
            "& .MuiTextField-root": { margin: "8px 0", width: "100%" },
            "& .MuiFormControl-root": { margin: "8px 0", width: "100%" },
            width: "500px",
            margin: "10px",
            height: "auto",
            textAlign: "center",
          }}>
          <h3>Remove Item</h3>
          <Box component="form" sx={{ margin: "10px", height: "100%" }}>
            <RemoveItem />
          </Box>
        </Paper>
        <Paper
          sx={{
            "& .MuiTextField-root": { margin: "8px 0", width: "100%" },
            "& .MuiFormControl-root": { margin: "8px 0", width: "100%" },
            width: "500px",
            margin: "10px",
            height: "auto",
            textAlign: "center",
          }}>
          <h3>Edit Item</h3>
          <Box component="form" sx={{ margin: "10px", height: "100%" }}>
            <EditItem />
          </Box>
        </Paper>
        <Box
          sx={{
            width: "500px",
            margin: "10px",
            height: "auto",
            textAlign: "center",
          }}>
          <Button
            variant="contained"
            onClick={handleRefetch}
            sx={{ width: "100%" }}>
            Refresh
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Prices;
