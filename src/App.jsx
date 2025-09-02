import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

// --- Helper & Layout Components ---

/**
 * A layout component that includes the Navbar.
 * The <Outlet /> component renders the child route's element.
 */
const NavbarLayout = ({ setAuth }) => (
  <>
    <Navbar setAuth={setAuth} />
    <main className="p-4 pt-20"> {/* Add padding to avoid content hiding behind fixed navbar */}
      <Outlet />
    </main>
  </>
);

/**
 * A component to protect routes that require authentication.
 * If the user is authenticated, it renders the requested component.
 * Otherwise, it navigates the user to the login page.
 */
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};


// --- Placeholder Page Components (for demonstration) ---

const Navbar = ({ setAuth }) => {
    const handleLogout = () => {
        localStorage.setItem("isAuthenticated", "false");
        setAuth(false);
    };
    return (
        <nav style={{ position: 'fixed', top: 0, width: '100%', background: '#333', color: 'white', padding: '1rem', zIndex: 1000, display: 'flex', justifyContent: 'space-around' }}>
            <a href="/materials">Materials</a>
            <a href="/newskill">New Skill</a>
            <a href="/questionpapers">Question Papers</a>
            <a href="/contribute">Contribute</a>
            <button onClick={handleLogout} style={{ background: 'red', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </nav>
    );
};

const Login = ({ setAuth }) => {
    const handleLogin = () => {
        localStorage.setItem("isAuthenticated", "true");
        setAuth(true);
    };
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Login Page</h1>
            <p>Click to simulate logging in.</p>
            <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>Login</button>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    );
};

const Signup = () => <div style={{ textAlign: 'center', marginTop: '50px' }}><h1>Signup Page</h1><p><a href="/">Back to Login</a></p></div>;
const Materials = () => <h1>Materials Page</h1>;
const Newskill = () => <h1>New Skill Page</h1>;
const Papers = () => <h1>Question Papers Listing</h1>;
const Contribute = () => <h1>Contribute Page</h1>;
const QuestionPaper = () => <h1>Specific Question Paper</h1>;


// --- Main App Component ---

export default function App() {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to prevent flicker while checking auth status from localStorage
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(authStatus);
    } catch (error) {
      console.error("Could not read from localStorage", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // While checking auth, show a loading message to prevent content flicker
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <style>{`
        body {
          font-family: sans-serif;
          margin: 0;
          background-color: #f4f4f4;
        }

        h1 {
          color: #333;
        }
      `}</style>
      {/* Use BrowserRouter to enable routing */}
      <BrowserRouter>
        <Routes>
          {/* --- Public Routes --- */}
          {/* These routes are accessible whether you are logged in or not */}
          <Route path="/" element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} /> : <Navigate to="/materials" />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/materials" />} />

          {/* --- Protected Routes --- */}
          {/* All routes inside here will be protected and will show the Navbar */}
          <Route
            path="/*"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <NavbarLayout setAuth={setIsAuthenticated} />
              </ProtectedRoute>
            }
          >
            {/* Outlet in NavbarLayout renders these nested routes */}
            <Route path="materials" element={<Materials />} />
            <Route path="newskill" element={<Newskill />} />
            <Route path="questionpapers" element={<Papers />} />
            <Route path="questionpapers/:subject" element={<QuestionPaper />} />
            <Route path="contribute" element={<Contribute />} />
            {/* Add a fallback for any other authenticated routes to redirect */}
            <Route path="*" element={<Navigate to="/materials" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

