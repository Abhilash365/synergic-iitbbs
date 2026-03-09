import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login1.css'; // Reusing your existing CSS for the same design
import illustration from '../../images/login.png'; 
import Toast from '../Toast/Toast';

function Signup() {  
    const [credentials, setCredentials] = useState({ username: "", password: "", cpassword: "" });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (credentials.password !== credentials.cpassword) {
            setToast({ type: "error", message: "Passwords do not match!" });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://synergic-iitbbs-backend.onrender.com/api/createUser", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: credentials.username, 
                    password: credentials.password 
                })
            });
            
            const json = await response.json();
            
            if (!json.success) {
                setToast({ type: "error", message: "User already exists" });
            } else {
                setToast({ type: "success", message: "Account created! Redirecting to login..." });
                setTimeout(() => navigate("/"), 2000); // Redirect to login path
            }
        } catch (error) {
            setToast({ type: "error", message: "Connection failed. Try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
            
            <div className="book-container">
                <div className="illustration-side">
                    <img src={illustration} alt="Reading Illustration" />
                </div>
                <div className="book-side">
                    <div className="login-card">
                        <h2 className="welcome-text">Create Account</h2>
                        
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="input-group">
                                <label>Username</label>
                                <input type="text" name="username" value={credentials.username} onChange={onChange} required />
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <input type="password" name="password" value={credentials.password} onChange={onChange} required />
                            </div>

                            {/* Added Confirm Password here */}
                            <div className="input-group">
                                <label>Confirm Password</label>
                                <input type="password" name="cpassword" value={credentials.cpassword} onChange={onChange} required />
                            </div>

                            <div className="signup-prompt">
                                <span>Already have an account? </span>
                                <Link to="/" className="signup-link">Sign in</Link>
                            </div>

                            {/* Using the styled button for the primary action */}
                            <button type="submit" className="sign-in-btn" disabled={loading} style={{ marginTop: '10px' }}>
                                {loading ? "Creating Account..." : "Sign Up"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;