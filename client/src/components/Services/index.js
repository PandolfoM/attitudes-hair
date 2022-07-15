import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import "./style.css";
import Cleaning from "../../assets/cleaning.jpg"
import Cutting from "../../assets/cutting.jpg"
import Waxing from "../../assets/waxing.jpg"

function Services() {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: "center", marginTop: "50px" }}>
      <Container>
        <header className="service" id="service">
          <Typography variant="h4">Services</Typography>
          <hr
            style={{
              width: "5rem",
              border: "solid 1px",
              borderColor: theme.palette.primary.main,
            }}
          />
        </header>
        <Box sx={{ flexGrow: 1, marginTop: "25px", overflow: "hidden" }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={9} md={3} className="img-container">
              <img
                className="service-img waxing-img"
                src={Waxing}
                alt="waxing service"></img>
              <Typography className="text-img" variant="h6">
                Waxing
              </Typography>
            </Grid>
            <Grid item xs={9} md={3} className="img-container">
              <img
                className="service-img hair-img"
                src={Cleaning}
                alt="hair treatment"></img>
              <Typography className="text-img" variant="h6">
                Hair Treatment
              </Typography>
            </Grid>
            <Grid item xs={9} md={3} className="img-container">
              <img
                className="service-img cut-img"
                src={Cutting}
                alt="hair cuts"></img>
              <Typography className="text-img" variant="h6">
                Hair Cuts
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Services;
