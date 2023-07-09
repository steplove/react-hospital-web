import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./screens/Main";
import Home from "./screens/Home";
import Gallery from "./screens/Gallery";
import About from "./screens/About";
import Location from "./screens/Location";
import AddProduct from "./screens/AddProduct";
import Contact from "./screens/Contact";
import NavBar from "./components/navBar";
import Card from "./components/CardComponent";
import Login from "./screens/Login";

function App() {
  const [showNavbar, setShowNavbar] = useState(true);

  const hideNavbar = () => {
    setShowNavbar(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {!showNavbar && <NavBar />}
              <Main hideNavbar={hideNavbar} />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/location" element={<Location />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </Router>
  );
}

export default App;
