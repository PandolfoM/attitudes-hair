import React, { useState } from "react";
import "./style.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {
  Box,
  CircularProgress,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client";
import { QUERY_PRICES } from "../utils/queries";
import "./style.css"

function Contact() {
  const { loading, data } = useQuery(QUERY_PRICES);
  const [pageSize, setPageSize] = useState(40);

  function formatPrice(params) {
    return `$${params.row.price.toFixed(2)}`;
  }

  function formatExtra(params) {
    if (params.row.additional) {
      return `Yes`;
    }
  }

  const columns = [
    { field: "name", headerName: "Item", width: 500 },
    { field: "price", headerName: "Cost", width: 200, valueGetter: formatPrice },
    { field: "additional", headerName: "Service Fee *", valueGetter: formatExtra, }
  ];

  return (
    <>
      <Nav />
      <Container
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
          flexDirection: "column",
        }}>
        <Typography>
          <span style={{ color: "red", fontSize: "20px" }}>*</span> Prices will
          be adjusted accordingly with length & difficulty of service provided.
        </Typography>
        <Box className="priceChart">
          {data ? (
            <DataGrid
              rows={data.prices}
              columns={columns}
              getRowId={(row) => row._id}
              loading={loading}
              components={{
                Toolbar: GridToolbar,
                LoadingOverlay: LinearProgress,
              }}
              disableSelectionOnClick
              checkboxSelection
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[20, 30, 40, 50]}
            />
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Contact;
