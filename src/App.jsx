import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./Navbar"; 
import Login from "./pages/login section/Login.jsx";
import Contribute from "./pages/contribute section/Contribute.jsx";
import Materials from "./pages/Material Section/Materials.jsx";
import Papers from "./pages/question papers section/Papers.jsx";
import QuestionPaper from "./pages/question papers section/QuestionPapers.jsx";
export default function App() {
  // Initialize state directly from storage to prevent logout on refresh
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("isAuthenticated") === "true";
  });

  // Sync state changes to sessionStorage
  const handleAuth = (status) => {
    setIsAuthenticated(status);
    if (status) {
      sessionStorage.setItem("isAuthenticated", "true");
    } else {
      sessionStorage.removeItem("isAuthenticated");
    }
  };

  // Log for debugging
  useEffect(() => {
    console.log("Persistence Check - Is Authenticated:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route 
        path="/" 
        element={!isAuthenticated ? <Login setAuth={handleAuth} /> : <Navigate to="/questionpapers" />} 
      />

      {isAuthenticated ? (
        <Route
          path="/*"
          element={
            <>
              <Navbar setAuth={handleAuth} />
              <Routes>
                <Route path="/materials" element={<Materials />} />
                <Route path="/questionpapers" element={<Papers />} />
                <Route path="/contribute" element={<Contribute />} />
                <Route path="/questionpapers/:subject" element={<QuestionPaper />} />
                <Route path="*" element={<Navigate to="/questionpapers" />} />
              </Routes>
            </>
          }
        />
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
}