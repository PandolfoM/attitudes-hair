import React from "react";
import { Box, Button, Paper } from "@mui/material";
import { useQuery } from "@apollo/client";
import AddUser from "../AddUser";
import RemoveUser from "../RemoveUser";
import { QUERY_USERS } from "../../utils/queries";
import EditUser from "../EditUser";

function Prices() {
  const { refetch } = useQuery(QUERY_USERS);

  const handleRefetch = () => {
    refetch();
  };
  return (
    <Box>
      <h2>User Settings</h2>
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
          <h3>Add User</h3>
          <Box component="form" sx={{ margin: "10px", height: "100%" }}>
            <AddUser />
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
          <h3>Remove User</h3>
          <Box component="form" sx={{ margin: "10px", height: "100%" }}>
            <RemoveUser />
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
          <h3>Edit User</h3>
          <Box component="form" sx={{ margin: "10px", height: "100%" }}>
            <EditUser />
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
