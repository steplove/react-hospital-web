import React from "react";
import video from "../Videos/video1.mp4";
import "../styles.css";
import { Link } from "react-router-dom";
import logo from "../images/unnamed.png";
import Button from "react-bootstrap/Button";
import { Container, Col, Image } from "react-bootstrap";

function Main() {
  return (
    <>
      <div className="video-background">
        <video autoPlay loop muted className="blur-video">
          <source src={video} type="video/mp4" />
        </video>
        <Container className="d-flex align-items-center">
          <Col sm="auto" md="auto" lg="auto" className="mx-auto text-center">
            <div className="d-flex justify-content-center mt-5">
              <Image
                src={logo}
                alt="Logo"
                style={{ width: "350px", height: "auto" }}
              />
            </div>
          </Col>
        </Container>
        <Container className="d-flex align-items-center">
          <Col sm="auto" md="auto" lg="auto" className="mx-auto text-center">
            <div className="d-flex justify-content-center mt-5">
              <Link to="/gallery">
                <Button variant="info">เข้าสู่หน้าเว็บไซต์</Button>
              </Link>
            </div>
          </Col>
        </Container>
      </div>
    </>
  );
}
export default Main;
