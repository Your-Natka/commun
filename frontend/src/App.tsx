import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./pages/WelcomePage";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Messenger from "./pages/Messenger";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messenger" element={<Messenger />} />
      </Routes>
    </Router>
  );
}

export default App;
