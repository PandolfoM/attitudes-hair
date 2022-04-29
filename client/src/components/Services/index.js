import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import "./style.css";

function Services() {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: "center", marginTop: "50px" }}>
      <Container>
        <header className="service">
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
                src="https://www.annahealthandbeauty.com/wp-content/uploads/2017/07/eyebrowwaxing.jpg"
                alt="waxing service"></img>
              <Typography className="text-img" variant="h6">
                Waxing
              </Typography>
            </Grid>
            <Grid item xs={9} md={3} className="img-container">
              <img
                className="service-img hair-img"
                src="https://th.bing.com/th/id/R.13ba8f4b061e805db63b2fbbd6e8be95?rik=Qgx%2fSj6JIX7w7w&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2018%2f11%2fHair-Treatment.jpg&ehk=doEPmC5MLq8ygH%2bDkG9Le05sm1RGHQSLXVA99c27OJ8%3d&risl=&pid=ImgRaw&r=0"
                alt="hair treatment"></img>
              <Typography className="text-img" variant="h6">
                Hair Treatment
              </Typography>
            </Grid>
            <Grid item xs={9} md={3} className="img-container">
              <img
                className="service-img cut-img"
                src="https://th.bing.com/th/id/R.1096b8edff38e5e1e7e84df7601ef488?rik=k7IZv92H3m7BpA&riu=http%3a%2f%2fghk.h-cdn.co%2fassets%2f15%2f32%2f1438880150-hair-cut-1.jpg&ehk=bK22evWuz26qLt2tAgAeZTeA0dU98GGrlmAunYoKZi8%3d&risl=&pid=ImgRaw&r=0"
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
