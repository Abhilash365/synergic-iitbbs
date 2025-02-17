import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Contribute.css";
import contri from "./contri.png";
import subjectsData from "./subjects.json";

export default function Contribute() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    const [formData, setFormData] = useState({
        year: "",
        branch: "",
        semester: "",
        subject: "",
    });

    const [filteredSubjects, setFilteredSubjects] = useState([]);

    useEffect(() => {
        const { branch, semester } = formData;
        if (branch && semester) {
            setFilteredSubjects(subjectsData.BTech?.[branch]?.[semester] || []);
            setFormData((prev) => ({ ...prev, subject: "" }));
        } else {
            setFilteredSubjects([]);
        }
    }, [formData.branch, formData.semester]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => setFile(event.target.files[0]);

    const handleDragOver = (event) => event.preventDefault();
    const handleDrop = (event) => {
        event.preventDefault();
        setFile(event.dataTransfer.files[0]);
    };

    const handleUpload = async () => {
        const { year, branch, semester, subject } = formData;

        if (!file || !year || !branch || !semester || !subject) {
            setMessage("⚠ Please fill all fields and select a file.");
            return;
        }

        const formattedSubject = subject.replace(/\s+/g, "_");
        const formDataToSend = new FormData();
        formDataToSend.append("file", file);
        formDataToSend.append("year", year);
        formDataToSend.append("branch", branch);
        formDataToSend.append("semester", semester);
        formDataToSend.append("subject", formattedSubject);

        try {
            const response = await axios.post("http://localhost:5000/upload", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                setMessage("✅ File uploaded successfully!");
                setFileUrl(response.data.link);
            } else {
                setMessage(`❌ Upload failed: ${response.data.error || "Unknown error."}`);
            }
        } catch (error) {
            console.error("Upload Error:", error);
            setMessage(error.response?.data?.error || "❌ Unexpected error occurred.");
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
                    {Array.from({ length: 2025 - 2017 + 1 }, (_, i) => 2017 + i).map((yr) => (
                        <option key={yr} value={yr}>{yr}</option>
                    ))}
                </select>
                <br />

                {/* Branch & Semester Selection */}
                <div className="flexx">
                    <select name="branch" onChange={handleChange} value={formData.branch} className="dropdownsss">
                        <option value="">Branch</option>
                        {["CSE", "ECE", "EE", "Mechanical", "Civil", "Metallurgy", "Engineering Physics"].map((br) => (
                            <option key={br} value={br}>{br}</option>
                        ))}
                    </select>

                    <select name="semester" onChange={handleChange} value={formData.semester} className="dropdownsss">
                        <option value="">Semester</option>
                        {["Chemistry-Semester", "Physics-Semester", "Semester_3", "Semester_4", "Semester_5", "Semester_6", "Semester_7", "Semester_8"].map((sem) => (
                            <option key={sem} value={sem}>{sem}</option>
                        ))}
                    </select>
                </div>

                {/* Subject Selection */}
                <select name="subject" onChange={handleChange} value={formData.subject} className="dropdownss">
                    <option value="">Select Subject</option>
                    {filteredSubjects.map((subj, index) => (
                        <option key={index} value={`${subj.name}`}>
                            {subj.name}
                        </option>
                    ))}
                </select>
                <br />

                {/* File Upload */}
                <div 
    className="file-drop-area"
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    onClick={() => document.getElementById("fileInput").click()}
>
    {file ? <p>📄 {file.name}</p> : <p>Drag & Drop or Click to Upload File</p>}
    <input 
        id="fileInput" 
        type="file" 
        onChange={handleFileChange} 
        className="file-input-hidden" 
    />
</div>

                <br />
                <button onClick={handleUpload} className="upload">Contribute</button>

                {message && <p>{message}</p>}
            </div>
        </div>
    );
}