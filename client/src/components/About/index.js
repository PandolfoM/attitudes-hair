import React from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function About() {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: "center", marginTop: "20px" }}>
      <Container>
        <header>
          <Typography variant="h4">About Us</Typography>
          <hr
            style={{
              width: "5rem",
              marginTop: 0,
              border: "solid 1px",
              borderColor: theme.palette.primary.main,
            }}
          />
        </header>
        <Box sx={{ flexGrow: 1, marginTop: "25px" }}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Typography variant="h5" sx={{fontWeight: "500", marginBottom: "10px"}}>Category 1</Typography>
              <Typography variant="p" sx={{fontSize: "0.85rem"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh
                cras pulvinar mattis nunc sed blandit libero volutpat sed.
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="h5" sx={{fontWeight: "500", marginBottom: "10px"}}>Category 2</Typography>
              <Typography variant="p" sx={{fontSize: "0.85rem"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh
                cras pulvinar mattis nunc sed blandit libero volutpat sed.
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="h5" sx={{fontWeight: "500", marginBottom: "10px"}}>Category 3</Typography>
              <Typography variant="p" sx={{fontSize: "0.85rem"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh
                cras pulvinar mattis nunc sed blandit libero volutpat sed.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
