import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login1.css';
import pen from '../../images/logo.png';

function Login({ setAuth }) {  
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [rememberMe, setRememberMe] = useState(false); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!credentials.username || !credentials.password) {
            alert("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://synergic-iitbbs-backend.onrender.com/api/loginUser", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: credentials.username, 
                    password: credentials.password 
                })
            });

            const json = await response.json();
            
            if (json.success) {
                // In a real app, you might save json.authToken here
                setAuth(true); // Updates App.js state and localStorage
                navigate("/questionpapers"); 
            } else {
                alert(json.message || "Invalid credentials");
                setCredentials({ ...credentials, password: "" });
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login failed. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
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

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={credentials.username}
                            onChange={onChange}
                            className="login-input"
                            required
                        />
                    </div>
                    
                    <div className="input-wrapper">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            onKeyDown={handleKeyDown}
                            className="login-input"
                            required
                        />
                    </div>

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
            </div>
        </div>
    );
}

export default Login;