import React from "react";
import CardComponent from "../components/CardComponent";
import { Container } from "react-bootstrap";
import NavBar from "../components/navBar";
function Home() {
  return (
    <>
      <NavBar />
      <Container>
        <br />
        <CardComponent />
      </Container>
    </>
  );
}

export default Home;
