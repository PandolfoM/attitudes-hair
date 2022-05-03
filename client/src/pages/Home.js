import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Footer />
    </>
  );
}

export default Home;
