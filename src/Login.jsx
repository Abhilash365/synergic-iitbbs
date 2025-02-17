import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login1.css';
import pen from './pen.png';
import { Link } from 'react-router-dom';

function Login({ setAuth }) {  // Accept setAuth as a prop
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
      setLoading(true);

        e.preventDefault();
        const response = await fetch("https://synergic-iitbbs-backend.onrender.com/api/loginUser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: credentials.username, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);
        
        if (!json.success) {
            alert("Enter valid credentials");
            setCredentials({ username: "", password: "" });
        } else {
            localStorage.setItem("isAuthenticated", "true");  // Save auth state
            setAuth(true);  // Update state in App.js
            navigate("/questionpapers");  // Redirect after login
        }
        setLoading(false);

    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && event.target.tagName === "INPUT") {
            handleSubmit(event);
        }
    };
    
    return (

<>

  <div className="login-container">
  <div  className="logo" >
      <img src={pen} alt="Logo"/>
    </div>

    <div className="login-box">
      <h2 className="login-title">Sign In</h2>

      <form className="login-form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            value={credentials.username}
            onChange={onChange}
            className="login-input"
          />
        </div>
        
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            className="login-input"
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
    {loading ? "Signing In..." : "Sign In"}
</button>
      </form>

 <div className="forgot-password">
  <br />
  <br />
                    <div className='account'>Don't have an account?</div>
                    <br />
                    <div className='signup'><Link to="/signup">Sign up</Link></div>
                </div>
    </div>
  </div>
</>

    );
}

export default Login;






