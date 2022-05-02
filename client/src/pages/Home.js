import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Nav from "../components/Nav";

function Home() {
  return (
    <>
      <Nav page="contact"/>
      <Hero />
      <About />
      <Services />
    </>
  );
}

export default Home;
