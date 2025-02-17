import React, { useState } from 'react';
import './Login1.css';
import { useNavigate } from 'react-router-dom';
import pen from './pen.png';
import { Link } from 'react-router-dom';

function Signup() {
    const [credentials, setCredentials] = useState({ username: "", password: "", cpassword: "" });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (credentials.password !== credentials.cpassword) {
            alert("Passwords do not match!");
        } else {
            const response = await fetch("http://localhost:5000/api/createUser", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: credentials.username, password: credentials.password })
            });
            const json = await response.json();
            console.log(json);
            if (!json.success) {
                alert("User already exists, please move to the sign-in page.");
            } else {
                navigate("/signin");
            }
        }
        setLoading(false);
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit(event);
        }
    };

    return (
        <>
            {/* <div className='start'>
                <div className="heading"><img src={pen} alt="Logo" />
                </div>
                <div className='middle_input_area'>
                <div className="signup_text">Signup</div>

                <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                    <div className="input">
                        <div className="username">
                            <input
                                type="text"
                                className='input_box'
                                placeholder='Username'
                                name='username'
                                value={credentials.username}
                                onChange={onChange}
                            />
                        </div>
                        <div className="password">
                            <input
                                type="password"
                                className='input_box'
                                placeholder='Password'
                                name='password'
                                value={credentials.password}
                                onChange={onChange}
                            />
                        </div>
                        <div className="conformPassword">
                            <input
                                type="password"
                                className='input_box'
                                placeholder='Confirm Password'
                                name='cpassword'
                                value={credentials.cpassword}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <button type='submit' className='signup_btn'>Sign up</button>
                </form>
                </div>

                <div className="last_text">
                    <div className='account'>Already have an account?</div>
                    <div className='signup'><Link to="/signin">Sign in</Link></div>
                </div>
            </div> */}
              <div className="login-container">
              <div  className="logo" >
                  <img src={pen} alt="Logo"/>
                </div>
            
                <div className="login-box">
                  <h2 className="login-title">Sign Up</h2>
            
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
                    <div className="input-wrapper">
                            <input
                                type="password"
                                className='login-input'
                                placeholder='Confirm Password'
                                name='cpassword'
                                value={credentials.cpassword}
                                onChange={onChange}
                            />
                        </div>
            
                        <button type="submit" className="login-button" disabled={loading}>
    {loading ? "Signing Up..." : "Sign Up"}
</button>

                  </form>
            
             <div className="forgot-password">
             <br />
             <br />
                                <div className='account'>Already have an account?</div>
                                <br />
                                <div className='signup'><Link to="/signin">Sign In</Link></div>
                            </div>
                </div>
              </div>
        </>
    );
}

export default Signup;
