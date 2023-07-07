import React from "react";
import Banner from "../components/banner";
import CardComponent from "../components/CardComponent";
import { Container } from "react-bootstrap";
function Home() {
  return (
    <Container>
      <br/> 
      <Banner />
      <br/>
      <CardComponent/>
    </Container>
  );
}

export default Home;
