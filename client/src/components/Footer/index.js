import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import { Box } from "@mui/system";
import "./style.css";
import { Button, Container } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ marginTop: "50px" }}>
      <footer>
        <Container>
          <Box
            sx={{
              display: "flex",
              width: "65%",
              margin: "auto",
            }}>
            <div className="left-box">
              <a href="https://goo.gl/maps/8J7nv9fTG9uY51BYA" target="__blank">
                <LocationOnIcon
                  sx={{
                    backgroundColor: "#2d2d2d",
                    padding: "10px",
                    borderRadius: "100%",
                    marginRight: "10px",
                  }}
                />{" "}
                27 Whiting St #2218, Plainville, CT 06062
              </a>
              <a href="tel:8607478044" target="__blank">
                <Phone
                  sx={{
                    backgroundColor: "#2d2d2d",
                    padding: "10px",
                    borderRadius: "100%",
                    marginRight: "10px",
                  }}
                />{" "}
                +1 (860) 747 8044
              </a>
              <a href="mailto:matt@pandolf.com" target="__blank">
                <Email
                  sx={{
                    backgroundColor: "#2d2d2d",
                    padding: "10px",
                    borderRadius: "100%",
                    marginRight: "10px",
                  }}
                />{" "}
                test Email
              </a>
            </div>
            <div className="right-box">
              <h3>About the company</h3>
              <p style={{opacity: "0.5", fontWeight: "300"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </Box>
        </Container>
      </footer>
    </Box>
  );
}

export default Footer;
