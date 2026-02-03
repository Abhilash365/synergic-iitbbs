import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Contribute.css";
import contri from "../../images/contribute.png";

export default function Contribute() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [allSubjects, setAllSubjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        year: "",
        type: "", // Added type
        subject: "",
        contributorName: "",
    });

    useEffect(() => {
        const savedUsername = Cookies.get("username");
        if (savedUsername) {
            setFormData((prev) => ({ ...prev, contributorName: savedUsername }));
        }

        const fetchSubjects = async () => {
            try {
                const response = await axios.get("https://synergic-iitbbs-backend.onrender.com/api/subjects");
                setAllSubjects(response.data);
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };
        fetchSubjects();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => setFile(event.target.files[0]);

    const handleUpload = async () => {
        setIsLoading(true);
        const { year, type, subject, contributorName } = formData;

        if (!file || !year || !type || !subject || !contributorName) {
            setMessage("⚠ Please fill all fields. Ensure you are logged in.");
            setIsLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("file", file);
        formDataToSend.append("year", year);
        formDataToSend.append("type", type); // Sending type to API
        formDataToSend.append("subject", subject.replace(/\s+/g, "_"));
        formDataToSend.append("contributorName", contributorName);

        try {
            const response = await axios.post("https://synergic-iitbbs-backend.onrender.com/upload", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                setMessage("✅ File uploaded successfully!");
                setFile(null);
                setFormData(prev => ({ ...prev, subject: "", type: "" }));
            } else {
                setMessage(`❌ Upload failed: ${response.data.error}`);
            }
        } catch (error) {
            setMessage("❌ Unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="all">
            <img src={contri} className="con_img" alt="Contribute" />
            <div className="main23">
                <h1 className="heading23">Contribute</h1>

                {/* Year Selection */}
                <select name="year" value={formData.year} onChange={handleChange} className="dropdownss">
                    <option value="">Year of Study</option>
                    {Array.from({ length: 9 }, (_, i) => {
                        const start = 2017 + i;
                        const range = `${start}-${start + 1}`;
                        return <option key={range} value={range}>{range}</option>;
                    })}
                </select>

                {/* Type Selection (Replaced Branch) */}
                <select name="type" value={formData.type} onChange={handleChange} className="dropdownss">
                    <option value="">Select Type</option>
                    <option value="Mid Sem">Mid Sem</option>
                    <option value="End Sem">End Sem</option>
                    <option value="Class Test">Class Test</option>
                    <option value="Others">Others</option>
                </select>

                {/* Subject Search */}
                <input 
                    list="subject-hints"
                    name="subject"
                    placeholder="Search Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="dropdownss"
                    autoComplete="off"
                />
                <datalist id="subject-hints">
                    {allSubjects.map((subj) => (
                        <option key={subj._id} value={subj.name}>{subj.code}</option>
                    ))}
                </datalist>

                <div className="file-drop-area" onClick={() => document.getElementById("fileInput").click()}>
                    {file ? <p>📄 {file.name}</p> : <p>Click to Upload File</p>}
                    <input id="fileInput" type="file" onChange={handleFileChange} style={{display: 'none'}} />
                </div>

                <button onClick={handleUpload} className="upload" disabled={isLoading}>
                    {isLoading ? "Uploading..." : "Contribute"}
                </button>

                {message && <p style={{ color: 'white', marginTop: '10px' }}>{message}</p>}
            </div>
        </div>
    );
}