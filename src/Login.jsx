import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login1.css';
import pen from './pen.png';
// Link import removed because Signup is being removed

function Login({ setAuth }) {  
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [rememberMe, setRememberMe] = useState(false); // New state for checkbox
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("https://synergic-iitbbs-backend.onrender.com/api/loginUser", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: credentials.username, password: credentials.password })
            });

            const json = await response.json();
            
            if (!json.success) {
                alert("Enter valid credentials");
                setCredentials({ username: "", password: "" });
            } else {
                // Pass both auth status and rememberMe preference to App.js
                setAuth(true, rememberMe);  
                navigate("/questionpapers"); 
            }
        } catch (error) {
            alert("Login failed. Please try again later.");
        } finally {
            setLoading(false);
        }
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
        <div className="login-container">
            <div className="logo">
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

                    {/* Remember Me Checkbox */}
                    <div className="remember-me-container" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: 'white' }}>
                        <input 
                            type="checkbox" 
                            id="rememberMe" 
                            checked={rememberMe} 
                            onChange={(e) => setRememberMe(e.target.checked)}
                            style={{ marginRight: '10px', cursor: 'pointer' }}
                        />
                        <label htmlFor="rememberMe" style={{ cursor: 'pointer', fontSize: '14px' }}>Remember Me</label>
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                {/* Signup Section Removed as per your previous request */}
            </div>
        </div>
    );
}

export default Login;