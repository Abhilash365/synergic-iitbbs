import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./Navbar"; 
import Newskill from "./Newskill.jsx";
import Login from "./Login";
import Home from "./Home.jsx";
import Contribute from "./Contribute.jsx";
import Materials from "./Materials.jsx";
import Papers from "./Papers.jsx";
import QuestionPaper from "./QuestionPapers.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {/* Navbar is now visible to everyone so they can see the links */}
      <Navbar  />
      <Routes>
        {/* Public Routes - No Login Required */}
        <Route path="/" element={<Papers />} />
        <Route path="/questionpapers/:subject" element={<QuestionPaper />} />
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/newskill" element={<Newskill />} />
            <Route path="/contribute" element={<Contribute />} />
          </>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/questionpapers" />} />
      </Routes>
    </>
  );
}