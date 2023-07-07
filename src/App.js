import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./screens/Main";
import Home from "./screens/Home";
import Gallery from "./screens/Gallery";
import About from "./screens/About";
import Location from "./screens/Location";
import Event from "./screens/Event";
import Contact from "./screens/Contact";
import NavBar from "./components/navBar";
import Card from "./components/CardComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/location" element={<Location />} />
        <Route path="/event" element={<Event />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </Router>
  );
}
export default App;
