import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import Toast from '../Toast/Toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("https://synergic-backend.onrender.com/api/contact", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const json = await response.json();

            if (json.success) {
                setToast({ type: "success", message: "Message sent! We'll get back to you soon." });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setToast({ type: "error", message: json.error || "Failed to send message." });
            }
        } catch (error) {
            setToast({ type: "error", message: "Some Error occurred. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page-container">
            {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}


            <div className="bg-shape"></div>

            <div className="contact-card">
                <div className="contact-info">
                    <div className="mail-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </div>
                    <h1 className="main-title">Leave Us A Message</h1>
                    <p className="description">
                        Please help us in improving our website by giving your valuable insights.
                    </p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Your Name*" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Your Email*" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                    <input 
                        type="text" 
                        name="subject" 
                        placeholder="Subject*" 
                        value={formData.subject}
                        onChange={handleChange}
                        required 
                    />
                    <textarea 
                        name="message" 
                        placeholder="Type your message here*" 
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                    
                    <button type="submit" className="send-btn" disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
            
            {/* BACK BUTTON SECTION */}
            <div className="styled-wrapper">
                <button className="back-button" onClick={() => navigate('/questionpapers')}>
                    <div className="button-box">
                        <span className="button-elem">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
                                <path fill="black" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                            </svg>
                        </span>
                        <span className="button-elem">
                            <svg fill="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
                                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                            </svg>
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Contact;