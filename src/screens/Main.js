import React from "react";
// import video from "../Videos/video1.mp4";
import { Link } from "react-router-dom";
// import logo from "../images/unnamed.png";
import backImg from "../images/Untitled design.jpg";
import Button from "react-bootstrap/Button";
import { Container, Col, Image } from "react-bootstrap";
import "../App.css";
function Main() {
  return (
    <>
      {/* <div className="video-background">
        <video autoPlay loop muted className="blur-video">
          <source src={video} type="video/mp4" />
        </video> */}
      <Image
        src={backImg}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Container className="font" style={{ position: "relative", zIndex: 1 }}>
        <div className="row justify-content-center" style={{ marginTop: "30%" }}>
          <div className="font2 text-center" >
            <label>Champ Resort and Restaurant</label>
          </div>
          <Col
            sm="auto"
            md="4"
            lg="4"
            className="mx-auto text-center "
            style={{ marginTop: "5%" }}
          >
            <Link to="/login">
              <Button variant="info">เข้าสู่หน้าเว็บไซต์</Button>
            </Link>
          </Col>
        </div>
      </Container>

      {/* </div> */}
    </>
  );
}
export default Main;
