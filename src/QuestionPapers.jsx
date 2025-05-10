import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "./QuestionPapers.css";

const QuestionPapers = () => {
  const { subject } = useParams();  
  const [searchParams] = useSearchParams();
  const semester = searchParams.get("semester");  

  const [papers, setPapers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openYear, setOpenYear] = useState(null);

  useEffect(() => {
    if (!subject || !semester) {
      setError("Invalid subject or semester.");
      setLoading(false);
      return;
    }

    console.log(`📢 Fetching question papers for ${subject}, Semester: ${semester}`);

    fetch(`https://synergic-iitbbs-backend.onrender.com/questionpapers/${subject}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("✅ Papers received:", data.papers);

          // Grouping by yearOfStudy
          const groupedPapers = data.papers.reduce((acc, paper) => {
            acc[paper.yearOfStudy] = acc[paper.yearOfStudy] || [];
            acc[paper.yearOfStudy].push(paper);
            return acc;
          }, {});

          setPapers(groupedPapers);
        } else {
          setError(data.message || "No papers available.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("⚠ Error fetching papers:", err);
        setError("Unable to fetch papers. Try again later.");
        setLoading(false);
      });
  }, [subject, semester]);

  if (loading) return <p>Loading question papers...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h1>Question Papers for {subject} - Semester {semester}</h1>
      <br />
      {Object.keys(papers).length > 0 ? (
        <nav>
          <ul className="ul_control">
            {Object.entries(papers).map(([yearOfStudy, papersList]) => (
              <li key={yearOfStudy}>
                <button 
                  className="year-button" 
                  onClick={() => setOpenYear(openYear === yearOfStudy ? null : yearOfStudy)}
                >
                  {yearOfStudy} {openYear === yearOfStudy ? "▼" : "▶"}
                </button>

                {openYear === yearOfStudy && (
                  <ul>
                    {papersList.map((paper) => (
                      <li key={paper._id} className="paper-box">
                        <a href={paper.driveLink} target="_blank" rel="noopener noreferrer">
                          {paper.filename}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <p>No papers available.</p>
      )}
    </div>
  );
};

export default QuestionPapers;
