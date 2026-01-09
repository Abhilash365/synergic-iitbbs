import React, { useState, useEffect } from "react";
import "./Papers.css";
import Card from "./Card.jsx";
import "./card.css";

function Papers() {
  const [loading, setLoading] = useState(false);

  // 1. Initialize state from sessionStorage if it exists
  const [branch, setBranch] = useState(() => {
    return sessionStorage.getItem("saved_branch") || "";
  });

  const [semester, setSemester] = useState(() => {
    return sessionStorage.getItem("saved_semester") || "chemistry-Semester";
  });

  const [subjectDetails, setSubjectDetails] = useState(() => {
    const savedSubjects = sessionStorage.getItem("saved_subjects");
    return savedSubjects ? JSON.parse(savedSubjects) : [
      { name: "Mathematics", code: "MA1L001", materials_available: "0" },
      { name: "Chemistry", code: "CY1L001", materials_available: "0" },
      { name: "English", code: "HS1L002", materials_available: "0" },
      { name: "Electrical Technology", code: "EE1L001", materials_available: "0" }
    ];
  });

  const handleSelect = (event) => setBranch(event.target.value);
  const handleSelect1 = (event) => setSemester(event.target.value);

  const handleFindClick = async () => {
    if (!branch || !semester) {
      alert("Please select both branch and semester.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://synergic-iitbbs-backend.onrender.com/subjects/${branch}/${semester}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const subjects = data.success ? data.subjects : [];

      // 2. Update state and Save to sessionStorage
      setSubjectDetails(subjects);
      sessionStorage.setItem("saved_branch", branch);
      sessionStorage.setItem("saved_semester", semester);
      sessionStorage.setItem("saved_subjects", JSON.stringify(subjects));

      console.log("Server Response:", subjects);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSubjectDetails([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="NavDrop">
        <select onChange={handleSelect} value={branch} className="dropdown">
          <option value="">Branch</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EE">EE</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
          <option value="Metallurgy">Metallurgy</option>
          <option value="Engineering Physics">Engineering Physics</option>
        </select>

        <select onChange={handleSelect1} value={semester} className="dropdown">
          <option className="dropdown_option" value="">Semester</option>
          <option value="chemistry-Semester">chemistry Semester</option>
          <option value="Physics-Semester">Physics Semester</option>
          <option value="Semester_3">Semester 3</option>
          <option value="Semester_4">Semester 4</option>
          <option value="Semester_5">Semester 5</option>
          <option value="Semester_6">Semester 6</option>
          <option value="Semester_7">Semester 7</option>
          <option value="Semester_8">Semester 8</option>
        </select>

        <button className={`paper_find ${loading ? "loading" : ""}`} onClick={handleFindClick} disabled={loading}>
          {loading ? "" : "Find"}
        </button>
      </div>

      <div className="main56">
        {subjectDetails.length > 0 ? (
          subjectDetails.map((subject, index) => {
            const isLastRow = index >= Math.floor(subjectDetails.length / 3) * 3;
            return (
              <div key={index} className={isLastRow ? "flex-row" : ""}>
                <Card 
                  subject={subject.name} 
                  code={subject.code} 
                  num_mat={subject.materials_available}
                  semester={semester}
                />
              </div>
            );
          })
        ) : (
          <p>No subjects found.</p>
        )}
      </div>
    </div>
  );
}

export default Papers;