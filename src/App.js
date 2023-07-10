import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./screens/Main";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ManageProduct from "./screens/ManageProduct";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ManageProduct" element={<ManageProduct />} />
      </Routes>
    </Router>
  );
}
export default App;
