import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./navbar.css";

function NavBar() {
  return (
    <Navbar
      className="navbar-transparent"
      class="w3-bar w3-xlarge w3-black w3-opacity w3-hover-opacity-off"
      style={{ zIndex: 1 }}
    >
      <Navbar.Brand as={Link} to="/">
        Navbar
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link as={Link} class="w3-bar-item w3-button" to="/">
            Main
          </Nav.Link>
          <Nav.Link as={Link} class="w3-bar-item w3-button" to="/Home">
            Home
          </Nav.Link>
          <Nav.Link as={Link} class="w3-bar-item w3-button" to="/gallery">
            Gallery
          </Nav.Link>
          <Nav.Link as={Link} class="w3-bar-item w3-button" to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} class="w3-bar-item w3-button" to="/location">
            Location
          </Nav.Link>
          <Nav.Link as={Link} class="w3-bar-item w3-button" to="/event">
            Event
          </Nav.Link>
          <Nav.Link as={Link} class="w3-bar-item w3-button" to="/contact">
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
