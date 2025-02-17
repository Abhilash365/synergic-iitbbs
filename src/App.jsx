import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./Navbar"; // Import Navbar
import Newskill from "./Newskill.jsx";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home.jsx";
import Contribute from "./Contribute.jsx";
import Materials from "./Materials.jsx";
import Papers from "./Papers.jsx";
import QuestionPaper from "./QuestionPapers.jsx";
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signin" element={<Login setAuth={setIsAuthenticated} />} />
      <Route path="/signup" element={<Signup />} />

      {/* Private Routes - With Navbar */}
      {isAuthenticated ? (
        <Route
          path="/*"
          element={
            <>
              <Navbar setAuth={setIsAuthenticated} />
              <Routes>
                <Route path="/materials" element={<Materials />} />
                <Route path="/newskill" element={<Newskill />} />
                <Route path="/questionpapers" element={<Papers />} />
                <Route path="/contribute" element={<Contribute />} />
                <Route path="/questionpapers/:subject" element={<QuestionPaper />} />
              </Routes>
            </>
          }
        />
      ) : (
        <Route path="*" element={<Navigate to="/signin" />} />
      )}
    </Routes>
  );
}
