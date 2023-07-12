import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./navbar.css";
import "../App.css";
function NavBar() {
  const handLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location = "/login";
  };

  return (
    <Navbar
      className="navbar-transparent font"
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
            รายการ 
          </Nav.Link>
          <Nav.Link as={Link} class="w3-bar-item w3-button" to="/ManageProduct">
            ManageProduct
          </Nav.Link>
          <Nav.Link
            as={Link}
            onClick={handLogout}
            class="w3-bar-item w3-button"
            to="/login"
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
