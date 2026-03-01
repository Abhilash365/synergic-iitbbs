import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import styled from 'styled-components'; // Added styled-components
import "./QuestionPapers.css";
import "./Modal.css";
import Loader from "../Loading/Loading";

// --- STYLED COMPONENT FOR THE NEW BUTTON ---
const StyledPlusButton = styled.div`
  .plusButton {
    --plus_sideLength: 1.5rem;
    --plus_topRightTriangleSideLength: 0.8rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* Main body is now White with a Black border */
    border: 1px solid black;
    width: var(--plus_sideLength);
    height: var(--plus_sideLength);
    background-color: #ffffff; 
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .plusButton::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    /* Triangle is now Black */
    border-width: 0 var(--plus_topRightTriangleSideLength) var(--plus_topRightTriangleSideLength) 0;
    border-style: solid;
    border-color: transparent #000000 transparent transparent; 
    transition: all 0.2s ease-in-out;
  }

  /* Expand black background on hover or when saved */
  .plusButton:hover::before,
  .plusButton.is-saved::before {
    --plus_topRightTriangleSideLength: calc(var(--plus_sideLength) * 2);
  }

  .plusIcon {
    /* Icon starts Black */
    fill: #000000;
    width: calc(var(--plus_sideLength) * 0.6);
    height: calc(var(--plus_sideLength) * 0.6);
    z-index: 1;
    transition: all 0.2s ease-in-out;
  }

  /* Icon turns White when background becomes Black */
  .plusButton:hover .plusIcon,
  .plusButton.is-saved .plusIcon {
    fill: #ffffff;
    transform: rotate(180deg);
  }
  
  /* Optional: Change border to lime green if the paper is saved */
  .plusButton.is-saved {
    border-color: #000000; 
  }
`;

const QuestionPapers = () => {
  const { subject } = useParams();
  const [searchParams] = useSearchParams();
  const semester = searchParams.get("semester");

  const [papers, setPapers] = useState({}); 
  const [activeYear, setActiveYear] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [savedPapers, setSavedPapers] = useState(new Set());
  const [collections, setCollections] = useState([]);
  const [activePaperId, setActivePaperId] = useState(null);
  
  const [showMainModal, setShowMainModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedColName, setSelectedColName] = useState("");
  const [newColName, setNewColName] = useState("");

  const username = Cookies.get("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paperRes = await fetch(`https://synergic-iitbbs-backend.onrender.com/questionpapers/${subject}`);
        const paperData = await paperRes.json();
        
        if (paperData.success) {
          const grouped = paperData.papers.reduce((acc, p) => {
            acc[p.yearOfStudy] = acc[p.yearOfStudy] || [];
            acc[p.yearOfStudy].push(p);
            return acc;
          }, {});
          setPapers(grouped);
          if (Object.keys(grouped).length > 0) setActiveYear(Object.keys(grouped)[0]);
        }

        if (username) {
          const savedRes = await fetch(`https://synergic-iitbbs-backend.onrender.com/api/saved-papers/${username}`);
          const savedData = await savedRes.json();
          if (savedData.success) {
            setCollections(savedData.data);
            const ids = new Set();
            savedData.data.forEach(col => col.papers.forEach(id => ids.add(id)));
            setSavedPapers(ids);
          }
        }
      } catch (err) { setError("Data fetch failed."); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [subject, username]);

  const handleSaveToCollection = async (colName) => {
    const nameToSave = colName || newColName;
    if (!colName && collections.some(c => c.collection_name.toLowerCase() === nameToSave.toLowerCase())) {
      return alert("A collection with this name already exists!");
    }

    try {
      const res = await fetch(`https://synergic-iitbbs-backend.onrender.com/api/save-paper`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: username, paper_id: activePaperId, collection_name: nameToSave }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedPapers(prev => new Set(prev).add(activePaperId));
        setCollections(data.data.saved_papers || []);
        closeAllModals();
      }
    } catch (err) { console.error(err); }
  };

  const handleUnsave = async (paperId) => {
    const col = collections.find(c => c.papers.includes(paperId));
    if (!col) return;
    try {
      const res = await fetch(`https://synergic-iitbbs-backend.onrender.com/api/unsave-paper`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: username, paper_id: paperId, collection_name: col.collection_name }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedPapers(prev => {
          const next = new Set(prev);
          next.delete(paperId);
          return next;
        });
        setCollections(data.data || []);
      }
    } catch (err) { console.error(err); }
  };

  const togglePin = (paperId) => {
    if (!username) return alert("Please log in first");
    if (savedPapers.has(paperId)) {
      handleUnsave(paperId);
    } else {
      setActivePaperId(paperId);
      setShowMainModal(true);
    }
  };

  const closeAllModals = () => {
    setShowMainModal(false);
    setShowCreateModal(false);
    setSelectedColName("");
    setNewColName("");
  };

  if (loading) return <Loader/>;

  return (
    <div className="qp-container">
      <h2 className="qp-title">{subject} Papers</h2>

      <div className="folder-row">
        {Object.keys(papers).map((year) => (
          <div 
            key={year} 
            className={`folder-item ${activeYear === year ? "active" : ""}`}
            onClick={() => setActiveYear(year)}
          >
            <div className="folder-icon">
              <img src="https://img.icons8.com/material-rounded/96/folder-invoices.png" alt="folder-icon" className="icon-img" />
            </div>
            <div className="folder-text">{year}</div>
          </div>
        ))}
      </div>

      <div className="table-section">
        <h3 className="section-subtitle">Available Papers</h3>
        <table className="papers-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Type</th>
              <th>Year</th>
              <th>Contributor Name</th>
              <th>Save</th>
            </tr>
          </thead>
          <tbody>
            {activeYear && papers[activeYear]?.map((paper) => (
              <tr key={paper._id}>
                <td>
                  <a href={paper.driveLink} target="_blank" rel="noreferrer" className="paper-link">
                    {paper.filename}
                  </a>
                </td>
                <td className="type-cell">{paper.type || "N/A"}</td>
                <td>{paper.yearOfStudy}</td>
                <td>{paper.contributorName || "Anonymous"}</td>
                <td>
                  {/* --- REPLACED PIN WITH NEW PLUS BUTTON --- */}
                  <StyledPlusButton onClick={() => togglePin(paper._id)}>
                    <div className={`plusButton ${savedPapers.has(paper._id) ? 'is-saved' : ''}`}>
                      <svg className="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
                      </svg>
                    </div>
                  </StyledPlusButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODALS --- */}
      {showMainModal && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Save to project</h2>
              <p>Select a collection to save this paper.</p>
            </div>
            <div className="collection-radio-group">
              {collections.map((col) => (
                <label key={col.collection_name} className={`radio-item ${selectedColName === col.collection_name ? 'active' : ''}`}>
                  <input type="radio" name="collection" value={col.collection_name} onChange={(e) => setSelectedColName(e.target.value)} />
                  <span className="col-name">📁 {col.collection_name}</span>
                </label>
              ))}
            </div>
            <div className="modal-footer">
              <button className="create-new-btn" onClick={() => { setShowMainModal(false); setShowCreateModal(true); }}>+ Create new</button>
              <button className="btn-primary" disabled={!selectedColName} onClick={() => handleSaveToCollection(selectedColName)}>Save</button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div className="modal-container small" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>New Collection</h2></div>
            <input className="modal-input" type="text" value={newColName} onChange={(e) => setNewColName(e.target.value)} placeholder="Name..." />
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => { setShowCreateModal(false); setShowMainModal(true); }}>Back</button>
              <button className="btn-primary" disabled={!newColName} onClick={() => handleSaveToCollection()}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPapers;