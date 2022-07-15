import React from "react";
import "./style.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Container, Stack } from "@mui/material";
import { Box } from "@mui/system";

function Contact() {
  return (
    <>
      <Nav />
      <section className="contact">
        <Container>
          <Box
            sx={{
              display: "flex",
              margin: "auto",
            }}>
            <div className="left-contact ">
              <Stack spacing={2}>
                <h2 style={{ marginTop: "0px" }}>Contact</h2>
                <p>Phone Number: <a href="tel:8609783147">(860) 978-3147</a></p>
                <p>Email Address: <a href="mailto:tina@pandolfo.com">tina@pandolfo.com</a></p>
              </Stack>
              <Stack spacing={2}>
                <h2>Hours</h2>
                <p>Sunday: Closed</p>
                <p>Monday: Closed</p>
                <p>Tuesday: 8:00 AM - 8:00 PM</p>
                <p>Wednesday: 8:00 AM - 8:00 PM</p>
                <p>Thursday: 8:00 AM - 2:00 PM</p>
                <p>Friday: 8:00 AM - 2:00 PM</p>
                <p>Saturday: 7:30 AM - 12:00 PM</p>
              </Stack>
            </div>
            <div className="right-contact">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2980.3163652481016!2d-72.86962078456543!3d41.67051047923916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7b0e93c48e505%3A0xcc3ff95d1a62dc9c!2sHairsay%20Salon%20LLC!5e0!3m2!1sen!2sus!4v1651523807271!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: "0px" }}
                allowFullScreen={false}
                title="salonLocation"
                loading="lazy"></iframe>
            </div>
          </Box>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
