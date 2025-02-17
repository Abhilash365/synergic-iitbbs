import React, { useState } from "react";
import "./Papers.css";
import Card from "./Card.jsx";
import "./card.css";
import Navbar from "./Navbar.jsx";

function Papers() {
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState(""); 
  const [selected, setSelected] = useState(""); 
  const [subjectDetails, setSubjectDetails] = useState([
    { name: "Mathematics", code: "MA1L001", materials_available: "0" },
    { name: "Chemistry", code: "CY1L001", materials_available: "0" },
    { name: "English", code: "HS1L002", materials_available: "0" },
    { name: "Electrical Technology", code: "EE1L001", materials_available: "0" }
  ]); // Default subjects

  const handleSelect = (event) => setBranch(event.target.value);
  const handleSelect1 = (event) => setSelected(event.target.value);

  const handleFindClick = async () => {
    if (!branch || !selected) {
      alert("Please select both branch and semester.");
      return;
    }
  
    setLoading(true); // Start loading animation
  
    try {
      const response = await fetch(`http://localhost:5000/subjects/${branch}/${selected}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setSubjectDetails(data.success ? data.subjects : []);
      console.log("Server Response:", data.subjects);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSubjectDetails([]); // Reset if error occurs
    } finally {
      setLoading(false); // Stop loading animation
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

        <select onChange={handleSelect1} value={selected} className="dropdown">
          <option className="dropdown_option" value="">Semester</option>
          <option value="chemistry-Semester">Chemistry Semester</option>
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

      {/* <div className="main56">
        {subjectDetails.length > 0 ? (
          subjectDetails.map((subject, index) => (
            <Card 
              key={index} 
              subject={subject.name}
              code={subject.code}
              num_mat={subject.materials_available}
            />
          ))
        ) : (
          <p>No subjects found.</p>
        )}
      </div> */}


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
