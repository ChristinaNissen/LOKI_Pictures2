import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getCurrentUser, { getUserID } from "../../API/Voter";
import "./study-info.css";

const StudyInfo2 = () => {
  const voter = getCurrentUser();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getUserID();
      setUserID(id);
    };
    fetchUserID();
  }, []);

  function copyIdToClipBoard() {
    if (userID) {
      navigator.clipboard.writeText(userID);
    }
  }

  return (
    <div className="study-center-bg">
      <div className="inner-box-info centered-info-page">
        <h2 className="h2-info-pages">Please tell us about your experience</h2>
        <p className="medium-body-text-info">
          Congratulations! You have finished the voting system.
        </p>
        
        <p className="medium-body-text-info">
          To complete the study, please fill out a survey about your experience
          of the online voting system.
        </p>

        <p className="medium-body-text-info">
          We need to be able to connect your results from the voting system with
          the survey. Therefore, you have to copy the number just below and
          paste it into the survey as the very first thing, after you click the button
          below.
        </p>

        <div style={{ marginTop: "2rem", width: "80%", position: "relative" }}>
          <input
            type="text"
            readOnly
            value={userID || ''}
            className="input-field-code medium-body-text-info"
            style={{ 
              width: "100%", 
              paddingRight: "3.5rem",
              padding: "12px 3.5rem 12px 12px",
              border: "1.5px solid #d1d5db",
              borderRadius: "8px",
              backgroundColor: "#f7f7f7",
              boxSizing: "border-box"
            }}
          />
          <button
            type="button"
            className="copy-button"
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              height: "2.2rem",
              width: "2.2rem",
              border: "none",
              background: "#1976d2",
              color: "#fff",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem"
            }}
            onClick={copyIdToClipBoard}
            aria-label="Copy code"
            title="Copy code"
          >
            📋
          </button>
        </div>

        <button
          className="study-button"
          style={{ marginTop: "2rem" }}
          onClick={() =>
            (window.location.href =
              "https://www.survey-xact.dk/LinkCollector?key=T5JG3UXLJ215")
          }
        >
          Go to survey
        </button>
      </div>
    </div>
  );
};

export default StudyInfo2;
