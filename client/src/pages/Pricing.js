import React from "react";
import "./style.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@apollo/client";
import { QUERY_PRICES } from "../utils/queries";

function Contact() {
  const { loading, data } = useQuery(QUERY_PRICES);
  const prices = data?.prices;

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
          marginTop: "10px",
          flexDirection: "column"
        }}>
        <p><span style={{color: "red"}}>*</span> Prices will be adjusted accordingly with length & difficulty of service provided.</p>
        <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            {data ? (
              <TableBody>
                {data.prices.map((prices) => (
                  <TableRow key={prices._id}>
                    <TableCell component="th" scope="row">
                      {prices.name}
                    </TableCell>
                    {prices.additional ? (
                      <TableCell component="th" scope="row">
                        ${prices.price} <span style={{color: "red"}}>*</span>
                      </TableCell>
                    ) : (
                      <TableCell component="th" scope="row">
                        ${prices.price}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            ) : null}
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </>
  );
}

export default Contact;
