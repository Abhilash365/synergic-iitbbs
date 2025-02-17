import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './QuestionPapers.css'
const QuestionPapers = () => {
  const { subject } = useParams();
  const [papers, setPapers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openYear, setOpenYear] = useState(null);

  useEffect(() => {
    console.log(`📢 Fetching question papers for subject: ${subject}`);

    fetch(`https://synergic-iitbbs-backend.onrender.com/questionpapers/${subject}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("✅ Papers received:", data.papers);

          // *Grouping by yearOfStudy*
          const groupedPapers = data.papers.reduce((acc, paper) => {
            const year = paper.yearOfStudy; // Group by yearOfStudy
            if (!acc[year]) {
              acc[year] = [];
            }
            acc[year].push(paper);
            return acc;
          }, {});

          setPapers(groupedPapers);
        } else {
          setError(data.message || "No data found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("⚠ Error fetching papers:", err);
        setError("⚠ Unable to fetch question papers. Please try again later.");
        setLoading(false);
      });
  }, [subject]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Question Papers for {subject}</h1>
     <br />
      {Object.keys(papers).length > 0 ? (
        <nav>
          
          <br />
          <ul className="ul_control">
            {Object.keys(papers).map((yearOfStudy) => (
              <li key={yearOfStudy}>
                <button 
  className="year-button" 
  onClick={() => setOpenYear(openYear === yearOfStudy ? null : yearOfStudy)}
>
  {yearOfStudy} {openYear === yearOfStudy ? "▼" : "▶"}
</button>

                {openYear === yearOfStudy && (
  <ul>
    {papers[yearOfStudy].map((paper) => (
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