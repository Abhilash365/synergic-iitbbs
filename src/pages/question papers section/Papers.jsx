import React, { useState } from "react";
import "./Papers.css";
import Card from "./../Cards/Card.jsx";
import "./../Cards/card.css";
import Toast from "../Toast/Toast.jsx";

function Papers() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [branch, setBranch] = useState(() => sessionStorage.getItem("saved_branch") || "");
  const [semester, setSemester] = useState(() => sessionStorage.getItem("saved_semester") || "");
  const [subjectDetails, setSubjectDetails] = useState(() => {
    const savedSubjects = sessionStorage.getItem("saved_subjects");
    return savedSubjects ? JSON.parse(savedSubjects) : [
      { name: "Mathematics", code: "MA1L001", materials_available: "0" },
      { name: "Chemistry", code: "CY1L001", materials_available: "0" },
      { name: "English", code: "HS1L002", materials_available: "0" },
      { name: "Electrical Technology", code: "EE1L001", materials_available: "0" }
    ];
  });

  const handleFindClick = async () => {
    if (!branch || !semester) {
      setToast({ type: "error", message: "Please select both branch and semester." });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://synergic-backend.onrender.com/subjects/${branch}/${semester}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const subjects = data.success ? data.subjects : [];

      setSubjectDetails(subjects);
      sessionStorage.setItem("saved_branch", branch);
      sessionStorage.setItem("saved_semester", semester);
      sessionStorage.setItem("saved_subjects", JSON.stringify(subjects));
      
      setToast({ type: "success", message: "Subjects updated successfully!" });
    } catch (error) {
      console.error("Error fetching data:", error);
      setToast({ type: "error", message: "Failed to fetch subjects. Please try again." });
      setSubjectDetails([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {toast && (
        <Toast 
          type={toast.type} 
          message={toast.message} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="NavDrop">
        {/* BRANCH DROPDOWN */}
        <div className="select">
          <div
            className="selected"
            data-default="Branch"
            data-cse="CSE"
            data-ece="ECE"
            data-ee="EE"
            data-mech="Mechanical"
            data-civil="Civil"
            data-met="Metallurgy"
            data-ep="Engineering Physics"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="arrow">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
            </svg>
          </div>
          <div className="options">
            <div title="Branch">
              <input id="all-b" name="branch" type="radio" checked={branch === ""} onChange={() => setBranch("")} />
              <label className="option" htmlFor="all-b" data-txt="Branch"></label>
            </div>
            <div title="CSE">
              <input id="cse" name="branch" type="radio" checked={branch === "CSE"} onChange={() => setBranch("CSE")} />
              <label className="option" htmlFor="cse" data-txt="CSE"></label>
            </div>
            <div title="ECE">
              <input id="ece" name="branch" type="radio" checked={branch === "ECE"} onChange={() => setBranch("ECE")} />
              <label className="option" htmlFor="ece" data-txt="ECE"></label>
            </div>
            <div title="EE">
              <input id="ee" name="branch" type="radio" checked={branch === "EE"} onChange={() => setBranch("EE")} />
              <label className="option" htmlFor="ee" data-txt="EE"></label>
            </div>
            <div title="Mechanical">
              <input id="mech" name="branch" type="radio" checked={branch === "Mechanical"} onChange={() => setBranch("Mechanical")} />
              <label className="option" htmlFor="mech" data-txt="Mechanical"></label>
            </div>
            <div title="Civil">
              <input id="civil" name="branch" type="radio" checked={branch === "Civil"} onChange={() => setBranch("Civil")} />
              <label className="option" htmlFor="civil" data-txt="Civil"></label>
            </div>
            <div title="Metallurgy">
              <input id="met" name="branch" type="radio" checked={branch === "Metallurgy"} onChange={() => setBranch("Metallurgy")} />
              <label className="option" htmlFor="met" data-txt="Metallurgy"></label>
            </div>
            <div title="Engineering Physics">
              <input id="ep" name="branch" type="radio" checked={branch === "Engineering Physics"} onChange={() => setBranch("Engineering Physics")} />
              <label className="option" htmlFor="ep" data-txt="Engineering Physics"></label>
            </div>
          </div>
        </div>

        {/* SEMESTER DROPDOWN */}
        <div className="select">
          <div
            className="selected"
            data-default="Semester"
            data-s1="Chemistry Sem"
            data-s2="Physics Sem"
            data-s3="Sem 3"
            data-s4="Sem 4"
            data-s5="Sem 5"
            data-s6="Sem 6"
            data-s7="Sem 7"
            data-s8="Sem 8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="arrow">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
            </svg>
          </div>
          <div className="options">
            <div title="Semester">
              <input id="all-s" name="semester" type="radio" checked={semester === ""} onChange={() => setSemester("")} />
              <label className="option" htmlFor="all-s" data-txt="Semester"></label>
            </div>
            <div title="chemistry-Semester">
              <input id="s1" name="semester" type="radio" checked={semester === "chemistry-Semester"} onChange={() => setSemester("chemistry-Semester")} />
              <label className="option" htmlFor="s1" data-txt="Chemistry Sem"></label>
            </div>
            <div title="Physics-Semester">
              <input id="s2" name="semester" type="radio" checked={semester === "Physics-Semester"} onChange={() => setSemester("Physics-Semester")} />
              <label className="option" htmlFor="s2" data-txt="Physics Sem"></label>
            </div>
            <div title="Semester_3">
              <input id="s3" name="semester" type="radio" checked={semester === "Semester_3"} onChange={() => setSemester("Semester_3")} />
              <label className="option" htmlFor="s3" data-txt="Semester 3"></label>
            </div>
            <div title="Semester_4">
              <input id="s4" name="semester" type="radio" checked={semester === "Semester_4"} onChange={() => setSemester("Semester_4")} />
              <label className="option" htmlFor="s4" data-txt="Semester 4"></label>
            </div>
            <div title="Semester_5">
              <input id="s5" name="semester" type="radio" checked={semester === "Semester_5"} onChange={() => setSemester("Semester_5")} />
              <label className="option" htmlFor="s5" data-txt="Semester 5"></label>
            </div>
            <div title="Semester_6">
              <input id="s6" name="semester" type="radio" checked={semester === "Semester_6"} onChange={() => setSemester("Semester_6")} />
              <label className="option" htmlFor="s6" data-txt="Semester 6"></label>
            </div>
            <div title="Semester_7">
              <input id="s7" name="semester" type="radio" checked={semester === "Semester_7"} onChange={() => setSemester("Semester_7")} />
              <label className="option" htmlFor="s7" data-txt="Semester 7"></label>
            </div>
            <div title="Semester_8">
              <input id="s8" name="semester" type="radio" checked={semester === "Semester_8"} onChange={() => setSemester("Semester_8")} />
              <label className="option" htmlFor="s8" data-txt="Semester 8"></label>
            </div>
          </div>
        </div>

        <button className="paper_find" onClick={handleFindClick} disabled={loading}><span>
          Search</span>
        </button>
      </div>

      <div className="main56">
        {subjectDetails.length > 0 ? (
          subjectDetails.map((subject, index) => (
            <div key={index}>
              <Card
                subject={subject.name}
                code={subject.code}
                num_mat={subject.materials_available}
                semester={semester}
              />
            </div>
          ))
        ) : (
          <p>No subjects found.</p>
        )}
      </div>
    </div>
  );
}

export default Papers;