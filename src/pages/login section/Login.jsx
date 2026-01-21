import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { auth, googleProvider, signInWithPopup } from "../../firebase"; 
import './Login1.css';
import pen from '../../images/logo.png';

function Login({ setAuth }) {  
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [rememberMe, setRememberMe] = useState(false); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // --- Google Auth with Firebase ---
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            // Set cookie using Google Display Name
            Cookies.set('username', user.displayName, { expires: 7 });
            
            // LOG THE USERNAME
            console.log("Logged in user (Google):", user.displayName);
            
            setAuth(true);
            navigate("/questionpapers");
        } catch (error) {
            console.error("Google Auth Error:", error);
            alert("Google Sign-In failed.");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    // --- Custom Backend Login ---
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
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
                Cookies.set('username', credentials.username, { expires: rememberMe ? 7 : undefined });

                // LOG THE USERNAME
                console.log("Logged in user (Backend):", credentials.username);

                setAuth(true); 
                navigate("/questionpapers"); 
            } else {
                alert(json.message || "Invalid credentials");
            }
        } catch (error) {
            alert("Login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="logo"><img src={pen} alt="Logo"/></div>
            <div className="login-box">
                <h2 className="login-title">Sign In</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={onChange} className="login-input" required />
                    </div>
                    <div className="input-wrapper">
                        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange} className="login-input" required />
                    </div>

                    <div className="remember-me-container" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: 'white' }}>
                        <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} style={{ marginRight: '10px' }} />
                        <label htmlFor="rememberMe">Remember Me</label>
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className="separator" style={{ color: 'gray', margin: '20px 0', textAlign: 'center' }}>OR</div>

                <button onClick={handleGoogleLogin} className="google-btn" style={{ width: '100%', padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google" width="20px"/>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}

export default Login;